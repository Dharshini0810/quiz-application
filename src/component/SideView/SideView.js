import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuth";
import { useDataContext } from "../../context/FetchDeleteData";
import './SideView.css'

import Sidebar from "../../shared component/Sidebar/Sidebar";

function SideView() {
  const [userName, setUserName] = useState();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated } = useUserAuth();
  const { userId } = useParams();
  const { getUserName } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const userData = await getUserName(userId);
        setUserName(userData);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [userId, getUserName]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 460);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleCourses = () => {
    try {
      navigate(`/student/${userId}/exam`);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleMarks = () => {
    try {
      if (userId === null) {
        // Handle the condition where userId is null
      }
      navigate(`/student/${userId}/marklist`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      {isAuthenticated && (
        <Sidebar>
          <div className="welmsg" onClick={toggleDropdown}>
            Welcome {userName} {isSmallScreen && <span>&#9662;</span>}
            {showDropdown && isSmallScreen && (
              <div className="dropdown">
                <div className="dropdown-option" onClick={handleCourses}>Courses</div>
                <div className="dropdown-option" onClick={handleMarks}>Marks</div>
              </div>
            )}
          </div>
          {!isSmallScreen && (
            <>
              <div className="content" onClick={handleCourses}>
                Courses
              </div>
              <div className="content" onClick={handleMarks}>
                Marks
              </div>
            </>
          )}
        </Sidebar>
      )}
    </div>
  );
}

export default SideView;
