import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Score.css";
import { useDataContext } from "../../context/FetchDeleteData";

function Score() {
  const navigate = useNavigate();
  const { userId, courseId } = useParams();
  const { getUserCourseData } = useDataContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserCourseData(userId, courseId);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error state or navigation to an error page
      }
    };

    fetchData();
  }, [userId, courseId, getUserCourseData]);

  const onBackClick = () => {
    navigate(`/student/${userId}/exam`);
  };


  return (
    <div className="side-bar-right">
      <div className="score-card">
      {userData ? (
        <>
          <h1 className="score">Your Score: {userData.score}</h1>
          <p>No. of attempts: {userData.attempts}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
        <button className="button" onClick={onBackClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Score;
