import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  nickname?: string;
  country?: string;
  visaType?: string;
  isAdmin?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Firestore에서 사용자 프로필 가져오기
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              ...userData,
              createdAt: userData.createdAt?.toDate() || new Date(),
              updatedAt: userData.updatedAt?.toDate() || new Date(),
            });
          } else {
            // 새 사용자인 경우 닉네임 설정 필요
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const updatedProfile = {
        ...updates,
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
      
      setUser(prev => prev ? {
        ...prev,
        ...updatedProfile,
      } : null);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const createUserProfile = async (nickname: string, country?: string) => {
    if (!user) return;

    try {
      const profileData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        nickname,
        country,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), profileData);
      setUser(prev => prev ? { ...prev, ...profileData } : null);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut: signOutUser,
    updateUserProfile,
    createUserProfile,
  };
}; 