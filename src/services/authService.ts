import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { User } from "../types";

/**
 * Auth Service - Firebase Implementation
 */

export const authService = {
  loginUser: async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Fetch additional user data from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    
    if (userDoc.exists()) {
      return {
        id: firebaseUser.uid,
        ...userDoc.data()
      } as User;
    } else {
      throw new Error("User data not found in database");
    }
  },

  registerUser: async (userData: { name: string, email: string, password: string, role: string, registerNumber?: string }): Promise<User> => {
    const { email, password, name, role, registerNumber } = userData;
    const normalizedEmail = email.trim().toLowerCase();
    const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
    const firebaseUser = userCredential.user;

    const newUser: any = {
      name,
      email: normalizedEmail,
      role: role as any,
    };

    // Only add registerNumber if it's a non-empty string
    if (registerNumber && registerNumber.trim() !== '') {
      newUser.registerNumber = registerNumber.trim();
    }

    try {
      // Store user data in Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), newUser);
      
      return {
        id: firebaseUser.uid,
        ...newUser
      } as User;
    } catch (error) {
      // If Firestore fails, sign out to avoid broken auth state
      await signOut(auth);
      throw error;
    }
  },

  logout: async () => {
    await signOut(auth);
  },

  getCurrentUser: (): Promise<User | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe();
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            resolve({
              id: firebaseUser.uid,
              ...userDoc.data()
            } as User);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }
};
