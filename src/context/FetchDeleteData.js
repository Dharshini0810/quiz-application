import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc,getDocs, deleteDoc,doc,getDoc,setDoc} from 'firebase/firestore';

const DataContext = createContext();

export function DataContextProvider({ children}) {
  const [admin,setAdmin] = useState(false);
  const [match,setMatch] = useState(false);
  const [successMessage,setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [courses,setCourses] = useState([]);
  const [questions,setQuestions] = useState([]);
  const [time,setTime] = useState(0);

  const courseCollection = collection(db, 'course');
  const usersCollection = collection(db,'admin');
  const userNameCollection = collection(db,'users');

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
    let matched = false;
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
        matched = true;
      }
      else{
        setMatch(false);
        matched = false;
      }
    }catch(error){
      setError(error);
    }
    return matched;
  }

  const addQuestions = async (courseId,questionData) =>{
    try{
      const questionsCollection = collection(db, 'course' , courseId , 'questions');
      const existingquestions = await getDocs(questionsCollection);
      if(!existingquestions.empty){
        setSuccessMessage("Questions Already Present");
        return;
      }
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
      const userRef = collection(userNameCollection, userId, 'scores');
      const existingCourses = await getDocs(userRef);
      let courseExists = false;
  
      existingCourses.forEach(async (doc) => {
        if (doc.id === courseId) {
          courseExists = true;
          const courseData = doc.data();
          const currentAttempts = courseData.attempts || 0;
  
          const updatedCourseData = {
            marks: score,
            attempts: currentAttempts + 1 // Incrementing the attempts
          };
  
          await setDoc(doc.ref, updatedCourseData);
        }
      });
  
      if (!courseExists) {
        const newCourseData = {
          marks: score,
          attempts: 1 // First attempt for a new course
        };
  
        await setDoc(doc(userRef, courseId), newCourseData);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  

  const getUserCourseData = async (userId, courseId) => {
    try {
      const userRef = collection(userNameCollection, userId, 'scores');
      const querySnapshot = await getDocs(userRef);
  
      let data = {
        score: null,
        attempts: null
      };
  
      querySnapshot.forEach((doc) => {
        if (doc.id === courseId) {
          const courseData = doc.data();
          data.score = courseData.marks; // Assuming 'marks' is where the score is stored
          data.attempts = courseData.attempts || 0; // Assuming 'attempts' is where attempts are stored
        }
      });
  
      return data;
    } catch (error) {
      console.error('Error getting user course data:', error);
      throw error;
    }
  };
  
  

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

    const getCourseId = async(userId) =>{
        const courseList = collection(userNameCollection,userId,'scores');
        const querySnapShot = await getDocs(courseList);
        const course = [];
        querySnapShot.forEach((doc) => {
            const data = doc.id;
            course.push(data);
        })
        console.log(course);
        return course;
    }

    const getUserName = async (userId) => {
      let userName = '';
      const userRef = doc(userNameCollection, userId);
      try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
              const userData = userDoc.data();
              userName = userData.username || ''; // Replace 'username' with the actual field name in your Firestore document
          }
      } catch (error) {
          console.error('Error fetching user data:', error);
          throw error;
      }
      return userName;
  };
  
   
    const fetchCourseAndScoreDetails = async (userId, courseArray) => {
      const resultData = [];
      try {
        console.log(courseArray);
          for (const cid of courseArray) {
              const courseRef = doc(courseCollection,cid);
              const courseDoc = await getDoc(courseRef);
              if (!courseDoc.exists()) {
                  throw new Error("Course does not exist");
              }
              
              const courseData = courseDoc.data();
              const { coursename, totalmarks } = courseData;
  
              const userRef = doc(userNameCollection, userId, 'scores', cid);
              const userDoc = await getDoc(userRef);
  
              let attempts = 0;
              let score = 0;
  
              if (userDoc.exists()) {
                  const scoreData = userDoc.data();
                  attempts = scoreData.attempts || 0;
                  score = scoreData.marks || 0;
              } else {
                  throw new Error("Course not attempted");
              }
  
              resultData.push({
                  courseId: cid,
                  coursename,
                  totalmarks,
                  attempts,
                  score
              });
          }
  
          return resultData;
      } catch (error) {
          console.error("Error fetching course and score details:", error);
          throw error;
      }
  };
  

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
    fetchAdmin,
    getUserCourseData, 
    getCourseId,
    getUserName,
    fetchCourseAndScoreDetails
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}