import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { getCVPersonData, getSkillData, getToolData, postCVPersonData } from "../../service/CVBank";
import Select from "react-select";

const User = () => {
  let [name, setName] = useState(null);
  let [position, setPosition] = useState(null);
  let [summary, setSummary] = useState(null);
  let [skillsData, setSkillsData] = useState(null);
  let [toolsData, setToolsData] = useState(null);
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
        setSkillsData(skillList);
        setToolsData(toolList);
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
          <div className="col-md-6">
            <label htmlFor="inputName4" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="inputName4" value={name || ""} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPosition4" className="form-label">
              Position
            </label>
            <input type="text" className="form-control" id="inputPosition4" value={position || ""} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div className="col-12">
            <label htmlFor="inputSummary" className="form-label">
              Summary
            </label>
            <textarea className="form-control" id="inputSummary" value={summary || ""} onChange={(e) => setSummary(e.target.value)} style={{ height: "200px" }} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputSkill" className="form-label">
              Skill
            </label>
            <Select
              defaultValue={""}
              isMulti
              name="Skills"
              options={skillsData}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <select id="inputSkill" className="form-select" >
              <option selected>Choose...</option>
              {skillsData && skillsData.map((skill) => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputTools" className="form-label">
              Tools
            </label>
            <select id="inputTools" className="form-select">
              <option selected>Choose...</option>
              {toolsData && toolsData.map((tool) => (
                <option key={tool.id} value={tool.id}>{tool.name}</option>
              ))}
            </select>
          </div>
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
