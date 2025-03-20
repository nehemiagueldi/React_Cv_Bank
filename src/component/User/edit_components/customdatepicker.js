import React from "react";
import { formatToCamelCase } from "../../../service/CVBank";
import InputLabel from "../atoms/inputlabel";
import InputField from "../atoms/inputfield";

const CustomDatePicker = ({
  data,
  handleInputChange,
  name,
  setData,
  type = "Multiple",
}) => {
  const formatName = formatToCamelCase(name);
  const id = `input${formatName}${type === "Single" ? "" : data?.id}`;
  const value = type === "Single" ? data || "" : data?.[formatName] || "";

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (type === "Single") {
      setData(newValue);
    } else {
      handleInputChange?.(data?.id, formatName, newValue);
    }
  };

  return (
    <div className="col-md-6">
      <InputLabel id={id} name={name} />
      <InputField
        id={id}
        handleChange={handleChange}
        type="date"
        value={value}
      />
    </div>
  );
};

export default CustomDatePicker;
