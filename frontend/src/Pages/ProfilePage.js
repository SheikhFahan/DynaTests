import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import GraphComp from "../Components/GraphComp";


const ProfileCard = () => {
  let [profileData, setProfileData] = useState([]);
  let [graphCategories, setgraphCategories] = useState([]);
  let [graphData, setGraphData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {AuthTokens} = useContext(AuthContext)




  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/profile/",  {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },})
      .then((response) => setProfileData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/categories/",  {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },})
      .then((response) => setgraphCategories(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [selectedOption, setSelectedOption] = useState('default');

  const handleOptionClick = (pk) => {
    axios.get(`http://127.0.0.1:8000/api/user/${pk}/marks/`,{
        headers: {
            Authorization : `Bearer ${AuthTokens.access}`,
        },
    })
    .then((response) => {
        setGraphData(response.data);
        setSelectedCategory(pk);
    })
    .catch((error) => console.error("error fetching data", error));
  };

  return (
    <Container fluid>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title> {profileData.name} </Card.Title>
          <Card.Header>{profileData.email}</Card.Header>
          <Card.Header>{profileData.phone}</Card.Header>
          <Card.Text>This is the professor detail</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <div style={{ display: 'flex', gap: '10px' }}>
        {
            graphCategories.map((category) => (
                <button key= {category.pk} onClick={() => handleOptionClick(category.pk)}
                style={{ fontWeight: selectedCategory === category.pk ? 'bold' : 'normal' }}
                >
                    {category.name}
                </button>
                
            ))
        }

      </div>
      {selectedCategory && graphData && <GraphComp data ={graphData}/>}
      {/* {!graphData && <div>Select an option from the second navbar</div>} */}
    </Container>
  );
};

export default ProfileCard;
