import React from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";

import { MdEmail, MdPhone } from "react-icons/md";

import "react-multi-carousel/lib/styles.css";
const PetAbout = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm={4}>
            <Container style={{ padding: "10px" }}>
              <Card
                style={{
                  width: 250,
                  height: 100,
                  alignItems: "center",
                  borderRadius: 30,
                }}
              >
                <Row style={{ alignItems: "center", paddingTop: 20 }}>
                  <Col>
                    <MdEmail style={{ fontSize: 50 }} />
                  </Col>
                  <Col>
                    <Row>Email Address</Row>
                    <Row>sample@gmail.com</Row>
                  </Col>
                </Row>
              </Card>
              <br />
              <Card
                style={{
                  width: 250,
                  height: 100,
                  alignItems: "center",
                  borderRadius: 30,
                }}
              >
                {/* <Card.Body>
                  <Card.Text>Richard</Card.Text>
                </Card.Body> */}
                <Row style={{ alignItems: "center", paddingTop: 20 }}>
                  <Col>
                    <MdPhone style={{ fontSize: 50 }} />
                  </Col>
                  <Col>
                    <Row>Contact No:</Row>
                    <Row>09847467472</Row>
                  </Col>
                </Row>
              </Card>
              <br />
              <Card
                style={{
                  width: 250,
                  height: 100,
                  alignItems: "center",
                  borderRadius: 30,
                }}
              >
                {/* <Card.Body>
                  <Card.Text>Richard</Card.Text>
                </Card.Body> */}
                <Row style={{ alignItems: "center", paddingTop: 20 }}>
                  <Col>
                    <MdEmail style={{ fontSize: 50 }} />
                  </Col>
                  <Col>
                    <Row>Address</Row>
                    <Row>Manila City</Row>
                  </Col>
                </Row>
              </Card>
            </Container>
          </Col>
          <Col sm={8}>
            <Container style={{ padding: "10px" }}>
              <Row>
                <h5 style={{ textAlign: "left" }}>Pets</h5>
              </Row>
              <Row>
                <Card
                  style={{
                    width: "50%",
                    height: "40%",
                    borderRadius: 30,
                    padding: 10,
                  }}
                >
                  <Card.Img
                    variant="top"
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                    style={{
                      width: "100%",
                      height: "50%",
                      alignSelf: "center",
                      borderRadius: 30,
                    }}
                  />
                  <Card.Body>
                    <Card.Title style={{ color: "#48C7D6" }}>
                      Card Title
                    </Card.Title>
                    <Button
                      variant="outline-info"
                      style={{ borderRadius: 20, borderWidth: 5 }}
                    >
                      View Detail
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PetAbout;
