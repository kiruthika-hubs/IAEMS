import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Exam, Room, Event, HallTicket, Syllabus } from '../types';

/**
 * Exam Service
 */
export const examService = {
  addExam: async (examData: Omit<Exam, 'id'>) => {
    const examsRef = collection(db, 'exams');
    return await addDoc(examsRef, {
      ...examData,
      createdAt: Timestamp.now()
    });
  },

  getExams: async () => {
    const examsRef = collection(db, 'exams');
    const q = query(examsRef, orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Exam[];
  }
};

/**
 * Room Service
 */
export const roomService = {
  addRoom: async (roomData: Omit<Room, 'id'>) => {
    const roomsRef = collection(db, 'rooms');
    return await addDoc(roomsRef, {
      ...roomData,
      createdAt: Timestamp.now()
    });
  },

  getRooms: async () => {
    const roomsRef = collection(db, 'rooms');
    const querySnapshot = await getDocs(roomsRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Room[];
  }
};

/**
 * Event Service
 */
export const eventService = {
  createEvent: async (eventData: Omit<Event, 'id' | 'status'>) => {
    const eventsRef = collection(db, 'events');
    return await addDoc(eventsRef, {
      ...eventData,
      status: 'pending',
      createdAt: Timestamp.now()
    });
  },

  approveEvent: async (eventId: string) => {
    const eventRef = doc(db, 'events', eventId);
    return await updateDoc(eventRef, {
      status: 'approved',
      updatedAt: Timestamp.now()
    });
  },

  getEvents: async (status?: 'pending' | 'approved' | 'rejected') => {
    const eventsRef = collection(db, 'events');
    const querySnapshot = await getDocs(eventsRef);
    let events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
    
    if (status) {
      events = events.filter(e => e.status === status);
    }
    
    return events;
  }
};

/**
 * Hall Ticket Service
 */
export const hallTicketService = {
  generateHallTicket: async (ticketData: Omit<HallTicket, 'id' | 'generatedAt'>) => {
    const ticketsRef = collection(db, 'hallTickets');
    return await addDoc(ticketsRef, {
      ...ticketData,
      generatedAt: Timestamp.now()
    });
  },

  getStudentHallTickets: async (studentId: string) => {
    const ticketsRef = collection(db, 'hallTickets');
    const querySnapshot = await getDocs(ticketsRef);
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((ticket: any) => ticket.studentId === studentId) as HallTicket[];
  }
};

/**
 * Syllabus Service
 */
export const syllabusService = {
  addSyllabus: async (syllabusData: Omit<Syllabus, 'id'>) => {
    const syllabusRef = collection(db, 'syllabus');
    return await addDoc(syllabusRef, {
      ...syllabusData,
      createdAt: Timestamp.now()
    });
  },

  getSyllabus: async (department?: string, semester?: number) => {
    const syllabusRef = collection(db, 'syllabus');
    const querySnapshot = await getDocs(syllabusRef);
    let syllabus = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Syllabus[];

    if (department) {
      syllabus = syllabus.filter(s => s.department === department);
    }
    if (semester) {
      syllabus = syllabus.filter(s => s.semester === semester);
    }

    return syllabus;
  }
};
