import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { UserProfile } from '../types/resume';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY' &&
  firebaseConfig.authDomain
);

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Map Firebase User to App UserProfile
export function mapFirebaseUser(user: FirebaseUser, providerOverride?: 'email' | 'google' | 'github'): UserProfile {
  let provider: 'email' | 'google' | 'github' = providerOverride || 'email';
  if (user.providerData && user.providerData.length > 0) {
    const pId = user.providerData[0].providerId;
    if (pId.includes('google')) provider = 'google';
    else if (pId.includes('github')) provider = 'github';
  }

  return {
    id: user.uid,
    name: user.displayName || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    avatarUrl: user.photoURL || undefined,
    provider
  };
}

// Convert Firebase Auth Error codes into human-readable messages
export function formatAuthError(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing.';
    case 'auth/unauthorized-domain':
      return 'Domain not authorized in Firebase Console. Add your domain to Authorized Domains.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled in your Firebase Console.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Please try again later.';
    default:
      return error.message || 'An error occurred during authentication.';
  }
}

export async function registerWithEmail(email: string, password: string, displayName: string): Promise<UserProfile> {
  if (!isFirebaseConfigured) {
    return {
      id: 'demo_' + Date.now(),
      name: displayName || email.split('@')[0],
      email,
      provider: 'email'
    };
  }

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(credential.user, { displayName });
  }
  return mapFirebaseUser(credential.user, 'email');
}

export async function loginWithEmail(email: string, password: string): Promise<UserProfile> {
  if (!isFirebaseConfigured) {
    return {
      id: 'demo_' + Date.now(),
      name: email.split('@')[0] || 'Demo User',
      email,
      provider: 'email'
    };
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(credential.user, 'email');
}

export async function loginWithGoogle(): Promise<UserProfile> {
  if (!isFirebaseConfigured) {
    return {
      id: 'demo_google_' + Date.now(),
      name: 'Google Demo User',
      email: 'demo.user@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      provider: 'google'
    };
  }

  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  return mapFirebaseUser(credential.user, 'google');
}

export async function loginWithGithub(): Promise<UserProfile> {
  if (!isFirebaseConfigured) {
    return {
      id: 'demo_github_' + Date.now(),
      name: 'GitHub Demo User',
      email: 'demo.user@github.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      provider: 'github'
    };
  }

  const provider = new GithubAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  return mapFirebaseUser(credential.user, 'github');
}

export async function sendPasswordReset(email: string): Promise<void> {
  if (!isFirebaseConfigured) {
    return;
  }
  await sendPasswordResetEmail(auth, email);
}

export async function logoutFirebase(): Promise<void> {
  if (!isFirebaseConfigured) {
    return;
  }
  await signOut(auth);
}

export function subscribeToAuthChanges(callback: (user: UserProfile | null) => void): () => void {
  if (!isFirebaseConfigured) {
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(mapFirebaseUser(user));
    } else {
      callback(null);
    }
  });
}
