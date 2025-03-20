import React from "react";
import InputLabel from "../atoms/inputlabel";
import InputField from "../atoms/inputfield";

const CustomTextInput = ({
  customCSS = "",
  data = {},
  handleInputChange,
  name = "",
  rowLength = 2,
  setData,
  type = "Multiple",
}) => {
  const value =
    type === "Single" ? data || "" : data?.[name?.toLowerCase()] || "";
  const id = `input${name}${type === "Single" ? "" : data?.id}`;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (type === "Single") {
      setData?.(newValue);
    } else {
      handleInputChange?.(data?.id, name?.toLowerCase(), newValue);
    }
  };
  return (
    <div className={`col-md-${rowLength} ${customCSS}`}>
      <InputLabel id={id} name={name} />
      <InputField
        id={id}
        handleChange={handleChange}
        name={name}
        value={value}
      />
    </div>
  );
};

export default CustomTextInput;
