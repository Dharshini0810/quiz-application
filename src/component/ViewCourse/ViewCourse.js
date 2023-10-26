import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDataContext } from '../../context/FetchDeleteData'

function ViewCourse() {
    
    const {courses,handleDeleteCourse} = useDataContext();
  return (
        <div className="view-courses-container side-bar-right">
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
      )
    }

export default ViewCourse
