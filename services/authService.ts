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
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPad|iPhone|iPod/i.test(ua) || (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);
  const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|Android/i.test(ua);

  // iOS/Safari는 팝업 신뢰성이 낮아 즉시 리다이렉트 사용
  if (isIOS || isSafari) {
    await signInWithRedirect(auth, googleProvider);
    return;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: any) {
    const code: string = err?.code || '';
    // 팝업 차단/미지원/중복 요청 등은 리다이렉트로 폴백
    if (
      code.includes('popup-blocked') ||
      code.includes('operation-not-supported') ||
      code.includes('popup-closed-by-user') ||
      code.includes('cancelled-popup-request')
    ) {
      await signInWithRedirect(auth, googleProvider);
      return;
    }
    throw err;
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


