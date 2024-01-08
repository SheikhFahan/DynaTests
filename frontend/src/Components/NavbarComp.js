import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import AuthContext from "../Context/AuthContext";

const NavbarComp = () => {
  // this line is breaking my code
  let { user, logoutUser } = useContext(AuthContext);

  const logoFont = {
    fontSize: "40px",
    padding: "35px",
  };

  const navLink = {
    fontSize: "25px",
  };

  const maxContent = {
    width: "max-content",
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand to="/" as={Link} style={logoFont}>
          DynaTests
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={navLink}>
          <Nav className="me-auto">
            <Nav.Link to="" as={Link}>
              Home
            </Nav.Link>
            <Nav.Link to="/test" as={Link}>
              Test
            </Nav.Link>
            {!user && (
              <Nav.Link to="/login" as={Link} className="mx-3">
                Login
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link to="/register" as={Link} className="mx-3">
                Register
              </Nav.Link>
            )}

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item to="/institution_dashboard/create_group_test/" as={Link}>
                upload group test
              </NavDropdown.Item>
              {user && (
                <NavDropdown.Item to="/institution_dashboard" as={Link}>
                  Institution Dashboard
                </NavDropdown.Item>
              )}
              <NavDropdown.Item as={Link}>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="">Separated link</NavDropdown.Item>
            </NavDropdown>
            {user && (
              <Nav.Link to="/profile" as={Link} className="mx-3">
                {user.username}
              </Nav.Link>
            )}
            {user && (
              <Nav.Link to="/categories" as={Link} className="mx-3">
                Categories
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                to="/logout"
                as={Link}
                className="mx-3"
                onClick={logoutUser}
              >
                logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
