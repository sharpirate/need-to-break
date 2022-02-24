import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBySxdDgTmP7RAFMVHxDtgs1vexKGJqXW4",
  authDomain: "need-to-break.firebaseapp.com",
  projectId: "need-to-break",
  storageBucket: "need-to-break.appspot.com",
  messagingSenderId: "252334492634",
  appId: "1:252334492634:web:4806a035bb76c62a460ee3"
};

function getAppInstance() {
  // initialize the app only once
  return !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

function getAuthInstance() {
  const app = getAppInstance();
  return getAuth(app);
}

export function useAuth() {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuthInstance(), user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.error('user loading: ', userLoading)
  }, [userLoading])

  async function signUp(email, password) {
    setUserLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(getAuthInstance(), email, password);

      setUserLoading(false);
      return {
        user: result.user
      };
    } catch (error) {
      const { code, message } = error;
      setUserLoading(false);
      return {
        error: {
          code,
          message
        }
      }
    }
  }

  async function signIn(email, password) {
    setUserLoading(true);

    try {
      const result = await signInWithEmailAndPassword(getAuthInstance(), email, password);

      setUserLoading(false);
      return {
        user: result.user
      };
    } catch (error) {
      const { code, message } = error;
      setUserLoading(false);
      return {
        error: {
          code,
          message
        }
      }
    }
  }

  return {
    user,
    userLoading,
    signUp,
    signIn
  };
}