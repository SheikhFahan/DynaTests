import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import AuthContext from "../Context/AuthContext";

const CreateCategoriesComp = () => {
  const { AuthTokens } = useContext(AuthContext);

  const baseUrl = "http://127.0.0.1:8000/api/group_tests/";
  const [data, setData] = useState({
    name: "",
  });

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${baseUrl}group_test_categories`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      console.log("Response :", response.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
  };
  const formStyle = {
    maxWidth: "fit-content",
  };

  const submit = {
    float: "inline-end",
  };

  return (
    <>
      <Container style={containerStyle}>
        <form style={formStyle} onSubmit={handleUpload}>
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <Form.Control
              name="Name"
              placeholder="Enter The Category Name"
              aria-label="label for category"
              aria-describedby="basic-addon1"
              required
              onChange={(e) => setData({ name: e.target.value })}
            />
          </InputGroup>
          <Button variant="primary" type="submit" style={submit}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};
export default CreateCategoriesComp;
