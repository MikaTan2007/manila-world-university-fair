import React, { useState } from "react";
import logo from "./images/StudentPortalIcon.png";
import "./styling/studentsignup.css";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UniversitySignUp3 = () => {
  //Variable Declaration
  const location = useLocation();
  const email = location.state?.email;

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function showPassword() {
    var x = document.getElementById("myPassword");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const insertPassword = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const url = localStorage.getItem("api") + `/insertPasswordUni`;

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

  const navigateToUniversityPage = async () => {
    navigate("/university-sign-up", { state: { email: email } });
  };

  return (
    <div className="App">
      <div className="centered-image">
        <img className="logo" src={logo} alt="Student Portal Logo" />
      </div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <div className="mb-3">
              <label className="email-field">P A S S W O R D</label>
              <input
                type="password"
                className="form-control"
                onChange={handlePasswordChange}
                id="myPassword"
              />
              <input
                type="checkbox"
                onClick={() => {
                  showPassword();
                }}
              />
              <label className="email-field">Show Password</label>
            </div>

            <div className="d-grid login-button">
              <a
                //href="/student-sign-up2"
                className="btn btn-outline-primary"
                role="button"
                onClick={() => {
                  insertPassword();
                  navigateToUniversityPage();
                }}
              >
                Proceed
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

export default UniversitySignUp3;
