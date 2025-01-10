import React, { useEffect, useState } from "react";

const Skills = ({ skillsData, toolsData }) => {
  let [skills, setSkills] = useState(null);
  let [tools, setTools] = useState(null);
  useEffect(() => {
    if (skillsData) {
      try {
        setSkills(skillsData);
        setTools(toolsData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [skillsData, toolsData]);
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
              {skills &&
                skills.map((skills) => (
                  <div key={skills.id}>
                    <ul className="mb-2">
                      <li>{skills.skill.name}</li>
                    </ul>
                  </div>
                ))}
            </div>
            <div className="col">
              <h5 className="text-uppercase fw-bold">Tools</h5>
              {tools &&
                tools.map((tools) => (
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
