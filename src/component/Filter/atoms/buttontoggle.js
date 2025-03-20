import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ButtonToggle = ({ id, isExpanded, name, selectedId, toggleDropdown }) => {
  return (
    <button
      className="btn btn-custom1 center no-padding"
      data-bs-toggle="collapse"
      data-bs-target={`#collapseExample${name}`}
      onClick={() => toggleDropdown(id)}
    >
      <span>{name}</span>
      {isExpanded && selectedId === id ? (
        <FaChevronUp size={15} />
      ) : (
        <FaChevronDown size={15} />
      )}
    </button>
  );
};

export default ButtonToggle;
