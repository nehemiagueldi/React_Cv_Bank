import React, { useEffect, useState } from "react";
import { createMarkup, formatDate, getWorkExpDatas } from "../../service/CVBank";

const WorkExp = () => {
  const [workExp, setWorkExp] = useState([]);
  useEffect(() => {
    const getWorkExpData = async () => {
      try {
        let data = await getWorkExpDatas();
        setWorkExp(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWorkExpData();
  }, []);
  return (
    <div>
      <h5
        className="text-white text-center rounded p-3 text-uppercase fw-bold"
        style={{ backgroundColor: "#0B2343" }}
      >
        Profesional Experiences
      </h5>
      <div className="container">
        {workExp &&
          workExp.map((work) => (
            <div key={work.id}>
              <div>
                <h4>{work.company}</h4>
              </div>
              <div className="d-flex">
                <p className="fw-bold">
                  {formatDate(work.start_date)}
                  -&nbsp;
                  {work.end_date
                    ? formatDate(work.end_date)
                    : "Present"}&nbsp;
                </p>
                <p className="fw-bold">(as {work.name})</p>
              </div>
              <div
                dangerouslySetInnerHTML={createMarkup(work.description)}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkExp;
