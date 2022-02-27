import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import inHousePng from "../../../Images/undrawImages/undraw_decorative_friends_q2np.png";
const InHouseStart = () => {
  return (
    <div>
      <div style={{ maxWidth: "100%", height: 590 }}>
        <Row>
          <h1
            style={{
              textAlign: "left",
              color: "#3BD2E3",
              fontSize: 70,
              fontWeight: "bolder",
            }}
          >
            In-House Laboratory
          </h1>
        </Row>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h5 style={{ fontSize: 40, fontWeight: "bold" }}>
                This is the In-House Laboratory Page
              </h5>
              <p style={{ color: "#474747" }}>
                This Page consist of your details and price for your In-House
                Laboratory Services.
                <br />
                This Page also have your In-House Laboratory history that state
                your recent customers.
              </p>
              <Button
                style={{
                  backgroundColor: "#3BD2E3",
                  borderColor: "#FFFFFF",
                  borderRadius: 8,
                }}
              >
                Get Started
              </Button>
            </div>
          </Col>
          <Col>
            <Image src={inHousePng} style={{ height: 500, maxWidth: "100%" }} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InHouseStart;
