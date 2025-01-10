import React, { useEffect, useState } from "react";
import { createMarkup, formatDate, getProjectData } from "../../service/CVBank";

const Project = () => {
  let [responseData, setResponseData] = useState(null);
  useEffect(() => {
    let getProjectDatas = async () => {
      try {
        let result = await getProjectData();
        setResponseData(result);
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
          {responseData &&
            responseData.map((project) => (
              <div key={project.id}>
                <div className="d-flex">
                  <h2 className="fw-bold">{project.company}&nbsp;-&nbsp;</h2>
                  <h2 className="fw-bold">{project.name}</h2>
                </div>
                <div className="d-flex">
                  <h4 className="fw-bold">{formatDate(project.start_date)}&nbsp;-&nbsp;</h4>
                  <h4 className="fw-bold">{formatDate(project.end_date)}</h4>
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
