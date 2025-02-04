import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { Card, Row } from "react-bootstrap";
// import "./style.css";

DataTable.use(DT);

const Dashboard = () => {
  const columns = [
    {
      title: "No",
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    { title: "Name", data: "person.name" },
    { title: "Position", data: "position" },
    {
      title: "Gender",
      render: function (data, type, row) {
        return row.person.gender === "M"
          ? "Male"
          : row.person.gender === "F"
          ? "Female"
          : "Unknown";
      },
    },
    {
      title: "CV",
      data: null,
      render: (row) =>
        `
        <div class="d-flex gap-2">
        <a class="btn btn-md btn-primary" href="/cv/${row.randomString}">View</a>
        <a class="btn btn-md btn-warning" href="/user/${row.randomString}">Edit</a>
        </div>
      `,
    },
  ];

  return (
    <>
      <div className="container">
        <Row>
          <Card>
            <DataTable
              ajax={{
                url: "http://localhost:8080/api/cv-person",
                type: "GET",
                data: function (d) {
                  d.search = d.search.value || "";
                },
                headers: {
                  "ngrok-skip-browser-warning": "true",
                },
                dataSrc: "data",
              }}
              columns={columns}
              options={{
                serverSide: true,
                processing: true,
                searching: true,
              }}
              className="display"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Gender</th>
                  <th>CV</th>
                </tr>
              </thead>
            </DataTable>
          </Card>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
