import React, { useState, useEffect } from "react";
import logo from "./images/StudentPortalIcon.png";
import "./styling/studenthomepage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import UniCard from "./UniversityCard";
import UniList from "./UniList";

const StudentHomePage = () => {
  const location = useLocation();
  //const email = "tanm@ismanila.org";
  const email = location.state?.email;
  const [interestedUni, setInterestedUni] = useState("");

  const navigate = useNavigate();

  const navigateToLogin = async () => {
    navigate("/log-in");
  };

  const fetchInterest = async () => {
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
          const interest =
            response.data.students[0].interest_universities || "";
          setInterestedUni(interest);
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

  const appendUniEmail = (uni_email) => {
    const interestedUniArray = interestedUni ? interestedUni.split(" ") : [];
    interestedUniArray.push(uni_email);

    const updatedInterestedUnis = interestedUniArray.join(" ");

    console.log("Updated Interested Universities", updatedInterestedUnis);

    // Only update if the state is changed
    if (updatedInterestedUnis !== interestedUni) {
      insertUniversities(updatedInterestedUnis);
      setInterestedUni(updatedInterestedUnis);
    }
  };

  function checkInterest(uni_email) {
    var new_array = interestedUni.split(" ");
    if (new_array.includes(uni_email) == true) {
      return true;
    }
  }

  //Insert Uni Function
  const insertUniversities = async (updatedInterestedUnis) => {
    if (!updatedInterestedUnis) return;
    const formData = new FormData();

    formData.append("email", email);
    formData.append("interest_universities", updatedInterestedUnis);

    const url =
      localStorage.getItem("api") + `/StudentAuth/insertInterestedUniversities`;

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
            <UniList
              appendUniEmail={appendUniEmail}
              insertUniversities={insertUniversities}
              email={email}
              checkInterest={checkInterest}
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

      {/* <div className="auth-wrapper">
        <div className="auth-inner">
          <form></form>
        </div>
      </div> */}
    </div>
  );
};

export default StudentHomePage;
