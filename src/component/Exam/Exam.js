import React from 'react'
import { useDataContext } from '../../context/FetchDeleteData'
import CourseCard from '../../shared component/card/CourseCard/CourseCard';
import './Exam.css'

function Exam() {

    const {courses} = useDataContext();

  return (
    <div className='exam-container'>
      {
        courses.map(course => (
            <CourseCard course={course.coursename} noques={course.noofquestions} courseid={course.id} key={course.id}/>
        ))
      }
    </div>
  )
}

export default Exam
