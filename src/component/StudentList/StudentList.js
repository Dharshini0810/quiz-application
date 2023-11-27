import React, { useState, useEffect, } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaEye } from 'react-icons/fa';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        const studentData = [];
        querySnapshot.forEach((doc) => {
          const student = { id: doc.id, ...doc.data() }; // Include the Firestore document ID
          studentData.push(student);
        });
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`${id}`)
  };

  return (
    <div className="view-courses-container side-bar-right">
      <h2>Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>View Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.username}</td>
              <td>{student.email}</td>
              <td>
                <button className='delete-button' onClick={() => handleClick(student.id)}>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;

