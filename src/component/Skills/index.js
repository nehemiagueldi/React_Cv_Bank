import React, { useEffect, useState } from "react";
import { getCVPersonData } from "../../service/CVBank";

const Skills = () => {
  let [skillData, setSkillData] = useState(null);
  let [toolData, setToolData] = useState(null);
  useEffect(() => {
    let getCVPerson = async () => {
      try {
        let resultSkillTool = await getCVPersonData(1);
        setSkillData(resultSkillTool.cvSkills);
        setToolData(resultSkillTool.cvTools)
      } catch (error) {
        console.log(error);
      }
    };
    getCVPerson();
  }, []);
  return (
    <>
      <div>
        <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
          Skills
        </h5>
        <div className="container">
          <div className="row">
            <div className="col">
              <h5 className="text-uppercase fw-bold">Skills</h5>
              {skillData &&
                skillData.map((skills) => (
                  <div key={skills.id}>
                    <ul className="mb-2">
                      <li>{skills.skill.name}</li>
                    </ul>
                  </div>
                ))}
            </div>
            <div className="col">
              <h5 className="text-uppercase fw-bold">Tools</h5>
              {toolData &&
                toolData.map((tools) => (
                  <div key={tools.id}>
                    <ul className="mb-2">
                      <li>{tools.tool.name}</li>
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
