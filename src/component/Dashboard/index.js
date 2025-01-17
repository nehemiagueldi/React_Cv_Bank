import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { getListCVPerson } from "../../service/CVBank";

DataTable.use(DT);

const Dashboard = () => {
  let [profile, setProfile] = useState(null);
  useEffect(() => {
    let getCVPersonData = async () => {
      try {
        let result = await getListCVPerson();
        setProfile(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    getCVPersonData();
  }, []);

  const columns = [
    {
      title: "#",
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    { title: "Name", data: "cvPerson.person.name" },
    { title: "Position", data: "cvPerson.position" },
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
      render: (row) =>
        `
        <div class="d-flex gap-2">
        <a class="btn btn-md btn-primary" href="/cv/${row.cvPerson.randomString}">View</a>
        <a class="btn btn-md btn-warning" href="/user/${row.cvPerson.randomString}">Edit</a>
        </div>
      `,
    },
  ];

  return (
    <>
      <div className="container">
        <DataTable data={profile} columns={columns} className="display">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>CV</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  );
};

export default Dashboard;
