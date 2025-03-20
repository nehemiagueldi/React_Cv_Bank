import React, { useState } from "react";
import "./index.css";
import { Card } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CustomSelect from "../edit_components/customselect";
import SelectMultipleEdit from "../edit_components/selectmultipleedit";

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
              {/* SKILL */}
              <CustomSelect
                data={skillsDefault}
                list={skillsList}
                name="Skill"
                setData={setSkillsDefault}
                type="React-Multiple"
              />

              {/* TOOL */}
              <SelectMultipleEdit
                listValue={toolsList}
                name="Tool"
                setValue={setToolsDefault}
                value={toolsDefault}
              />
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default SkillsUser;
