import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import StudentCard from "./StudentCard";

const StudentList = ({
  appendStuEmail,
  insertStudents,
  interestedStu_array,
  email,
}) => {
  const [students, setStudents] = useState([]);

  var student_array = [];

  const fetchStudent = async (email) => {
    const formData = new FormData();
    formData.append("email", email);
    const url = localStorage.getItem("api") + `/StudentAuth/getWithEmail`;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      return response.data.students[0]; // Return the student data from the response
    } catch (error) {
      console.log(error);
      return null; // Return null in case of error
    }
  };

  const fetchAllStudents = async () => {
    try {
      const studentPromises = interestedStu_array.map((email) =>
        fetchStudent(email)
      );
      const fetchedStudents = await Promise.all(studentPromises); // Wait for all requests to complete
      setStudents(fetchedStudents.filter((student) => student !== null)); // Set the state, filtering out null values
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (interestedStu_array && interestedStu_array.length > 0) {
      fetchAllStudents();
    }
  }, [interestedStu_array]);

  for (let i = 0; i < interestedStu_array.length; i++) {
    fetchStudent(interestedStu_array[i]);
  }
  console.log(student_array);
  //   useEffect(() => {
  //     fetchStudent();
  //   }, []);

  return (
    <div className="student-list">
      {students.length > 0 ? (
        students.map((student, index) => (
          <StudentCard
            key={index}
            student={student}
            appendStuEmail={appendStuEmail}
            insertStudents={insertStudents}
            email={email}
          />
        ))
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default StudentList;
