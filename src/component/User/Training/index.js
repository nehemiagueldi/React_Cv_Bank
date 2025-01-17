import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TrainingUser = ({ trainingData }) => {
  const [training, setTraining] = useState(trainingData);

  useEffect(() => {
    if (trainingData) {
      setTraining(trainingData);
    }
  }, [trainingData]);

  const handleInputChange = (id, field, value) => {
    setTraining((prevTraining) => prevTraining.map((trn) => (trn.id === id ? { ...trn, [field]: value } : trn)));
  };
  return (
    <>
      <div className="col-12">
        <label htmlFor="trainings" className="form-label mb-0">
          Trainings
        </label>
      </div>
      {training &&
        training.map((trn) => (
          <div key={trn.id}>
            <button className="btn btn-primary w-100" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${trn.id}`} aria-expanded="false" aria-controls={`collapseExample${trn.id}`}>
              {trn.name}
            </button>
            <div className="row my-2 g-2 collapse" id={`collapseExample${trn.id}`}>
              <div className="col-md-6">
                <label htmlFor={`inputWorkExpName4${trn.id}`} className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id={`inputWorkExpName4${trn.id}`} value={trn.name} onChange={(e) => handleInputChange(trn.id, "name", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor={`inputCompanyName4${trn.id}`} className="form-label">
                  Company
                </label>
                <input type="text" className="form-control" id={`inputCompanyName4${trn.id}`} value={trn.company} onChange={(e) => handleInputChange(trn.id, "company", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor={`inputStartDate4${trn.id}`} className="form-label">
                  Start Date
                </label>
                <input type="date" className="form-control" id={`inputStartDate4${trn.id}`} value={trn.start_date} onChange={(e) => handleInputChange(trn.id, "start_date", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor={`inputEndDate4${trn.id}`} className="form-label">
                  End Date
                </label>
                <input type="date" className="form-control" id={`inputEndDate4${trn.id}`} value={trn.end_date} onChange={(e) => handleInputChange(trn.id, "end_date", e.target.value)} />
              </div>
              <div className="col-12">
                <label htmlFor={`inputDescription4${trn.id}`} className="form-label">
                  Description
                </label>
                <ReactQuill theme="snow" value={trn.description} onChange={(value) => handleInputChange(trn.id, "description", value)} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default TrainingUser;
