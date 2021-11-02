import React from "react";
import { Row, Col, Image, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dog from "../Images/dog.png";
const Images = () => {
  return (
    <>
      <Row>
        <Container>
          <Col xs={6} md={4}>
            <Image
              src={dog}
              alt="dog"
              className="card-img"
              style={{ width: "220%", height: "220%" }}
            />
          </Col>
        </Container>
      </Row>
    </>
  );
};

export default Images;
