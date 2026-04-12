/**
 * Event Service - Mock Implementation
 */

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  coordinatorId: string;
}

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    return [
      { id: '1', title: 'Tech Symposium', description: 'Annual tech fest', date: '2024-06-10', status: 'approved', coordinatorId: '4' },
      { id: '2', title: 'Cultural Night', description: 'Music and dance', date: '2024-06-15', status: 'pending', coordinatorId: '4' },
    ];
  },

  createEvent: async (event: any) => {
    console.log('Creating event:', event);
    return { id: Date.now().toString(), status: 'pending', ...event };
  },

  updateEventStatus: async (id: string, status: 'approved' | 'rejected') => {
    console.log(`Updating event ${id} to ${status}`);
    return true;
  }
};
