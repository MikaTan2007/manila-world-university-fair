import React, { useState } from "react";
import "./styling/signup.css";
import logo from "./images/StudentPortalIcon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const getUserWithEmail = async () => {
    const formData = new FormData();

    formData.append("email", email);

    const url = localStorage.getItem("api") + `/StudentAuth/getWithEmail`;

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
          if (response.data.students.length > 0) {
            console.log(response.data.students);
            if (response.data.students[0].password == password) {
              navigate("/student-home-page", { state: { email: email } });
            } else {
              setPasswordError(true);
              setPassword("Password does not exist!");
            }
          } else {
            setEmailError(true);
            setEmail("Email does not exist!");
          }
        })
        .catch(async (error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWithEmailUni = async () => {
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
          if (response.data.universities.length > 0) {
            console.log(response.data.universities);
            if (response.data.universities[0].password == password) {
              navigate("/university-home-page", { state: { email: email } });
            } else {
              setPasswordError(true);
              setPassword("Password does not exist!");
            }
          } else {
            setEmailError(true);
            setEmail("Email does not exist!");
          }
        })
        .catch(async (error) => {
          console.log(error);
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
      <div className="text-center logo-text">
        <h1>
          <strong>Manila</strong>
        </h1>
        <h1>
          <strong>World</strong>
        </h1>
        <h1>
          <strong>University</strong>
        </h1>
        <h1>
          <strong>Fair</strong>
        </h1>
      </div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <div className="mb-3">
              <label className="email-field">E M A I L</label>
              <input
                type="email"
                className={`form-control ${emailError ? "error-field" : ""}`}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-3">
              <label className="password-field">P A S S W O R D</label>
              <input
                type="password"
                className={`form-control ${passwordError ? "error-field" : ""}`}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="d-grid login-button">
              <a
                //href="/student-sign-up"
                className="btn btn-outline-primary"
                onClick={() => {
                  //insertPasswordStudent();
                  getUserWithEmail();
                }}
                role="button"
              >
                Login as a Student
              </a>
            </div>

            <div className="d-grid login-button">
              <a
                //href="/university-sign-up"
                className="btn btn-outline-success"
                onClick={() => {
                  getUserWithEmailUni();
                }}
                role="button"
              >
                Login as a University
              </a>
            </div>

            <p className="forgot-password text-center">
              No account? Sign up <a href="/">here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
