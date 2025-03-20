import React from "react";
import Select from "react-select";
import InputLabel from "../atoms/inputlabel";

const CustomSelect = ({
  data = {},
  list: listData = [],
  handleInputChange,
  name,
  rowLength = "6",
  setData,
  type = "Multiple", //single || multiple || react-multiple
}) => {
  const id = `input${name}${type !== "Multiple" ? "" : data?.id}`;
  const value =
    type !== "Multiple"
      ? data || ""
      : name !== "Faculty"
      ? data?.[name?.toLowerCase()]?.id
      : data?.major?.faculty?.id || "";

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (type === "Single") {
      setData(selectedValue);
    } else {
      handleInputChange(data?.id, name?.toLowerCase(), listData, selectedValue);
    }
  };

  return (
    <div className={`col-md-${rowLength}`}>
      <InputLabel id={id} name={name}/>
      {type === "React-Multiple" ? (
        <Select
          value={value || []}
          isMulti
          name={name}
          options={listData}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions) => {
            setData(selectedOptions);
          }}
        />
      ) : (
        <select
          required
          className="form-select"
          value={value || ""}
          id={id}
          aria-label={`Select ${name}`}
          onChange={handleSelectChange}
          disabled={name === "Major" && !data?.major?.faculty?.id}
        >
          <option disabled value="">
            Choose {name}...
          </option>
          {listData.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CustomSelect;
