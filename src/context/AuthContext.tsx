import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string, email: string, password: string, role: string, registerNumber?: string }) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let currentUserId: string | null = null;
    let isMounted = true;

    // Safety timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        console.warn("Auth initialization timed out");
        setIsLoading(false);
      }
    }, 10000);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;
      
      setAuthError(null);
      
      if (firebaseUser) {
        currentUserId = firebaseUser.uid;
        const thisUserId = firebaseUser.uid;

        try {
          let userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          
          // Handle race condition: if user was just created, Firestore doc might not be ready yet
          let retries = 0;
          while (!userDoc.exists() && retries < 10 && currentUserId === thisUserId) {
            // Wait a bit and retry
            await new Promise(resolve => setTimeout(resolve, 500));
            userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            retries++;
          }

          // Check if we are still dealing with the same user after the async work
          if (currentUserId !== thisUserId || !isMounted) return;

          if (userDoc.exists()) {
            const userData = {
              id: firebaseUser.uid,
              ...userDoc.data()
            } as User;
            setUser(userData);
          } else {
            console.warn("User authenticated but no Firestore document found.");
            // If we've retried and still nothing, it might be a broken registration
            setAuthError("Your profile information was not found. Please try registering again or contact support.");
            setUser(null);
          }
        } catch (error: any) {
          console.error("Error fetching user data:", error);
          if (currentUserId === thisUserId && isMounted) {
            if (error.code === 'unavailable') {
              setAuthError("Database connection error. Please check your internet connection.");
            } else {
              setAuthError(`Database error: ${error.message}`);
            }
            setUser(null);
          }
        }
      } else {
        currentUserId = null;
        setUser(null);
      }
      
      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userData: { name: string, email: string, password: string, role: string, registerNumber?: string }) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const { authService } = await import('../services/authService');
      await authService.registerUser(userData);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
