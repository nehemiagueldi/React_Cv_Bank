import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

let Layout = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <div className="my-5 flex-grow-1 min-vh-50">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
