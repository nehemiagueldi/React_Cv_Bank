import React from "react";

const InputLabel = ({ id, name }) => {
  return (
    <label htmlFor={id} className="form-label">
      {name}
    </label>
  );
};

export default InputLabel;
