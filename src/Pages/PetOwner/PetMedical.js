import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  Container,
  Form,
} from "react-bootstrap";
const PetMedical = () => {
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
      <Modal show={show2} onHide={handleClose2} style={{ borderRadius: 30 }}>
        <Modal.Header closeButton>
          <Modal.Title>Medical History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicProduct">
              <Form.Label>Time and Date:</Form.Label>
              <Form.Control
                type="text"
                placeholder="January 03, 2021"
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <Form.Label>Service Type:</Form.Label>
              <Form.Control type="text" placeholder="Sample service" readOnly />
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <Form.Label>Service Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sample Description"
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <Form.Label>Scheduled Pet:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sample pet name"
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <Form.Label>Weight:</Form.Label>
              <Form.Control type="text" placeholder="20 pounds" readOnly />
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <Form.Label>Remarks:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dr. Ignacio Agoncillo"
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose2}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Col style={{ justifyItems: "center" }}>
          <br />
          <Card
            style={{
              width: 700,
              height: 60,
              borderRadius: 20,
              backgroundColor: "#DAF1F8",
              borderColor: "#19B9CC",
              marginBottom: 3,
            }}
          >
            <Row style={{ grid: 0 }}>
              <Col className="col-md-7">
                <Card.Title>Service Type</Card.Title>
                <Card.Subtitle style={{ color: "grey" }}>
                  05/13/2020, 3:00PM
                </Card.Subtitle>
              </Col>
              <Col className="col-md-5">
                <Button
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    handleShow2();
                  }}
                >
                  View details
                </Button>
              </Col>
            </Row>
          </Card>
          <br />
          <Card
            style={{
              width: 700,
              height: 60,
              borderRadius: 20,
              backgroundColor: "#DAF1F8",
              borderColor: "#19B9CC",
              marginBottom: 3,
            }}
          >
            <Row style={{ grid: 0 }}>
              <Col className="col-md-7">
                <Card.Title>Service Type</Card.Title>
                <Card.Subtitle style={{ color: "grey" }}>
                  05/13/2020, 3:00PM
                </Card.Subtitle>
              </Col>
              <Col className="col-md-5">
                <Button style={{ marginTop: 8 }}>View details</Button>
              </Col>
            </Row>
          </Card>
          <br />
          <Card
            style={{
              width: 700,
              height: 60,
              borderRadius: 20,
              backgroundColor: "#DAF1F8",
              borderColor: "#19B9CC",
              marginBottom: 3,
            }}
          >
            <Row style={{ grid: 0 }}>
              <Col className="col-md-7">
                <Card.Title>Service Type</Card.Title>
                <Card.Subtitle style={{ color: "grey" }}>
                  05/13/2020, 3:00PM
                </Card.Subtitle>
              </Col>
              <Col className="col-md-5">
                <Button style={{ marginTop: 8 }}>View details</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default PetMedical;
