import React, { useState, useEffect } from 'react';
import { useDataContext } from '../../context/FetchDeleteData';
import './Question.css';

function Question() {
  const { courses, addQuestions,successMessage } = useDataContext();
  const [noques, setNoQues] = useState('');
  const [courseId, setCourseId] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Initialize questions when the component mounts
    const initialQuestions = Array.from({ length: noques }, () => ({
      questionText: '',
      options: [''],
      answer: '',
    }));
    setQuestions(initialQuestions);
  }, [noques]);

  
  const addOption = (questionIndex) => {
    const updateQuestions = [...questions];
    if (updateQuestions[questionIndex].options.length < 4) {
      updateQuestions[questionIndex].options.push('');
      setQuestions(updateQuestions);
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setSelectedCourse(selectedCourse);
    const selectedCourseObject = courses.find((course) => course.coursename === selectedCourse);

    if (selectedCourseObject) {
      setCourseId(selectedCourseObject.id);
      setNoQues(selectedCourseObject.noofquestions);
    } else {
      setCourseId('');
      setNoQues('');
      setQuestions([]); // Clear questions when no course is selected
    }
  };


  const handleQuestionTextChange = (questionIndex, value) => {
    const updateQuestions = [...questions];
    updateQuestions[questionIndex].questionText = value;
    setQuestions(updateQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updateQuestions = [...questions];
    updateQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updateQuestions);
  };

  const handleAnswerChange = (questionIndex, value) => {
    const updateQuestions = [...questions];
    updateQuestions[questionIndex].answer = value;
    setQuestions(updateQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionsData = questions.map((question) => ({
      questionText: question.questionText,
      options: question.options,
      answer: question.answer,
    }));
    addQuestions(courseId, questionsData);
  };



  return (
    <div className='side-bar-right'>
    <h2>Add a Question</h2>
    <form className='question-form'>
      <div>
        <label>Select Course: </label>
        <select
          value={selectedCourse}
          onChange={handleCourseChange}  
        >
          <option value="">Select a Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.coursename}>
              {course.coursename}
            </option>
          ))}
        </select>
      </div>
      {selectedCourse && questions.map((question, questionIndex) => (
          <div key={questionIndex} >
            <div>
              <label>Question {questionIndex + 1}: </label>
              <input
                type="textarea"
                value={question.questionText}
                onChange={(e) => handleQuestionTextChange(questionIndex, e.target.value)}
                required
              />
            </div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>Option {optionIndex + 1}: </label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={() => addOption(questionIndex)}>
              Add Option
            </button>
            <div>
              <label>Answer: </label>
              <input
                type="text"
                value={question.answer}
                onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="submit" onClick = {handleSubmit}>Submit</button>
        {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
      </form>
    </div>
  );
}

export default Question;
