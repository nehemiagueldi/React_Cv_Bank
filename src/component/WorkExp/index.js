import React, { useEffect, useState } from "react";
import { createMarkup, formatDate } from "../../service/CVBank";

const WorkExp = ({ workExpData }) => {
  const [workExps, setWorkExps] = useState(null);
  useEffect(() => {
    if (workExpData) {
      try {
        setWorkExps(workExpData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [workExpData]);
  return (
    <div>
      <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
        Profesional Experiences
      </h5>
      <div className="container">
        {workExps &&
          workExps.map((work) => (
            <div key={work.id}>
              <div>
                <h4 className="fw-bold">{work.company}</h4>
              </div>
              <div className="d-flex">
                <h6 className="fw-bold">
                  {formatDate(work.start_date)}
                  &nbsp;-&nbsp;
                  {work.end_date ? formatDate(work.end_date) : "Present"}&nbsp;
                </h6>
                <h6 className="fw-bold">(as {work.name})</h6>
              </div>
              <div dangerouslySetInnerHTML={createMarkup(work.description)}></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkExp;
