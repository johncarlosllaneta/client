import React, { useState } from "react";
import { Col, Row, Button, Modal, Container } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosPaper } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { MdClear } from "react-icons/md";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";


function ViewVetPendingProfile(props) {
  const [show, setShow] = useState(false);
  const [showAccept, setShowAccept] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);

  const acceptClinic = (vetClinicId) => {
    Axios.put(`${hostUrl}/vetclinic/confirm/${vetClinicId}`);
  };

  const rejectClinic = (vetClinicId) => {
    Axios.put(`${hostUrl}/vetclinic/invalid/${vetClinicId}`);
  };

  return (
    <div>
      <Modal show={showAccept} onHide={() => setShowAccept(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Accept Vet Clinic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to accept this vet clinic?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAccept(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              acceptClinic(props.viewProfileVetData.vet_admin_id);
              setShowAccept(false);
              props.tableRefresher();
              props.ToastSuccess();
              props.cancelButton();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showInvalid} onHide={() => setShowInvalid(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Vet Clinic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reject this vet clinic?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInvalid(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              rejectClinic(props.viewProfileVetData.vet_admin_id);
              setShowInvalid(false);
              props.tableRefresher();
              props.ToastSuccess();
              props.cancelButton();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Business Permit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "auto", height: "auto" }}>
          <Container>

          </Container>
        </Modal.Body>
      </Modal>

      <Row
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: 10,
        }}
      >
        <MdClear
          style={{ fontSize: 25, cursor: "pointer" }}
          onClick={props.cancelButton}
        />
      </Row>
      <Row>
        <Col sm="2" className="ml-5">
          <Row
            className=""
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={props.viewProfileVetData.vet_picture}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                border: "7px",
                borderStyle: "solid",
                borderColor: "transparent",
                marginTop: "2vh",
              }}
            ></img>
          </Row>

          <Row
            className="mt-1"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <strong style={{ fontSize: 15 }}>
              {props.viewProfileVetData.vet_name}
            </strong>
          </Row>
        </Col>

        <Col sm={9} className="ml-3 mt-3">
          <Row>
            <Col>
              <Row className="mt-3" style={{ fontSize: 25 }}>
                <strong>Vet Clinic Details</strong>
              </Row>
            </Col>
            <Col>
              <Row className="mt-3" style={{ fontSize: 25 }}>
                <strong>Action</strong>
              </Row>
            </Col>
          </Row>

          <Row className="mt-4 mb-4">
            <Col>
              <Row className="ml-5" style={{ fontSize: 12, color: "grey" }}>
                <strong>Email </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 15, color: "black" }}>
                <p>{props.viewProfileVetData.email}</p>
              </Row>

              <Row className="ml-5" style={{ fontSize: 12, color: "grey" }}>
                <strong>Address </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 15, color: "black" }}>
                <p>{props.viewProfileVetData.vet_address}</p>
              </Row>

              <Row className="ml-5" style={{ fontSize: 12, color: "grey" }}>
                <strong>Contact Number </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 15, color: "black" }}>
                <p>{props.viewProfileVetData.vet_contact_number}</p>
              </Row>
            </Col>

            <Col>
              <Row style={{ fontSize: 20 }}>
                <Button
                  className="mt-2 ml-5"
                  style={{ display: "flex", width: 200 }}
                  disabled={props.access}
                  variant="info"
                  onClick={() => {
                    // setShow(true);
                    window
                      .open(props.viewProfileVetData.vet_permit, "_blank")
                      .focus();
                  }}
                >
                  <IoIosPaper style={{ fontSize: 20, marginRight: 10 }} /> View
                  Permit
                </Button>
              </Row>
              <Row style={{ fontSize: 20 }}>
                <Button
                  className="mt-2 ml-5"
                  style={{ display: "flex", width: 200 }}
                  disabled={props.access}
                  variant="success"
                  onClick={() => setShowAccept(true)}
                >
                  <AiOutlineCheckCircle
                    style={{ fontSize: 20, marginRight: 10 }}
                  />{" "}
                  Accept
                </Button>
              </Row>
              <Row style={{ fontSize: 20 }}>
                <Button
                  className="mt-2 ml-5"
                  style={{ display: "flex", width: 200 }}
                  disabled={props.access}
                  variant="danger"
                  onClick={() => {
                    setShowInvalid(true);
                  }}
                >
                  <TiCancel style={{ fontSize: 20, marginRight: 10 }} />{" "}
                  Resubmit
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ViewVetPendingProfile;
