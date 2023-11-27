import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../../context/FetchDeleteData";
import './StudentCourse.css'

function StudentCourse() {
  const { userId } = useParams();
  const [courseArray, setCourseArray] = useState([]);
  const [userName, setUserName] = useState("");
  const [result, setResult] = useState([]);
  const { getCourseId, fetchCourseAndScoreDetails, getUserName } =
    useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId && getCourseId) {
          const courseList = await getCourseId(userId);
          console.log(courseList);
          setCourseArray(courseList);
        }
      } catch (error) {
        console.error("Error in fetching course", error);
      }
    };
    fetchData();
  }, [userId, getCourseId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId && getUserName) {
          const userName = await getUserName(userId);
          setUserName(userName);
        }
      } catch (error) {
        console.error("Error in fetching course", error);
      }
    };
    fetchData();
  }, [userId, getUserName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(courseArray);
        if (courseArray.length > 0 && fetchCourseAndScoreDetails) {
          const result = await fetchCourseAndScoreDetails(userId, courseArray);
          setResult(result);
        }
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };
    fetchData();
  }, [courseArray, fetchCourseAndScoreDetails, userId]);
  console.log(courseArray);

  return (
    <div className="view-courses-container">
      {userName && <p className="msg">{userName} Marks</p>}
      <table className="student-table">
        <thead>
          <tr>
            <th>CourseName</th>
            <th>Marks Obtained</th>
            <th>No. of Attempts</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {result &&
            result.map((res, index) => (
              <tr key={index}>
                <td>{res.coursename}</td>
                <td>{res.score}</td>
                <td>{res.attempts}</td>
                <td>{res.totalmarks}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentCourse;
