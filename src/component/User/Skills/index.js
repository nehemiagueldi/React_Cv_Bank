import React from "react";
import Select from "react-select";
import "./index.css"; 

const SkillsUser = ({ skillsList, toolsList, skillsDefault, setSkillsDefault, toolsDefault, setToolsDefault }) => {
  return (
    <>
      <button className="btn btn-custom fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExampleSkills" aria-expanded="false" aria-controls="collapseExampleSkills">
        Skills
      </button>
      <div className="collapse" id="collapseExampleSkills">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputSkill" className="form-label">
              Skill
            </label>
            <Select
              value={skillsDefault || []}
              isMulti
              name="Skills"
              options={skillsList}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) => {
                setSkillsDefault(selectedOptions);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputTools" className="form-label">
              Tools
            </label>
            <Select
              value={toolsDefault || []}
              isMulti
              name="Tools"
              options={toolsList}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) => {
                setToolsDefault(selectedOptions);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsUser;
