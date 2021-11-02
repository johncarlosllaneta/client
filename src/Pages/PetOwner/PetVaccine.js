import React from "react";
import { Col, Container, Row, Card, Button, Table } from "react-bootstrap";
import { GoVerified } from "react-icons/go";

const PetVaccine = () => {
  return (
    <div>
      <Container style={{ height: 280 }}>
        <Row>
          <Col>
            <Container>
              <h5>Vaccines</h5>
              <Container>
                <Card
                  style={{
                    width: 500,
                    height: 90,
                    borderRadius: 20,
                    backgroundColor: "#DAF1F8",
                    borderColor: "#19B9CC",
                    marginBottom: 3,
                  }}
                >
                  <Row style={{ grid: 0 }}>
                    <Col className="col-md-3">
                      <GoVerified style={{ fontSize: 60, marginTop: 15 }} />
                    </Col>
                    <Col className="col-md-5">
                      <Card.Title style={{ marginTop: 5 }}>
                        Anti Rabies
                      </Card.Title>
                      <Card.Subtitle>
                        status: Done
                        <br />
                        Date: Jan 20,2020
                      </Card.Subtitle>
                    </Col>
                    <Col className="col-md-4">
                      <Button
                        style={{ marginTop: 20 }}
                        // onClick={() => {
                        //   handleShow2();
                        // }}
                      >
                        View details
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Container>
            </Container>
          </Col>
          <Col>
            <Container>
              <h5>Vaccine Schedule</h5>
              <Container>
                <Table style={{ border: 5, borderStyle: "solid" }}>
                  <thead>
                    <th>Vaccine</th>
                    <th>Dose</th>
                    <th>Schedule of vaccination</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Anti Rabies</td>
                      <td>6 weeks</td>
                      <td>Yearly</td>
                    </tr>
                    <tr>
                      <td>Anti Rabies</td>
                      <td>6 weeks</td>
                      <td>Yearly</td>
                    </tr>
                    <tr>
                      <td>Anti Rabies</td>
                      <td>6 weeks</td>
                      <td>Yearly</td>
                    </tr>
                    <tr>
                      <td>Anti Rabies</td>
                      <td>6 weeks</td>
                      <td>Yearly</td>
                    </tr>
                  </tbody>
                </Table>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetVaccine;
