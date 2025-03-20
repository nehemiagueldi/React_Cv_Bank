import React, { useEffect, useState } from "react";
import "./index.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterSearch = ({ id, name, setFilters }) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleId = (id) => {
    setShow(!show);
    setActiveId(id);
  };

  return (
    <div className="">
      <button
        className="btn btn-custom1 center no-padding"
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
        <div className="relative">
          <div className="input-container" style={{ position: "relative" }}>
            <input
              type="text"
              name={name}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Input ${name}...`}
              className="input-skill"
            />
            {inputValue !== "" && (
              <button
                className="remove-button"
                onClick={() => {
                  setInputValue("");
                  setFilters((prev) => ({ ...prev, [name]: "" }));
                }}
              >
                X
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
