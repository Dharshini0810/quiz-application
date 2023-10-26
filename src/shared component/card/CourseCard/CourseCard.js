import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CourseCard.css'

function CourseCard({course,noques,courseid}) {

  const navigate = useNavigate();

  const handleClickEvent = () =>{
    navigate(`${courseid}`)
  }
  return (
    <div className='course-card'>
        <h3 className='course-title'>{course}</h3>
        <p className='desc'>Number of Questions : {noques}</p>
        <button className="button-link" onClick={handleClickEvent}>Start Test</button>
    </div>
  )
}

export default CourseCard
