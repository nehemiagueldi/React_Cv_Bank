import React, { useEffect, useState } from "react";
import { createMarkup, formatDate, getCVPersonData } from "../../service/CVBank";

const Project = () => {
  let [projectData, setProjectData] = useState(null);
  useEffect(() => {
    let getProjectDatas = async () => {
      try {
        let resultProject = await getCVPersonData(1);
        setProjectData(resultProject.projects);
      } catch (error) {
        console.log(error);
      }
    };
    getProjectDatas();
  }, []);
  return (
    <>
      <div>
        <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
          Projects
        </h5>
        <div className="container"> 
          {projectData &&
            projectData.map((project) => (
              <div key={project.id}>
                <div className="d-flex">
                  <h4 className="fw-bold">{project.company}&nbsp;-&nbsp;</h4>
                  <h4 className="fw-bold">{project.name}</h4>
                </div>
                <div className="d-flex">
                  <h5 className="fw-bold">{formatDate(project.start_date)}&nbsp;-&nbsp;</h5>
                  <h5 className="fw-bold">{formatDate(project.end_date)}</h5>
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
