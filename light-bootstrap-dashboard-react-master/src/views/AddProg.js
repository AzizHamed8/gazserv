import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';

// API functions
const fetchChauffeurs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/chauffeurs');
    return response.data;
  } catch (error) {
    console.error('Error fetching chauffeurs:', error);
    throw error;
  }
};

const fetchCamions = async () => {
  try {
    const response = await axios.get('http://localhost:5000/camions');
    return response.data;
  } catch (error) {
    console.error('Error fetching camions:', error);
    throw error;
  }
};

const fetchClients = async () => {
  try {
    const response = await axios.get('http://localhost:5000/clients');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

const createProgramme = async (programme) => {
  try {
    await axios.post('http://localhost:5000/programmes', programme);
  } catch (error) {
    console.error('Error creating programme:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const updateProgramme = async (id, programme) => {
  try {
    await axios.put(`http://localhost:5000/programmes/${id}`, programme);
  } catch (error) {
    console.error('Error updating programme:', error.response ? error.response.data : error.message);
    throw error;
  }
};

function AddProg() {
  const [bouteillesPleine, setBouteillesPleine] = useState("");
  const [bouteillesVide, setBouteillesVide] = useState(0);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [camions, setCamions] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [statut, setStatut] = useState('terminé'); // Default value
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chauffeurData, camionData, clientData] = await Promise.all([
          fetchChauffeurs(),
          fetchCamions(),
          fetchClients(),
        ]);

        // Filter active entities
        const activeChauffeurs = chauffeurData.filter(chauffeur => chauffeur.statut === 'active');
        const activeCamions = camionData.filter(camion => camion.statut === 'actif');

        setChauffeurs(activeChauffeurs);
        setCamions(activeCamions);
        setClients(clientData);

        if (id) {
          // Fetch existing programme details for editing
          const programmeResponse = await axios.get(`http://localhost:5000/programmes/${id}`);
          const programmeData = programmeResponse.data;
          setBouteillesPleine(programmeData.nbPleine);
          setBouteillesVide(programmeData.nbVide);
          setSelectedClients(programmeData.clientIds || []); // Handle empty clientIds array
          setStatut(programmeData.statut);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleClientChange = (event) => {
    const clientId = parseInt(event.target.value, 10);
    setSelectedClients(prevSelectedClients =>
      prevSelectedClients.includes(clientId)
        ? prevSelectedClients.filter(id => id !== clientId)
        : [...prevSelectedClients, clientId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const programmeData = {
        nbPleine: parseInt(bouteillesPleine, 10),
        nbVide: parseInt(bouteillesVide, 10),
        chauffeurId: parseInt(event.target.chauffeur.value, 10),
        camionId: parseInt(event.target.camion.value, 10),
        statut: statut,
        clientIds: selectedClients,
      };

      console.log("Sending programme data:", programmeData);

      if (id) {
        await updateProgramme(id, programmeData);
        console.log("Programme updated successfully!");
      } else {
        await createProgramme(programmeData);
        console.log("Programme added successfully!");
      }

      history.push('/admin/programme');
    } catch (error) {
      console.error('Error submitting programme:', error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const errorMessages = Array.isArray(errorData.message) ? errorData.message : [errorData.message];
        setError(`Failed to submit programme: ${errorMessages.join(', ')}`);
      } else {
        setError('Failed to submit programme');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container fluid>
      <Row>
        <Col md="4" style={{ marginTop: "50px", marginLeft:"200px" }}>
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Row>
                <Col lg={8}>
                  <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold", marginTop: "7px" }}>
                    {id ? "Modifier un Programme" : "Ajouter un Programme"}
                  </Card.Title>
                </Col>
                <Col>
                  <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "white" }}>
                    <Link to="/admin/programme" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} className="border p-3">
                <Form.Group controlId="chauffeur">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px" }}>Chauffeur</Form.Label>
                  <Form.Control as="select" required defaultValue={id ? "loading" : ""}>
                    <option value="">Sélectionnez le chauffeur</option>
                    {chauffeurs.map(chauffeur => (
                      <option key={chauffeur.id} value={chauffeur.id}>{chauffeur.nom} {chauffeur.prenom}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="camion">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Camion</Form.Label>
                  <Form.Control as="select" required defaultValue={id ? "loading" : ""}>
                    <option value="">Sélectionnez le camion</option>
                    {camions.map(camion => (
                      <option key={camion.id} value={camion.id}>{camion.type}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="bouteillesPleine">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Nombre de bouteilles pleines</Form.Label>
                  <Form.Control type="number" placeholder="Entrez le nombre de bouteilles pleines" value={bouteillesPleine} onChange={(e) => setBouteillesPleine(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="bouteillesVide">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Nombre de bouteilles vides</Form.Label>
                  <Form.Control type="number" placeholder="Entrez le nombre de bouteilles vides" value={bouteillesVide} onChange={(e) => setBouteillesVide(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="statut">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Statut</Form.Label>
                  <Form.Control as="select" value={statut} onChange={(e) => setStatut(e.target.value)} required>
                    <option value="terminé">Terminé</option>
                    <option value="non terminé">Non terminé</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="clients">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Clients</Form.Label>
                  {clients.map(client => (
                    <Form.Check
                      key={client.id}
                      type="radio"
                      label={`${client.nom} ${client.prenom}`}
                      value={client.id}
                      checked={selectedClients.includes(client.id)}
                      onClick={handleClientChange}
                    />
                  ))}
                </Form.Group>

                <Button variant="primary" type="submit" style={{ background: "#6ACAB3", color: "white", borderColor: "white" }}>
                  {id ? "Modifier" : "Ajouter"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
        </Col>
        <Col md="4">
          <img src={require("assets/img/3331617.jpg")} alt="Logo" style={{ height: "400px", width: "400px", marginLeft: "100px" ,marginTop:"200px"}} />
        </Col>
      </Row>
    </Container>
  );
}

export default AddProg;
