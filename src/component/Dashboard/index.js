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
    { title: "Name", data: "person.name" },
    { title: "Position", data: "position" },
    {
      title: "Action",
      data: null,
      render: (row) =>
        `
          <button class="btn btn-md btn-warning" onclick="alert('Selected: ${row.person.name}')">Edit</button>
          <button class="btn btn-md btn-danger" onclick="alert('Selected: ${row.person.name}')">Delete</button>
        `,
    },
    {
      title: "CV",
      data: null,
      render: (row) => `<button class="btn btn-md btn-primary" onclick="alert('Selected: ${row.person.name}')">View CV</button>`,
    },
  ];
  return (
    <>
      <div className="container">
        <DataTable data={profile} columns={columns} className="display" />
      </div>
    </>
  );
};

export default Dashboard;