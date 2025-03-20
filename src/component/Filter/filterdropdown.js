import React, { useState } from "react";
import "./index.css";
import ButtonToggle from "./atoms/buttontoggle";

const FilterDropdown = ({ dataFilter, id, name, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleDropdown = (id) => {
    setIsExpanded((prev) => !prev);
    setSelectedId(id);
  };

  const handleFilterClick = (e) => {
    const value = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "all" ? "" : value,
    }));
  };

  const formatLabel = (name, value) => {
    switch (name) {
      case "GPA":
        return value === "2.75"
          ? "> 2.75 - <= 3.0"
          : value === "3.0"
          ? "> 3.0 - <= 3.5"
          : value === "3.5"
          ? "> 3.5 - <= 3.75"
          : "> 3.75 - <= 4.0";
      case "Age":
        return value === "31"
          ? "31 Year Above"
          : value === "20"
          ? "20 - 25 Year"
          : "26 - 30 Year";
      case "Experience":
        return value === "0"
          ? "Less than 1 year"
          : value === "9"
          ? "Above 8 years"
          : value === "4"
          ? value - 2 + " - " + value + " years"
          : value - 1 + " - " + value + " years";
      case "Gender":
        return value === "M" ? "Male" : "Female";
      default:
        return value;
    }
  };

  return (
    <div>
      <ButtonToggle
        id={id}
        isExpanded={isExpanded}
        name={name}
        selectedId={selectedId}
        toggleDropdown={toggleDropdown}
      />
      <div className="collapse" id={`collapseExample${name}`}>
        <div key="all">
          <input
            type="radio"
            name={name}
            value="all"
            onChange={handleFilterClick}
          />{" "}
          All
        </div>
        {dataFilter &&
          dataFilter.map((data) => (
            <div key={data}>
              <input
                type="radio"
                name={name}
                value={data}
                onClick={handleFilterClick}
              />{" "}
              {formatLabel(name, data)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
