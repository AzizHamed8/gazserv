import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from 'axios';

const getCamionById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/camions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching camion', error);
    throw error;
  }
};

const updateCamion = async (id, camion) => {
  try {
    await axios.put(`http://localhost:5000/camions/${id}`, camion);
  } catch (error) {
    console.error('Error updating camion', error);
    throw error;
  }
};

const createCamion = async (camion) => {
  try {
    await axios.post('http://localhost:5000/camions', camion);
  } catch (error) {
    console.error('Error creating camion', error);
    throw error;
  }
};

function AddCamion() {
  const { id } = useParams(); // Get the id from the route
  const history = useHistory();
  const [serie, setSerie] = useState("");
  const [chassis, setChassis] = useState("");
  const [type, setType] = useState("");
  const [maxQt, setmaxQt] = useState("");
  const [statut, setStatut] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch data if id is present
      getCamionById(id)
        .then(data => {
          setSerie(data.serie);
          setChassis(data.chassis); // Adjust according to your API response
          setType(data.type);
          setmaxQt(data.maxQt);
          setStatut(data.statut);
        })
        .catch(error => console.error('Error fetching camion', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const camion = { serie, chassis: chassis, type, maxQt, statut };
      if (id) {
        await updateCamion(id, camion); // Update existing camion
      } else {
        await createCamion(camion); // Create new camion
      }
      history.push('/admin/camion'); // Redirect to the camions page
    } catch (error) {
      console.error('Error saving camion', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container fluid>
      <Row>
        <Col md="6">
          <img src={require("assets/img/logo.png")} alt="Logo" style={{ height: "600px", width: "600px", marginLeft: "100px" }} />
        </Col>
        <Col md="4" style={{ marginTop: "50px" }}>
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Row>
                <Col lg={8}>
                  <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold", marginTop: "7px" }}>
                    {id ? 'Modifier le camion' : 'Ajouter un camion'}
                  </Card.Title>
                </Col>
                <Col>
                  <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "white" }}>
                    <Link to="/admin/camion" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="border p-2">
                <Form.Group controlId="serie">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px" }}>Série</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez la série du camion"
                    value={serie}
                    onChange={(e) => setSerie(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="chassis">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px" }}>Numéro de châssis</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez le numéro de châssis du camion"
                    value={chassis}
                    onChange={(e) => setChassis(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="type">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez le type de camion"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="maxQt">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Quantité maximale</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez la quantité maximale"
                    value={maxQt}
                    onChange={(e) => setmaxQt(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="statut">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Statut</Form.Label>
                  <Form.Control
                    as="select"
                    value={statut}
                    onChange={(e) => setStatut(e.target.value)}
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="en_panne">En panne</option>
                  </Form.Control>
                </Form.Group>
                <Button type="submit" className="btn" style={{ background: "#282828", color: "white", borderColor: "#282828", marginTop: "20px", marginLeft: "170px" }}>
                  {id ? 'Modifier' : 'Ajouter'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCamion;
