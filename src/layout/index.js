import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

let Layout = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <div className="flex-grow-1">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
