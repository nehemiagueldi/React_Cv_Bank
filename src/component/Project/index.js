import React, { useEffect, useState } from "react";
import { createMarkup, formatDate } from "../../service/CVBank";

const Project = ({ projectData }) => {
  let [projects, setProjects] = useState(null);
  useEffect(() => {
    if (projectData) {
      try {
        setProjects(projectData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [projectData]);
  return (
    <>
      <div>
        <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
          Projects
        </h5>
        <div className="container">
          {projects &&
            projects.map((project) => (
              <div key={project.id}>
                <div className="d-flex">
                  <h4 className="fw-bold">{project.company}&nbsp;-&nbsp;</h4>
                  <h4 className="fw-bold">{project.name}</h4>
                </div>
                <div className="d-flex">
                  <h6 className="fw-bold">{formatDate(project.start_date)}&nbsp;-&nbsp;</h6>
                  <h6 className="fw-bold">{formatDate(project.end_date)}</h6>
                </div>
                <div dangerouslySetInnerHTML={createMarkup(project.description)}></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Project;
