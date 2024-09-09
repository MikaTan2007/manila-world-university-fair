import React, { useState, useEffect } from "react";
import logo from "./images/StudentPortalIcon.png";
import "./styling/universityhomepage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import StudentList from "./StudentList";

const UniversityHomePage = () => {
  const location = useLocation();
  const email = location.state?.email;
  //const email = "tanm@ismanila.org";
  const [interestedStudent, setInterestedStudent] = useState("");

  const navigate = useNavigate();

  const navigateToLogin = async () => {
    navigate("/log-in");
  };

  const fetchInterest = async () => {
    const formData = new FormData();
    formData.append("email", email);
    const url = localStorage.getItem("api") + `/getWithEmailUni`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axios
        .post(url, formData, {
          ...config, // Include other configuration options if needed
        })
        .then((response) => {
          setInterestedStudent(response.data.universities[0].interest_students);
        })
        .catch(async (error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInterest();
  }, []);

  var interestedStu_array = interestedStudent.split(" ");
  console.log(interestedStu_array);

  for (let i = 0; i < interestedStu_array.length; i++) {
    console.log(interestedStu_array[i]);
  }

  const appendStuEmail = (stu_email) => {
    interestedStu_array.push(stu_email);
    setInterestedStudent(interestedStu_array.join(" "));
    console.log(interestedStu_array);
  };

  const insertStudents = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("interest_students", interestedStudent);

    const url = localStorage.getItem("api") + `/insertInterestedStudents`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axios.post(url, formData, {
        ...config, // Include other configuration options if needed
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="centered-image">
        <img className="logo" src={logo} alt="Student Portal Logo" />
      </div>
      <div>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <StudentList
                appendStuEmail={appendStuEmail}
                insertStudents={insertStudents}
                interestedStu_array={interestedStu_array}
              />
              <div className="d-grid login-button">
                <a
                  onClick={navigateToLogin}
                  className="btn btn-danger"
                  role="button"
                >
                  Logout
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="auth-wrapper">
        <div className="auth-inner">
          <form></form>
        </div>
      </div> */}
    </div>
  );
};

export default UniversityHomePage;
