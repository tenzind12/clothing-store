import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// ============  FIRE STORE ============== //
export const db = getFirestore();

// STORE USER INFO IN FIRESTORE (DATABASE)
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log('userexists : ' + userSnapShot.exists());

  // if user data doesn't exists
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error from firestore method : ', error.message);
    }
  }

  // return userDocRef
  return userDocRef;
};

// ========= createUserWithEmailAndPassword  ============ //
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
