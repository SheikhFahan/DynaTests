import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AuthContext from '../Context/AuthContext'


const NavbarComp = () => {
// this line is breaking my code
  let {name} = useContext(AuthContext);
  


  const logoFont = {
    fontSize : '40px',
    padding: '35px',
   

  }

  const navLink = {
    fontSize : '25px',
  }

  const maxContent = {
    width : 'max-content'
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary"  >
      <Container>
        <Navbar.Brand to="/"  as={Link} style={logoFont} >DynaTests</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={navLink}>
          <Nav className="me-auto">
            <Nav.Link to="" as={Link}>Home</Nav.Link>
            <Nav.Link to="/test" as={Link}>Test</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item to="" as={Link}>Action</NavDropdown.Item>
              <NavDropdown.Item to="" as={Link}>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item to="" as={Link}>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link to="" as={Link}>{name}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComp