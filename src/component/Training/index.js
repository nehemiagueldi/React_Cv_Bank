import React, { useEffect, useState } from "react";
import { createMarkup, formatDate, getTrainingData } from "../../service/CVBank";

const Training = () => {
  let [responseData, setResponseData] = useState(null);
  useEffect(() => {
    let getTrainingDatas = async () => {
      try {
        let result = await getTrainingData();
        setResponseData(result);
      } catch (error) {
        console.log(error);
      }
    };
    getTrainingDatas();
  }, []);
  return (
    <>
      <div>
        <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
          Training
        </h5>
        <div className="container">
          {responseData &&
            responseData.map((training) => (
              <div key={training.id}>
                <div className="d-flex">
                  <h2 className="fw-bold">{training.company}&nbsp;-&nbsp;</h2>
                  <h2 className="fw-bold">{training.name}</h2>
                </div>
                <div className="d-flex">
                  <h4 className="fw-bold">{formatDate(training.start_date)}&nbsp;-&nbsp;</h4>
                  <h4 className="fw-bold">{formatDate(training.end_date)}</h4>
                </div>
                <div dangerouslySetInnerHTML={createMarkup(training.description)}></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Training;
