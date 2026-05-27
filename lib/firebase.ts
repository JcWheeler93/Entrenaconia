import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize if config is present
const hasConfig = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';
const app = hasConfig && !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = hasConfig ? getAuth(app) : null;
const googleProvider = hasConfig ? new GoogleAuthProvider() : null;

export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    throw new Error('Firebase not configured');
  }
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const logOut = async () => {
  if (!auth) return;
  await signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

export { auth };
export default app;
