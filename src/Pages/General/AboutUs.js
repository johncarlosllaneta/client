import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/logo.png";

const AboutUs = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };
  var logocss = {
    width: 100,
    height: 100,
  };
  var footer = {
    backgroundColor: "#F1F9FC",
    maxWidth: "100%",
  };
  var landingPageName = {
    fontWeight: "bold",
    color: colors.Blue,
  };
  return (
    <div id="aboutus">
      <Container style={footer}>
        <h1 style={landingPageName}>
          {" "}
          <Image src={logo} style={logocss} /> TERRAVET
        </h1>

        <Row>
          <Col>
            <h1
              style={{
                color: colors.Blue,
                fontSize: "200%",
                textAlign: "left",
              }}
            >
              About
            </h1>
            <p style={{ fontSize: "75%", textAlign: "left" }}>
              Scanfcode.com CODE WANTS TO BE SIMPLE is an initiative to help the
              upcoming programmers with the code. <br />
              Scanfcode focuses on providing the most efficient code or snippets
              as the code wants to be simple. <br />
              We will help programmers build up concepts in different
              programming languages that include C, C++, Java, <br />
              HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.
            </p>
          </Col>
          <Col>
            <p style={{ fontSize: "85%", textAlign: "center" }}>
              Copyright © 2021 All Rights Reserved by National University
              Manila.
            </p>

            <Row></Row>
          </Col>
          <Col>
            <ul style={{ listStyleType: "none", textAlign: "left" }}>
              <li
                style={{
                  color: colors.Blue,
                  fontSize: "200%",
                  textAlign: "left",
                }}
              >
                Quick Links
              </li>
              <li ><a href='/about us'>About Us</a></li>
              <li><a href='/contact us'>Contact Us</a> </li>
              <li><a href='/privacy policy'>Privacy Policy</a> </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
