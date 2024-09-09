import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

const UniCard = ({
  university,
  appendUniEmail,
  insertUniversities,
  email,
  checkInterest,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [interestedStudents, setInterestedStudents] = useState("");

  const fetchInterest = async () => {
    const formData = new FormData();
    formData.append("email", university.email);
    const url = localStorage.getItem("api") + `/getWithEmailUni`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      setInterestedStudents(
        response.data.universities[0].interest_students || ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInterest();
    if (checkInterest(university.email) == true) {
      setIsRegistered(true);
    }
    // const registeredUnis =
    //   JSON.parse(localStorage.getItem("registeredUnis")) || [];
    // if (registeredUnis.includes(university.email)) {
    //   setIsRegistered(true); // Set the card color to green if already registered
    // }
  }, [university.email]);

  const appendStuEmail = (stu_email) => {
    const interestedStuArray = interestedStudents
      ? interestedStudents.split(" ")
      : [];
    interestedStuArray.push(stu_email);

    // Update the interested students list
    const updatedInterestedStudents = interestedStuArray.join(" ");

    console.log("Updated Interested Students:", updatedInterestedStudents);

    // Directly call insertStudents with the updated value
    insertStudents(updatedInterestedStudents);

    // Also update the state for future use
    setInterestedStudents(updatedInterestedStudents);
  };

  const insertStudents = async (updatedInterestedStudents) => {
    const formData = new FormData();
    formData.append("email", university.email);
    formData.append("interest_students", updatedInterestedStudents);

    const url = localStorage.getItem("api") + `/insertInterestedStudents`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axios.post(url, formData, config);
    } catch (error) {
      console.log("Axios error:", error);
    }
  };

  const handleRegisterClick = () => {
    setIsRegistered(true);

    // let registeredUnis =
    //   JSON.parse(localStorage.getItem("registeredUnis")) || [];
    // if (!registeredUnis.includes(university.email)) {
    //   registeredUnis.push(university.email);
    //   localStorage.setItem("registeredUnis", JSON.stringify(registeredUnis));
    // }
    setIsClicked(true);
    appendUniEmail(university.email); // Call appendUniEmail when the button is clicked
    insertUniversities();
    appendStuEmail(email);
  };

  const cardStyle = {
    backgroundColor: isRegistered ? "#90ee90" : "white", // light green if clicked, white if not
    cursor: "pointer",
  };

  return (
    <div className="uni-card">
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>
            {university.uni_name ? university.uni_name : "No Name Provided"}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {university.city ? university.city : "Not Specified"},{" "}
            {university.country ? university.country : "Not Specified"}
          </Card.Subtitle>
          <Card.Text>
            <strong>Representative Name: </strong>
            {university.rep_name ? university.rep_name : "No email provided"}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong>
            {university.contact_email
              ? university.contact_email
              : "Not Specified"}
          </Card.Text>
          <a
            className="btn btn-outline-success"
            role="button"
            onClick={handleRegisterClick}
          >
            {isRegistered ? "Registered" : "Register"}
          </a>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UniCard;
