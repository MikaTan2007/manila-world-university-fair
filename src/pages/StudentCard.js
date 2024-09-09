import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const StudentCard = ({ student, appendStuEmail, insertStudents }) => {
  return (
    <div className="uni-card">
      <Card>
        <Card.Body>
          <Card.Title>
            {student.full_name ? student.full_name : "No Name Provided"}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {student.school ? student.school : "Not Specified"},{" "}
            {student.graduation_year
              ? student.graduation_year
              : "Not Specified"}
            , {student.email ? student.email : "Not Specified"}
          </Card.Subtitle>
          <Card.Text>
            <strong>Citizenship: </strong>
            {student.citizenship
              ? student.citizenship
              : "No Citizenship Provided"}
          </Card.Text>
          <Card.Text>
            <strong>Countries Interested:</strong>
            {student.interested_countries
              ? student.interested_countries
              : "Not Specified"}
          </Card.Text>
          <Card.Text>
            <strong>Majors Interested:</strong>
            {student.interested_majors
              ? student.interested_majors
              : "Not Specified"}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentCard;
