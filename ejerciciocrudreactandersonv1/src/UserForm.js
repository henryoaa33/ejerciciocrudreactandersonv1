import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ onSubmit, onCancel, initialValues }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default UserForm;
