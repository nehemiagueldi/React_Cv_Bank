import React from "react";
import ReactDOM from "react-dom/client";
import CVBank from "./component/CVBank";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./component/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cv" element={<CVBank />} />
      </Routes>
    </BrowserRouter>
  </>
);
