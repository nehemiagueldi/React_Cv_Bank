import React from "react";
import Select from "react-select";

const SkillsUser = ({ skillsList, toolsList, skillsDefault, setSkillsDefault, toolsDefault, setToolsDefault }) => {
  return (
    <>
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
    </>
  );
};

export default SkillsUser;
