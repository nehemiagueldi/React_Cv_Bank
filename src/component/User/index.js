import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getCVPersonData,
  getDegreeData,
  getFacultyData,
  getMajorDataByFaculty,
  getSkillData,
  getToolData,
  getUniversityData,
  postCVPersonData,
} from "../../service/CVBank";
import ProfileUser from "./Profile";
import SkillsUser from "./Skills";
import WorkExpUser from "./WorkExp";
import ProjectUser from "./Project";
import TrainingUser from "./Training";
import EducationUser from "./Education";

const User = () => {
  let [name, setName] = useState(null);
  let [position, setPosition] = useState(null);
  let [summary, setSummary] = useState(null);
  let [gender, setGender] = useState(null);
  let [birthDate, setBirthDate] = useState(null);
  let [photoProfile, setPhotoProfile] = useState(null);
  let [skillsList, setSkillsList] = useState(null);
  let [skillsDefault, setSkillsDefault] = useState(null);
  let [skillsSelected, setSkillsSelected] = useState(null);
  let [toolsList, setToolsList] = useState(null);
  let [toolsDefault, setToolsDefault] = useState(null);
  let [toolsSelected, setToolsSelected] = useState(null);
  let [workExp, setWorkExp] = useState(null);
  let [projects, setProjects] = useState(null);
  let [trainings, setTrainings] = useState(null);
  let [degreesList, setDegreesList] = useState(null);
  let [facultysList, setFacultysList] = useState(null);
  let [majorsList, setMajorsList] = useState(null);
  let [universityList, setUniversityList] = useState(null);
  let [educations, setEducations] = useState(null);
  let { randomString } = useParams();
  let [selectedFaculty, setSelectedFaculty] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    let getCVPerson = async () => {
      try {
        let result = await getCVPersonData(randomString);
        console.log(result);
        let skillList = await getSkillData();
        let toolList = await getToolData();
        let degreeList = await getDegreeData();
        let facultyList = await getFacultyData();
        let universityList = await getUniversityData();
        setName(result.cvPerson.person.name);
        setPosition(result.cvPerson.position);
        setSummary(result.cvPerson.summary);
        setGender(result.cvPerson.person.gender);
        setBirthDate(result.cvPerson.person.birthdate);
        setPhotoProfile(result.cvPerson.photo_profile);
        let formattedSkills = skillList.map((skill) => ({
          // List Skills
          value: skill.id,
          label: skill.name,
        }));
        console.log("name : " + name)
        console.log("birthdate : " + birthDate)
        setSkillsList(formattedSkills);
        let defaultSkills = result.cvSkills.map((cvSkill) => ({
          // Default Skill's User
          value: cvSkill.skill.id,
          label: cvSkill.skill.name,
        }));
        setSkillsDefault(defaultSkills);
        let formattedTools = toolList.map((tool) => ({
          // List Tools
          value: tool.id,
          label: tool.name,
        }));
        setToolsList(formattedTools);
        let defaultTools = result.cvTools.map((cvTool) => ({
          // Default Tool's User
          value: cvTool.tool.id,
          label: cvTool.tool.name,
        }));
        // console.log("Tool : ", defaultTools);
        setToolsDefault(defaultTools);
        setWorkExp(result.workExps);
        setProjects(result.projects);
        setTrainings(result.trainings);
        setDegreesList(degreeList);
        setFacultysList(facultyList);
        // setMajorsList(majorList);
        setUniversityList(universityList);
        setEducations(result.educations);
        console.log(result);
        console.log(skillList);
        console.log(toolList);
      } catch (error) {
        console.log(error);
      }
    };
    getCVPerson();
  }, [randomString]);

  useEffect(() => {
    let getFacultyMajor = async () => {
      try {
        let majorList = await getMajorDataByFaculty(selectedFaculty);
        console.log("Selected Faculty: " + selectedFaculty);
        setMajorsList(majorList);
      } catch (error) {}
    };
    getFacultyMajor();
  }, [selectedFaculty]);

  useEffect(() => {
    let skills = Array.isArray(skillsDefault)
      ? skillsDefault.map((skill) => parseInt(skill.value, 10))
      : [];
    setSkillsSelected(skills);
    let tools = Array.isArray(toolsDefault)
      ? toolsDefault.map((tool) => parseInt(tool.value, 10))
      : [];
    setToolsSelected(tools);
    console.log("Data skill : " + JSON.stringify(skills, null, 2));
  }, [skillsDefault, toolsDefault]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name,
      position,
      summary,
      gender,
      birthDate,
      skillsSelected,
      toolsSelected,
      workExp,
      projects,
      trainings,
      educations,
    };
    console.log("Data Sent:", JSON.stringify(data, null, 2));
    try {
      await postCVPersonData(randomString, data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <form className="row g-3" onSubmit={handleSubmit}>
          <ProfileUser
            name={name}
            setName={setName}
            position={position}
            setPosition={setPosition}
            summary={summary}
            setSummary={setSummary}
            photoProfile={photoProfile}
            setPhotoProfile={setPhotoProfile}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            gender={gender}
            setGender={setGender}
          />
          <SkillsUser
            skillsList={skillsList}
            toolsList={toolsList}
            skillsDefault={skillsDefault}
            toolsDefault={toolsDefault}
            setSkillsDefault={setSkillsDefault}
            setToolsDefault={setToolsDefault}
          />
          <WorkExpUser workExp={workExp} setWorkExp={setWorkExp} />
          <ProjectUser project={projects} setProject={setProjects} />
          <TrainingUser training={trainings} setTraining={setTrainings} />
          <EducationUser
            setSelectedFaculty={setSelectedFaculty}
            degreeList={degreesList}
            facultyList={facultysList}
            majorList={majorsList}
            universityList={universityList}
            education={educations}
            setEducation={setEducations}
          />
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Update
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default User;
