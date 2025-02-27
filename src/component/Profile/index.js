import React, { useEffect, useState } from "react";
import { createMarkup, calculateAge } from "../../service/CVBank";

const Profile = ({ profileData }) => {
  let [namePerson, setNamePerson] = useState(null);
  let [genderPerson, setGenderPerson] = useState(null);
  let [birthDatePerson, setBirthDatePerson] = useState(null);
  let [positionPerson, setPositionPerson] = useState(null);
  let [summaryPerson, setSummaryPerson] = useState(null);
  let [photoPerson, setPhotoPerson] = useState(null);
  useEffect(() => {
    if (profileData) {
      try {
        setNamePerson(profileData.person.name);
        setGenderPerson(profileData.person.gender);
        setBirthDatePerson(profileData.person.birthdate);
        setPositionPerson(profileData.position);
        setSummaryPerson(profileData.summary);
        setPhotoPerson(profileData.photo_profile);
      } catch (error) {
        console.log(error);
      }
    }
  }, [profileData]);
  return (
    <>
      <div>
        <h5
          className="text-white text-center rounded p-3 text-uppercase fw-bold"
          style={{ backgroundColor: "#0B2343" }}
        >
          PROFILE
        </h5>
        <div className="container row align-items-center">
          <div className="col">
            <h2>{namePerson}</h2>
            <h4>
              {genderPerson === "M" ? "Male" : "Female"},{" "}
              {calculateAge(birthDatePerson)} y/o
            </h4>
            <h4>{positionPerson}</h4>
          </div>
          <div
            style={{
              width: "250px",
              height: "250px",
            }}
          >
            <img
              src={
                photoPerson === null
                  ? "https://res.cloudinary.com/debojimrw/image/upload/v1736410512/default_go00tp.jpg"
                  : photoPerson
              }
              alt={namePerson}
              className="w-100 h-100 rounded"
              style={{ objectFit: "cover" }}
            />
          </div>
          <h4>Summary</h4>
          <p style={{ textAlign: "justify" }} dangerouslySetInnerHTML={createMarkup(summaryPerson)}></p>
        </div>
      </div>
    </>
  );
};

export default Profile;
