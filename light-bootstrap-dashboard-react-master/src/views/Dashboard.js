import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartistGraph from "react-chartist";
import { Card, Container, Row, Col } from "react-bootstrap";

const fetchChauffeurs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/chauffeurs');
    return response.data;
  } catch (error) {
    console.error('Error fetching chauffeurs', error);
    return [];
  }
};

const fetchCamions = async () => {
  try {
    const response = await axios.get('http://localhost:5000/camions');
    return response.data;
  } catch (error) {
    console.error('Error fetching camions', error);
    return [];
  }
};

const fetchClients = async () => {
  try {
    const response = await axios.get('http://localhost:5000/clients');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients', error);
    return [];
  }
};

const fetchProgrammes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/programmes');
    return response.data;
  } catch (error) {
    console.error('Error fetching programmes', error);
    return [];
  }
};

function Dashboard() {
  const [chauffeurs, setChauffeurs] = useState([]);
  const [camions, setCamions] = useState([]);
  const [clients, setClients] = useState([]);
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const chauffeursData = await fetchChauffeurs();
      setChauffeurs(chauffeursData);

      const camionsData = await fetchCamions();
      setCamions(camionsData);

      const clientsData = await fetchClients();
      setClients(clientsData);

      const programmesData = await fetchProgrammes();
      setProgrammes(programmesData);
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-bus-front-12 text-warning"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Chauffeurs</p>
                    <Card.Title as="h4">{chauffeurs.length}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt"></i>Mis à jour maintenant
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-delivery-fast text-success"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Camions</p>
                    <Card.Title as="h4">{camions.length}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt"></i>Mis à jour maintenant
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-single-02 text-danger"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Clients</p>
                    <Card.Title as="h4">{clients.length}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt"></i>Mis à jour maintenant
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-notes"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Programmes</p>
                    <Card.Title as="h4">{programmes.length}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr />
              <div className="stats">
                <i className="fas fa-sync-alt"></i>Mis à jour maintenant
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Aperçu des programmesw</Card.Title>
              <p className="card-category">Nombre de bouteilles au fil du temps</p>
            </Card.Header>
            <Card.Body>
              <div className="ct-chart" id="chartProgrammes">
                <ChartistGraph
                  data={{
                    labels: programmes.map(p => p.date),
                    series: [programmes.map(p => p.nbPleine)]
                  }}
                  type="Line"
                  options={{
                    low: 0,
                    showArea: true,
                    height: "245px",
                    axisX: {
                      showGrid: false
                    },
                    lineSmooth: true,
                    showLine: true,
                    showPoint: true,
                    fullWidth: true,
                    chartPadding: {
                      right: 50
                    }
                  }}
                />
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="legend">
                <i className="fas fa-circle text-info"></i> Nombre de bouteilles pleines
              </div>
              <hr />
              
            </Card.Footer>
          </Card>
        </Col>
        <Col md="4">
        <img src={require("assets/img/logo.png")} alt="Logo" style={{ height: "400px", width: "400px" }} />

        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
