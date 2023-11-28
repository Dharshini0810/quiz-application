import React from 'react'
import Sidebar from '../../shared component/Sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'
import './SideViewAdmin.css'

function SideViewAdmin() {
    const navigate = useNavigate();
    const handleStudentList = () => {
        try{
            navigate('/admin/admin/studentlist')
        }
        catch(error){
            console.log(error);
        }
    }
    const handleCoursesAdmin = () => {
        try{
            navigate('/admin/admin/addcourse')
        }
        catch(error){
            console.log(error);
        }
    }
    const handleViewCourses = () => {
        try{
            navigate('/admin/admin/viewcourse')
        }
        catch(error){
            console.log(error);
        }
    }
    const handleQuestions = () => {
        try{
            navigate('/admin/admin/question')
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div>
      <Sidebar>
          <div className="welmsg">Welcome Admin!!</div>
          <div className="content" onClick={handleStudentList}>StudentList</div>
          <div className="content" onClick={handleCoursesAdmin}>Add Courses</div>
          <div className="content" onClick={handleViewCourses}>View Courses</div>
          <div className="content" onClick={handleQuestions}>Add Questions</div>
        </Sidebar>
    </div>
  )
}

export default SideViewAdmin
