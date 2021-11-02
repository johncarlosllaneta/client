import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firstPng from "../../Images/thirdPane.png";
// import fourthPng from "../../Images/fourthPane.png";

const TalkVet = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };

  var firstPane = {
    textAlign: "left",
    marginLeft: "15%",
    marginTop: "20%",
  };

  var secondPane = {
    textAlign: "left",
    marginRight: "10%",
  };

  var imageCss = {
    width: "120%",
  };

  return (
    <div id="talkvet" style={{ height: "100%" }}>
      <Row>
        <Col style={firstPane}>
          <h1 style={{ color: colors.Blue, fontSize: "400%" }}>Talk To Vet</h1>
          <p style={{ fontSize: "150%" }}>
            Friendly professional care for your pets.
          </p>
        </Col>

        <Col style={{ marginRight: "10%", marginTop: "14%" }}>
          <Image src={firstPng} style={imageCss} />
        </Col>
      </Row>
    </div>
  );
};

export default TalkVet;
