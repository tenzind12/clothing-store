import { createContext, useEffect, useState } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// context Provider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // Fires when sign-in / sign-out
  useEffect(() => {
    onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
