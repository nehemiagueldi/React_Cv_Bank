import React, { useEffect, useState } from "react";
import { createMarkup } from "../../../service/CVBank";

const Training = ({ trainingData }) => {
  let [trainings, setTrainings] = useState(null);
  useEffect(() => {
    if (trainingData) {
      try {
        setTrainings(trainingData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [trainingData]);
  return (
    <>
      <div>
        <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
          Training
        </h5>
        <div className="container">
          {trainings &&
            trainings.map((training) => (
              <div key={training.id}>
                <div className="d-flex">
                  <h4 className="fw-bold">{training.name}&nbsp;at&nbsp;</h4>
                  <h4 className="fw-bold">{training.company}</h4>
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
