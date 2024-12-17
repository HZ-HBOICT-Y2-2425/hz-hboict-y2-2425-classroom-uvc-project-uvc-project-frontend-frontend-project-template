import { vi } from 'vitest';

// Mock global fetch if not already mocked
if (!global.fetch) {
  global.fetch = vi.fn();
}

// Suppress console errors (optional)
vi.spyOn(console, 'error').mockImplementation(() => {});

