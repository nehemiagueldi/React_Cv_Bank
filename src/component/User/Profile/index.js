import React, { useState } from "react";
import "./index.css";

const ProfileUser = ({ name, position, summary, photoProfile, setName, setPosition, setSummary, setPhotoProfile }) => {
  let [previewImage, setPreviewImage] = useState(photoProfile);

  let handlePhotoChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setPhotoProfile(file);
    }
  };

  return (
    <>
      <button className="btn fw-bold btn-custom" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExampleProfile" aria-expanded="false" aria-controls="collapseExampleProfile">
        Profile
      </button>
      <div className="collapse show" id="collapseExampleProfile">
        <div className="row">
          <div className="col-md-6 align-self-center">
            <label htmlFor="inputPhoto4" className="form-label">
              Photo Profile
            </label>
            <div className="input-group mb-3">
              <input type="file" className="form-control" id="inputGroupFile02" onChange={handlePhotoChange} />
              <label className="input-group-text" for="inputGroupFile02">
                Upload
              </label>
            </div>
          </div>
          <div className="col-md-6 align-self-center">
            <div className="text-center">
              <img
                src={previewImage || photoProfile}
                alt={previewImage === null ? "Preview Default Picture" : "Preview IMG"}
                className="img-fluid img-thumbnail"
                style={{ maxHeight: "200px", maxWidth: "100%" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputName4" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="inputName4" value={name || ""} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPosition4" className="form-label">
              Position
            </label>
            <input type="text" className="form-control" id="inputPosition4" value={position || ""} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div className="col-12">
            <label htmlFor="inputSummary" className="form-label">
              Summary
            </label>
            <textarea className="form-control" id="inputSummary" value={summary || ""} onChange={(e) => setSummary(e.target.value)} style={{ height: "200px" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
