import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

interface RouteParams {
  id: string; // Capture the dynamic ID
}

export const load = (async ({ params }) => {
  const { id } = params as RouteParams; // Use type assertion for better TypeScript support
  try {
    // Fetch room data from correct endpoint
    const roomRes = await fetch(`http://localhost:3012/room/${params.id}`);
    
    if (!roomRes.ok) {
      throw error(404, 'Room not found');
    }
    
    const room = await roomRes.json();
    
    // Fetch appliance details for each appliance ID
    const appliancePromises = room.appliances.map(async (applianceId: number) => {
      const appRes = await fetch(`http://localhost:3012/appliance/${applianceId}`);
      if (!appRes.ok) {
        console.warn(`Failed to fetch appliance ${applianceId}`);
        return null;
      }
      return appRes.json();
    });
    
    const appliances = await Promise.all(appliancePromises);
    
    return {
      room: {
        ...room,
        applianceDetails: appliances.filter(a => a !== null), // Filter out null responses
      },
    };
  } catch (err) {
    console.error('Error loading room:', err);
    throw error(500, 'Error loading room data');
  }
}) satisfies PageLoad;
