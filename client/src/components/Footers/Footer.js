import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://bhaelar.github.io"
                rel="noopener noreferrer"
                target="_blank"
              >
                Okenla Abdul-Basit
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.linkedin.com/in/bhaelar"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://www.github.com/bhaelar"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="http://bhaelar.github.io"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Website
                </NavLink>
              </NavItem>

              
            </Nav>
          </Col>
        </Row>
        <Row className="mt-3 align-items-center justify-content-xl-between">
          <Col>
            <div className="copyright text-center text-muted">
              Template by
              <a
                className="font-weight-bold ml-1"
                href="https://www.creative-tim.com/?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Creative Tim
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
