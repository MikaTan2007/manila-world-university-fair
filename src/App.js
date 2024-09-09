import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login.js";
import SignUp from "./pages/signup.js";
import StudentSignUp from "./pages/studentsignup.js";
import StudentSignUp2 from "./pages/studentsignup2.js";
import "react-datepicker/dist/react-datepicker.css";
import UniversitySignUp from "./pages/universitysignup.js";
import UniversitySignUp2 from "./pages/universitysignup2.js";
//import UniversitySignUp3 from "./pages/universitysignup3.js";
import axios from "axios";
import StudentHomePage from "./pages/studenthomepage.js";
import UniversityHomePage from "./pages/universityhomepage.js";
import StudentSignUp3 from "./pages/studentsignup3.js";
import UniversitySignUp3 from "./pages/universitysignup3.js";

function App() {
  localStorage.setItem("api", "https://localhost:7048");
  useEffect(() => {
    // Function to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://localhost:7048/StudentAuth/getAllStudents"
        );
        //console.log(response.data);
      } catch (err) {
        //setError(err);
      }
    };

    fetchData();
  });

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route exact path="/log-in" element={<Login />} />
        <Route exact path="/student-sign-up" element={<StudentSignUp />} />
        <Route exact path="/student-sign-up2" element={<StudentSignUp2 />} />
        <Route
          exact
          path="/university-sign-up"
          element={<UniversitySignUp />}
        />
        <Route
          exact
          path="/university-sign-up2"
          element={<UniversitySignUp2 />}
        />
        <Route exact path="/student-home-page" element={<StudentHomePage />} />
        <Route
          exact
          path="/university-home-page"
          element={<UniversityHomePage />}
        />
        <Route exact path="/student-sign-up3" element={<StudentSignUp3 />} />
        <Route
          exact
          path="/university-sign-up3"
          element={<UniversitySignUp3 />}
        />
      </Routes>
    </Router>
  );
}

export default App;
