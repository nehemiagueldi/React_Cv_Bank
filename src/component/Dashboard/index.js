import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { getSkillData, getMajorData } from "../../service/CVBank";
import $ from "jquery";
import "./index.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

DataTable.use(DT);

const Dashboard = () => {
  const [filters, setFilters] = useState({
    gender: [],
    experience: [],
    skill: [],
    major: [],
    age: [],
  });

  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
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

  const handleFilterClick = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      let updatedValues = prevFilters[name];

      if (checked) {
        if (name === "gender" || name === "experience" || name === "age") {
          updatedValues = value;
        } else {
          updatedValues = [...prevFilters[name], value];
        }
      } else {
        if (name === "gender") {
          updatedValues = "";
        } else if (name === "experience" || name === "age") {
          updatedValues = 0;
        } else {
          updatedValues = prevFilters[name].filter((item) => item !== value);
        }
      }

      return {
        ...prevFilters,
        [name]: updatedValues,
      };
    });
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
          d.search = d.search.value;
          d.gender = filters.gender || "";
          d.experience = filters.experience || "";
          d.skill = filters.skill.join(",") || "";
          d.major = filters.major.join(",") || "";
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
            return row.totalExperience < 12
              ? row.totalExperience + " month"
              : Math.round(row.totalExperience / 12) + " year";
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

  const handleId = (id) => {
    setShow(!show);
    setActiveId(id);
  };

  return (
    <div className="container-fluid d-flex gap-5 px-5">
      <div className={`me-3 shadow-sm p-3 rounded min-vh-50 filter-card show`}>
        <h3 className="mb-3">Filters</h3>

        <div className="d-flex flex-column gap-3">
          {/* Gender */}
          <div className="">
            <button
              className="btn btn-custom1 d-flex justify-content-between align-items-center no-padding"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExampleGender"
              aria-expanded="false"
              aria-controls="collapseExampleGender"
              onClick={() => handleId(1)}
            >
              <span>Gender</span>
              {show && activeId === 1 ? (
                <FaChevronUp size={15} />
              ) : (
                <FaChevronDown size={15} />
              )}
            </button>

            <div className="collapse" id="collapseExampleGender">
              <div>
                {["Male", "Female"].map((gender) => (
                  <div key={gender}>
                    <input
                      type="checkbox"
                      name="gender"
                      value={gender}
                      onClick={handleFilterClick}
                    />{" "}
                    {gender}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="">
            <button
              className="btn btn-custom1 d-flex justify-content-between align-items-center no-padding"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExampleExperience"
              aria-expanded="false"
              aria-controls="collapseExampleExperience"
              onClick={() => handleId(2)}
            >
              <span>Experience</span>
              {show && activeId === 2 ? (
                <FaChevronUp size={15} />
              ) : (
                <FaChevronDown size={15} />
              )}
            </button>

            <div className="collapse" id="collapseExampleExperience">
              <div>
                {["9", "8", "6", "4", "0"].map((exp) => (
                  <div key={exp}>
                    <input
                      type="checkbox"
                      name="experience"
                      value={exp}
                      onClick={handleFilterClick}
                    />{" "}
                    {exp === "0"
                      ? "Less than 1 year"
                      : exp === "9"
                      ? "Above 8 years"
                      : exp === "4"
                      ? exp - 2 + " - " + exp + " years"
                      : exp - 1 + " - " + exp + " years"}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Age */}
          <div className="">
            <button
              className="btn btn-custom1 d-flex justify-content-between align-items-center no-padding"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExampleAge"
              aria-expanded="false"
              aria-controls="collapseExampleAge"
              onClick={() => handleId(3)}
            >
              <span>Age</span>
              {show && activeId === 3 ? (
                <FaChevronUp size={15} />
              ) : (
                <FaChevronDown size={15} />
              )}
            </button>

            <div className="collapse" id="collapseExampleAge">
              <div>
                {["25", "30"].map((age) => (
                  <div key={age}>
                    <input
                      type="checkbox"
                      name="age"
                      value={age}
                      onClick={handleFilterClick}
                    />{" "}
                    {age === "25" ? "20 - 25 Year" : "26 - 30 Year"}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skill */}
          <div className="">
            <button
              className="btn btn-custom1 d-flex justify-content-between align-items-center no-padding"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExampleSkill"
              onClick={() => handleId(4)}
            >
              <span>Skill</span>
              {show && activeId === 4 ? (
                <FaChevronUp size={15} />
              ) : (
                <FaChevronDown size={15} />
              )}
            </button>
            <div className="collapse" id="collapseExampleSkill">
              {skillData &&
                skillData.map((skill) => (
                  <div key={skill.id}>
                    <input
                      type="checkbox"
                      name="skill"
                      value={skill.name}
                      onClick={handleFilterClick}
                    />{" "}
                    {skill.name}
                  </div>
                ))}
            </div>
          </div>

          {/* Major */}
          <div className="">
            <button
              className="btn btn-custom1 d-flex justify-content-between align-items-center no-padding"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExampleMajor"
              onClick={() => handleId(5)}
            >
              <span>Major</span>
              {show && activeId === 5 ? (
                <FaChevronUp size={15} />
              ) : (
                <FaChevronDown size={15} />
              )}
            </button>
            <div className="collapse" id="collapseExampleMajor">
              {majorData &&
                majorData.map((major) => (
                  <div key={major.id}>
                    <input
                      type="checkbox"
                      name="major"
                      value={major.name}
                      onClick={handleFilterClick}
                    />{" "}
                    {major.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="datatable-container">
        <table className="display table table-striped table-bordered" />
      </div>
    </div>
  );
};

export default Dashboard;
