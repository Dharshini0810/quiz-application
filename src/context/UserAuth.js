import React from 'react'
import {createContext,useState,useContext,useEffect} from 'react'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail} from 'firebase/auth'
import { auth } from '../firebase'


const userAuthcontext = createContext();

export function UserAuthContextProvider({children}){
    const[user,setUser] = useState("");
    const[userId,setUserId] = useState("");
    const[isAuthenticated,setIsAuthenticated] = useState(false);

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logOut(){
        return signOut(auth);
    }

    function googleSignin(){
        const googleauthprovider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleauthprovider);
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth,email);
    }

    const a = auth;
    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(a,(currentUser)=>{
            setUser(currentUser)
            if (currentUser) {
                setUserId(currentUser.uid); // Access the unique user ID (UID)
                setIsAuthenticated(true);
              } else {
                setUserId(null); // No user is authenticated, set userId to null
                setIsAuthenticated(false);
              }
        })
        return ()=>{
            unsubscribe()
        }
    },[a])

    return <userAuthcontext.Provider value={{user,userId,signUp,logIn,logOut,googleSignin,isAuthenticated,resetPassword}}>{children}</userAuthcontext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthcontext)
}