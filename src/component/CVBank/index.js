import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Project from "../Project";
import Training from "../Training";
import Skills from "../Skills";
import Profile from "../Profile";
import Education from "../Education";
import WorkExp from "../WorkExp";
import { getCVPersonData } from "../../service/CVBank";
import { useParams } from "react-router";

const CVBank = () => {
  let [profileData, setProfileData] = useState(null);
  let [skillsData, setSkillsData] = useState(null);
  let [toolsData, setToolsData] = useState(null);
  let [workExpData, setWorkExpData] = useState(null);
  let [projectData, setProjectData] = useState(null);
  let [trainingData, setTrainingData] = useState(null);
  let [educationData, setEducationData] = useState(null);
  let { randomString } = useParams();
  useEffect(() => {
    let getCVPerson = async () => {
      let result = await getCVPersonData(randomString);
      setProfileData(result.cvPerson);
      setSkillsData(result.cvSkills);
      setToolsData(result.cvTools);
      setWorkExpData(result.workExps);
      setProjectData(result.projects);
      setTrainingData(result.trainings);
      setEducationData(result.educations);
      console.log(result);
    };
    getCVPerson();
  }, [randomString]);
  return (
    <>
      <div
        className="d-flex flex-column"
        style={{
          backgroundImage: "url(https://res.cloudinary.com/dpuqafk1w/image/upload/v1735032859/Mas_Naufal_CV_wdtxhm.jpg)",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
          backgroundRepeat: "repeat",
        }}>
        <div className="container">
          <div className="text-end py-2">
            <img src="https://res.cloudinary.com/dpuqafk1w/image/upload/v1735014395/8ASEV77SME3B6QXCXK6XALAX5R7SK5CWSB6NHPEF-609b611e_bd48vi.png" alt="" style={{ width: "25%" }} />
          </div>
          <div className="bg-white bg-opacity-75 p-3">
            {/* Profile */}
            <Profile profileData={profileData} />
            {/* Skills */}
            <Skills skillsData={skillsData} toolsData={toolsData} />
            {/* Profesional Experiences */}
            <WorkExp workExpData={workExpData} />
            {/* Projects */}
            <Project projectData={projectData} />
            {/* Training */}
            <Training trainingData={trainingData} />
            {/* Education */}
            <Education educationData={educationData} />
            <hr />
            <div>&copy; {new Date().getFullYear()} PT Bumi Amartha Teknologi Mandiri - All Rights Reserved</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CVBank;
