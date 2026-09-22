import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mybooks, setMybooks] = useState([]);

  const googleProvider = new GoogleAuthProvider();
  const createUserEmailandPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinEmailandPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signinWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const googleSignout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [user]);

  const fetchMyBooks = () => {
    if (!user?.email) {
      return;
    } else {
      fetch(`http://localhost:3000/mybooks/email/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("this is user", user);
          console.log("mybooks provider", data);
          setMybooks(data);
        });
    }
  };
  useEffect(() => {
    fetchMyBooks();
  }, [user?.email]);

  const authInfo = {
    createUserEmailandPass,
    signinEmailandPass,
    signinWithGoogle,
    googleSignout,
    user,
    loading,
    mybooks,
    fetchMyBooks
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
