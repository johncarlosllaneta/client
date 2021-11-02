import React from "react";
import { Row, Container, Button, Tab, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import HistoryCard from "./HistoryCard";
const PetHistory = () => {
  return (
    <div style={{ width: 1450 }}>
      <Container
        fluid
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 30,
          height: 720,
          marginLeft: 10,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          padding: 10,
        }}
      >
        <div style={{ width: 1350 }}>
          <Tab.Container defaultActiveKey="done">
            <Row>
              <Container
                style={{
                  backgroundColor: "#EFF1F7",
                  borderRadius: 30,
                  width: 800,
                  marginLeft: 10,
                }}
              >
                <Nav
                  variant="pills"
                  style={{
                    justifyContent: "space-evenly",
                    fontWeight: "bold",
                  }}
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="done"
                      style={{ paddingLeft: 30, paddingRight: 30 }}
                    >
                      Done Appointment
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="cancel"
                      style={{ paddingLeft: 30, paddingRight: 30 }}
                    >
                      Cancelled Appointment
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="decline"
                      style={{ paddingLeft: 30, paddingRight: 30 }}
                    >
                      Declined Appointment
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Container>
              <Button
                style={{
                  borderRadius: 30,
                  backgroundColor: "#3BD2E3",
                  borderColor: "#FFFFFF",
                }}
              >
                Add Ratings
              </Button>
            </Row>
            <br />
            <Row>
              <Container
                fluid
                style={{
                  backgroundColor: "#EFF1F7",
                  borderRadius: 30,
                  width: 1450,
                  height: 580,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Tab.Content>
                  <Tab.Pane eventKey="done">
                    <HistoryCard />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cancel">
                    <HistoryCard />
                  </Tab.Pane>
                  <Tab.Pane eventKey="decline">
                    <HistoryCard />
                  </Tab.Pane>
                </Tab.Content>
              </Container>
            </Row>
          </Tab.Container>
        </div>
      </Container>
    </div>
  );
};

export default PetHistory;
