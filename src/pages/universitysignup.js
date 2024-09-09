import React, { useState } from "react";
import logo from "./images/StudentPortalIcon.png";
import "./styling/universitysignup.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UniversitySignUp = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  //Variable Declaration

  const [name, setName] = useState("");

  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");

  const [rep_name, setRepName] = useState("");

  const [contact_email, setUniEmail] = useState("");

  //Change Handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleRepNameChange = (e) => {
    setRepName(e.target.value);
  };

  const handleUniEmailChange = (e) => {
    setUniEmail(e.target.value);
  };

  //ASP.NET Communication Functions

  //Insert Name
  const insertUniName = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("name", name);

    const url = localStorage.getItem("api") + `/insertNameUni`;

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

  //Insert City
  const insertUniCity = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("city", city);

    const url = localStorage.getItem("api") + `/insertCityUni`;

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

  //Insert Country
  const insertUniCountry = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("country", country);

    const url = localStorage.getItem("api") + `/insertCountryUni`;

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

  //Insert Rep Name
  const insertUniRepName = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("rep_name", rep_name);

    const url = localStorage.getItem("api") + `/insertRepNameUni`;

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

  //Insert Contact Email
  const insertUniContactEmail = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("contact_email", contact_email);

    const url = localStorage.getItem("api") + `/insertContactEmailUni`;

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

  //Nav Function

  const navigateToUniPage2 = async () => {
    navigate("/university-home-page", { state: { email: email } });
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
              <label className="email-field">University Name</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-3">
              <label className="email-field">Location</label>
              <input
                class="form-control"
                type="text"
                placeholder="City"
                onChange={handleCityChange}
              />
              <input
                class="form-control"
                type="text"
                placeholder="Country"
                onChange={handleCountryChange}
              />
            </div>

            <div className="mb-3">
              <label className="email-field">Representative Name</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                onChange={handleRepNameChange}
              />
            </div>

            <div className="mb-3">
              <label className="email-field">University Contact Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleUniEmailChange}
              />
            </div>

            <div className="d-grid login-button">
              <a
                //href="/university-sign-up2"
                className="btn btn-outline-primary"
                role="button"
                onClick={() => {
                  insertUniName();
                  insertUniCity();
                  insertUniCountry();
                  insertUniRepName();
                  insertUniContactEmail();
                  navigateToUniPage2();
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

export default UniversitySignUp;
