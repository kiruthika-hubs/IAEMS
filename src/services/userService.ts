/**
 * User Service - Mock Implementation
 */
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  getDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { User } from '../types';

/**
 * User Service - Real Firestore Implementation
 */
export const userService = {
  getUsers: async (role?: string): Promise<User[]> => {
    const usersRef = collection(db, 'users');
    let q = query(usersRef, orderBy('name', 'asc'));
    
    if (role) {
      q = query(usersRef, where('role', '==', role), orderBy('name', 'asc'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
  },

  updateStudentCGPA: async (uid: string, cgpa: number, arrears: number) => {
    let level: 'Excellent' | 'Good' | 'Average' = 'Average';
    if (cgpa >= 8.5) level = 'Excellent';
    else if (cgpa >= 7.0) level = 'Good';

    const studentRef = doc(db, 'users', uid);
    await updateDoc(studentRef, {
      cgpa,
      arrears,
      cgpaLevel: level
    });
  },

  getStudentProfile: async (uid: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  }
};
