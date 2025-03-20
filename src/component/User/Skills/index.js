import React, { useState } from "react";
import Select from "react-select";
import "./index.css";
import { Card } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SkillsUser = ({
  skillsList,
  toolsList,
  skillsDefault,
  setSkillsDefault,
  toolsDefault,
  setToolsDefault,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Card className="px-0 shadow card-custom">
      <button
        className="btn btn-custom fw-bold"
        type="button"
        onClick={handleShow}
      >
        <span>SKILLS</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
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
        </Card>
      )}
    </Card>
  );
};

export default SkillsUser;
