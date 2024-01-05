import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import AuthContext from "../Context/AuthContext";

const GroupTestUplaod = () => {
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "", // Replace with actual category data
    easyTestFile: null,
    mediumTestFile: null,
    hardTestFile: null,
    hasPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formPwdData, setFormPwdData] = useState({
    pk: "",
    password: "",
    confirmPassword : "",
  });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0], // Assuming single file uploads
    });
  };
  const { AuthTokens } = useContext(AuthContext);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const {name, value} = e.target;
    setFormPwdData({
      ...formPwdData, 
      [name] : value,
    })
  }

  useEffect(() => {
    handlePwdUpload();
  }, [formPwdData.pk])

  // handle fetch from backend for test categories
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/group_tests/group_test_categories")
      .then((response) => {
        setCategory(response.data);
      })

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //handles upload of file
  const handleUpload = async (e) => {
    e.preventDefault();
    if (formPwdData.password && formPwdData.password !== formPwdData.confirmPassword) {
      console.log(formPwdData.password, formPwdData.confirmPassword)
      return alert("passwords don't match");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("easy_test_file", formData.easyTestFile);
    formDataToSend.append("medium_test_file", formData.mediumTestFile);
    formDataToSend.append("hard_test_file", formData.hardTestFile);
    formDataToSend.append("has_password", formData.hasPassword);
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
      console.log("Response:", response.status);

      if (response.status === 201 && showPassword) {
        setFormPwdData((prevFormPwdData) => ({
          ...prevFormPwdData,
          pk: response.data.pk,
        }));
      }
      console.log(formPwdData.pk)
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePwdUpload= async (e) => {
    const formData = new FormData()
    formData.append('test', formPwdData.pk);
    formData.append('password', formPwdData.password)

    try{
      const response = await axios.post(
            "http://127.0.0.1:8000/api/group_tests/create_group_test_passwords",
            formData,
            {
              headers: {
                "Content-Type" : "multipart/form-data",
                Authorization :  `Beared ${AuthTokens.access}`,
              }
            }
      );
      console.log("Response2 :", response.data)
      if(response.status == 201){
        return alert("Protected Test SuccessfullyCreated")
      }
    }catch (error){
      console.error(error)
    }
  }
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
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
            <Form.Label htmlFor="easyTestFile">
              Select Easy Test File:
            </Form.Label>
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
            <Form.Label htmlFor="easyTestFile">
              Select Medium Test File:
            </Form.Label>
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
            <Form.Label htmlFor="easyTestFile">
              Select Hard Test File:
            </Form.Label>
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
            onChange={(e) => {
              setFormData({ ...formData, hasPassword: e.target.checked });
              toggleShowPassword();
            }}
          />
          {showPassword && (
            <>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={formPwdData.password}
                  onChange={handlePasswordChange}
                  required={formPwdData.password}
                />
              </InputGroup>

              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text id="basic-addon1">
                  Confirm Password
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  aria-describedby="basic-addon1"
                  value={formPwdData.confirmPassword}
                  onChange={handlePasswordChange}
                  required={formPwdData.confirmPassword}
                />
              </InputGroup>
            </>
          )}

          <Button variant="primary" type="submit" style={submit}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};
export default GroupTestUplaod;
