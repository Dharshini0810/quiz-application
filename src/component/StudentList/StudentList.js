import React,{useState,useEffect} from 'react'
import { db } from '../../firebase';
import { collection,getDocs } from 'firebase/firestore';
import { FaEye } from 'react-icons/fa';
import './StudentList.css'

function StudentList() {
    const [student,setStudent] = useState([]);

    const usersCollection = collection(db,'users');

    useEffect(() =>{
        const fetchData = async ()=>{
            const querySnapshot = await getDocs(usersCollection);
            const studentData = [];
            querySnapshot.forEach((doc)=>{
                const student = doc.data();
                studentData.push(student);
            })
            setStudent(studentData);
        }
        fetchData();
    },[]);



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
        {student.map((student, index) => (
          <tr key={index}>
            <td>{student.username}</td>
            <td>{student.email}</td>
            <td>
                <button className='delete-button'>
                    <FaEye/>
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default StudentList

