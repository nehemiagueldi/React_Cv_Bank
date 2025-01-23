import React, { useEffect, useState } from "react";
import { formatDateEdu } from "../../service/CVBank";

const Education = ({ educationData }) => {
  const [educations, setEducations] = useState(null);
  useEffect(() => {
    if (educationData) {
      try {
        setEducations(educationData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [educationData]);
  return (
    <div>
      <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
        Education
      </h5>
      <div className="container">
        {educations &&
          educations.map((education) => (
            <div key={education.id}>
              <div className="d-flex" style={{ color: "#67c5e5" }}>
                <h3>{education.university.name}&nbsp;</h3>
                <h3>
                  ({formatDateEdu(education.startDate)} -&nbsp;
                  {formatDateEdu(education.endDate)})
                </h3>
              </div>
              <div className="d-flex">
                <p>{education.degree.name}&nbsp;</p>
                <p>in {education.major.name}</p>
              </div>

              <div>
                <p>GPA : {education.gpa.toFixed(2)} / 4.00</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Education;
