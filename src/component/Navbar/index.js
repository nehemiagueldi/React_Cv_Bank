import React, { useState } from "react";
import {
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { Dropdown, Image } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdPersonAdd, IoMdSettings } from "react-icons/io";
import { PiPasswordFill } from "react-icons/pi";
import { TbLogin2, TbLogout2 } from "react-icons/tb";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <CNavbar
      expand="lg"
      className="px-5 bg-white shadow-sm sticky-top"
      color="white"
    >
      <CContainer fluid className="d-flex">
        <CNavbarBrand href="#" className="">
          <img
            src="https://res.cloudinary.com/dpuqafk1w/image/upload/v1735014395/8ASEV77SME3B6QXCXK6XALAX5R7SK5CWSB6NHPEF-609b611e_bd48vi.png"
            alt="Logo Amartek"
            style={{
              width: "30%",
              height: "30%",
              objectFit: "contain",
            }}
          />
        </CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          {visible ? (
            <>
              <CNavbarNav className="me-auto">
                <CNavItem>
                  <CNavLink href="/" active>
                    Dashboard
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/" active>
                    About Us
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">Contact Us</CNavLink>
                </CNavItem>
              </CNavbarNav>
              <Dropdown
                align="end"
                onToggle={(isOpen) => setIsMenuOpen(isOpen)}
                show={isMenuOpen}
                className="ms-auto"
              >
                {/* Custom Toggle */}
                <Dropdown.Menu className="p-2">
                  <Dropdown.Item className="d-flex align-items-center gap-2 rounded">
                    <BsPersonCircle
                      className="h-4 w-4"
                      style={{ marginRight: "0.5rem" }}
                    />
                    <span>Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex align-items-center gap-2 rounded">
                    <IoMdSettings
                      className="h-4 w-4"
                      style={{ marginRight: "0.5rem" }}
                    />
                    <span>Settings</span>
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex align-items-center gap-2 rounded text-danger">
                    <TbLogout2
                      className="h-4 w-4 text-danger"
                      style={{ marginRight: "0.5rem" }}
                    />
                    <span>Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <CNavbarNav className="me-auto d-flex gap-5 ps-5">
                <CNavItem>
                  <CNavLink href="/" active>
                    Dashboard
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#" active>
                    About Us
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="#">Contact Us</CNavLink>
                </CNavItem>
              </CNavbarNav>
              <Dropdown
                align="end"
                onToggle={(isOpen) => setIsMenuOpen(isOpen)}
                show={isMenuOpen}
                className="ms-auto"
              >
                {/* Custom Toggle */}
                <Dropdown.Toggle
                  as="div"
                  className="d-flex align-items-center gap-2 p-0"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    roundedCircle
                    alt="Default Avatar"
                    className="border border-dark"
                    src="https://res.cloudinary.com/debojimrw/image/upload/v1736410512/default_go00tp.jpg"
                    style={{ width: "32px", height: "32px" }}
                  />
                </Dropdown.Toggle>

                {/* Dropdown Menu */}
                <Dropdown.Menu className="p-2">
                  <Dropdown.Item
                    className="d-flex align-items-center gap-2 rounded"
                    href="/login"
                  >
                    <TbLogin2
                      className="h-4 w-4"
                      style={{ marginRight: "0.5rem" }}
                    />
                    <span>Login</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="d-flex align-items-center gap-2 rounded"
                    href="/register"
                  >
                    <IoMdPersonAdd
                      className="h-4 w-4"
                      style={{ marginRight: "0.5rem" }}
                    />
                    <span>Register</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

export default Navbar;
