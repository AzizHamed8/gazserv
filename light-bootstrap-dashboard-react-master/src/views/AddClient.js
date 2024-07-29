import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Replace with your actual API key
const API_KEY = 'eef0004133e144cc801766d8189f66af';

function LocationMarker({ onSelectLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(event) {
      setPosition(event.latlng);
      onSelectLocation(event.latlng);
    }
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

const getClientById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client', error);
    throw error;
  }
};

const updateClient = async (id, client) => {
  try {
    await axios.put(`http://localhost:5000/clients/${id}`, client);
  } catch (error) {
    console.error('Error updating client', error);
    throw error;
  }
};

const createClient = async (client) => {
  try {
    await axios.post('http://localhost:5000/clients', client);
  } catch (error) {
    console.error('Error creating client', error);
    throw error;
  }
};

const fetchCoordinates = async (address) => {
  try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${API_KEY}`);
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error('No results found for the address');
    }
  } catch (error) {
    console.error('Error fetching coordinates', error);
    throw error;
  }
};

function AddClient() {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    nom: "",
    adresse: "",
    modePay: "",
    statut: "",
    latitude: null,
    longitude: null,
  });
  const [selectedLocation, setSelectedLocation] = useState({ lat: 51.505, lng: -0.09 }); // Default to London
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getClientById(id)
        .then(data => {
          setFormData({
            nom: data.nom,
            adresse: data.adresse,
            modePay: data.modePay,
            statut: data.statut,
            latitude: data.latitude,
            longitude: data.longitude,
          });
          if (data.latitude && data.longitude) {
            setSelectedLocation({ lat: data.latitude, lng: data.longitude });
          }
        })
        .catch(error => console.error('Error fetching client', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMapSelect = (location) => {
    setSelectedLocation(location);
    setFormData({
      ...formData,
      adresse: `Lat: ${location.lat}, Lng: ${location.lng}`,
      latitude: location.lat,
      longitude: location.lng,
    });
    console.log("Selected address:", location);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const client = {
        nom: formData.nom,
        adresse: formData.adresse,
        modePay: formData.modePay,
        statut: formData.statut,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };
      if (id) {
        await updateClient(id, client); // Update existing client
      } else {
        await createClient(client); // Create new client
      }
      history.push('/admin/client'); // Redirect to clients page
    } catch (error) {
      console.error('Error saving client', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container fluid>
      <Row>
        <Col md="4"></Col>
        <Col md="4" style={{ marginTop: "50px" }}>
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Row>
                <Col lg={8}>
                  <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold", marginTop: "7px" }}>
                    {id ? 'Modifier le client' : 'Ajouter un client'}
                  </Card.Title>
                </Col>
                <Col>
                  <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "white" }}>
                    <Link to="/admin/client" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="border p-3">
                <Form.Group controlId="nom">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px" }}>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez le nom du client"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="adresse">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Adresse</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Entrez l'adresse du client"
                      value={formData.adresse}
                      readOnly
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={async () => {
                        if (formData.adresse) {
                          try {
                            const coordinates = await fetchCoordinates(formData.adresse);
                            setSelectedLocation(coordinates);
                          } catch (error) {
                            console.error('Error fetching coordinates', error);
                            alert('Failed to fetch coordinates. Please check the address.');
                          }
                        } else {
                          alert('Please enter an address first.');
                        }
                      }}
                    >
                      Ouvrir la carte
                    </Button>
                  </InputGroup>
                </Form.Group>

                {selectedLocation && (
                  <MapContainer
                    center={selectedLocation}
                    zoom={13}
                    style={{ height: "300px", width: "100%", marginTop: "10px" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker onSelectLocation={handleMapSelect} />
                  </MapContainer>
                )}

                <Form.Group controlId="modePaiement">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Mode de Paiement</Form.Label>
                  <Form.Check
                    type="radio"
                    id="tpe"
                    label="TPE"
                    name="modePay"
                    value="TPE"
                    checked={formData.modePay === "TPE"}
                    onChange={handleChange}
                    required
                  />
                  <Form.Check
                    type="radio"
                    id="cheque"
                    label="Chèque"
                    name="modePay"
                    value="cheque"
                    checked={formData.modePay === "cheque"}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    id="espece"
                    label="Espèce"
                    name="modePay"
                    value="espece"
                    checked={formData.modePay === "espece"}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="statut">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Statut</Form.Label>
                  <Form.Control
                    as="select"
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez le statut</option>
                    <option value="paye">Payé</option>
                    <option value="non-paye">Non Payé</option>
                  </Form.Control>
                </Form.Group>

                <Button
                  className="btn"
                  style={{ background: "#282828", color: "white", borderColor: "#282828", marginTop: "20px", marginLeft: "170px" }}
                  type="submit"
                >
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

export default AddClient;
