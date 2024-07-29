import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { getChauffeurById, createChauffeur, updateChauffeur } from '../services/chauffeurService.ts'; // Ensure these services exist

function AddChauf() {
  const { id } = useParams(); // Get the id from the route
  const history = useHistory();
  const [chauffeur, setChauffeur] = useState({
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    code: '',
    statut: 'active',
    login: '',
    mdp: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch data if id is present for updating
      getChauffeurById(id)
        .then(data => {
          setChauffeur(data);
        })
        .catch(error => {
          console.error('Error fetching chauffeur', error);
          setError('Error fetching chauffeur data');
        })
        .finally(() => setLoading(false));
    } else {
      // Set loading to false if id is not present (adding new chauffeur)
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChauffeur(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (id) {
        // Update existing chauffeur
        await updateChauffeur(id, chauffeur);
      } else {
        // Add new chauffeur
        await createChauffeur(chauffeur);
      }
      history.push('/admin/chauffeurs');
    } catch (error) {
      console.error('Error saving chauffeur', error);
      setError('Error saving chauffeur');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container fluid>
      <Row>
     
                <Col md="4" style={{ marginTop: "50px" , marginLeft:"200px"}}>
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Row>
                <Col lg="8">
                  <Card.Title as="h4" style={{ color: "#6ACAB3", fontWeight: "bold", marginTop: "7px" }}>
                    {id ? 'Modifier Chauffeur' : 'Ajouter Chauffeur'}
                  </Card.Title>
                </Col>
                <Col>
                  <Button className="btn" style={{ background: "#039388", color: "white", borderColor: "white" }}>
                    <Link to="/admin/chauffeurs" style={{ textDecoration: 'none', color: 'inherit' }}>Retour</Link>
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Form className="border p-2" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>Nom</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      name="nom"
                      value={chauffeur.nom}
                      onChange={handleChange}
                      placeholder="Nom"
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>Prénom</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      name="prenom"
                      value={chauffeur.prenom}
                      onChange={handleChange}
                      placeholder="Prénom"
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>CIN</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="number"
                      name="cin"
                      value={chauffeur.cin}
                      onChange={handleChange}
                      placeholder="CIN"
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>Identifiant</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="number"
                      name="code"
                      value={chauffeur.code}
                      onChange={handleChange}
                      placeholder="Identifiant"
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>Email</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="email"
                      name="email"
                      value={chauffeur.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "5px" }}>Statut</Form.Label>
                  <Col sm="4">
                    <Form.Select
                      name="statut"
                      value={chauffeur.statut}
                      onChange={handleChange}
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="En congé">En congé</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>Login</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      name="login"
                      value={chauffeur.login}
                      onChange={handleChange}
                      placeholder="Login"
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4" style={{ color: "black", fontWeight: "bold", marginTop: "10px" }}>Mot de passe</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="password"
                      name="mdp"
                      value={chauffeur.mdp}
                      onChange={handleChange}
                      placeholder="Mot de passe"
                      required
                    />
                  </Col>
                </Form.Group>

                <Button
                  style={{ background: "#282828", color: "white", marginLeft: "200px", borderColor: "white" }}
                  type="submit"
                >
                  {id ? 'Modifier' : 'Ajouter'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <img src={require("assets/img/5405627.png")} alt="Logo" style={{ height: "400px", width: "400px", marginLeft: "100px" ,marginTop:"200px"}} />
        </Col>
      </Row>
    </Container>
  );
}

export default AddChauf;
