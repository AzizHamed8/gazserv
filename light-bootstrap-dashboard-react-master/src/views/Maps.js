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
import MapView from "components/MapView";

const fetchClients = async () => {
  try {
    const response = await axios.get('http://localhost:5000/clients');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients', error);
    return [];
  }
};

const deleteClient = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/clients/${id}`);
  } catch (error) {
    console.error('Error deleting client', error);
  }
};

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchClients();
      setClients(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteClient(id);
    setClients(clients.filter(client => client.id !== id));
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
                    <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold" }}>Clients</Card.Title>
                    <p className="card-category">Liste des clients</p>
                  </Col>
                  <Col lg="4">
                    <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "white" }}>
                      <Link to="/addClient" style={{ textDecoration: 'none', color: 'inherit' }}>Ajouter</Link>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead className="text-center">
                    <tr>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>ID</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Nom</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Adresse</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Mode Payment</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Statut</th>
                      <th className="border-0" style={{ color: "#039388", fontWeight: "bold" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map(client => (
                      <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.nom}</td>
                        <td>
                          {/* Show map with client address */}
                          <MapView address={client.adresse} />
                        </td>
                        <td>{client.modePay}</td>
                        <td>{client.statut}</td>
                        <td>
                          <Button
                            className="btn"
                            style={{ background: "white", color: "#282828", borderColor: "white" }}
                            onClick={() => handleDelete(client.id)}
                          >
                            Supprimer
                          </Button>
                          <Button
                            className="btn"
                            style={{ background: "#282828", color: "white", borderColor: "black", marginLeft: "10px" }}
                          >
                            <Link to={`/addClient/${client.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Modifier</Link>
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

export default Clients;
