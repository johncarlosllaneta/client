import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firstPng from "../../Images/secondPane.png";
import "../../css/Screen.css";

const FindVet = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };

  var firstPane = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 30,
  };

  var imageCss = {
    width: "90%",
    height: "70%",
    marginLeft: "15%",
  };

  var landingPageButton = {
    backgroundColor: colors.Blue,
    width: "35%",
    minWidth: "20%",
    borderRadius: 50,
    borderColor: "white",
    fontWeight: "bold",
  };
  return (
    <div id="findvet" style={{ height: "100%" }}>
      <Row>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
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
            Find Veterinary Clinic
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
            for your pet.
          </p>
          <p style={{ fontSize: 25 }} id="labelP">
            Find Veterinary Clinic nearest and available <br /> around your area
          </p>
          <Button href="/register" style={landingPageButton}>
            Join Now
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FindVet;
