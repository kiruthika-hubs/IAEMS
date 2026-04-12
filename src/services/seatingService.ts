/**
 * Seating Service - Mock Implementation
 */

export interface Room {
  id: string;
  roomNumber: string;
  totalBenches: number;
  capacity: number;
}

export interface SeatingPlan {
  id: string;
  studentName: string;
  registerNumber: string;
  roomNumber: string;
  benchNumber: string;
}

export const seatingService = {
  getRooms: async (): Promise<Room[]> => {
    return [
      { id: '1', roomNumber: 'LH-101', totalBenches: 30, capacity: 60 },
      { id: '2', roomNumber: 'LH-102', totalBenches: 25, capacity: 50 },
      { id: '3', roomNumber: 'AUD-1', totalBenches: 50, capacity: 100 },
    ];
  },

  addRoom: async (room: any) => {
    console.log('Adding room:', room);
    return { id: Date.now().toString(), ...room };
  },

  generateSeating: async (): Promise<SeatingPlan[]> => {
    console.log('Generating seating plan...');
    return [
      { id: '1', studentName: 'John Student', registerNumber: 'REG12345', roomNumber: 'LH-101', benchNumber: 'A-1' },
      { id: '2', studentName: 'Jane Doe', registerNumber: 'REG12346', roomNumber: 'LH-101', benchNumber: 'A-2' },
    ];
  }
};
