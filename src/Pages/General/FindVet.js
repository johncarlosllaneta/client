import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firstPng from "../../Images/secondPane.png";

const FindVet = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };

  var firstPane = {
    textAlign: "left",
    marginLeft: "5%",
    marginTop: "18%",
  };

  var imageCss = {
    width: "90%",
    height: "70%",
    marginLeft: "15%",
  };

  var landingPageButton = {
    backgroundColor: colors.Blue,
    width: "25%",
    borderRadius: 50,
    borderColor: "white",
    fontWeight: "bold",
    alignContent: "center",
  };
  return (
    <div id="findvet" style={{ height: "100%" }}>
      <Row>
        <Col style={{ marginTop: "10%" }}>
          <Image src={firstPng} style={imageCss} />
        </Col>

        <Col style={firstPane}>
          <h1 style={{ color: colors.Blue, fontSize: "400%" }}>
            Find Veterinary Clinic <br /> for your pet.
          </h1>
          <p style={{ fontSize: "150%" }}>
            Find Veterinary Clinic nearest and available <br /> around your area
          </p>
          <Button className="mr-5" href="/register" style={landingPageButton}>
            Join Now
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FindVet;
