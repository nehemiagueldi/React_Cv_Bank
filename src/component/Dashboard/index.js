import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { getSkillData, getMajorData } from "../../service/CVBank";
import $ from "jquery";

DataTable.use(DT);

const Dashboard = () => {
  const [filters, setFilters] = useState({
    gender: "",
    position: "",
    experience: "",
    skill: "",
    major: "",
    age: "",
  });
  const [skillData, setSkillData] = useState([]);
  const [majorData, setMajorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const skills = await getSkillData();
      const majors = await getMajorData();
      setSkillData(skills);
      setMajorData(majors);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const initDataTable = () => {
    $(".display").DataTable().clear().destroy();
    $(".display").DataTable({
      serverSide: true,
      processing: true,
      searching: true,
      ajax: {
        url: "http://localhost:8080/api/cv-person",
        type: "GET",
        data: function (d) {
          d.gender = filters.gender || "";
          d.experience = filters.experience || "";
          d.skill = filters.skill || "";
          d.major = filters.major || "";
          d.age = filters.age || "";
        },
        dataSrc: "data",
      },
      columns: [
        {
          title: "#",
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { title: "Name", data: "cvPerson.person.name" },
        { title: "Position", data: "cvPerson.position" },
        {
          title: "Gender",
          render: function (data, type, row) {
            return row.cvPerson.person.gender === "M"
              ? "Male"
              : row.cvPerson.person.gender === "F"
              ? "Female"
              : "Unknown";
          },
        },
        { title: "Age", data: "age" },
        {
          title: "Experience",
          render: function (data, type, row) {
            return row.totalExperience === 0
              ? "Less than 1 year"
              : row.totalExperience + " year";
          },
        },
        // { title: "Experience", data: "totalExperience" },
        {
          title: "Skill",
          data: "cvSkills",
          render: function (data) {
            if (Array.isArray(data)) {
              return data.map((cvSkill) => cvSkill.skill.name).join(", ");
            }
            return "";
          },
        },
        {
          title: "Major",
          data: "educations",
          render: function (data) {
            if (Array.isArray(data)) {
              return data.map((edu) => edu.major.name).join(", ");
            }
            return "";
          },
        },
        {
          title: "CV",
          data: null,
          render: (row) => `
            <div class="d-flex gap-2">
            <a class="btn btn-md btn-primary" href="/cv/${row.cvPerson.randomString}">View</a>
            <a class="btn btn-md btn-warning" href="/user/${row.cvPerson.randomString}">Edit</a>
            </div>
          `,
        },
      ],
    });
  };

  useEffect(() => {
    initDataTable();
  }, [filters]);

  return (
    <div className="container-fluid d-flex">
      <div className="filter-section me-4">
        <h3>Filters</h3>

        {/* Gender */}
        <div>
          <button
            className="btn fw-bold btn-custom1 d-flex justify-content-between align-items-center w-100 no-padding"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleGender"
            aria-expanded="false"
            aria-controls="collapseExampleGender"
          >
            <span>Gender</span>
            <i className="bi bi-chevron-down"></i>
          </button>

          <div className="collapse" id="collapseExampleGender">
            <div className="row g-3">
              <div className="col-12">
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value=""
                    onClick={handleFilterChange}
                  />{" "}
                  All
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onClick={handleFilterChange}
                  />{" "}
                  Male
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onClick={handleFilterChange}
                  />{" "}
                  Female
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <button
            className="btn fw-bold btn-custom1 d-flex justify-content-between align-items-center no-padding"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleExperience"
            aria-expanded="false"
            aria-controls="collapseExampleExperience"
          >
            <span>Experience</span>
            <i className="bi bi-chevron-down"></i>
          </button>

          <div className="collapse" id="collapseExampleExperience">
            <div className="row g-3">
              <div className="col-12">
                <div>
                  <input
                    type="radio"
                    name="experience"
                    value=""
                    onClick={handleFilterChange}
                  />{" "}
                  All
                </div>
                <div>
                  <input
                    type="radio"
                    name="experience"
                    value="4"
                    onClick={handleFilterChange}
                  />{" "}
                  Below 4 year
                </div>
                <div>
                  <input
                    type="radio"
                    name="experience"
                    value="0"
                    onClick={handleFilterChange}
                  />{" "}
                  Less than 1 year
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Age */}
        <div>
          <button
            className="btn fw-bold btn-custom1 d-flex justify-content-between align-items-center w-100 no-padding"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleAge"
            aria-expanded="false"
            aria-controls="collapseExampleAge"
          >
            <span>Age</span>
            <i className="bi bi-chevron-down"></i>
          </button>

          <div className="collapse" id="collapseExampleAge">
            <div className="row g-3">
              <div className="col-12">
                <div>
                  <input
                    type="radio"
                    name="age"
                    value=""
                    onClick={handleFilterChange}
                  />{" "}
                  All
                </div>
                <div>
                  <input
                    type="radio"
                    name="age"
                    value="25"
                    onClick={handleFilterChange}
                  />{" "}
                  25 - 20 Year
                </div>
                <div>
                  <input
                    type="radio"
                    name="age"
                    value="30"
                    onClick={handleFilterChange}
                  />{" "}
                  30 - 26 Year
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill */}
        <div>
          <button
            className="btn fw-bold btn-custom1 d-flex justify-content-between align-items-center w-100 no-padding"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleSkill"
            aria-expanded="false"
            aria-controls="collapseExampleSkill"
          >
            <span>Skill</span>
            <i className="bi bi-chevron-down"></i>
          </button>

          <div className="collapse" id="collapseExampleSkill">
            <div className="row g-3">
              <div className="col-12">
                {/* <label className="d-block">Skill</label> */}
                <input
                  type="radio"
                  name="skill"
                  value=""
                  onClick={handleFilterChange}
                />{" "}
                All
                {skillData &&
                  skillData.map((skill) => (
                    <div key={skill.id}>
                      <input
                        type="radio"
                        name="skill"
                        value={skill.name}
                        onClick={handleFilterChange}
                      />{" "}
                      {skill.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Major */}
        <div>
          <button
            className="btn fw-bold btn-custom1 d-flex justify-content-between align-items-center w-100 no-padding"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleMajor"
            aria-expanded="false"
            aria-controls="collapseExampleMajor"
          >
            <span>Major</span>
            <i className="bi bi-chevron-down"></i>
          </button>

          <div className="collapse" id="collapseExampleMajor">
            <div className="row g-3">
              <div className="col-12">
                {/* <label htmlFor="majors" className="form-label mb-0">
                Major
              </label> */}
                <input
                  type="radio"
                  name="major"
                  value=""
                  onClick={handleFilterChange}
                />{" "}
                All
                {majorData &&
                  majorData.map((major) => (
                    <div key={major.id}>
                      <input
                        type="radio"
                        name="major"
                        value={major.name}
                        onClick={handleFilterChange}
                      />{" "}
                      {major.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="datatable-container flex-grow-1">
        <table className="display table table-striped table-bordered" />
      </div>
    </div>
  );
};

export default Dashboard;
