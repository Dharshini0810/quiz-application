import React from "react";
import "./AdminDashBoard.css";
import { useState} from "react";
import Card from "../../shared component/card/Card";
import { FaTrash,FaEye,FaPlus } from "react-icons/fa";
import { useDataContext } from "../../context/FetchDeleteData";

function AdminDashBoard() {
  const [course, setCourse] = useState(false);
  const [addcourse, setAddCourse] = useState(false);
  const [viewcourse, setViewCourse] = useState(false);

  const [courseName, setCourseName] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [totalTime, setTotalTime] = useState('');

  const {successMessage,handleSubmit,error,courses,handleDeleteCourse} = useDataContext()

  const courseData = {
    coursename: courseName,
    noofquestions: numQuestions,
    totalmarks: totalMarks,
    totaltime: totalTime,
  };
  

  const handleCourseEvent = () => {
    setCourse(true);
    setAddCourse(false);
    setViewCourse(false);
  };

  const handleAddCourse = () => {
    setAddCourse(true);
    setViewCourse(false);
    setCourse(false);
  };
  const handleViewCourse = () => {
    setViewCourse(true);
    setAddCourse(false);
    setCourse(false);
  };


  return (
      <div className="side-bar-right">
        {course && (
          <div className="cont">
            <Card
              title="Add Course"
              anotherComponent={FaPlus}
              onClick={handleAddCourse}
            />
            <Card
              title="View Course"
              anotherComponent={FaEye}
              onClick={handleViewCourse}
            />
          </div>
        )}
        {addcourse && (
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
              <div className="error-message">{error}</div>
            )}
          </div>
        )}
        {viewcourse && (
          <div className="view-courses-container">
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Total Questions</th>
                  <th>Total Marks</th>
                  <th>Total Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.coursename}</td>
                    <td>{course.noofquestions}</td>
                    <td>{course.totalmarks}</td>
                    <td>{course.totaltime}</td>
                    <td>
                    <button
                      className="delete-button" // Add your CSS class for styling
                      onClick={(e) => handleDeleteCourse(e,course.id)}
                    >
                      <FaTrash />
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {}
        {error && (
              <div className="error-message">{error}</div>
            )}
      </div>
  );
}

export default AdminDashBoard;
