import React, { useState } from "react";
import "./index.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterInput = ({ dataFilter, id, name, setFilters }) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== "") {
      const filtered = dataFilter.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) &&
          !selectedItems.includes(item.name)
      );
      setFilteredItems(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredItems([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectItem = (itemName) => {
    const updatedItems = [...selectedItems, itemName];
    setSelectedItems(updatedItems);
    setFilters((prev) => ({ ...prev, [name]: updatedItems }));
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveItem = (itemName) => {
    const updatedItems = selectedItems.filter((item) => item !== itemName);
    setSelectedItems(updatedItems);
    setFilters((prev) => ({ ...prev, [name]: updatedItems }));
  };
  const handleId = (id) => {
    setShow(!show);
    setActiveId(id);
  };

  return (
    <div className="">
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
        <div className="relative">
          <div className="input-container" style={{ position: "relative" }}>
            <input
              type="text"
              name={name}
              value={name !== "Skill" && selectedItems.length > 0 ? selectedItems : inputValue}
              onChange={handleInputChange}
              placeholder={`Input ${name}...`}
              className="input-skill"
            />
            {name !== "Skill" && selectedItems.length > 0 && (
              <button
                className="input-button"
                onClick={() => {setSelectedItems([]); setInputValue(""); setFilters((prev) => ({ ...prev, [name]: []}));}}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            )}

          </div>

          {showSuggestions && filteredItems.length > 0 && (
            <ul className="absolute bg-white border mt-1 w-full shadow-md">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectItem(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
          {name === "Skill" && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-black px-3 py-1 rounded-full inline-flex items-center justify-between border border-gray-300 shadow-sm w-auto max-w-max"
                >
                  <span className="whitespace-nowrap">{item}</span>
                  <button
                    className="ml-3 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem(item)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            type="hidden"
            name="selectedItems"
            value={selectedItems.join(",")}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterInput;
