import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import SignUp from "./component/SignUp/SignUp";
import { UserAuthContextProvider } from "./context/UserAuth";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import Layout from "./component/Layout/Layout";
import AddCourse from "./component/AddCourse/AddCourse";
import Student from "./pages/Student/Student";
import { DataContextProvider } from "./context/FetchDeleteData";
import Question from "./component/Question/Question";
import SideView from "./component/SideView/SideView";
import StudentList from "./component/StudentList/StudentList";
import ViewCourse from "./component/ViewCourse/ViewCourse";
import Exam from "./component/Exam/Exam";
import QuestionList from "./component/QuestionList/QuestionList";
import Score from "./component/Score/Score";
import StudentCourse from "./component/StudentCourse/StudentCourse";
import PasswordReset from "./component/PasswordReset/PasswordReset";
import SideViewAdmin from "./component/SideViewAdmin/SideViewAdmin";

function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <Layout />
        <DataContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/student/signup" element={<SignUp />} />
            <Route
              path="/student/forgot-password"
              element={<PasswordReset />}
            />
            <Route
              path="/student/:userId"
              element={
                <ProtectedRoute>
                  <SideView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin"
              element={
                <ProtectedRoute>
                  <SideViewAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/:userId/exam"
              element={
                <ProtectedRoute>
                  <Exam />
                  <SideView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/:userId/marklist"
              element={
                <ProtectedRoute>
                  <StudentCourse />
                  <SideView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/:userId/exam/:courseId"
              element={
                <ProtectedRoute>
                  <QuestionList />
                  <SideView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/:userId/exam/:courseId/score"
              element={
                <ProtectedRoute>
                  <Score />
                  <SideView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin/addcourse"
              element={
                <ProtectedRoute>
                  <SideViewAdmin />
                  <AddCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin/question"
              element={
                <ProtectedRoute>
                  <SideViewAdmin />
                  <Question />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin/studentlist"
              element={
                <ProtectedRoute>
                  <SideViewAdmin />
                  <StudentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin/studentlist/:userId"
              element={
                <ProtectedRoute>
                  <SideViewAdmin />
                  <StudentCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admin/viewcourse"
              element={
                <ProtectedRoute>
                  <SideViewAdmin />
                  <ViewCourse />
                </ProtectedRoute>
              }
            />
          </Routes>
        </DataContextProvider>
      </UserAuthContextProvider>
    </Router>
  );
}

export default App;
