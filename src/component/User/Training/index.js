import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";

const TrainingUser = ({ trainingData }) => {
  const [training, setTraining] = useState(trainingData);
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowId = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    if (trainingData) {
      setTraining(trainingData);
    }
  }, [trainingData]);

  const handleInputChange = (id, field, value) => {
    setTraining((prevTraining) =>
      prevTraining.map((trn) =>
        trn.id === id ? { ...trn, [field]: value } : trn
      )
    );
  };

  let handleAddTraining = () => {
    let newItem = {
      id: new Date().getTime(),
      name: "New Training",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
    };
    setTraining((prevTraining) => [...prevTraining, newItem]);
  };

  let handleDeleteTraining = (id) => {
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
        setTraining((prevTraining) =>
          prevTraining.filter((exp) => exp.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your training has been deleted.",
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
        <span>TRAININGS</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="trainings" className="form-label mb-0">
                  Trainings
                </label>
              </div>
              {training &&
                training.map((trn) => (
                  <Card
                    className={`px-0 ${
                      activeId === trn.id
                        ? "bg-white shadow"
                        : "bg-transparent border-0"
                    }`}
                    key={trn.id}
                  >
                    <div>
                      <div className="d-flex justify-content-between gap-2">
                        <button
                          className="btn btn-primary btn-child flex-grow-1"
                          type="button"
                          onClick={() => handleShowId(trn.id)}
                        >
                          <span>{trn.name}</span>
                          {activeId === trn.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                        {activeId !== trn.id && (
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDeleteTraining(trn.id)}
                          >
                            <FaTrashAlt className="fs-4" />
                          </button>
                        )}
                      </div>
                      {activeId === trn.id && (
                        <Card className="m-3 p-3 shadow-sm">
                          <div className="row my-2 g-2">
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputTrainingName4${trn.id}`}
                                className="form-label"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputTrainingName4${trn.id}`}
                                value={trn.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    trn.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputCompanyName4${trn.id}`}
                                className="form-label"
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputCompanyName4${trn.id}`}
                                value={trn.company}
                                onChange={(e) =>
                                  handleInputChange(
                                    trn.id,
                                    "company",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputStartDate4${trn.id}`}
                                className="form-label"
                              >
                                Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputStartDate4${trn.id}`}
                                value={trn.start_date}
                                onChange={(e) =>
                                  handleInputChange(
                                    trn.id,
                                    "start_date",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputEndDate4${trn.id}`}
                                className="form-label"
                              >
                                End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputEndDate4${trn.id}`}
                                value={trn.end_date}
                                onChange={(e) =>
                                  handleInputChange(
                                    trn.id,
                                    "end_date",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor={`inputDescription4${trn.id}`}
                                className="form-label"
                              >
                                Description
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={trn.description}
                                onChange={(value) =>
                                  handleInputChange(
                                    trn.id,
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
                  onClick={handleAddTraining}
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

export default TrainingUser;
