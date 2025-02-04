import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <section
      style={{ backgroundColor: "#151518", color: "white" }}
      className="mt-4"
    >
      <Container>
        <footer className="py-4">
          <Row className="align-items-start">
            <Col md={3} className="mb-3">
              <div className="d-flex align-items-center">
                {/* <img id='footer-img' src={amartekLogo} /> */}
                GDPT 29
                <br />
                PT Bumi Amartha Teknologi Mandiri
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <h6 className="mb-2 fw-bold text-uppercase">Services</h6>
              <Nav className="flex-column">
                <Nav.Link href="#" className="text-white">
                  Branding
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Design
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Marketing
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Advertisement
                </Nav.Link>
              </Nav>
            </Col>
            <Col md={3} className="mb-3">
              <h6 className="mb-2 fw-bold text-uppercase">Company</h6>
              <Nav className="flex-column">
                <Nav.Link href="#" className="text-white">
                  About us
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Contact
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Jobs
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Press kit
                </Nav.Link>
              </Nav>
            </Col>
            <Col md={3} className="mb-3">
              <h6 className="mb-2 fw-bold text-uppercase">Legal</h6>
              <Nav className="flex-column">
                <Nav.Link href="#" className="text-white">
                  Terms of use
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Privacy policy
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Cookie policy
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </footer>
      </Container>
    </section>
  );
};

export default Footer;
