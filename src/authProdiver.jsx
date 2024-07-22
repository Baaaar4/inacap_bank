import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "./firebaseAuth";
import { getDatabase, ref, set, update } from "firebase/database";

export const AuthContext = createContext({
  error: null,
  setError: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createUser = async (email, password, userData) => {
    setLoading(true);
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const db = getDatabase();
      set(ref(db, 'users/' + newUser.uid), userData);

      const accountsRef = ref(db, `accounts/${newUser.uid}`);
      await update(accountsRef, {
        checkingAccount: { balance: 0 },
        savingAccount: { balance: 0 },
        creditCard: { balance: 5000000, spent: 230000 }
      });

      // // Guarda rut en otra coleccion
      // SE DEBE CHEQUEAR SI EXISTE
      const rutRef = ref(db, 'ruts/' + userData.rut);
      await set(rutRef, newUser.uid);

      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        throw error;
      });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        throw error;
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {
    createUser,
    user,
    loginUser,
    logOut,
    loading,
    error,
    setError,
    setLoading
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
