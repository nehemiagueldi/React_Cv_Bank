import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import RichTextEditor from "../edit_components/richtexteditor";
import CustomDatePicker from "../edit_components/customdatepicker";
import CustomTextInput from "../edit_components/customtextinput";

const TrainingUser = ({ training, setTraining }) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowId = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const handleInputChange = (id, field, value) => {
    setTraining((prevTraining) =>
      prevTraining.map((trn) =>
        trn.id === id ? { ...trn, [field]: value } : trn
      )
    );
  };

  let handleAddTraining = () => {
    let newItem = {
      id: new Date().getTime(),
      name: "New Training",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
    };
    setTraining((prevTraining) => [...prevTraining, newItem]);
  };

  let handleDeleteTraining = (id) => {
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
        setTraining((prevTraining) =>
          prevTraining.filter((exp) => exp.id !== id)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your training has been deleted.",
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
        <span>TRAININGS</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {show && (
        <Card className="m-3 p-3 shadow-sm">
          <div className="container">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="trainings" className="form-label mb-0">
                  Trainings
                </label>
              </div>
              {training &&
                training.map((trn) => (
                  <Card
                    className={`px-0 ${
                      activeId === trn.id
                        ? "bg-white shadow"
                        : "bg-transparent border-0"
                    }`}
                    key={trn.id}
                  >
                    <div>
                      <div className="d-flex justify-content-between gap-2">
                        <button
                          className="btn btn-primary btn-child flex-grow-1"
                          type="button"
                          onClick={() => handleShowId(trn.id)}
                        >
                          <span>{trn.name}</span>
                          {activeId === trn.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                        {activeId !== trn.id && (
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDeleteTraining(trn.id)}
                          >
                            <FaTrashAlt className="fs-4" />
                          </button>
                        )}
                      </div>
                      {activeId === trn.id && (
                        <Card className="m-3 p-3 shadow-sm">
                          <div className="row my-2 g-2">
                            
                            {/* Name */}
                            <CustomTextInput
                              data={trn}
                              handleInputChange={handleInputChange}
                              name="Name"
                              rowLength={6}
                            />

                            {/* Company */}
                            <CustomTextInput
                              data={trn}
                              handleInputChange={handleInputChange}
                              name="Company"
                              rowLength={6}
                            />

                            {/* Start Date */}
                            <CustomDatePicker data={trn} handleInputChange={handleInputChange} name="Start Date" />

                            {/* End Date */}
                            <CustomDatePicker data={trn} handleInputChange={handleInputChange} name="End Date" />

                            {/* Description */}
                            <RichTextEditor data={trn} handleInputChange={handleInputChange} name="Description" />

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
                  onClick={handleAddTraining}
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

export default TrainingUser;
