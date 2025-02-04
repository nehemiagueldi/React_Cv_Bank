import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";

const ProjectUser = ({ projectsData }) => {
  const [project, setProject] = useState(projectsData);

  useEffect(() => {
    if (projectsData) {
      setProject(projectsData);
    }
  }, [projectsData]);

  const handleInputChange = (id, field, value) => {
    setProject((prevProject) => prevProject.map((prj) => (prj.id === id ? { ...prj, [field]: value } : prj)));
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
    <>
      <button className="btn fw-bold btn-custom" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExampleProjects" aria-expanded="false" aria-controls="collapseExampleProjects">
        Projects
      </button>
      <div className="collapse" id="collapseExampleProjects">
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="projects" className="form-label mb-0">
              Projects
            </label>
          </div>
          {project &&
            project.map((prj) => (
              <div key={prj.id}>
                <div className="d-flex justify-content-between gap-2">
                  <button className="btn btn-primary w-100" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${prj.id}`} aria-expanded="false" aria-controls={`collapseExample${prj.id}`}>
                    {prj.name}
                  </button>
                  <button className="btn btn-danger" type="button" onClick={() => handleDeleteProject(prj.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
                <div className="row my-2 g-2 collapse" id={`collapseExample${prj.id}`}>
                  <div className="col-md-6">
                    <label htmlFor={`inputProjectName4${prj.id}`} className="form-label">
                      Name
                    </label>
                    <input type="text" className="form-control" id={`inputProjectName4${prj.id}`} value={prj.name} onChange={(e) => handleInputChange(prj.id, "name", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`inputCompanyName4${prj.id}`} className="form-label">
                      Company
                    </label>
                    <input type="text" className="form-control" id={`inputCompanyName4${prj.id}`} value={prj.company} onChange={(e) => handleInputChange(prj.id, "company", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`inputStartDate4${prj.id}`} className="form-label">
                      Start Date
                    </label>
                    <input type="date" className="form-control" id={`inputStartDate4${prj.id}`} value={prj.start_date} onChange={(e) => handleInputChange(prj.id, "start_date", e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`inputEndDate4${prj.id}`} className="form-label">
                      End Date
                    </label>
                    <input type="date" className="form-control" id={`inputEndDate4${prj.id}`} value={prj.end_date} onChange={(e) => handleInputChange(prj.id, "end_date", e.target.value)} />
                  </div>
                  <div className="col-12">
                    <label htmlFor={`inputDescription4${prj.id}`} className="form-label">
                      Description
                    </label>
                    <ReactQuill theme="snow" value={prj.description} onChange={(value) => handleInputChange(prj.id, "description", value)} />
                  </div>
                </div>
              </div>
            ))}
          <div className="col-12">
            <button type="button" className="btn btn-success" onClick={handleAddProject}>
              Add <i className="bi bi-plus-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectUser;
