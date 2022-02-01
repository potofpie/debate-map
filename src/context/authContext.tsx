import React, { useEffect, FC, useState, useContext, createContext } from "react";
import {auth} from "../config/firebase";

import { 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,

  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";


interface AuthContextProps {
  auth: any,
  login: Function,
  sendResetEmail: Function,
  logout: Function

}


export const AuthContext = createContext<AuthContextProps| undefined >(undefined);
export const AuthProvider:FC = ({ children }) => {
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch(error){
      alert(error)
    }
  }

  const  logout = async () => {
    try {
      await signOut(auth)
    } catch(error){
      alert(error)
    }

  }
  const sendResetEmail = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }


  return (
    <AuthContext.Provider value={{
      auth,
      login,
      sendResetEmail,
      logout,
    }}>{children}</AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);