import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import AuthContext from "../Context/AuthContext";

const GroupTestUplaod = () => {
  const [category , setCategory] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',  // Replace with actual category data
    easyTestFile: null,
    mediumTestFile: null,
    hardTestFile: null,
    hasPassword: false,
  });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    console.log(files[0])
    setFormData({
      ...formData,
      [name]: files[0],  // Assuming single file uploads
    });
  };
  const { AuthTokens } = useContext(AuthContext);

  // handle fetch from backend for test categories
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/group_tests/group_test_categories")
      .then((response) => {
        setCategory(response.data)
        console.log(response.data)
      })
      
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //handles upload of file
  const handleUpload = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('easy_test_file', formData.easyTestFile);
    formDataToSend.append('medium_test_file', formData.mediumTestFile);
    formDataToSend.append('hard_test_file', formData.hardTestFile);
    formDataToSend.append('has_password', formData.hasPassword);

    console.log(formDataToSend);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/group_tests/create_group_test",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, category: e.target.value })
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
        <form
          style={formStyle}
          onSubmit={handleUpload}
          encType="multipart/form-data"
        >
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <Form.Control
              name="title"
              placeholder="Enter The Title"
              aria-label="label for title"
              aria-describedby="basic-addon1"
              required
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}  
            />
          </InputGroup>
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
            <Form.Control
              name="description"
              placeholder="Test Description'"
              aria-label="Description"
              aria-describedby="basic-addon1"
              required
              type="text"
              inputMode="text"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </InputGroup>
          <Form.Select
            size="lg"
            value={formData.category}
            name="select_category"
            onChange={handleSelectChange}
          >
            <option>Select Category</option>
            {category.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}{" "}
              </option>
            ))}
          </Form.Select>
          <br />

          <Form.Group className="position-relative mb-3">
          <Form.Label htmlFor="easyTestFile">Select Easy Test File:</Form.Label>
            <Form.Control
              type="file"
              required
              name="easyTestFile"
              accept=".xlsx"
              // value={fileData}
              onChange={handleFileChange}
              //   isInvalid={}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {/* {errors.file} */}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
          <Form.Label htmlFor="easyTestFile">Select Medium Test File:</Form.Label>
            <Form.Control
              type="file"
              required
              name="mediumTestFile"
              accept=".xlsx"
              // value={fileData}
              onChange={handleFileChange}
              //   isInvalid={}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {/* {errors.file} */}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
          <Form.Label htmlFor="easyTestFile">Select Hard Test File:</Form.Label>
            <Form.Control
              type="file"
              required
              name="hardTestFile"
              accept=".xlsx"
              // value={fileData}
              onChange={handleFileChange}
              //   isInvalid={}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {/* {errors.file} */}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Check
            className="mb-3"
            type="switch"
            id="custom-switch"
            label="Protect test with password?"
            checked={formData.hasPassword}
            onChange={(e) => setFormData({ ...formData, hasPassword: e.target.checked })}
          />

          <Button variant="primary" type="submit" style={submit}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};
export default GroupTestUplaod;