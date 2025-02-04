import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";

const ProjectUser = ({ projectsData }) => {
  const [project, setProject] = useState(projectsData);
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowId = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };
  useEffect(() => {
    if (projectsData) {
      setProject(projectsData);
    }
  }, [projectsData]);

  const handleInputChange = (id, field, value) => {
    setProject((prevProject) =>
      prevProject.map((prj) =>
        prj.id === id ? { ...prj, [field]: value } : prj
      )
    );
  };

  let handleAddProject = () => {
    let newItem = {
      id: new Date().getTime(),
      name: "New Project",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
    };
    setProject((prevProject) => [...prevProject, newItem]);
  };

  let handleDeleteProject = (id) => {
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
        setProject((prevProject) => prevProject.filter((exp) => exp.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your project has been deleted.",
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
        <span>PROJECTS</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="projects" className="form-label mb-0">
                  Projects
                </label>
              </div>
              {project &&
                project.map((prj) => (
                  <Card
                    className={`px-0 ${
                      activeId !== null
                        ? "bg-white shadow"
                        : "bg-transparent border-0"
                    }`}
                    key={prj.id}
                  >
                    <div>
                      <div className="d-flex justify-content-between gap-2">
                        <button
                          className="btn btn-primary btn-child flex-grow-1"
                          type="button"
                          onClick={() => handleShowId(prj.id)}
                        >
                          <span>{prj.name}</span>
                          {activeId !== prj.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                        {activeId !== prj.id && (
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDeleteProject(prj.id)}
                          >
                            <FaTrashAlt className="fs-4" />
                          </button>
                        )}
                      </div>
                      {activeId === prj.id && (
                        <Card className="p-3 shadow">
                          <div
                            className="row my-2 g-2"
                            id={`collapseExample${prj.id}`}
                          >
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputProjectName4${prj.id}`}
                                className="form-label"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputProjectName4${prj.id}`}
                                value={prj.name}
                                onChange={(e) =>
                                  handleInputChange(
                                    prj.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputCompanyName4${prj.id}`}
                                className="form-label"
                              >
                                Company
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id={`inputCompanyName4${prj.id}`}
                                value={prj.company}
                                onChange={(e) =>
                                  handleInputChange(
                                    prj.id,
                                    "company",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputStartDate4${prj.id}`}
                                className="form-label"
                              >
                                Start Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputStartDate4${prj.id}`}
                                value={prj.start_date}
                                onChange={(e) =>
                                  handleInputChange(
                                    prj.id,
                                    "start_date",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor={`inputEndDate4${prj.id}`}
                                className="form-label"
                              >
                                End Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id={`inputEndDate4${prj.id}`}
                                value={prj.end_date}
                                onChange={(e) =>
                                  handleInputChange(
                                    prj.id,
                                    "end_date",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor={`inputDescription4${prj.id}`}
                                className="form-label"
                              >
                                Description
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={prj.description}
                                onChange={(value) =>
                                  handleInputChange(
                                    prj.id,
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
                  onClick={handleAddProject}
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

export default ProjectUser;
