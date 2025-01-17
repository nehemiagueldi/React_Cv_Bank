import React from "react";

const ProfileUser = ({ name, position, summary, setName, setPosition, setSummary }) => {
  return (
    <>
      <div className="col-md-6">
        <label htmlFor="inputName4" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" id="inputName4" value={name || ""} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="col-md-12">
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
    </>
  );
};

export default ProfileUser;
