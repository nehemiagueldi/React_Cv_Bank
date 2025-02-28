import React, { useState } from "react";
import "./index.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterButton = ({ dataFilter, id, name, setFilters }) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleId = (id) => {
    setShow(!show);
    setActiveId(id);
  };

  const handleFilterClick = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      let updatedValues = prevFilters[name];

      if (checked) {
        if (
          name === "Gender" ||
          name === "Experience" ||
          name === "Age" ||
          name === "GPA"
        ) {
          updatedValues = value;
        } else {
          updatedValues = [...prevFilters[name], value];
        }
      } else {
        if (name === "Gender") {
          updatedValues = "";
        } else if (name === "Experience" || name === "Age" || name === "GPA") {
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

  return (
    <div>
      <button
        className="btn btn-custom1 d-flex justify-content-between align-items-center no-padding"
        data-bs-toggle="collapse"
        data-bs-target={`#collapseExample${name}`}
        onClick={() => handleId(id)}
      >
        <span>{name}</span>
        {show && activeId === id ? (
          <FaChevronUp size={15} />
        ) : (
          <FaChevronDown size={15} />
        )}
      </button>
      <div className="collapse" id={`collapseExample${name}`}>
        {dataFilter &&
          dataFilter.map((data) => (
            <div
              key={name === "Major" || name === "University" ? data.id : data}
            >
              <input
                type="checkbox"
                name={name}
                value={
                  name === "Major" || name === "University" ? data.name : data
                }
                onClick={handleFilterClick}
              />{" "}
              {name === "GPA"
                ? data === "2.75"
                  ? "> 2.75 - <= 3.0"
                  : data === "3.0"
                  ? "> 3.0 - <= 3.5"
                  : data === "3.5"
                  ? "> 3.5 - <= 3.75"
                  : "> 3.75 - <= 4.0"
                : name === "Age"
                ? data === "31"
                  ? "31 Year Above"
                  : data === "20"
                  ? "20 - 25 Year"
                  : "26 - 30 Year"
                : name === "Experience"
                ? data === "0"
                  ? "Less than 1 year"
                  : data === "9"
                  ? "Above 8 years"
                  : data === "4"
                  ? data - 2 + " - " + data + " years"
                  : data - 1 + " - " + data + " years"
                : name === "Gender"
                ? data === "M"
                  ? "Male"
                  : "Female"
                : data.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterButton;
