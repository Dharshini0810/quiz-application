import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc,getDocs, deleteDoc,doc,getDoc,setDoc } from 'firebase/firestore';

const DataContext = createContext();

export function DataContextProvider({ children}) {
  const [admin,setAdmin] = useState(false);
  const [match,setMatch] = useState(false);
  const [successMessage,setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [courses,setCourses] = useState([]);
  const [questions,setQuestions] = useState([]);
  const [time,setTime] = useState(0);
  const [score,setScore] = useState(0);

  const courseCollection = collection(db, 'course');
  const usersCollection = collection(db,'admin');
  const userScoresCollection = collection(db,'score');

  const fetchTime = async (courseId) => {
    const courseDocRef = doc(db, 'course', courseId);
    const courseDoc = await getDoc(courseDocRef);
  
    if (courseDoc.exists()) {
      const courseData = courseDoc.data();
      const totalTime = courseData.totaltime;
      console.log(totalTime);
      setTime(totalTime);
    } else {
      setError('Course document not found or totalTime is not set.');
    }
  }

  const fetchQuestion = async (courseId) =>{
    const questionsCollection = collection(db, 'course' , courseId , 'questions');
    const query = await getDocs(questionsCollection);

    const questionData = [];

    query.forEach((doc) => {
      questionData.push({
        id:doc.id,
        ...doc.data()
      })
    })
    console.log(questionData);
    if(questionData.length > 0){
      const questionArray = questionData[0].questions;
      console.log(questionArray);
      setQuestions(questionArray);
    }
    else if(questionData.length === 0){
      setQuestions([]);
    }
  }

  const fetchAdmin = async (email,password) =>{
    try{
      const querySnapshot = await getDocs(usersCollection);
      const documents = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(documents);
      const matchingUser = documents.find((admin) =>{
        return admin.email === email && admin.password === password;
      })
      if(matchingUser){
        setAdmin(true);
        setMatch(true);
      }
      else{
        setMatch(false);
      }
    }catch(error){
      setError(error);
    }
  }

  const addQuestions = async (courseId,questionData) =>{
    try{
      const questionsCollection = collection(db, 'course' , courseId , 'questions');
      await addDoc(questionsCollection , {questions: questionData});
      setSuccessMessage('Question Added Successfully');
      setTimeout(() => {
        setSuccessMessage('');
      },4000);
    }catch(error){
      setError(error);
    }
  }


  const saveUserScore = async (userId, courseId, score) => {
    try {
      const userScoreDocRef = doc(userScoresCollection, userId);
      const userScoreDoc = await getDoc(userScoreDocRef);
      console.log("Running....")
      if (userScoreDoc.exists()) {
        console.log("Running if....")
        const userScores = userScoreDoc.data();
        userScores[courseId] = score;
  
        await setDoc(userScoreDocRef, userScores);
      } else {
        console.log("Running else....")
        const userScores = {
          [courseId]: score,
        };
  
        await setDoc(userScoreDocRef, userScores);
      }
      
    } catch (error) {
      setError(error);
      console.log(error)
    }
  };

  const getScore = async (userId,courseId)=>{
    const scoreCollection = doc(db,'score',userId);
    const scoreDocRef = await getDoc(scoreCollection);
    
  }
  

  const handleSubmit = (e,courseData) => {
    e.preventDefault();
    try {
      addDoc(courseCollection, courseData);
      setSuccessMessage('Course Added Successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (error) {
      setError(error);
    }
  }

  const handleDeleteCourse = async (e,courseId)=>{
    e.preventDefault();
    try{
        await deleteDoc(doc(db,'course',courseId))
        fetchData();
    }catch(error){
        setError(error)
    }
  }

  const fetchData = async () => {
    try {
      const query = await getDocs(courseCollection);
      const courseData = [];
      query.forEach((doc) => {
        courseData.push({ id: doc.id, ...doc.data() });
      });
      setCourses(courseData);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    successMessage,
    error,
    courses,
    match,
    admin,
    questions,
    time,
    fetchTime,
    fetchQuestion,
    handleSubmit,
    addQuestions,
    handleDeleteCourse,
    saveUserScore,
    fetchAdmin
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}