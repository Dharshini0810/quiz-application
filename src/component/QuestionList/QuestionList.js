import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/FetchDeleteData";
import { useNavigate } from "react-router-dom";
import './QuestionList.css'

function QuestionList() {
  const {courseId,userId} = useParams();
  const { questions, fetchQuestion, fetchTime, time,saveUserScore } = useDataContext();
  const [selectedCourseQuestion, setSelectedCourseQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState([]);
  const [startTimer,setStartTimer] = useState(false);
  const navigate = useNavigate();

  // Fetch questions and time once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (courseId && loading) {
        await fetchTime(courseId);
        if(time > 0){
          setRemainingTime(60 * time)
          setStartTimer(true)
        }
        await fetchQuestion(courseId);
        setLoading(false); // Set loading to false when data is fetched
      };
    };
  
    fetchData();
  }, [courseId, fetchQuestion, fetchTime,time, loading]);
  
  useEffect(() => {
    if (startTimer && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    } else if(startTimer){
      alert("Time is up. Please submit your exam");
    }
  }, [remainingTime,startTimer]);
  

  
  // Update selectedCourseQuestion when questions change
  useEffect(() => {
    if (!loading && questions && questions.length > 0 && userAnswer.length === 0) {
      setSelectedCourseQuestion(questions);
    }
  }, [questions,loading,userAnswer,remainingTime]);

  useEffect(() => {
    setIsLastQuestion(
      currentQuestionIndex === selectedCourseQuestion?.length - 1
    );
  }, [currentQuestionIndex, selectedCourseQuestion]);

  const currentQuestion = selectedCourseQuestion?.[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedCourseQuestion?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (selectedOption) => {
    console.log("Option change......")
    const updateAnswers = [...userAnswer];
    updateAnswers[currentQuestionIndex] = selectedOption;
    console.log(updateAnswers);
    setUserAnswer(updateAnswers);
    }
  

  const handleEvaluateAnswer = async () => {
    // Implement your answer evaluation logic here
    let score = 0;
    for (let i = 0; i < selectedCourseQuestion.length; i++) {
      if (userAnswer[i] === selectedCourseQuestion[i].answer) {
        score += 1;
      }
    }
    console.log(`Score: ${score}`); // Log the score to check it's correct
  console.log('userId:', userId);
  console.log('courseId:', courseId);
    await saveUserScore(userId,courseId,score);
    alert(`Your Score: ${score}`)
    navigate("score")
  };

  return (
    <div className="side-bar-right1">
      {loading ? (
        <p>Loading questions...</p>
      ) : selectedCourseQuestion ? (
        currentQuestion ? (
          <div className="question-container">
            {remainingTime> 0 && <p className="timer">Time Remaining: {formatTime(remainingTime)}</p>}
            <div className="question-container1">
              <p>
                <span className="questionno">
                  Question {currentQuestionIndex + 1}
                </span>
                : {currentQuestion.questionText}
              </p>
              <form className="form-container">
                {currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name={`question_${currentQuestionIndex}`} // Use a unique name for each question
                      value={option}
                      id={`option_${currentQuestionIndex}_${index}`} // Add a unique index
                      checked = {userAnswer[currentQuestionIndex] === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    <label htmlFor={`option_${currentQuestionIndex}_${index}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </form>

              <div className="button-container">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                {/* <button onClick={handleEvaluateAnswer}>Submit Answer</button> */}
                {isLastQuestion ? (
                  <button onClick={handleEvaluateAnswer}>Submit</button>
                ) : (
                  <button onClick={handleNextQuestion}>Next</button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No questions available for the selected course.</p>
        )
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const remSec = seconds % 60;
  return `${min}:${remSec < 10 ? "0" : ""}${remSec}`;
}

export default QuestionList;
