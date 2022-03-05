import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as signOutFirebase } from "firebase/auth";
import { addDoc, collection, getDocs, deleteDoc, doc, getFirestore  } from "firebase/firestore"
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBySxdDgTmP7RAFMVHxDtgs1vexKGJqXW4",
  authDomain: "need-to-break.firebaseapp.com",
  projectId: "need-to-break",
  storageBucket: "need-to-break.appspot.com",
  messagingSenderId: "252334492634",
  appId: "1:252334492634:web:4806a035bb76c62a460ee3"
};

export const errorTypes = {
  password: 'password',
  email: 'email',
  unknown: 'unknown'
};

const errorMap = {
  "auth/user-not-found": {
    msg: "User not found",
    type: errorTypes.email
  },
  "auth/email-already-in-use": {
    msg: "Email has already been used",
    type: errorTypes.email
  },
  "auth/invalid-email": {
    msg: "Invalid email",
    type: errorTypes.email
  },
  "auth/missing-email": {
    msg: "Missing email",
    type: errorTypes.email
  },
  "auth/too-many-requests": {
    msg: "Account locked: too many login attempts",
    type: errorTypes.email
  },
  "auth/wrong-password": {
    msg: "Incorrect password",
    type: errorTypes.password
  },
  "auth/weak-password": {
    msg: "Should be at least 6 characters",
    type: errorTypes.password
  },
}

function getErrorMessage(code) {
  return errorMap[code] || {
    msg: "There was an error",
    type: errorTypes.unknown
  };
}

function getAppInstance() {
  // initialize the app only once
  return !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

function getAuthInstance() {
  const app = getAppInstance();
  return getAuth(app);
}

function getDBInstance() {
  const app = getAppInstance();
  return getFirestore(app);
}


export function useDB() {
  async function savePreset(preset) {
    try {
      const userId = getAuth().currentUser.uid;
      await addDoc(collection(getDBInstance(), `users/${userId}/presets`), preset);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async function getPresets() {
    try {
      const userId = getAuth().currentUser.uid;
      const querySnapshot = await getDocs(collection(getDBInstance(), `users/${userId}/presets`));
      const presets = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });

      return presets;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async function deletePreset(id) {
    try {
      const userId = getAuth().currentUser.uid;
      await deleteDoc(doc(getDBInstance(), `users/${userId}/presets`, id));
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return {
    savePreset,
    deletePreset,
    getPresets
  };
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

  async function signUp(email, password) {
    setUserLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(getAuthInstance(), email, password);

      setUserLoading(false);
      return {
        user: result.user
      };
    } catch (error) {
      console.error(error)
      setUserLoading(false);
      return {
        error: getErrorMessage(error.code)
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
      console.error(error)
      setUserLoading(false);
      return {
        error: getErrorMessage(error.code)
      }
    }
  }

  async function signOut() {
    try {
      await signOutFirebase(getAuthInstance());
    } catch (error) {
      console.error(error)
      return error;
    }
  }

  return {
    user,
    userLoading,
    signUp,
    signIn,
    signOut
  };
}