import React, { useEffect, useState } from "react";
import { calculateAge, getCVPersonData } from "../../service/CVBank";

const Profile = () => {
  let [namePerson, setNamePerson] = useState(null);
  let [genderPerson, setGenderPerson] = useState(null);
  let [birthDatePerson, setBirthDatePerson] = useState(null);
  let [positionPerson, setPositionPerson] = useState(null);
  let [summaryPerson, setSummaryPerson] = useState(null);
  let [photoPerson, setPhotoPerson] = useState(null);
  useEffect(() => {
    let getCVPerson = async () => {
      try {
        let result = await getCVPersonData(1);
        setNamePerson(result.cvPerson.person.name);
        setGenderPerson(result.cvPerson.person.gender);
        setBirthDatePerson(result.cvPerson.person.birthdate);
        setPositionPerson(result.cvPerson.position);
        setSummaryPerson(result.cvPerson.summary);
        setPhotoPerson(result.cvPerson.photo_profile);
      } catch (error) {
        console.log(error);
      }
    };
    getCVPerson();
  }, []);
  return (
    <>
      <div>
        <h5
          className="text-white text-center rounded p-3 text-uppercase fw-bold"
          style={{ backgroundColor: "#0B2343" }}
        >
          Profile
        </h5>
        <div className="container row align-items-center">
          <div className="col">
            <h2>{namePerson}</h2>
            <h4>
              {genderPerson === "M" ? "Male" : "Female"}, {calculateAge(birthDatePerson)} y/o
            </h4>
            <h4>{positionPerson}</h4>
          </div>
          <div className="col text-end">
            <img
              src={photoPerson === null ? "https://res.cloudinary.com/debojimrw/image/upload/v1736410512/default_go00tp.jpg" : photoPerson}
              alt={photoPerson === null ? "Default profile picture" : "Profile picture User"}
              style={{
                width: "35%",
                height: "35%",
              }}
              className="rounded"
            />
          </div>
          <h4>Summary</h4>
          <p style={{ textAlign: "justify" }}>{summaryPerson}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
