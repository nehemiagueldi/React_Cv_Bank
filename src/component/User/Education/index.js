import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import CustomSelect from "../edit_components/customselect";
import CustomTextInput from "../edit_components/customtextinput";
import CustomDatePicker from "../edit_components/customdatepicker";
import { CiCirclePlus } from "react-icons/ci";


const EducationUser = ({
  setSelectedFaculty,
  degreeList,
  facultyList,
  majorList,
  universityList,
  education,
  setEducation,
}) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowId = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const handleInputChange = (id, field, value) => {
    setEducation((prevEducation) =>
      prevEducation.map((edc) =>
        edc.id === id ? { ...edc, [field]: value } : edc
      )
    );
  };

  const handleInputChange2 = (id, field, list, value) => {
    const selectedInput = list.find((item) => item.id === parseInt(value, 10));
    const valueField = selectedInput || { id: null, name: "" };

    setEducation((prevEducation) =>
      prevEducation.map((edc) =>
        edc.id === id
          ? field !== "faculty"
            ? { ...edc, [field]: valueField }
            : {
                ...edc,
                major: {
                  ...edc.major,
                  id: null,
                  name: "",
                  faculty: valueField,
                },
              }
          : edc
      )
    );

    if(field === "faculty") {
      setSelectedFaculty(selectedInput ? selectedInput.id : null);
    }

  };

  const handleFacultyChange = (id, facultyId) => {
    const selectedFaculty = facultyList.find(
      (fct) => fct.id === parseInt(facultyId, 10)
    );

    setEducation((prevEducation) =>
      prevEducation.map((edc) =>
        edc.id === id
          ? {
              ...edc,
              major: {
                ...edc.major,
                id: null,
                name: "",
                faculty: selectedFaculty || { id: null, name: "" },
              },
            }
          : edc
      )
    );

    setSelectedFaculty(selectedFaculty ? selectedFaculty.id : null);
  };

  const handleAddEducation = () => {
    const newItem = {
      id: new Date().getTime(),
      university: {
        id: null,
        name: "New Education",
      },
      degree: {
        id: null,
        name: "",
      },
      major: {
        id: null,
        name: "",
        faculty: {
          id: null,
          name: "",
        },
      },
      start_date: "",
      end_date: "",
      gpa: "",
    };
    setEducation((prevEducation) => [...prevEducation, newItem]);
  };

  const handleDeleteEducation = (id) => {
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
        setEducation((prevEducation) =>
          prevEducation.filter((exp) => exp.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your education has been deleted.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  return (
    <Card className="px-0 shadow">
      <button
        className="btn fw-bold btn-custom"
        type="button"
        onClick={handleShow}
      >
        <span>EDUCATIONS</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="educations" className="form-label mb-0">
                  Educations
                </label>
              </div>
              {education &&
                education.map((edc) => (
                  <Card
                    className={`px-0 ${
                      activeId === edc.id
                        ? "bg-white shadow"
                        : "bg-transparent border-0"
                    }`}
                    key={edc.id}
                  >
                    <div>
                      <div className="d-flex justify-content-between gap-2">
                        <button
                          className="btn btn-primary btn-child flex-grow-1"
                          type="button"
                          onClick={() => handleShowId(edc.id)}
                        >
                          <span>{edc.university.name}</span>
                          {activeId === edc.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                        {activeId !== edc.id && (
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDeleteEducation(edc.id)}
                          >
                            <FaTrashAlt className="fs-4" />
                          </button>
                        )}
                      </div>
                      {activeId === edc.id && (
                        <Card className="m-3 p-3 shadow-sm">
                          <div className="row my-2 g-2">
                            {/* Degree Edit */}
                            <CustomSelect
                              data={edc}
                              list={degreeList}
                              handleInputChange={handleInputChange2}
                              name="Degree"
                            />

                            {/* University Edit  */}
                            <CustomSelect
                              data={edc}
                              list={universityList}
                              handleInputChange={handleInputChange2}
                              name="University"
                              rowLength="4"
                            />

                            {/* GPA Edit*/}
                            <CustomTextInput data={edc} handleInputChange={handleInputChange2} name="GPA" />

                            {/* Faculty Edit */}
                            <CustomSelect
                              data={edc}
                              list={facultyList}
                              handleInputChange={handleInputChange2}
                              name="Faculty"
                            />

                            {/* Major Edit */}
                            <CustomSelect
                              data={edc}
                              list={majorList}
                              handleInputChange={handleInputChange2}
                              name="Major"
                            />

                            {/* Start Date Edit */}
                            <CustomDatePicker
                              data={edc}
                              handleInputChange={handleInputChange2}
                              name="Start Date"
                            />

                            {/* End Date Edit */}
                            <CustomDatePicker
                              data={edc}
                              handleInputChange={handleInputChange2}
                              name="End Date"
                            />
                          </div>
                        </Card>
                      )}
                    </div>
                  </Card>
                ))}
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-success center gap-2"
                  onClick={handleAddEducation}
                >
                  <span>Add</span> <CiCirclePlus className="fs-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default EducationUser;
