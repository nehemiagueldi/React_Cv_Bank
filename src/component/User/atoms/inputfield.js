import React from "react";

const InputField = ({ id, handleChange, name, type = "text", value }) => {
  return (
    <input
      required
      type={type}
      className="form-control"
      id={id}
      placeholder={type === "text" ? `Input ${name}` : ""}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputField;
