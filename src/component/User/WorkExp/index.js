import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const WorkExpUser = ({ workExpData }) => {
  const [workExp, setWorkExp] = useState(workExpData);

  useEffect(() => {
    if (workExpData) {
      setWorkExp(workExpData);
    }
  }, [workExpData]);

  const handleInputChange = (id, field, value) => {
    setWorkExp((prevWorkExp) => prevWorkExp.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)));
  };

  return (
    <>
      <div className="col-12">
        <label htmlFor="workExp" className="form-label mb-0">
          Work Experiences
        </label>
      </div>
      {workExp &&
        workExp.map((exp) => (
          <div key={exp.id}>
            <div className="d-flex justify-content-between gap-2">
              <button className="btn btn-primary flex-grow-1" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${exp.id}`} aria-expanded="false" aria-controls={`collapseExample${exp.id}`}>
                {exp.name}
              </button>
              <button className="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${exp.id}`} aria-expanded="false" aria-controls={`collapseExample${exp.id}`}>
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <div className="row my-2 g-2 collapse" id={`collapseExample${exp.id}`}>
              <div className="col-md-6">
                <label htmlFor={`inputWorkExpName4${exp.id}`} className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id={`inputWorkExpName4${exp.id}`} value={exp.name} onChange={(e) => handleInputChange(exp.id, "name", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor={`inputCompanyName4${exp.id}`} className="form-label">
                  Company
                </label>
                <input type="text" className="form-control" id={`inputCompanyName4${exp.id}`} value={exp.company} onChange={(e) => handleInputChange(exp.id, "company", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor={`inputStartDate4${exp.id}`} className="form-label">
                  Start Date
                </label>
                <input type="date" className="form-control" id={`inputStartDate4${exp.id}`} value={exp.start_date} onChange={(e) => handleInputChange(exp.id, "start_date", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label htmlFor={`inputEndDate4${exp.id}`} className="form-label">
                  End Date
                </label>
                <input type="date" className="form-control" id={`inputEndDate4${exp.id}`} value={exp.end_date} onChange={(e) => handleInputChange(exp.id, "end_date", e.target.value)} />
              </div>
              <div className="col-12">
                <label htmlFor={`inputDescription4${exp.id}`} className="form-label">
                  Description
                </label>
                <ReactQuill theme="snow" value={exp.description} onChange={(value) => handleInputChange(exp.id, "description", value)} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default WorkExpUser;
