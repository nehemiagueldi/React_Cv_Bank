import React, { useEffect } from "react";
import "./index.css";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import $ from "jquery";

DataTable.use(DT);

const DashboardDatatables = ({ filters }) => {
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
          d.search = d.search.value;
          d.position = filters.Position || "";
          d.gender = filters.Gender || "";
          d.experience = filters.Experience || "";
          d.skill = filters.Skill.length > 0 ? filters.Skill.join(",") : "";
          d.major = filters.Major.join(",") || "";
          d.university = filters.University.join("  ,") || "";
          d.gpa = filters.GPA || "";
          d.age = filters.Age || "";
          d.company = filters.Company || "";
          d.jobDesc = filters.JobDescription || "";
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
              : Math.floor(row.totalExperience / 12) + " year";
          },
        },
        {
          title: "Major",
          data: "cvPerson.educations",
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
    <div className="datatable-container">
      <table className="display table table-striped table-bordered" />
    </div>
  );
};

export default DashboardDatatables;
