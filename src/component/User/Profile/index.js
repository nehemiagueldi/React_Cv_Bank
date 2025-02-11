import React, { useEffect, useState } from "react";
import "./index.css";
import { Card } from "react-bootstrap";
import {
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import ReactQuill from "react-quill-new";

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
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="inputName4" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName4"
                          value={name || ""}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="inputPosition4" className="form-label">
                          Position
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPosition4"
                          value={position || ""}
                          onChange={(e) => setPosition(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="inputDate" className="form-label">
                          BirthDate
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="inputDate"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="inputGender" className="form-label">
                          Gender
                        </label>
                        <select
                          className="form-control"
                          id="inputGender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12 mt-3">
                      <label htmlFor="inputDescription" className="form-label">
                        Summary
                      </label>
                      <ReactQuill
                        theme="snow"
                        id="inputDescription"
                        value={summary}
                        onChange={(content) => setSummary(content)}
                      />
                    </div>
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
