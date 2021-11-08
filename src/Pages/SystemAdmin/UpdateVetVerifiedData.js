import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, Container, Modal } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { hostUrl } from "../../Components/Host";

function UpdateVetVerifiedData(props) {
  const [Vet_Id, setVet_Id] = useState();
  const [Vet_Name, setVet_Name] = useState();
  const [email, setEmail] = useState();
  const [Address, setAddress] = useState();
  const [ContactNumber, setContactNumber] = useState();
  const [validated, setValidated] = useState(false);

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  function getData() {
    setVet_Id(props.viewProfileVetData.vet_admin_id);
    setVet_Name(props.viewProfileVetData.vet_name);
    setEmail(props.viewProfileVetData.email);
    setAddress(props.viewProfileVetData.vet_address);
    setContactNumber(props.viewProfileVetData.vet_contact_number);
  }
  useEffect(() => {
    getData();
  }, [props]);

  function handleClick() {
    axios
      .put(`${hostUrl}/vetclinic/update/${Vet_Id}`, {
        email: email,
        vet_name: Vet_Name,
        vet_address: Address,
        vet_contact_number: ContactNumber,
      })
      .then((response) => {
        if (response.status === 200) {
          props.cancelChanges();
          props.vetTableRefresher();
          props.ToastUpdate();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeInfo(e) {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowInfo();
    }
    setValidated(true);
  }

  return (
    <div>
      <Modal
        show={showInfo}
        onHide={handleCloseInfo}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to change your information?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfo}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setVet_Id(props.viewProfileVetData.vet_admin_id);
              setVet_Name(props.viewProfileVetData.vet_name);
              setEmail(props.viewProfileVetData.email);
              setAddress(props.viewProfileVetData.vet_address);
              setContactNumber(props.viewProfileVetData.vet_contact_number);
              handleClick();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Form onSubmit={changeInfo} noValidate validated={true}>
          {/* <Alert idx={1} variant={variant} message={message} show={showAlert} /> */}
          <Row>
            <Col sm={8} className="ml-3 mt-3">
              <Row>
                <Col>
                  <Row className="mt-3 ml-5" style={{ fontSize: 25 }}>
                    <strong>Vet Clinic Details</strong>
                    <Container
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Row>
                        <Col>
                          <Row
                            className="ml-5"
                            style={{ fontSize: 12, color: "grey" }}
                          >
                            <strong>Name </strong>
                          </Row>
                          <Row
                            className="ml-5"
                            style={{ fontSize: 15, color: "black" }}
                          >
                            <Form.Group
                              controlId="exampleForm.ControlInput1"
                              style={{ width: 500 }}
                            >
                              <Form.Control
                                type="text"
                                value={Vet_Name}
                                required
                                maxLength={50}
                                minLength={5}
                                pattern="^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$"
                                onChange={(e) => {
                                  setVet_Name(e.target.value);
                                }}
                              />
                            </Form.Group>
                          </Row>
                          <Row
                            className="ml-5"
                            style={{ fontSize: 12, color: "grey" }}
                          >
                            <strong>Email </strong>
                          </Row>
                          <Row
                            className="ml-5"
                            style={{ fontSize: 15, color: "black" }}
                          >
                            <Form.Group
                              controlId="exampleForm.ControlInput1"
                              style={{ width: 500 }}
                            >
                              <Form.Control
                                type="email"
                                value={email}
                                readOnly
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              />
                            </Form.Group>
                          </Row>

                          <Row
                            className="ml-5"
                            style={{ fontSize: 12, color: "grey" }}
                          >
                            <strong>Address </strong>
                          </Row>
                          <Row
                            className="ml-5"
                            style={{ fontSize: 15, color: "black" }}
                          >
                            <Form.Group
                              controlId="exampleForm.ControlInput1"
                              style={{ width: 500 }}
                            >
                              <Form.Control
                                type="text"
                                value={Address}
                                maxLength={50}
                                minLength={10}
                                required
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                              />
                            </Form.Group>
                          </Row>

                          <Row
                            className="ml-5"
                            style={{ fontSize: 12, color: "grey" }}
                          >
                            <strong>Contact Number </strong>
                          </Row>
                          <Row
                            className="ml-5"
                            style={{ fontSize: 15, color: "black" }}
                          >
                            <Form.Group
                              controlId="exampleForm.ControlInput1"
                              style={{ width: 500 }}
                            >
                              <Form.Control
                                type="number"
                                readOnly
                                value={ContactNumber}
                                onChange={(e) => {
                                  setContactNumber(e.target.value);
                                }}
                              />
                            </Form.Group>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm={2} className="mt-4 ml-5">
              <Row className="" style={{ fontSize: 25 }}>
                <strong>Action</strong>
              </Row>

              <Row className="mt-2" style={{ fontSize: 20 }}>
                <Button variant="info" type="submit">
                  <FaRegEdit /> Update Changes
                </Button>
              </Row>
              <Row className="mt-2" style={{ fontSize: 20 }}>
                <Button variant="danger" onClick={props.cancelChanges}>
                  <AiOutlineDelete /> Cancel Changes
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}

export default UpdateVetVerifiedData;
