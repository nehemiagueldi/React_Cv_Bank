import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useParams } from "react-router";
import { getCVPersonData, postCVPersonData } from "../../service/CVBank";

const User = () => {
  let [name, setName] = useState(null);
  let [position, setPosition] = useState(null);
  let [summary, setSummary] = useState(null);
  let { randomString } = useParams();
  useEffect(() => {
    let getCVPerson = async () => {
      try {
        let result = await getCVPersonData(randomString);
        setName(result.cvPerson.person.name);
        setPosition(result.cvPerson.position);
        setSummary(result.cvPerson.summary);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    getCVPerson();
  }, [randomString]);
  return (
    <>
      <div className="container">
        <form className="row g-3" action={postCVPersonData(randomString)}>
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
            <textarea className="form-control" id="inputSummary" value={summary || ""} onChange={(e) => setSummary(e.target.value)} />
          </div>
          {/* <div className="col-md-6">
            <label for="inputCity" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="col-md-4">
            <label for="inputState" className="form-label">
              State
            </label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="col-md-2">
            <label for="inputZip" className="form-label">
              Zip
            </label>
            <input type="text" className="form-control" id="inputZip" />
          </div> */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default User;
