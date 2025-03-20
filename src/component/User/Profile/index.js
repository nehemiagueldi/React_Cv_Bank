import React, { useEffect, useState } from "react";
import "./index.css";
import { Card } from "react-bootstrap";
import {
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import SelectEdit from "../edit_components/selectedit";
import RichTextEditor from "../edit_components/richtexteditor";
import CustomDatePicker from "../edit_components/customdatepicker";
import CustomTextInput from "../edit_components/customtextinput";

const ProfileUser = ({
  name,
  position,
  summary,
  gender,
  birthDate,
  photoProfile,
  setName,
  setPosition,
  setSummary,
  setGender,
  setBirthDate,
  setPhotoProfile,
  setFile,
}) => {
  let [previewImage, setPreviewImage] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  let handlePhotoChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setPhotoProfile(file);
      setFile(file);
    }
  };

  useEffect(() => {
    if (photoProfile instanceof Blob) {
      const imageUrl = URL.createObjectURL(photoProfile);
      setPreviewImage(imageUrl);
    } else {
      setPreviewImage(photoProfile);
    }
  }, [photoProfile]);

  const genderOptions = [
    {id :"M", name: "Male"},
    {id :"F", name: "Female"}
  ];

  return (
    <>
      <Card className="px-0 shadow">
        <button
          className="btn fw-bold btn-custom"
          type="button"
          onClick={handleShow}
        >
          <span>PROFILE</span>
          {show ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {show && (
          <Card className="m-3 p-3 shadow-sm">
            <div className="container">
              <div className="row">
                <div className="d-flex flex-column flex-md-row gap-3 p-3">
                  <div className="col-12 col-md-5 text-center d-flex flex-column align-items-center order-1 order-md-2">
                    <div
                      style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "2px solid #ddd",
                      }}
                    >
                      <img
                        src={
                          previewImage === null
                            ? "https://res.cloudinary.com/debojimrw/image/upload/v1736410512/default_go00tp.jpg"
                            : previewImage
                        }
                        alt={name}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="mt-4">
                      <div className="d-flex flex-column align-items-center">
                        <input
                          type="file"
                          id="fileInput"
                          className="d-none"
                          onChange={handlePhotoChange}
                        />
                        <label htmlFor="fileInput" className="btn btn-primary">
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-7 order-2 order-md-1">
                    <div className="row">
                      
                      {/* Name */}
                      <CustomTextInput 
                        customCSS="col-12 mb-3"
                        data={name}
                        name="Name"
                        rowLength={6}
                        setData={setName}
                        type="Single"
                      />
                      
                      {/* Position */}
                      <CustomTextInput 
                        customCSS="col-12 mb-3"
                        data={position}
                        name="Position"
                        rowLength={6}
                        setData={setPosition}
                        type="Single"
                      />
                    </div>

                    <div className="row">
                      
                      {/* BirthDate */}
                      <CustomDatePicker data={birthDate} name="BirthDate" setData={setBirthDate} type="Single" />
                      
                      {/* Gender */}
                      <SelectEdit data={gender} list={genderOptions} name="Gender" setData={setGender} type="Single" />

                    </div>

                    <RichTextEditor customCSS="mt-3" data={summary} name="Summary" setData={setSummary} type="Single" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Card>
    </>
  );
};

export default ProfileUser;
