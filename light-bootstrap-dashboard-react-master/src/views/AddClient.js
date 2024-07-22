import React, { useState } from "react"; // Import useState from React
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

function AddClient() {
  // Function to handle form submission
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };
  const handleMapSelect = (location) => {
    setSelectedLocation(location);
    setAddress(`Lat: ${location.lat}, Lng: ${location.lng}`);
    console.log("Selected address:", location);
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
                    Ajouter un Client
                  </Card.Title>
                </Col>
                <Col>
                  <Button className="btn" style={{ background: "#039388", color: "white",borderColor:"white" }}>
                    <Link to="/admin/client" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} className="border p-3">
                <Form.Group controlId="nom">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px" }}>Nom</Form.Label>
                  <Form.Control type="text" placeholder="Entrez le nom du client" required />
                </Form.Group>
                <Form.Group controlId="adresse">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom: "10px", marginTop: "10px" }}>Adresse</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" placeholder="Entrez l'adresse du client" value={address} readOnly />
                    <Button variant="outline-secondary" onClick={() => setSelectedLocation({ lat: 51.505, lng: -0.09 })}>
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
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px", marginTop:"10px" }}>Mode de Paiement</Form.Label>
                  <Form.Check
                    type="radio"
                    id="tpe"
                    label="TPE"
                    name="modePaiement"
                    required
                  />
                  <Form.Check
                    type="radio"
                    id="cheque"
                    label="Chèque"
                    name="modePaiement"
                  />
                  <Form.Check
                    type="radio"
                    id="espece"
                    label="Espèce"
                    name="modePaiement"
                  />
                </Form.Group>

                <Form.Group controlId="statut">
                  <Form.Label style={{ color: "black", fontWeight: "bold", marginBottom:"10px", marginTop:"10px" }}>Statut</Form.Label>
                  <Form.Control as="select" required>
                    <option value="">Sélectionnez le statut</option>
                    <option value="paye">Payé</option>
                    <option value="non-paye">Non Payé</option>
                  </Form.Control>
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

export default AddClient;
