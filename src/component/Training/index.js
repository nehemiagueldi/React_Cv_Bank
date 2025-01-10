import React, { useEffect, useState } from "react";
import { createMarkup, getCVPersonData } from "../../service/CVBank";

const Training = () => {
  let [trainingData, setTrainingData] = useState(null);
  useEffect(() => {
    let getTrainingDatas = async () => {
      try {
        let resultTraining = await getCVPersonData(1);
        setTrainingData(resultTraining.trainings);
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
          {trainingData &&
            trainingData.map((training) => (
              <div key={training.id}>
                <div className="d-flex">
                  <h4 className="fw-bold">{training.name}&nbsp;at&nbsp;</h4>
                  <h4 className="fw-bold">{training.company}</h4>
                </div>
                {/* <div className="d-flex">
                  <h5 className="fw-bold">{formatDate(training.start_date)}&nbsp;-&nbsp;</h5>
                  <h5 className="fw-bold">{formatDate(training.end_date)}</h5>
                </div> */}
                <div dangerouslySetInnerHTML={createMarkup(training.description)}></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Training;
