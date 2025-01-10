import React from "react";
import Footer from "../Footer";
import Project from "../Project";
import Training from "../Training";
import Skills from "../Skills";
import Profile from "../Profile";
import Education from "../Education";
import WorkExp from "../WorkExp";

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
            <WorkExp />
            {/* Projects */}
            <Project/>
            {/* Training */}
            <Training/>
            {/* Education */}
            <Education />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default CVBank;
