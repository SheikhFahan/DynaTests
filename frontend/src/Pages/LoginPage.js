import React from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../Context/AuthContext'


const LoginPage = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Username" />
        <Form.Text className="text-muted">
          consider your account hacked.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LoginPage