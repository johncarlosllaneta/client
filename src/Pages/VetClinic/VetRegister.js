import React from "react";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterFormVet from "../../Components/RegisterVet";
import RegisterPng from "../../Components/RegisterPng";

const VetRegister = () => {
  const screenh = window.screen.height - 270;
  return (
    <div>
      <Row>
        <Col>
          <RegisterFormVet />
        </Col>
        <Col>
          <RegisterPng style={{ height: screenh }} />
        </Col>
      </Row>
    </div>
  );
};

export default VetRegister;
