import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Container, Row, Col, Card } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <Container>
      <Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {users.map(user => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src={user.avatar || 'default-avatar.png'} />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  Email: {user.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserList;
