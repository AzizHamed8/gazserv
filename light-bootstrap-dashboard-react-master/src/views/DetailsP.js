import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';

// Fetch data from API
const fetchProgrammeDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/programmes/${id}`); // Replace with your backend API URL
    return response.data;
  } catch (error) {
    console.error("Error fetching programme details", error);
    return null;
  }
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
                    <Button className="btn" style={{ background: "#039388", color: "white" , borderColor: "white" }}>
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
                    Clients:
                    <ul>
                      {programme.clients && programme.clients.length > 0 ? (
                        programme.clients.map((client, index) => (
                          <li key={index}>{client.nom} {client.prenom} : {client.adresse}</li>
                        ))
                      ) : (
                        <li>Aucun client disponible</li>
                      )}
                    </ul>
                  </li>
                </ul>
                <Button className="btn" style={{ background: "#282828", color: "white", borderColor: "black" , marginTop:"10px" }}>
  <Link to={`/addProg/${programme.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Modifier</Link>
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
