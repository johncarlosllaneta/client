import React from "react";
import { Col, Row, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firstPng from "../Images/firstPane.png";
import "../css/Screen.css";

function Join() {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };

  var firstPane = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 20,
    flexDirection: "column",
  };

  var imageCss = {
    width: "100%",
  };

  var landingPageButton = {
    backgroundColor: colors.Blue,
    width: "35%",
    borderRadius: 50,
    borderColor: "white",
    fontWeight: "bold",
  };

  return (
    <div id="join" style={{ height: "100%" }}>
      <Row>
        <Col style={firstPane}>
          <h1
            style={{
              color: colors.Blue,
              fontSize: 60,
              padding: 0,
              margin: 0,
            }}
            id="labelH1"
          >
            Enriching the lives of
          </h1>

          <p
            style={{
              color: colors.Blue,
              fontSize: 60,
              padding: 0,
              margin: 0,
            }}
            id="labelH1"
          >
            pets and people
          </p>

          <p style={{ fontSize: 25 }} id="labelP">
            From large to small we give quality care to all
          </p>
          <Button style={landingPageButton} href="/vetReg" id="joinButton">
            Veterinary Clinic
          </Button>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 200,
            paddingRight: 30,
            paddingLeft: 30,
            paddingBottom: 20,
          }}
        >
          <Image
            src={firstPng}
            style={{
              height: "40rem",
              width: "45rem",
              minWidth: "15rem",
              minHeight: "10rem",
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Join;
