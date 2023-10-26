import React from 'react'
import {createContext,useState,useContext,useEffect} from 'react'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail} from 'firebase/auth'
import { auth } from '../firebase'


const userAuthcontext = createContext();

export function UserAuthContextProvider({children}){
    const[user,setUser] = useState("");
    const[userId,setUserId] = useState("");

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

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            if (currentUser) {
                setUserId(currentUser.uid); // Access the unique user ID (UID)
              } else {
                setUserId(null); // No user is authenticated, set userId to null
              }
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    return <userAuthcontext.Provider value={{user,userId,signUp,logIn,logOut,googleSignin,resetPassword}}>{children}</userAuthcontext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthcontext)
}