import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Table,
  Image,
  Row,
  Col,
} from 'react-bootstrap';

function ViewButterfly() {
  // Getting the butterfly ID from the URL parameters
  const { id } = useParams();

  // Mock data for the butterfly's scientific information
  const butterflyInfo = {
    name: 'Monarch Butterfly',
    family: 'Nymphalidae',
    order: 'Lepidoptera',
    genus: 'Danaus',
    species: 'D. plexippus',
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={6} md={4}>
          <Image src={`${process.env.PUBLIC_URL}/images/monarch.png`} alt="Monarch Butterfly" fluid />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Table striped bordered hover>
            <tbody>
              {Object.entries(butterflyInfo).map(([key, value]) => (
                <tr key={key}>
                  <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewButterfly;
