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
      title: "CV",
      data: null,
      render: (row) => `<a class="btn btn-md btn-primary" href="/cv/${row.id}">View CV</a>`,
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
