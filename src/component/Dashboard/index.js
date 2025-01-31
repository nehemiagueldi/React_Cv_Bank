import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { getSkillData, getMajorData } from "../../service/CVBank";
import $ from "jquery";

DataTable.use(DT);

const Dashboard = () => {
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    skill: "",
    major: "",
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
      searching: false,
      ajax: {
        url: "http://localhost:8080/api/cv-person",
        type: "GET",
        data: function (d) {
          d.search = filters.gender || "";
          d.experience = filters.experience || "";
          d.skill = filters.skill || "";
          d.major = filters.major || "";
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
        { title: "Experience", data: "totalExperience" },
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
            <a class="btn btn-md btn-primary" href="/cv/${row.randomString}">View</a>
            <a class="btn btn-md btn-warning" href="/user/${row.randomString}">Edit</a>
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
        <h5>Filters</h5>
        <div className="mb-3">
          <label className="d-block">Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onClick={handleFilterChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onClick={handleFilterChange}
            className="ms-2"
          />{" "}
          Female
        </div>
        <div className="mb-3">
          <label className="d-block">Position</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onClick={handleFilterChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onClick={handleFilterChange}
            className="ms-2"
          />{" "}
          Female
        </div>
        <div className="mb-3">
          <label className="d-block">Experience</label>
          <input
            type="radio"
            name="experience"
            value="Junior"
            onClick={handleFilterChange}
          />{" "}
          Junior
          <input
            type="radio"
            name="experience"
            value="Senior"
            onClick={handleFilterChange}
            className="ms-2"
          />{" "}
          Senior
        </div>
        <div className="mb-3">
          <label className="d-block">Skill</label>
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
        <div className="mb-3">
          <label className="d-block">Major</label>
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
      <div className="datatable-container flex-grow-1">
        <table className="display table table-striped table-bordered" />
      </div>
    </div>
  );
};

export default Dashboard;
