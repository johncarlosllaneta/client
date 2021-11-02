import React from "react";
import { Container, Row, Tab, Nav } from "react-bootstrap";
import ListItem from "./ListItem";

const Food = () => {
  return (
    <div style={{ marginRight: 80 }}>
      <Tab.Container defaultActiveKey="dogs">
        <Row>
          <Container
            style={{
              backgroundColor: "#EFF1F7",
              borderRadius: 30,
              width: 1000,
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
                  eventKey="dogs"
                  style={{ paddingLeft: 50, paddingRight: 50 }}
                >
                  Dogs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="cats"
                  style={{ paddingLeft: 50, paddingRight: 50 }}
                >
                  Cats
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="fish"
                  style={{ paddingLeft: 50, paddingRight: 50 }}
                >
                  Fish
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="small"
                  style={{ paddingLeft: 30, paddingRight: 30 }}
                >
                  Small Pets
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="farm"
                  style={{ paddingLeft: 30, paddingRight: 30 }}
                >
                  Farm Pets
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Row>
        <br />
        <Row>
          <Container
            style={{
              backgroundColor: "#EFF1F7",
              borderRadius: 30,
              width: 1000,
              height: 580,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Tab.Content>
              <Tab.Pane
                eventKey="dogs"
                // style={{
                //   height: 310,
                //   width: 900,
                //   display: "flex",
                //   flexWrap: "wrap",
                //   overflowY: "auto",
                // }}
              >
                <ListItem />
              </Tab.Pane>
              <Tab.Pane eventKey="cats">
                <ListItem />
              </Tab.Pane>
              <Tab.Pane eventKey="fish">
                <ListItem />
              </Tab.Pane>
              <Tab.Pane eventKey="small">
                <ListItem />
              </Tab.Pane>
              <Tab.Pane eventKey="farm">
                <ListItem />
              </Tab.Pane>
            </Tab.Content>
          </Container>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Food;
