import React, { useState } from "react";
import logo from "./images/StudentPortalIcon.png";
import "./styling/studentsignup.css";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentSignUp = () => {
  //Variable Declaration
  const location = useLocation();
  const email = location.state?.email;

  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [gender, setGender] = useState("");

  const [school, setSchool] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const navigateToStudentPage2 = async () => {
    navigate("/student-sign-up2", { state: { email: email } });
  };

  //console.log("Hello" + email);

  const insertStudentName = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("fullName", name);

    const url = localStorage.getItem("api") + `/StudentAuth/insertFullName`;

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

  const insertDateofBirth = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("birthday", startDate);

    const url = localStorage.getItem("api") + `/StudentAuth/insertBirthday`;

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

  const insertStudentGender = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("gender", gender);

    const url = localStorage.getItem("api") + `/StudentAuth/insertGender`;

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

  const insertStudentSchool = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("school", school);

    const url =
      localStorage.getItem("api") + `/StudentAuth/insertStudentSchool`;

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
            <div className="mb-3">
              <label className="email-field">Full Name</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-3">
              <label className="email-field">Date of Birth</label>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <label className="email-field">Gender</label>
            <div className="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Gender
                </label>
              </div>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                onChange={handleGenderChange}
              >
                <option selected>Choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="email-field">Current School</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                onChange={handleSchoolChange}
              />
            </div>

            <div className="d-grid login-button">
              <a
                //href="/student-sign-up2"
                className="btn btn-outline-primary"
                role="button"
                onClick={() => {
                  insertStudentName();
                  insertDateofBirth();
                  insertStudentGender();
                  insertStudentSchool();
                  navigateToStudentPage2();
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

export default StudentSignUp;
