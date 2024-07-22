import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

// Mocked data fetching functions
const fetchChauffeurs = async () => {
  // Replace with your actual data fetching logic
  return [
    { id: 1, name: 'Chauffeur 1' },
    { id: 2, name: 'Chauffeur 2' },
  ];
};

const fetchCamions = async () => {
  // Replace with your actual data fetching logic
  return [
    { id: 1, name: 'Camion 1' },
    { id: 2, name: 'Camion 2' },
  ];
};

const fetchClients = async () => {
  // Replace with your actual data fetching logic
  return [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' },
  ];
};

function AddProg() {
  const [bouteillesPleine, setBouteillesPleine] = useState("");
  const [bouteillesVide, setBouteillesVide] = useState(0);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [camions, setCamions] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      const [chauffeurData, camionData, clientData] = await Promise.all([
        fetchChauffeurs(),
        fetchCamions(),
        fetchClients(),
      ]);
      setChauffeurs(chauffeurData);
      setCamions(camionData);
      setClients(clientData);
    };

    fetchData();
  }, []);

  const handleClientChange = (event) => {
    const client = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedClients([...selectedClients, client]);
    } else {
      setSelectedClients(selectedClients.filter((c) => c !== client));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  return (
    <Container fluid>
      <Row>
        <Col md="4"></Col>
        <Col md="4" style={{ marginTop: "50px" }}>
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Row>
                <Col lg={8}>
                  <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold", marginTop:"7px" }}>
                    Ajouter un Programme
                  </Card.Title>
                </Col>
                <Col>
                  <Button className="btn" style={{ background: "#039388", color: "white", borderColor:"white" }}>
                    <Link to="/admin/programme" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="border p-3">
                <Form.Group controlId="chauffeur">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px" }}>Chauffeur</Form.Label>
                  <Form.Control as="select" required>
                    <option value="">Sélectionnez le chauffeur</option>
                    {chauffeurs.map(chauffeur => (
                      <option key={chauffeur.id} value={chauffeur.id}>{chauffeur.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="camion">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px", marginTop:"10px" }}>Camion</Form.Label>
                  <Form.Control as="select" required>
                    <option value="">Sélectionnez le camion</option>
                    {camions.map(camion => (
                      <option key={camion.id} value={camion.id}>{camion.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="bouteillesPleine">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px", marginTop:"10px" }}>Nombre de bouteilles pleines</Form.Label>
                  <Form.Control type="number" placeholder="Entrez le nombre de bouteilles pleines" value={bouteillesPleine} onChange={(e) => setBouteillesPleine(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="bouteillesVide">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px", marginTop:"10px" }}>Nombre de bouteilles vides</Form.Label>
                  <Form.Control type="number" placeholder="Entrez le nombre de bouteilles vides" value={bouteillesVide} onChange={(e) => setBouteillesVide(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="clients">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px", marginTop:"10px" }}>Liste des clients</Form.Label>
                  {clients.map(client => (
                    <div key={client.id}>
                      <Form.Check 
                        type="checkbox"
                        id={`client-${client.id}`}
                        label={client.name}
                        value={client.id}
                        onChange={handleClientChange}
                      />
                    </div>
                  ))}
                </Form.Group>

                <Button className="btn" style={{ background: "#282828", color: "white", borderColor:"#282828", marginTop:"20px" , marginLeft:"170px"}} type="submit">
                  Ajouter
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddProg;
