import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";

// Fetch camions from the API
const fetchCamions = async () => {
  try {
    const response = await axios.get('http://localhost:5000/camions');
    return response.data;
  } catch (error) {
    console.error('Error fetching camions', error);
    return [];
  }
};

function Camions() {
  const [camions, setCamions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCamions();
      setCamions(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/camions/${id}`);
      setCamions(camions.filter(camion => camion.id !== id)); // Remove deleted camion from state
    } catch (error) {
      console.error('Error deleting camion', error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Row>
                  <Col lg="8">
                    <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold" }}>Camions</Card.Title>
                    <p className="card-category">
                      Liste des camions
                    </p>
                  </Col>
                  <Col lg="4">
                    <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "white" }}>
                      <Link to="/addCamion" style={{ textDecoration: 'none', color: 'inherit' }}>Ajouter</Link>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead className="text-center">
                    <tr>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Série</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Numéro de chassis</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Type</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Maximum quantité</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Statut</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {camions.map(camion => (
                      <tr key={camion.id}>
                        <td>{camion.serie}</td>
                        <td>{camion.numChassis}</td>
                        <td>{camion.type}</td>
                        <td>{camion.maxQuantite}</td>
                        <td>{camion.statut}</td>
                        <td>
                          <Button className="btn" style={{ background: "white", color: "#282828", borderColor: "white" }} onClick={() => handleDelete(camion.id)}>
                            Supprimer
                          </Button>
                          <Button className="btn" style={{ background: "#282828", color: "white", borderColor: "black", marginLeft: "10px" }}>
                            <Link to={`/addCamion/${camion.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Modifier</Link>
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

export default Camions;
