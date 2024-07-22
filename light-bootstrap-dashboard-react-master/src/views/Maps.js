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
const fetchClients = async () => {
  // Replace with your actual data fetching logic
  return [
    { id: 1, nom: 'Dakota', adresse: 'rue makawla congo', modePayment: 'tpe', statut: 'non payé' },
    { id: 2, nom: 'John Doe', adresse: '123 Main St', modePayment: 'cheque', statut: 'payé' },
  ];
};

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      const data = await fetchClients();
      setClients(data);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    // Handle delete action here
    console.log("Deleting client with ID:", id);
  };

  const handleEdit = (id) => {
    // Handle edit action here
    console.log("Editing client with ID:", id);
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
                    <p className="card-category">
                      Liste des clients
                    </p>
                  </Col>
                  <Col lg="4">
                    <Button className="btn" style={{ background: "#039388", color: "white" }}>
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
                        <td>{client.adresse}</td>
                        <td>{client.modePayment}</td>
                        <td>{client.statut}</td>
                        <td>
                          <Button className="btn" style={{ background: "white", color: "#282828" }} onClick={() => handleDelete(client.id)}>
                            Supprimer
                          </Button>
                          <Button className="btn" style={{ background: "#282828", color: "white" }} onClick={() => handleEdit(client.id)}>
                            Modifier
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
