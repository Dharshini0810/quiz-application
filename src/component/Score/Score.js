import React from "react";
import { useNavigate,useParams} from "react-router-dom";
import "./Score.css";

function Score() {
  const navigate = useNavigate();
  const {userId , courseId} = useParams();


  const onBackClick = () => {
    navigate("/student/student/exam");
  };
  return (
    <div className="side-bar-right">
      <div className="score-card">
        <h1 className="score">Your Score: </h1>
        <div className="count">
          <p>Correct:</p>
          <p>Wrong: </p>
        </div>
        <button className="button" onClick={onBackClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Score;
