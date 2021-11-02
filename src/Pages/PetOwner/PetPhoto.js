import React, { useState } from "react";
import { Button, Container, Row, Image, Modal, Col } from "react-bootstrap";
import dog from "../../Images/dog.png";
const PetPhoto = () => {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
    // setUpdateProductId(id);
    // setUpdateProductName(name);
    // setUpdateProductDescription(desc);
    // setUpdateProductQuantity(quantity);
  };
  return (
    <div>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={11} md={6}>
                <Image
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                  fluid
                  style={{ height: 400 }}
                />
              </Col>
              <Col xs={7} md={6}>
                <Modal.Header closeButton>
                  <Row className="justify-content-md-start">
                    <Col style={{ float: "left" }}>
                      <Image
                        src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                        roundedCircle
                        style={{ height: 40, width: 40 }}
                      />
                    </Col>
                    <Col style={{ marginRight: 4 }}>
                      <h6>Richard</h6>
                      <h5 style={{ marginBottom: 3 }}>10:00pm</h5>
                    </Col>
                    <Row style={{ marginLeft: 1 }}>
                      <h5 style={{ color: "grey" }}>HELLO</h5>
                    </Row>
                  </Row>
                </Modal.Header>
                <h6 style={{ color: "grey" }}>Comments</h6>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Container>
        <Row>
          <Container style={{ textAlign: "start", padding: 10 }}>
            <h4 className="d-inline">Photos</h4>
            <Button variant="info" className="d-line float-right">
              Upload
            </Button>
          </Container>
        </Row>
        <Row xs={1} md={2} xs={6} lg={5}>
          <Image
            src={dog}
            thumbnail
            onClick={() => {
              handleShow2();
            }}
          />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
          <Image src={dog} thumbnail />
        </Row>
      </Container>
    </div>
  );
};

export default PetPhoto;
