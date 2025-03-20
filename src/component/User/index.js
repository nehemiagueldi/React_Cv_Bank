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
import EducationUser from "./Education";
import Swal from "sweetalert2";
import CustomCardEdit from "./edit_components/customcardedit.js";

const User = () => {
  let [name, setName] = useState(null);
  let [position, setPosition] = useState(null);
  let [summary, setSummary] = useState(null);
  let [gender, setGender] = useState(null);
  let [birthdate, setBirthdate] = useState(null);
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
  let [file, setFile] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    let getCVPerson = async () => {
      try {
        let result = await getCVPersonData(randomString);
        result = result.cvPerson;
        console.log(result);
        let skillList = await getSkillData();
        let toolList = await getToolData();
        let degreeList = await getDegreeData();
        let facultyList = await getFacultyData();
        let universityList = await getUniversityData();
        setName(result.person.name);
        setPosition(result.position);
        setSummary(result.summary);
        setGender(result.person.gender);
        setBirthdate(result.person.birthdate);
        setPhotoProfile(result.photo_profile);
        let formattedSkills = skillList.map((skill) => ({
          // List Skills
          value: skill.id,
          label: skill.name,
        }));
        console.log("name : " + name);
        console.log("birthdate : " + birthdate);
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

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let uploadedUrl = photoProfile;
        if (file !== null) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "default_preset");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/djrz8tdii/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const dataUrl = await response.json();
          if (response.ok) {
            uploadedUrl = dataUrl.secure_url;
            console.log("Upload successful:", uploadedUrl);
          } else {
            console.error("Upload failed:", dataUrl.error.message);
          }
        }

        let data = {
          name,
          gender,
          birthdate,
          photoProfile: uploadedUrl,
          position,
          summary,
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

        Swal.fire({
          title: "Updated!",
          text: "Your data has been updated.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  let handleCancel = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
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
            birthDate={birthdate}
            setBirthDate={setBirthdate}
            gender={gender}
            setGender={setGender}
            setFile={setFile}
          />
          <SkillsUser
            skillsList={skillsList}
            toolsList={toolsList}
            skillsDefault={skillsDefault}
            toolsDefault={toolsDefault}
            setSkillsDefault={setSkillsDefault}
            setToolsDefault={setToolsDefault}
          />
         
          <CustomCardEdit
            listData={workExp}
            name="Work Experience"
            setData={setWorkExp}
          />
          <CustomCardEdit
            listData={projects}
            name="Projects"
            setData={setProjects}
          />
          <CustomCardEdit
            listData={trainings}
            name="Trainings"
            setData={setTrainings}
          />

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
                handleCancel(e);
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
