import React, { useState } from "react";
import "./index.css";
import ButtonToggle from "./atoms/buttontoggle";

const FilterInput = ({ dataFilter, id, name, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleRemoveMultipleItem = (itemName) => {
    const updatedItems = selectedItems.filter((item) => item !== itemName);
    setSelectedItems(updatedItems);
    setFilters((prev) => ({ ...prev, [name]: updatedItems }));
  };
 
  const handleRemoveItem = () => {
    setSelectedItems([]); 
    setInputValue(""); 
    setFilters((prev) => ({ ...prev, [name]: []}));
  };
  const toggleDropdown = (id) => {
    setIsExpanded(!isExpanded);
    setSelectedId(id);
  };

  return (
    <div className="">
      <ButtonToggle
        id={id}
        isExpanded={isExpanded}
        name={name}
        selectedId={selectedId}
        toggleDropdown={toggleDropdown}
      />
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
                className="remove-button"
                onClick={handleRemoveItem}
              >
                X
              </button>
            )}

          </div>

          {showSuggestions && filteredItems.length > 0 && (
            <ul className="absolute suggestion-list-box">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="suggestion-list"
                  onClick={() => handleSelectItem(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
          {name === "Skill" && (
            <div>
              {selectedItems.map((item, index) => (
                <div
                  key={index}
                  className="relative selected-skill"
                >
                  <span className="whitespace-nowrap">{item}</span>
                  <button
                    className="absolute selected-skill-remove"
                    onClick={() => handleRemoveMultipleItem(item)}
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
