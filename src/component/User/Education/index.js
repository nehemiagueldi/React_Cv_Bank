import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EducationUser = ({ degreeList, facultyList, majorList, educationData }) => {
  const [education, setEducation] = useState(educationData);

  useEffect(() => {
    if (educationData) {
      setEducation(educationData);
    }
  }, [educationData]);

  const handleInputChange = (id, field, value) => {
    setEducation((prevEducation) => prevEducation.map((edc) => (edc.id === id ? { ...edc, [field]: value } : edc)));
  };

  let handleAddEducation = () => {
    let newItem = {
      id: new Date().getTime(),
      university: {
        id: null,
        name: "New Education", 
      },
      degree: {
        id: null, 
        name: "", 
      },
      major: {
        id: null, 
        name: "",
        faculty: {
          id: null, 
          name: "",
        },
      },
      start_date: "", 
      end_date: "", 
      gpa: "",  
    };
    setEducation((prevEducation) => [...prevEducation, newItem]);
  };

  let handleDeleteEducation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEducation((prevEducation) => prevEducation.filter((exp) => exp.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your education has been deleted.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <button className="btn fw-bold btn-custom" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExampleEducations" aria-expanded="false" aria-controls="collapseExampleEducations">
        Educations
      </button>
      <div className="collapse" id="collapseExampleEducations">
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="educations" className="form-label mb-0">
              Educations
            </label>
          </div>
          {education &&
            education.map((edc) => (
              <div key={edc.id}>
                <div className="d-flex justify-content-between gap-2">
                  <button className="btn btn-primary w-100" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseEducationExample${edc.id}`} aria-expanded="false" aria-controls={`collapseEducationExample${edc.id}`}>
                    {edc.university.name}
                  </button>
                  <button className="btn btn-danger" type="button" onClick={() => handleDeleteEducation(edc.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
                <div className="row my-2 g-2 collapse" id={`collapseEducationExample${edc.id}`}>
                  <div className="col-md-6">
                    <label htmlFor={`inputDegreeName4${edc.id}`} className="form-label">
                      Degree
                    </label>
                    <select className="form-select" defaultValue={edc.degree.name} id={`inputDegreeName4${edc.id}`} aria-label="Select Degree">
                      <option disabled>Choose...</option>
                      {degreeList && degreeList.map((dgr) => (
                        <option key={dgr.id} value={dgr.id}>
                          {dgr.name === edc.degree.name ? edc.degree.name : dgr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`inputUniversityName4${edc.id}`} className="form-label">
                      University
                    </label>
                    <input type="text" className="form-control" id={`inputUniversityName4${edc.id}`} value={edc.university.name} onChange={(e) => handleInputChange(edc.id, "university.name", e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor={`inputGPA4${edc.id}`} className="form-label">
                      GPA
                    </label>
                    <input type="text" className="form-control" id={`inputGPA4${edc.id}`} value={edc.gpa} onChange={(e) => handleInputChange(edc.id, "gpa", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`inputFaculty4${edc.id}`} className="form-label">
                      Faculty
                    </label>
                    <select className="form-select" id={`inputFaculty4${edc.id}`} aria-label="Select Degree">
                      <option disabled>Choose...</option>
                      {facultyList && facultyList.map((fct) => (
                        <option key={fct.id} value={fct.id}>
                          {fct.name === edc.major.faculty.name ? edc.major.faculty.name : fct.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`inputMajor4${edc.id}`} className="form-label">
                      Major
                    </label>
                    <select className="form-select" id={`inputMajor4${edc.id}`} aria-label="Select Degree">
                      <option disabled>Choose...</option>
                      {majorList && majorList.map((mjr) => (
                        <option key={mjr.id} value={mjr.id}>
                          {mjr.name === edc.major.name ? edc.major.name : mjr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`inputStartDate4${edc.id}`} className="form-label">
                      Start Date
                    </label>
                    <input type="date" className="form-control" id={`inputStartDate4${edc.id}`} value={edc.startDate} onChange={(e) => handleInputChange(edc.id, "startDate", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`inputEndDate4${edc.id}`} className="form-label">
                      End Date
                    </label>
                    <input type="date" className="form-control" id={`inputEndDate4${edc.id}`} value={edc.endDate} onChange={(e) => handleInputChange(edc.id, "endDate", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          <div className="col-12">
            <button type="button" className="btn btn-success" onClick={handleAddEducation}>
              Add <i className="bi bi-plus-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationUser;
