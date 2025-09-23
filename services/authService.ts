import { auth, googleProvider } from './firebase';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  User,
} from 'firebase/auth';

export const signInWithGoogle = async (): Promise<User | void> => {
  // 보존성 강화: 로컬 퍼시스턴스
  await setPersistence(auth, browserLocalPersistence);
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    // 팝업 차단/환경 미지원 시 리다이렉트로 폴백
    await signInWithRedirect(auth, googleProvider);
  }
};

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const subscribeAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const handleRedirectResult = async (): Promise<User | null> => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user ?? null;
  } catch {
    return null;
  }
};


