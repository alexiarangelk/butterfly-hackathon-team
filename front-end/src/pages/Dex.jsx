import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

function Dex() {
  const renderCard = (key) => (
    <Col key={key} xs={6} md={3}>
      <Link to={`/butterfly/${key}`}>
      <Card className="mb-4">
        <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/images/monarch.png`} alt="Monarch Butterfly" />
        <Card.Body>
          <Card.Text>Monarch Butterfly</Card.Text>
        </Card.Body>
      </Card>
      </Link>
    </Col>
  );

  return (
    <Container>
      <Row>
        {Array.from({ length: 12 }).map((_, index) => renderCard(index))}
      </Row>
    </Container>
  );
}

export default Dex;
