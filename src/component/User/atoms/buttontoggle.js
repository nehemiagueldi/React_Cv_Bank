import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ButtonToggleE = ({ customCSS, isExpanded, name, toggleCollapse }) => {
  return (
    <button
      className={`btn ${customCSS}`}
      type="button"
      onClick={toggleCollapse}
    >
      <span>{name}</span>
      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
    </button>
  );
};

export default ButtonToggleE;
