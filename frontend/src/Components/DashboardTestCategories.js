import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

import axios from "axios";

import AuthContext from "../Context/AuthContext";

import React, { useState, useEffect, useContext } from "react";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";

export const DashboardTestCategories = (props) => {
  const mainUrl = "http://127.0.0.1:8000/api/group_tests/";
  const { compName, urlEnd } = props.data;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const { AuthTokens } = useContext(AuthContext);

  
  const getEndpoint = (name) => {
    switch (name) {
      case "Sub-Tests":
        return "create_group_test/";
        break;
      case "Test Categories":
        return "create_categories/";
        break;
      case "Test Combinations":
        return "create_combined_categories/";
        break;

      default:
        throw new Error(`Unexpected value for name: ${name}`);
    }
  };

  const creationPage = getEndpoint(compName);

  useEffect(() => {
    axios
      .get(`${mainUrl}${urlEnd}`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Available {compName}</Navbar.Brand>
        <Navbar.Toggle />
        <br />

        {data.map((item) => (
          <Nav.Link to="/" as={Link} key ={item.pk} className="mx-3">
            {item.title} {item.name}
          </Nav.Link>
        ))}

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text to={creationPage} as={Link}>
            <button > create new {compName}</button>
          </Navbar.Text>
          <Navbar.Text>
            <button> create new test session</button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardTestCategories;
