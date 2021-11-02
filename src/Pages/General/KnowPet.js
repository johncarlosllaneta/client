import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import fourthPng from "../../Images/fourthPane.png";
const KnowPet = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };
  var secondPane = {
    textAlign: "left",
    marginLeft: "15%",
    marginTop: "20%",
  };

  var imageCss = {
    width: "120%",
  };
  return (
    <div id="knowpet" style={{ height: "100%" }}>
      <Row>
        <Col style={{ marginLeft: "10%", marginTop: "5%" }}>
          <Image src={fourthPng} style={imageCss} />
        </Col>
        <Col style={secondPane}>
          <h1 style={{ color: colors.Blue, fontSize: "400%" }}>
            Know Your Pet
          </h1>
          <p style={{ fontSize: "150%" }}>
            Discover what our veterinarians can do for
            <br /> you and your pet
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default KnowPet;
