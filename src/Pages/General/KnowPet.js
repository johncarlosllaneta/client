import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import fourthPng from "../../Images/fourthPane.png";
import "../../css/Screen.css";
const KnowPet = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };
  var secondPane = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 30,
  };

  var imageCss = {
    width: "120%",
  };
  return (
    <div id="knowpet" style={{ height: "100%" }}>
      <Row>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
          }}
        >
          <Image
            src={fourthPng}
            style={{
              height: "40rem",
              width: "45rem",
              minWidth: "15rem",
              minHeight: "10rem",
            }}
          />
        </Col>
        <Col style={secondPane}>
          <h1
            style={{
              color: colors.Blue,
              fontSize: 60,
              padding: 0,
              margin: 0,
            }}
            id="labelH1"
          >
            Know Your Pet
          </h1>
          <p style={{ fontSize: 25, padding: 0, margin: 0 }} id="labelP">
            Discover what our veterinarians can do for
          </p>
          <p style={{ fontSize: 25, padding: 0, margin: 0 }} id="labelP">
            {" "}
            you and your pet
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default KnowPet;
