import React from "react";
import { Col, Row } from "react-bootstrap";
import LoginPng from "../../Components/LoginPng";
import LoginForm from "../../Components/LoginForm";
const Login = () => {
  return (
    <div>
      <Row style={{ display: "flex" }}>
        <Col>
          <LoginForm />
        </Col>
        <Col>
          <LoginPng />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
