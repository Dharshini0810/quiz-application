import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import SignUp from "./component/SignUp/SignUp";
import { UserAuthContextProvider, useUserAuth } from "./context/UserAuth";
import StudentDashBoard from "./pages/StudentDashbord/StudentDashBoard";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import PasswordReset from "./component/PasswordReset/PasswordReset";
import Layout from "./component/Layout/Layout";
import AdminDashBoard from "./pages/AdminDashBoard/AdminDashBoard";
import AddCourse from "./component/AddCourse/AddCourse";
import Student from "./pages/Student/Student";
import { DataContextProvider, useDataContext } from "./context/FetchDeleteData";
import Question from "./component/Question/Question";
import Sidebar from "./component/Sidebar/Sidebar";
import StudentList from "./component/StudentList/StudentList";
import ViewCourse from "./component/ViewCourse/ViewCourse";
import Exam from "./component/Exam/Exam";
import QuestionList from "./component/QuestionList/QuestionList";
import Score from "./component/Score/Score";

function App() {

  const user = useUserAuth?.user;
  const logOut = useUserAuth?.logOut;
 

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Router>
      <Layout>
        {user && (
          <p className="logout-button" onClick={handleLogOut}>
            <Link to="/student">Logout</Link>
          </p>
        )}
      </Layout>
      {/* {!isLoading && user && (
        <Sidebar>
          <div className="welmsg">Welcome User!!</div>
          <div className="content">Courses</div>
          <div className="content">Marks</div>
        </Sidebar>
      )}
      {!isLoading && admin && (
        <Sidebar>
          <div className="welmsg">Welcome Admin!!</div>
          <div className="content">Student</div>
          <div className="content">Courses</div>
          <div className="content">Questions</div>
        </Sidebar>
      )} */}
      <UserAuthContextProvider>
        <DataContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/student/signup" element={<SignUp />} />
            <Route
              path="/student/:userId"
              element={
                <ProtectedRoute>
                  <StudentDashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/forgot-password"
              element={<PasswordReset />}
            />
            <Route
              path="/admin/admin"
              element={
                <ProtectedRoute>
                  <AdminDashBoard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/admin/addcourse" element={<AddCourse />} />
            <Route path="admin/admin/question" element={<Question />} />
            <Route path="admin/admin/studentlist" element={<StudentList/>}/>
            <Route path="admin/admin/viewcourse" element={<ViewCourse/>}/>
            <Route path="student/:userId/exam" element={<Exam/>}/>
            <Route path="/student/:userId/exam/:courseId" element={<QuestionList/>}/>
            <Route path="//student/:userId/exam/:courseId/score" element={<Score score='8' correct = '4' wrong = '1'/>}/>
          </Routes>
        </DataContextProvider>
      </UserAuthContextProvider>
    </Router>
  );
}

export default App;
