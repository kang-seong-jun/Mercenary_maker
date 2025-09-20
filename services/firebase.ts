import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBwepLTvJ8VfCzWITpf2iH2EEqePONTscI',
  authDomain: 'mercenary-maker.firebaseapp.com',
  projectId: 'mercenary-maker',
  storageBucket: 'mercenary-maker.firebasestorage.app',
  messagingSenderId: '631263447597',
  appId: '1:631263447597:web:fd9e2d23e8a100ae0106a4',
  measurementId: 'G-VLQGTE838S',
};

export const app = initializeApp(firebaseConfig);

export let analytics: Analytics | null = null;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch(() => {
    // ignore analytics init errors in unsupported environments
  });

// Auth
export const auth = getAuth(app);
auth.languageCode = 'ko';
export const googleProvider = new GoogleAuthProvider();


