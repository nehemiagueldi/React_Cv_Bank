import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const EducationUser = ({
  setSelectedFaculty,
  degreeList,
  facultyList,
  majorList,
  universityList,
  education,
  setEducation,
}) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowId = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const handleInputChange = (id, field, value) => {
    setEducation((prevEducation) =>
      prevEducation.map((edc) =>
        edc.id === id ? { ...edc, [field]: value } : edc
      )
    );
  };

  const handleFacultyChange = (id, facultyId) => {
    const selectedFaculty = facultyList.find(
      (fct) => fct.id === parseInt(facultyId, 10)
    );

    setEducation((prevEducation) =>
      prevEducation.map((edc) =>
        edc.id === id
          ? {
              ...edc,
              major: {
                ...edc.major,
                id: null,
                name: "",
                faculty: selectedFaculty || { id: null, name: "" },
              },
            }
          : edc
      )
    );

    setSelectedFaculty(selectedFaculty ? selectedFaculty.id : null);
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
        setEducation((prevEducation) =>
          prevEducation.filter((exp) => exp.id !== id)
        );
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
    <Card className="px-0 shadow">
      <button
        className="btn fw-bold btn-custom"
        type="button"
        onClick={handleShow}
      >
        <span>EDUCATIONS</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="educations" className="form-label mb-0">
                  Educations
                </label>
              </div>
              {education &&
                education.map((edc) => (
                  <Card
                    className={`px-0 ${
                      activeId === edc.id
                        ? "bg-white shadow"
                        : "bg-transparent border-0"
                    }`}
                    key={edc.id}
                  >
                    <div>
                      <div className="d-flex justify-content-between gap-2">
                        <button
                          className="btn btn-primary btn-child flex-grow-1"
                          type="button"
                          onClick={() => handleShowId(edc.id)}
                        >
                          <span>{edc.university.name}</span>
                          {activeId !== edc.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                        {activeId !== edc.id && (
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDeleteEducation(edc.id)}
                          >
                            <FaTrashAlt className="fs-4" />
                          </button>
                        )}
                      </div>
                      {activeId === edc.id && (
                        <Card className="m-3 p-3 shadow-sm">
                          <div className="row my-2 g-2">
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputDegreeName4${edc.id}`}
                                className="form-label"
                              >
                                Degree
                              </label>
                              <select
                                className="form-select"
                                value={edc.degree.id || ""}
                                id={`inputDegreeName4${edc.id}`}
                                aria-label="Select Degree"
                                onChange={(e) => {
                                  const selectedDegree = degreeList.find(
                                    (dgr) =>
                                      dgr.id === parseInt(e.target.value, 10)
                                  );
                                  handleInputChange(
                                    edc.id,
                                    "degree",
                                    selectedDegree || { id: null, name: "" }
                                  );
                                }}
                              >
                                <option disabled value="">Choose...</option>
                                {degreeList &&
                                  degreeList.map((dgr) => (
                                    <option key={dgr.id} value={dgr.id}>
                                      {dgr.name === edc.degree.name
                                        ? edc.degree.name
                                        : dgr.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            
                            <div className="col-md-4">
                              <label
                                htmlFor={`inputUniversityName4${edc.id}`}
                                className="form-label"
                              >
                                University
                              </label>
                              <select
                                className="form-control"
                                value={edc.university.id || ""}
                                id={`inputUniversityName4${edc.id}`}
                                onChange={(e) => {
                                  const selectedUniversity =
                                    universityList.find(
                                      (unv) =>
                                        unv.id === parseInt(e.target.value, 10)
                                    );
                                  handleInputChange(
                                    edc.id,
                                    "university",
                                    selectedUniversity || { id: null, name: "" }
                                  );
                                }}
                              >
                                <option disabled value="">
                                  Choose...
                                </option>
                                {universityList &&
                                  universityList.map((unv) => (
                                    <option key={unv.id} value={unv.id}>
                                      {unv.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label
                                htmlFor={`inputGPA4${edc.id}`}
                                className="form-label"
                              >
                                GPA
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputGPA4${edc.id}`}
                                value={edc.gpa}
                                onChange={(e) =>
                                  handleInputChange(
                                    edc.id,
                                    "gpa",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputFaculty4${edc.id}`}
                                className="form-label"
                              >
                                Faculty
                              </label>
                              <select
                                className="form-select"
                                value={edc.major.faculty.id || ""}
                                id={`inputFaculty4${edc.id}`}
                                aria-label="Select Faculty"
                                onChange={(e) =>
                                  handleFacultyChange(edc.id, e.target.value)
                                }
                              >
                                <option disabled value="">
                                  Choose...
                                </option>
                                {facultyList &&
                                  facultyList.map((fct) => (
                                    <option key={fct.id} value={fct.id}>
                                      {fct.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputMajor4${edc.id}`}
                                className="form-label"
                              >
                                Major
                              </label>
                              <select
                                className="form-select"
                                value={edc.major.id || ""}
                                id={`inputMajor4${edc.id}`}
                                aria-label="Select Major"
                                onChange={(e) => {
                                  const selectedMajor = majorList.find(
                                    (mjr) =>
                                      mjr.id === parseInt(e.target.value, 10)
                                  );
                                  handleInputChange(
                                    edc.id,
                                    "major",
                                    selectedMajor || { id: null, name: "" }
                                  );
                                }}
                                disabled={!edc.major.faculty.id}
                              >
                                <option disabled value="">
                                  Choose...
                                </option>
                                {majorList &&
                                  majorList.map((mjr) => (
                                    <option key={mjr.id} value={mjr.id}>
                                      {mjr.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputStartDate4${edc.id}`}
                                className="form-label"
                              >
                                Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputStartDate4${edc.id}`}
                                value={edc.startDate}
                                onChange={(e) =>
                                  handleInputChange(
                                    edc.id,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputEndDate4${edc.id}`}
                                className="form-label"
                              >
                                End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputEndDate4${edc.id}`}
                                value={edc.endDate}
                                onChange={(e) =>
                                  handleInputChange(
                                    edc.id,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  </Card>
                ))}
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-success d-flex align-items-center justify-content-center gap-2"
                  onClick={handleAddEducation}
                >
                  <span>Add</span> <CiCirclePlus className="fs-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default EducationUser;
