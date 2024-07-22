import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from 'axios';

const fetchChauffeurDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/chauffeurs/${id}`);
    console.log('API response:', response); // Log the entire response
    return response.data;
  } catch (error) {
    console.error('Error fetching chauffeur details', error);
    return null;
  }
};

function Details() {
  const { id } = useParams(); // Retrieve the id from route parameters
  const [chauffeur, setChauffeur] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChauffeurDetails(id);
      console.log('Fetched data:', data); // Debugging log
      setChauffeur(data);
    };

    fetchData();
  }, [id]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!chauffeur) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <Container fluid>
      <Row>
        <Col md="4"></Col>
        <Col md="4" style={{ marginTop: "100px" }}>
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Row>
                <Col lg="8">
                  <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold" }}>
                    {chauffeur.nom} {chauffeur.prenom}
                  </Card.Title>
                </Col>
                <Col>
                  <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "#039388" }}>
                    <Link to="/admin/chauffeurs" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <ul className="list-group list-group-light list-group-small">
                <li className="list-group-item">ID: {chauffeur.id}</li>
                <li className="list-group-item">Email: {chauffeur.email}</li>
                <li className="list-group-item">CIN: {chauffeur.cin}</li>
                <li className="list-group-item">Code: {chauffeur.code}</li>
                <li className="list-group-item">Statut: {chauffeur.statut}</li>
                <li className="list-group-item">
                  Login: {chauffeur.login}
                </li>
                <li className="list-group-item">
                  Mot de passe: 
                  <span style={{ position: 'relative' }}>
                    {passwordVisible ? chauffeur.mdp : '******'}
                    <i 
                      className={`nc-icon ${passwordVisible ? 'nc-check-2' : 'nc-check-2'}`} 
                      style={{ cursor: 'pointer', marginLeft: "20px", color: "#6ACAB3" }} 
                      onClick={togglePasswordVisibility}
                    ></i>
                  </span>
                </li>
              </ul>
              <Button
                className="btn"
                style={{ background: "#282828", color: "white"  , borderColor: "black"}}
              >
                <Link to={`/addChauf/${chauffeur.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Modifier
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Details;
