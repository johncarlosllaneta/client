import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firstPng from "../../Images/thirdPane.png";
// import fourthPng from "../../Images/fourthPane.png";
import "../../css/Screen.css";

const TalkVet = () => {
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
          <h1
            style={{
              color: colors.Blue,
              fontSize: 60,
              padding: 0,
              margin: 0,
            }}
            id="labelH1"
          >
            Talk To Vet
          </h1>
          <p style={{ fontSize: 25 }} id="labelP">
            Friendly professional care for your pets.
          </p>
        </Col>

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
      </Row>
    </div>
  );
};

export default TalkVet;
