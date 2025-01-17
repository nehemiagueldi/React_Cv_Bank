import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getCVPersonData, getSkillData, getToolData, postCVPersonData } from "../../service/CVBank";
import ProfileUser from "./Profile";
import SkillsUser from "./Skills";
import WorkExpUser from "./WorkExp";
import ProjectUser from "./Project";
import TrainingUser from "./Training";

const User = () => {
  let [name, setName] = useState(null);
  let [position, setPosition] = useState(null);
  let [summary, setSummary] = useState(null);
  let [skillsList, setSkillsList] = useState(null);
  let [skillsDefault, setSkillsDefault] = useState(null);
  let [toolsList, setToolsList] = useState(null);
  let [toolsDefault, setToolsDefault] = useState(null);
  let [workExp, setWorkExp] = useState(null);
  let [projects, setProjects] = useState(null);
  let [trainings, setTrainings] = useState(null);
  let [educations, setEducations] = useState(null);
  let { randomString } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    let getCVPerson = async () => {
      try {
        let result = await getCVPersonData(randomString);
        let skillList = await getSkillData();
        let toolList = await getToolData();
        setName(result.cvPerson.person.name);
        setPosition(result.cvPerson.position);
        setSummary(result.cvPerson.summary);
        let formattedSkills = skillList.map((skill) => ({
          // List Skills
          value: skill.id,
          label: skill.name,
        }));
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
        setToolsDefault(defaultTools);
        setWorkExp(result.workExps);
        setProjects(result.projects);
        setTrainings(result.trainings);
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

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name, position, summary };
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
          <ProfileUser name={name} setName={setName} position={position} setPosition={setPosition} summary={summary} setSummary={setSummary} />
          <SkillsUser skillsList={skillsList} toolsList={toolsList} skillsDefault={skillsDefault} toolsDefault={toolsDefault} setSkillsDefault={setSkillsDefault} setToolsDefault={setToolsDefault} />
          <WorkExpUser workExpData={workExp}/>
          <ProjectUser projectsData={projects} />
          <TrainingUser trainingData={trainings} />
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default User;
