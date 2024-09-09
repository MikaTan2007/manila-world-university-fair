import React, { useState } from "react";
import "./styling/signup.css";
import logo from "./images/StudentPortalIcon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7048/StudentAuth/getAllStudents"
      );
      console.log(response.data);
    } catch (err) {
      //setError(err);
    }
  };

  const getUserWithEmail = async () => {
    const formData = new FormData();

    formData.append("email", email);

    console.log(email);

    const url = localStorage.getItem("api") + `/StudentAuth/getWithEmail`;
    const url2 =
      localStorage.getItem("api") + `/StudentAuth/insertStudentEmail`;
    const url3 = localStorage.getItem("api") + `/StudentAuth/insertPassword`;

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
          console.log(response.data.students);
          if (response.data.students.length > 0) {
            setEmailError(true);
            setEmail("Student Email already exists!");
          } else {
            axios.post(url2, formData, {
              ...config, // Include other configuration options if needed
            });
            navigate("/student-sign-up3", { state: { email: email } });
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

    console.log(email);

    const url = localStorage.getItem("api") + `/getWithEmailUni`;
    const url2 = localStorage.getItem("api") + `/insertUniEmail`;

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
          console.log(response.data.students);
          if (response.data.universities.length > 0) {
            setEmailError(true);
            setEmail("University Email already exists!");
          } else {
            axios.post(url2, formData, {
              ...config, // Include other configuration options if needed
            });
            navigate("/university-sign-up3", { state: { email: email } });
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
                //className={`form-control ${emailError ? "error-field" : ""}`} // Conditionally apply error class
                value={email}
                onChange={handleEmailChange}
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
                Student Sign Up
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
                University Sign Up
              </a>
            </div>

            <p className="forgot-password text-center">
              Already have an account? Login <a href="/log-in">here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
