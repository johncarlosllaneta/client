import React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Food from "./Food";
const PetProdInfo = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        textAlign: "left",
        width: 1330,
        marginLeft: -100,
        height: 700,
      }}
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="food">
        <Row>
          <Col sm={3} style={{ marginTop: 20 }}>
            <h3 style={{ color: "#696969", marginLeft: 20 }}>Products</h3>
            <Nav
              variant="tabs"
              className="flex-column"
              style={{
                backgroundColor: "#EFF1F7",
                borderRadius: 30,
                height: 600,
                marginLeft: 40,
                marginRight: 40,
                fontWeight: "bold",
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey="food">Foods</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="bowFee">Bowls & feeders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="toys">Toys</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="clean">Cleaning</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="beMa">Bed & Mats</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} style={{ marginTop: 20 }}>
            <Tab.Content>
              <Tab.Pane eventKey="food">
                <Food />
              </Tab.Pane>
              <Tab.Pane eventKey="bowFee">
                <Food />
              </Tab.Pane>
              <Tab.Pane eventKey="toys">
                <Food />
              </Tab.Pane>
              <Tab.Pane eventKey="clean">
                <Food />
              </Tab.Pane>
              <Tab.Pane eventKey="beMa">
                <Food />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default PetProdInfo;
