import axios from "axios";
import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegisterPage = () => {
    let [email, setEmail] = useState("");

    let [passwords, setPasswords] = useState({
      password1: "",
      password2: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPasswords((prevPasswords) => ({
          ...prevPasswords,
          [name]: value,
        }));
      };
    
      const handleEmail = (e) => {
        setEmail(e.target.value);
      };

    let handleSubmit = async (e) => {
        if(passwords.password11 !== passwords.password2){
            return alert("passwords don't match")
        }
        const formData = new FormData();
        formData.append("email", email);
        formData.append("passwords.password1", passwords.password1)

        try {
            const response = axios.post(
                "//127.0.0.1:8000/api/create_user/", formData, {
                    headers :{
                        "Content-Type" : "application/json",
                    }
                }
            )
        } catch(error) {
            alert(error);
        }

    };
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Email" name = 'Email' onChange={handleEmail}/>
          <Form.Text className="text-muted">
            consider your account hacked.
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" name='password1' onChange={handleInputChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password Again" name='password2' onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
}

export default RegisterPage