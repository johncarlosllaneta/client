import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Image,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import dog from "../../Images/dog.png";
import PetBio from "./PetBio";
import PetMedical from "./PetMedical";
import PetVaccine from "./PetVaccine";
const PetInfo = () => {
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
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicProduct">
              <Form.Control
                type="text"
                // value={updateProductName}
                placeholder="Name"
                // onChange={(e) => {
                //   setUpdateProductName(e.target.value);
                // }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicProductD">
              <Form.Control
                type="email"
                // value={updateProductDescription}
                placeholder="Email"
                // onChange={(e) => {
                //   setUpdateProductDescription(e.target.value);
                // }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicProductQ">
              <Form.Control
                type="text"
                // value={updateProductQuantity}
                placeholder="Address"
                // onChange={(e) => {
                //   setUpdateProductQuantity(e.target.value);
                // }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicProductQ">
              <Form.Control
                type="number"
                // value={updateProductQuantity}
                placeholder="Contact Number"
                // onChange={(e) => {
                //   setUpdateProductQuantity(e.target.value);
                // }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose2}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <Container style={{ alignItems: "center" }}>
            <Image
              src={dog}
              roundedCircle
              style={{
                height: 170,
                width: 170,
                borderRadius: "50%",
                border: "7px",
                borderStyle: "solid",
                borderColor: "transparent",
              }}
            />
            <h4>Name</h4>
            <h5>Pet Owner</h5>
          </Container>
          <Button
            variant="outline-info"
            className="float-right"
            onClick={() => {
              handleShow2();
            }}
          >
            Edit profile
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" style={{}}>
        <Tab
          eventKey="info"
          title="Bio"
          style={{ backgroundColor: "lightgray", height: 280 }}
        >
          <Container>
            <PetBio />
          </Container>
        </Tab>
        <Tab
          eventKey="medical"
          title="Medical History"
          style={{ backgroundColor: "lightgray", height: 280 }}
        >
          <Container>
            <PetMedical />
          </Container>
        </Tab>
        <Tab
          eventKey="vaccine"
          title="Vaccine"
          style={{ backgroundColor: "lightgray" }}
        >
          <Container>
            <PetVaccine />
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PetInfo;
