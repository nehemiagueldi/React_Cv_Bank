import { useState } from "react";
import { Card } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import RichTextEditor from "./richtexteditor";
import CustomDatePicker from "./customdatepicker";
import CustomTextInput from "./customtextinput";
import ButtonToggleE from "../atoms/buttontoggle";
import ButtonAction from "../atoms/buttonaction";

const CustomCardEdit = ({ listData, name, setData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleCollapse = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleSelectedItem = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  let handleAddItem = () => {
    setData((prevData) => [
      ...prevData,
      {
        id: new Date().getTime(),
        name: `New ${name}`,
        company: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    ]);
  };

  let handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((data) => data.id !== id));
        setSelectedId(null);
        Swal.fire({
          title: "Deleted!",
          text: "Your training has been deleted.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <Card className="px-0 shadow">
      <ButtonToggleE
        customCSS="fw-bold btn-custom"
        isExpanded={isExpanded}
        name={name?.toUpperCase()}
        toggleCollapse={toggleCollapse}
      />
      {isExpanded && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="trainings" className="form-label mb-0">
                  {name}
                </label>
              </div>
              {listData &&
                listData.map((data) => (
                  <Card
                    className={`px-0 ${
                      selectedId === data.id
                        ? "bg-white shadow"
                        : "bg-transparent border-0"
                    }`}
                    key={data.id}
                  >
                    <div>
                      <div className="d-flex justify-content-between gap-2">
                        <ButtonToggleE
                          customCSS="btn-primary btn-child flex-grow-1"
                          isExpanded={selectedId === data.id}
                          name={data.name}
                          toggleCollapse={() => toggleSelectedItem(data.id)}
                        />
                        {selectedId !== data.id && (
                        <ButtonAction
                          customCSS="btn-danger"
                          handleClick={() => handleDeleteItem(data.id)}
                          icon={FaTrashAlt}
                        />
                        )}
                      </div>
                      {selectedId === data.id && (
                        <Card className="m-3 p-3 shadow-sm">
                          <div className="row my-2 g-2">
                            {/* Name */}
                            <CustomTextInput
                              data={data}
                              handleInputChange={handleInputChange}
                              name="Name"
                              rowLength={6}
                            />

                            {/* Company */}
                            <CustomTextInput
                              data={data}
                              handleInputChange={handleInputChange}
                              name="Company"
                              rowLength={6}
                            />

                            {/* Start Date */}
                            <CustomDatePicker
                              data={data}
                              handleInputChange={handleInputChange}
                              name="Start Date"
                            />

                            {/* End Date */}
                            <CustomDatePicker
                              data={data}
                              handleInputChange={handleInputChange}
                              name="End Date"
                            />

                            {/* Description */}
                            <RichTextEditor
                              data={data}
                              handleInputChange={handleInputChange}
                              name="Description"
                            />
                          </div>
                        </Card>
                      )}
                    </div>
                  </Card>
                ))}
              <div className="col-12">
                <ButtonAction
                  customCSS="btn-success center gap-2"
                  handleClick={handleAddItem}
                  icon={CiCirclePlus}
                  label="Add"
                />
              </div>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default CustomCardEdit;
