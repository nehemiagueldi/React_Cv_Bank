import React from "react";
import ReactDOM from "react-dom/client";
import CVBank from "./component/CVBank";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Layout from "./layout";
import NotFound from "./component/NotFound";
import User from "./component/User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        <Route path="/user/:randomString" element={<User />} />
        </Route>
        <Route path="/cv/:randomString" element={<CVBank />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);
