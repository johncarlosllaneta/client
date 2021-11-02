import React from "react";
import { Col, Row, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPng from "../../Components/RegisterPng";
import RegisterForm from "../../Components/RegisterForm";

const Register = () => {


  const screenh = window.screen.height;
  return (
    <div>


      <Row style={{ display: 'flex' }}>

        <Col>
          <RegisterForm style={{ height: screenh }} />
        </Col>

        <Col>
          <RegisterPng style={{ height: screenh }} />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
