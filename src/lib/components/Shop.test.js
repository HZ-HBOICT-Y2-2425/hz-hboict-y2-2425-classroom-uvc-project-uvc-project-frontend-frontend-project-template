import { render, screen, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Shop from './Shop.svelte';

describe('Shop Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it('should fetch data and update items', async () => {
    // Mock the global fetch function
    const fetchMock = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        shop: {
          sections: {
            electronics: [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Smartphone' }],
          },
        },
      }),
    });

    // Assign the mock fetch to the global fetch
    global.fetch = fetchMock;

    // Render the component
    render(Shop);

    // Wait for the items to be rendered
    await waitFor(() => {
      // @ts-ignore
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      // @ts-ignore
      expect(screen.getByText('Smartphone')).toBeInTheDocument();
    });

    // Verify that fetch was called correctly
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3010/items');
  });

  it('should handle fetch failure gracefully', async () => {
    // Mock the fetch function to simulate a failure
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('Network Error'));
    global.fetch = fetchMock;

    // Mock console.error to verify error handling
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Render the component
    render(Shop);

    // Wait for the error to be handled (example: checking for a fallback UI or logged error)
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Failed to fetch shop data:',
        expect.any(Error)
      );
    });

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});
