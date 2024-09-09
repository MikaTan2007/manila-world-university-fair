import React, { useState } from "react";
import logo from "./images/StudentPortalIcon.png";
import "./styling/studentsignup2.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const StudentSignUp2 = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  //Variable Declaration

  const [gradYear, setGradYear] = useState("");

  const [citizenship, setCitizenship] = useState("");

  const [countries, setCountries] = useState("");

  const [majors, setMajors] = useState("");

  //Handlers

  const handleGradYearChange = (e) => {
    setGradYear(e.target.value);
  };

  const handleCitizenshipChange = (e) => {
    setCitizenship(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountries(e.target.value);
  };

  const handleMajorsChange = (e) => {
    setMajors(e.target.value);
  };

  //Nav Function
  const navigateToStudentHomePage = async () => {
    navigate("/student-home-page", { state: { email: email } });
  };

  //ASP.NET Communication Functions

  //Graduation Year
  const insertGradYear = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("gradYear", gradYear);

    const url = localStorage.getItem("api") + `/StudentAuth/insertGradYear`;

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

  //Citizenship
  const insertCitizenship = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("citizenship", citizenship);

    const url = localStorage.getItem("api") + `/StudentAuth/insertCitizenship`;

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

  //Countries
  const insertCountries = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("countries", countries);

    const url = localStorage.getItem("api") + `/StudentAuth/insertCountries`;

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

  //Majors
  const insertMajors = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("majors", majors);

    const url = localStorage.getItem("api") + `/StudentAuth/insertMajors`;

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
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <label className="email-field">Graduation Year</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Options
                </label>
              </div>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                onChange={handleGradYearChange}
              >
                <option selected>Choose...</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="email-field">Citizenship</label>
              <input
                class="form-control"
                type="text"
                placeholder="Seperate different countries with ','"
                onChange={handleCitizenshipChange}
              />
            </div>

            <div className="mb-3">
              <label className="email-field">Countrie(s) Interested In</label>
              <input
                class="form-control"
                type="text"
                placeholder="Seperate different countries with ','"
                onChange={handleCountryChange}
              />
            </div>

            <div className="mb-3">
              <label className="email-field">Major(s) Interested In</label>
              <input
                class="form-control"
                type="text"
                placeholder="Seperate different majors with ','"
                onChange={handleMajorsChange}
              />
            </div>

            <div className="d-grid login-button">
              <a
                onClick={() => {
                  insertGradYear();
                  insertCitizenship();
                  insertCountries();
                  insertMajors();
                  navigateToStudentHomePage();
                }}
                className="btn btn-outline-primary"
                role="button"
              >
                Create Account
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

export default StudentSignUp2;
