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

const fetchChauffeurs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/chauffeurs');
    return response.data;
  } catch (error) {
    console.error('Error fetching chauffeurs', error);
    return [];
  }
};

function Chauffeur() {
  const [chauffeurs, setChauffeurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChauffeurs();
      setChauffeurs(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/chauffeurs/${id}`);
      setChauffeurs(chauffeurs.filter(chauffeur => chauffeur.id !== id));
    } catch (error) {
      console.error('Error deleting chauffeur', error);
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
                    <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold" }}>Chauffeur</Card.Title>
                    <p className="card-category">
                      Liste des chauffeurs
                    </p>
                  </Col>
                  <Col lg="4">
                    <Button className="btn" style={{ background: "#039388", color: "white" , borderColor: "white" }}>
                      <Link to="/addChauf" style={{ textDecoration: 'none', color: 'inherit' }}>Ajouter</Link>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead className="text-center">
                    <tr className="text-center">
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>ID</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Nom</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Prenom</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Email</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Statut</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chauffeurs.map(chauffeur => (
                      <tr key={chauffeur.id}>
                        <td>{chauffeur.id}</td>
                        <td>{chauffeur.nom}</td>
                        <td>{chauffeur.prenom}</td>
                        <td>{chauffeur.email}</td>
                        <td>{chauffeur.statut}</td>
                        <td>
                          <Button className="btn" style={{ background: "white", color: "#282828" , borderColor: "white" }} onClick={() => handleDelete(chauffeur.id)}>
                            Supprimer
                          </Button>
                          <Button className="btn" style={{ background: "#282828", color: "white" , borderColor: "black" , marginLeft:"10px"}}>
                            <Link to={`/details/${chauffeur.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Details</Link>
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

export default Chauffeur;
