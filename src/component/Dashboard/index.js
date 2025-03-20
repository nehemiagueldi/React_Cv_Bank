import React, { useEffect, useState } from "react";
import {
  getSkillData,
  getMajorData,
  getUniversityData,
} from "../../service/CVBank";
import "./index.css";
import DashboardDatatables from "./dashboarddt";
import FilterInput from "../Filter/filterinput";
import FilterSearch from "../Filter/filtersearch";
import FilterDropdown from "../Filter/filterdropdown";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    Gender: [],
    Experience: [],
    Skill: [],
    University: [],
    Major: [],
    Age: [],
    GPA: [],
    Position: [],
    Company: [],
    JobDescription: [],
  });

  const [skillData, setSkillData] = useState([]);
  const [majorData, setMajorData] = useState([]);
  const [universityData, setUniversityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const skills = await getSkillData();
      const majors = await getMajorData();
      const university = await getUniversityData();
      setSkillData(skills);
      setMajorData(majors);
      setUniversityData(university);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid d-flex gap-5 px-5">
      <div className={`me-3 shadow-sm p-3 rounded min-vh-50 filter-card show`}>
        <h3 className="mb-3">Filters</h3>

        <div className="d-flex flex-column gap-3">
          {/* Gender */}
          <FilterDropdown
            dataFilter={["M", "F"]}
            id={1}
            name="Gender"
            setFilters={setFilters}
          />

          {/* Experience */}
          <FilterDropdown
            dataFilter={["9", "8", "6", "4", "0"]}
            id={2}
            name="Experience"
            setFilters={setFilters}
          />

          {/* Age */}
          <FilterDropdown
            dataFilter={["20", "26", "31"]}
            id={3}
            name="Age"
            setFilters={setFilters}
          />

          <FilterInput
            dataFilter={skillData}
            id={4}
            name="Skill"
            setFilters={setFilters}
          />

          {/* GPA */}
          <FilterDropdown
            dataFilter={["2.75", "3.0", "3.5", "3.75"]}
            id={5}
            name="GPA"
            setFilters={setFilters}
          />

          {/* Major */}
          <FilterInput
            dataFilter={majorData}
            id={6}
            name="Major"
            setFilters={setFilters}
          />

          {/* University */}
          <FilterInput
            dataFilter={universityData}
            id={7}
            name="University"
            setFilters={setFilters}
          />

          {/* Position */}
          <FilterSearch id={8} name="Position" setFilters={setFilters} />

          {/* Company */}
          <FilterSearch id={9} name="Company" setFilters={setFilters} />

          {/* JobDescription */}
          <FilterSearch id={10} name="JobDescription" setFilters={setFilters} />
        </div>
      </div>

      <DashboardDatatables filters={filters} />
    </div>
  );
};

export default Dashboard;
