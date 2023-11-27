import React,{useState} from 'react'
import { useDataContext } from '../../context/FetchDeleteData';
import './AddCourse.css'


function AddCourse() {
  const [courseName, setCourseName] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [totalTime, setTotalTime] = useState('');

  const {successMessage,handleSubmit,error} = useDataContext()
  
  const courseData = {
    coursename: courseName,
    noofquestions: numQuestions,
    totalmarks: totalMarks,
    totaltime: totalTime,
  };
  
    return (
      <div className='side-bar-right'>
      <div className="course-form-container">
            <form onSubmit={(e) => handleSubmit(e, courseData)}>
              <div className="form-group">
                <label htmlFor="courseName">Course Name:</label>
                <input
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="numQuestions">Number of Questions:</label>
                <input
                  type="number"
                  id="numQuestions"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalMarks">Total Marks:</label>
                <input
                  type="number"
                  id="totalMarks"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalTime">Total Time:</label>
                <input
                  type="number"
                  id="totalTime"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {error && (
              <div className="error-message">{error.message}</div>
            )}
          </div>
          </div>
    );
}

export default AddCourse
