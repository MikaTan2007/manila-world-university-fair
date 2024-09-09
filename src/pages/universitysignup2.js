import React, { useState } from "react";
import logo from "./images/StudentPortalIcon.png";
import "./styling/universitysignup2.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UniversitySignUp2 = () => {
  const location = useLocation();
  const email = location.state?.email;
  //Variable Declaration

  const [uni_description, setDescription] = useState("");

  //Handler Function

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  //Insertion Functions

  //Insert City
  const insertDescriptionUni = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("uni_description", uni_description);

    const url = localStorage.getItem("api") + `/insertDescriptionUni`;

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
            <div class="form-group">
              <label className="email-field">University Description</label>
              <textarea
                maxLength={600}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="12"
                placeholder="600 character limit"
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <div className="d-grid login-button">
              <a
                className="btn btn-outline-primary"
                role="button"
                onClick={insertDescriptionUni}
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

export default UniversitySignUp2;
