import React from "react";
import Footer from "../Footer";
import Project from "../Project";
import Training from "../Training";
import Skills from "../Skills";
import Profile from "../Profile";

const CVBank = () => {
  return (
    <>
      <div
        className="d-flex flex-column"
        style={{
          backgroundImage: "url(https://res.cloudinary.com/dpuqafk1w/image/upload/v1735032859/Mas_Naufal_CV_wdtxhm.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="container">
          <div className="text-end py-2">
            <img src="https://res.cloudinary.com/dpuqafk1w/image/upload/v1735014395/8ASEV77SME3B6QXCXK6XALAX5R7SK5CWSB6NHPEF-609b611e_bd48vi.png" alt="" style={{ width: "25%" }} />
          </div>
          <div className="bg-white bg-opacity-75 p-3">
            {/* Profile */}
            <Profile/>
            {/* Skills */}
            <Skills/>
            {/* Profesional Experiences */}
            <div>
              <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
                Profesional Experiences
              </h5>
            </div>
            {/* Projects */}
            <Project/>
            {/* Training */}
            <Training/>
            {/* Education */}
            <div>
              <h5 className="text-white text-center rounded p-3 text-uppercase fw-bold" style={{ backgroundColor: "#0B2343" }}>
                Education
              </h5>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CVBank;
