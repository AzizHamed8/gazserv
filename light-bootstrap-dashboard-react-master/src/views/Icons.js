import React, { useState, useEffect } from "react";
import axios from 'axios'; // Ensure axios is imported
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Table } from "react-bootstrap";

// Fetch programmes function
const fetchProgrammes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/programmes');
    return response.data;
  } catch (error) {
    console.error('Error fetching programmes', error);
    return [];
  }
};

function Programme() {
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProgrammes();
      setProgrammes(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/programmes/${id}`);
      setProgrammes(programmes.filter(programme => programme.id !== id)); // Fixed typo here
    } catch (error) {
      console.error('Error deleting programme', error);
    }
  };

  return (
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
                  <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "white" }}>
                    <Link to="/addProg" style={{ textDecoration: 'none', color: 'inherit' }}>Ajouter</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover">
                <thead className="text-center">
                  <tr className="text-center">
                    <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>ID</th>
                    <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Bouteille vide</th>
                    <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Bouteille pleine</th>
                    <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Statut</th>
                    <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {programmes.map(programme => (
                    <tr key={programme.id}>
                      <td>{programme.id}</td>
                      <td>{programme.nbVide}</td>
                      <td>{programme.nbPleine}</td>
                      <td>{programme.statut}</td>
                      <td>
                        <Button className="btn" style={{ background: "white", color: "#282828", borderColor: "white" }} onClick={() => handleDelete(programme.id)}>
                          Supprimer
                        </Button>
                        <Button className="btn" style={{ background: "#282828", color: "white", borderColor: "black", marginLeft: "10px" }}>
                          <Link to={`/detailsP/${programme.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Détails</Link>
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
  );
}

export default Programme;
