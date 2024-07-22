import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

// Mocked data fetching function
const fetchProgrammeDetails = async (id) => {
  // Replace this with your actual data fetching logic
  return {
    id: id,
    nbPleine: 150,
    nbVide: 50,
    statut: 'En cours',
    adresses: ['Station 1', 'Station 2']
  };
};

function DetailsP() {
  const { id } = useParams(); // Retrieve the id from route parameters
  const [programme, setProgramme] = useState(null);

  useEffect(() => {
    // Fetch details when component mounts
    const fetchData = async () => {
      const data = await fetchProgrammeDetails(id);
      setProgramme(data);
    };

    fetchData();
  }, [id]);

  if (!programme) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="4"></Col>
          <Col md="4" style={{ marginTop: "100px" }}>
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Row>
                  <Col lg="8">
                    <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold" }}>
                      Programme Details
                    </Card.Title>
                  </Col>
                  <Col>
                    <Button className="btn" style={{ background: "#039388", color: "white" }}>
                      <Link to="/admin/programme" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <ul className="list-group list-group-light list-group-small">
                  <li className="list-group-item">ID: {programme.id}</li>
                  <li className="list-group-item">Nombre de bouteilles pleines: {programme.nbPleine}</li>
                  <li className="list-group-item">Nombre de bouteilles vides: {programme.nbVide}</li>
                  <li className="list-group-item">Statut: {programme.statut}</li>
                  <li className="list-group-item">
                    Adresses:
                    <ul>
                      {programme.adresses.map((adresse, index) => (
                        <li key={index}>{adresse}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
                <Button className="btn" style={{ background: "#282828", color: "white" }}>
                  Modifier
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailsP;
