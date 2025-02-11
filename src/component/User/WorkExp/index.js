import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaRegTrashAlt } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import "./index.css";

const WorkExpUser = ({ workExp, setWorkExp }) => {
  const [show, setShow] = useState(false);

  const [activeId, setActiveId] = useState(null);

  const handleShowId = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const handleShow = () => {
    setShow(!show);
  };

  let handleInputChange = (id, field, value) => {
    setWorkExp((prevWorkExp) =>
      prevWorkExp.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  let handleAddWorkExperience = () => {
    let newItem = {
      id: new Date().getTime(),
      name: "New Work Experience",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
    };
    setWorkExp((prevWorkExp) => {
      return Array.isArray(prevWorkExp) ? [...prevWorkExp, newItem] : [newItem];
    });
  };

  let handleDeleteWorkExperience = (id) => {
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
        setWorkExp((prevWorkExp) => prevWorkExp.filter((exp) => exp.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your work experience has been deleted.",
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
        <span>WORK EXPERIENCE</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="workExp" className="form-label mb-0">
                  Work Experiences
                </label>
              </div>
              {workExp &&
                workExp.map((exp) => (
                  <Card
                    className={`px-0 ${
                      activeId === exp.id
                        ? "bg-white shadow"
                        : "bg-transparent border-0"
                    }`}
                    key={exp.id}
                  >
                    <div>
                      <div className="d-flex justify-content-between gap-2">
                        <button
                          className="btn btn-primary btn-child flex-grow-1"
                          type="button"
                          onClick={() => handleShowId(exp.id)}
                        >
                          <span>{exp.name}</span>
                          {activeId === exp.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                        {activeId !== exp.id && (
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDeleteWorkExperience(exp.id)}
                          >
                            <FaRegTrashAlt className="fs-4" />
                          </button>
                        )}
                      </div>
                      {activeId === exp.id && (
                        <Card className="m-3 p-3">
                          <div className="row my-2 g-2">
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputWorkExpName4${exp.id}`}
                                className="form-label"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputWorkExpName4${exp.id}`}
                                value={exp.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    exp.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputCompanyName4${exp.id}`}
                                className="form-label"
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputCompanyName4${exp.id}`}
                                value={exp.company}
                                onChange={(e) =>
                                  handleInputChange(
                                    exp.id,
                                    "company",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputStartDate4${exp.id}`}
                                className="form-label"
                              >
                                Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputStartDate4${exp.id}`}
                                value={exp.start_date}
                                onChange={(e) =>
                                  handleInputChange(
                                    exp.id,
                                    "start_date",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputEndDate4${exp.id}`}
                                className="form-label"
                              >
                                End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputEndDate4${exp.id}`}
                                value={exp.end_date}
                                onChange={(e) =>
                                  handleInputChange(
                                    exp.id,
                                    "end_date",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor={`inputDescription4${exp.id}`}
                                className="form-label"
                              >
                                Description
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={exp.description}
                                onChange={(value) =>
                                  handleInputChange(
                                    exp.id,
                                    "description",
                                    value
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
                  onClick={handleAddWorkExperience}
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

export default WorkExpUser;
