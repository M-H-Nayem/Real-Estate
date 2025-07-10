import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.init";
import { AuthContext } from "./AuthContext";

// export let AuthContext = createContext();
const provider = new GoogleAuthProvider();

 const AuthProvider = ({children}) => {

    let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  console.log(user);
  let createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  let logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  let googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  let updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  let logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
        setLoading(false);
        // console.log(currentUser?.accessToken);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  let All = {
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    setLoading,
    loading,
    googleLogin,
    updateUser,
  };

  return <AuthContext value={All}>{children}</AuthContext>;
};

export default AuthProvider;