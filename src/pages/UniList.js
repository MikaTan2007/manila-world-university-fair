import React, { useEffect, useState } from "react";
import axios from "axios";
import UniCard from "./UniversityCard";

const UniList = ({
  appendUniEmail,
  insertUniversities,
  email,
  fetchInterest2,
  appendStuEmail,
  insertStudents,
  checkInterest,
}) => {
  const [university, setUniversity] = useState([]);

  const fetchUnis = async () => {
    const url = localStorage.getItem("api") + `/getAllUnis`;
    try {
      const response = await axios.post(url);
      setUniversity(response.data.universities);

      //   response.data.universities.forEach((university, index) => {
      //     console.log(`University ${index + 1}:`);
      //     console.log(`Email: ${university.email}`);
      //     console.log(`Password: ${university.password}`);
      //     console.log(`Name: ${university.uni_name}`);
      //     console.log(`City: ${university.city}`);
      //     console.log(`Country: ${university.country}`);
      //     console.log(`Representative Name: ${university.rep_name}`);
      //     console.log(`Contact Email: ${university.contact_email}`);
      //     console.log(`Description: ${university.uni_description}`);
      //     console.log("--------------------------------");
      //   });
    } catch (err) {}
  };

  useEffect(() => {
    fetchUnis();
  }, []);

  return (
    <div className="university-list">
      {university.length > 0 ? (
        university.map((university, index) => (
          <UniCard
            key={index}
            university={university}
            appendUniEmail={appendUniEmail}
            insertUniversities={insertUniversities}
            email={email}
            checkInterest={checkInterest}
          />
        ))
      ) : (
        <p>No universities found</p>
      )}
    </div>
  );
};

export default UniList;
