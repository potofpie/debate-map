import React, { useEffect, FC, useState, useContext, createContext } from "react";
import {auth} from "../config/firebase";

import { 
  // signInWithPopup,
  // createUserWithEmailAndPassword,  
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  
} from "firebase/auth";


interface AuthContextProps {
  auth: any,
  user: any,
  login: Function,
  sendResetEmail: Function,
  logout: Function

}


export const AuthContext = createContext<AuthContextProps| undefined >(undefined);
export const AuthProvider:FC = ({ children }) => {
  const [user, setUser] = useState<any >(auth.currentUser)!


  useEffect(() => {
  },[user])

  auth.onAuthStateChanged((state: any) => {
    setUser(state)
  })

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      await setUser(auth.currentUser)
    } catch(error){
      alert(error)
    }
  }
  
  const  logout = async () => {
    try {
      await signOut(auth)
      await setUser(undefined)
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
      user,
      login,
      sendResetEmail,
      logout,
    }}>      
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);