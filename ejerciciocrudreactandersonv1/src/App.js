import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Container, Row, Col, Card, Button } from 'react-bootstrap';
import UserList from './UserList';
import UserForm from './UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleCreateUser = (userData) => {
    axios.post('https://api.escuelajs.co/api/v1/users', userData)
      .then(response => {
        fetchUsers();
        setShowForm(false);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleEditUser = (userId, userData) => {
    axios.put(`https://api.escuelajs.co/api/v1/users/${userId}`, userData)
      .then(response => {
        fetchUsers();
        setShowForm(false);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`https://api.escuelajs.co/api/v1/users/${userId}`)
      .then(response => {
        fetchUsers();
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleShowForm = () => {
    setShowForm(true);
    setSelectedUser(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>User List</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button onClick={handleShowForm}>Add User</Button>
          {showForm && <UserForm onSubmit={selectedUser ? handleEditUser : handleCreateUser} onCancel={handleCancelForm} initialValues={selectedUser || {}} />}
          <UserList users={users} onEdit={handleEditClick} onDelete={handleDeleteUser} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

