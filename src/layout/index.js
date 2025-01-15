import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

let Layout = () => {
  return (
    <>
      <div>
        <Navbar />

        <Outlet />
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;