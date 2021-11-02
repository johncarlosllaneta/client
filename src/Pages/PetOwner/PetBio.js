import React from "react";
import { Col, Row, Card, CardDeck, Container } from "react-bootstrap";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
const PetBio = () => {
  return (
    <div>
      <Container>
        <CardDeck>
          <Card
            style={{
              width: 220,
              height: 120,
              alignItems: "center",
              borderRadius: 30,
              margin: 10,
            }}
          >
            <Row style={{ alignItems: "center", paddingTop: 10 }}>
              <Col>
                <MdEmail style={{ fontSize: 60, color: "#19B9CC" }} />
              </Col>
              <Col>
                <Row>Type of Pet:</Row>
                <Row>Dog</Row>
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              width: 220,
              height: 120,
              alignItems: "center",
              borderRadius: 30,
              margin: 10,
            }}
          >
            {/* <Card.Body>
                  <Card.Text>Richard</Card.Text>
                </Card.Body> */}
            <Row style={{ alignItems: "center", paddingTop: 20 }}>
              <Col>
                <MdPhone style={{ fontSize: 60, color: "#19B9CC" }} />
              </Col>
              <Col>
                <Row>Breed:</Row>
                <Row>Aspin</Row>
              </Col>
            </Row>
          </Card>
          <Card
            style={{
              width: 220,
              height: 120,
              alignItems: "center",
              borderRadius: 30,
              margin: 10,
            }}
          >
            {/* <Card.Body>
                  <Card.Text>Richard</Card.Text>
                </Card.Body> */}
            <Row style={{ alignItems: "center", paddingTop: 20 }}>
              <Col>
                <FaCalendarCheck style={{ fontSize: 60, color: "#19B9CC" }} />
              </Col>
              <Col>
                <Row>Birthday:</Row>
                <Row>January 6, 2020</Row>
              </Col>
            </Row>
          </Card>
        </CardDeck>
      </Container>
    </div>
  );
};

export default PetBio;
