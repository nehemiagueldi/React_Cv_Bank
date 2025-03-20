import React from "react";
import ReactQuill from "react-quill-new";
import InputLabel from "../atoms/inputlabel";

const RichTextEditor = ({
  customCSS = "",
  data,
  handleInputChange,
  name,
  setData,
  type = "Multiple",
}) => {
  const nameLowerCase = name?.toLowerCase();
  const id = `input${name}${type === "Single" ? "" : data?.id}`;
  const value = type === "Single" ? data || "" : data?.[nameLowerCase] || "";

  const handleDescriptionChange = (newValue) => {
    if (type === "Single") {
      setData?.(newValue);
    } else if (data?.id) {
      handleInputChange?.(data.id, nameLowerCase, newValue);
    }
  };

  return (
    <div className={`col-12 ${customCSS}`}>
      <InputLabel id={id} name={name}/>
      <ReactQuill
        id={id}
        theme="snow"
        value={value}
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default RichTextEditor;
