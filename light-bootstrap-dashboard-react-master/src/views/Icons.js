import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// Mocked data fetching function
const fetchProgrammes = async () => {
  // Replace with your actual data fetching logic
  return [
    { id: 1, chauffeur: 'Chauffeur 1', camion: 'Camion 1', nbPleine: 200, statut: 'non terminé' },
    { id: 2, chauffeur: 'Chauffeur 2', camion: 'Camion 2', nbPleine: 150, statut: 'terminé' },
  ];
};

function Programme() {
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      const data = await fetchProgrammes();
      setProgrammes(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Row>
                  <Col lg="8">
                    <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold" }}>Programme</Card.Title>
                    <p className="card-category">
                      Liste des programmes
                    </p>
                  </Col>
                  <Col lg="4">
                    <Button className="btn" style={{ background: "#039388", color: "white" }}>
                      <Link to="/addProg" style={{ textDecoration: 'none', color: 'inherit' }}>Ajouter</Link>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead className="text-center">
                    <tr>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>ID</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Chauffeur</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Camion</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Nombre bouteilles pleines</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Statut</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programmes.map(programme => (
                      <tr key={programme.id}>
                        <td>{programme.id}</td>
                        <td>{programme.chauffeur}</td>
                        <td>{programme.camion}</td>
                        <td>{programme.nbPleine}</td>
                        <td>{programme.statut}</td>
                        <td>
                          <Button className="btn" style={{ background: "white", color: "#282828" }}>
                            Supprimer
                          </Button>
                          <Button className="btn" style={{ background: "#282828", color: "white" }}>
                            <Link to={`/detPogramme/${programme.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Details</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Programme;
