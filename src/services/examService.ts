/**
 * Exam Service - Mock Implementation
 */

export interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  room?: string;
  bench?: string;
}

export const examService = {
  getExams: async (): Promise<Exam[]> => {
    return [
      { id: '1', subject: 'Mathematics', date: '2024-05-15', time: '10:00 AM' },
      { id: '2', subject: 'Physics', date: '2024-05-17', time: '02:00 PM' },
      { id: '3', subject: 'Computer Science', date: '2024-05-20', time: '10:00 AM' },
    ];
  },

  createExam: async (exam: any) => {
    console.log('Creating exam:', exam);
    return { id: Date.now().toString(), ...exam };
  }
};
