import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcWqdyFozOX_KGUapH5LN3J7vDnauR810',
  authDomain: 'clothing-store-db-24e24.firebaseapp.com',
  projectId: 'clothing-store-db-24e24',
  storageBucket: 'clothing-store-db-24e24.appspot.com',
  messagingSenderId: '1079682827756',
  appId: '1:1079682827756:web:766e548b6512eafad26cc9',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// optional setups
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
