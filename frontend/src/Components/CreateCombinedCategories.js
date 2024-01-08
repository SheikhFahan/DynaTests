import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import AuthContext from "../Context/AuthContext";

const CreateCombinedCategories = () => {
  const [categories, setCategories] = useState([]);
  let [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    // when there is only one selection let the user unselect that
    const selectedValue = event.target.value;
    const isSelected = selectedOptions.includes(selectedValue);
  
    // Toggle selection
    if (isSelected) {
      setSelectedOptions((prevSelected) =>
      prevSelected.length > 1
        ? prevSelected.filter((option) => option !== selectedValue)
        : []
      );
      
    } else {
      setSelectedOptions((prevSelected) => [...prevSelected, selectedValue]);
    }
    

  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/group_tests/group_test_categories/")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("error fetching data"));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://127.0.0.1:8000/api/group_tests/group_test_combined_categories")
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
          <Form.Select
            size="lg"
            value={selectedOptions}
            name="select_categories"
            onChange={handleSelectChange}
            multiple
          >
            {categories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          <Button variant="primary" type="submit" style={submit}>
            Submit
          </Button>
        </form>
        <div>
          {/* Display selected categories */}
          <h2>Selected Categories:</h2>
          <ul>
            {selectedOptions.map((selectedOption) => (
              <li key={selectedOption}>{selectedOption}</li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default CreateCombinedCategories;
