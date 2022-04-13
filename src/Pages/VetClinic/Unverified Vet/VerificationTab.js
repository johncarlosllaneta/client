import React, { useState, useRef, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Image,
  Modal,
  Form,
  Alert,
  Popover,
  Overlay,
  Container,
  Spinner,
} from "react-bootstrap";
import imgUrlFindVet from "../../../Images/assets/findVet.png";
import imgUrlProductPlus from "../../../Images/assets/productsPlus.png";
import imgUrlRating from "../../../Images/assets/rating.png";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../../Components/Host";
import { apps } from "../../../Components/base";
import uploadImage from "../../../Images/upload_permit.jpg";
import uploadImageForm from "../../../Images/upload_permit_form.jpg";
import getUser from "../../../Components/userData";

const VerificationTab = () => {
  var imagecss = {
    width: "50%",
    height: "18vh",
    marginRight: "30%",
    marginLeft: "30%",
    marginTop: "20%",
  };

  var imagecsss = {
    width: "50%",

    marginRight: "30%",
    marginLeft: "25%",
    marginTop: "10%",
  };

  var cardcss = {
    width: "100%",
    height: "70%",
    borderRadius: 20,
    backgroundColor: "white",
    boxShadow: "#cdc8c6 -15px 20px 15px -15px",
  };

  var textcss = {
    fontSize: 14,
    textAlign: "center",
  };

  const [vetPermitLink, setvetPermitLink] = useState();
  const [submittedFile, setsubmittedFile] = useState("none");
  const [submittedNot, setsubmittedNot] = useState("block");

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    setvetPermitLink(userData.vet_permit);
    if (userData.vet_permit == "" || userData.vet_permit == null) {
      setsubmittedNot("block");
      setsubmittedFile("none");
    } else {
      setsubmittedNot("none");
      setsubmittedFile("block");
    }
  }, []);




  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setShow(true);
    }
    setValidated(true);
  };
  const [petmitUpload, setpetmitUpload] = useState();
  const [petmitUploadLink, setpetmitUploadLink] = useState();
  const [validated, setValidated] = useState(false);

  const uploadPermit = async (e) => {
    setbuttonDelay("Checking file");
    setsubmitShowDelayLabel(false);
    const storageRef = apps.storage().ref();
    const filRef = storageRef.child(e.name);
    await filRef.put(e);
    setpetmitUploadLink(await filRef.getDownloadURL());
    console.log(await filRef.getDownloadURL());

    buttonSubmitDelay();
  };

  function submitPermit() {
    handleClose();
    handleShowUpload();
    setTimeout(() => {
      handleCloseUpload();
    }, 3000);
    Axios.put(`${hostUrl}/vetclinic/verification/${user.vet_admin_id}`, {
      vet_permit: petmitUploadLink,
    }).then((response) => {
      if (response.data.message === "Update Successfully") {
        // Authenticate and sign in for vet clinic

        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }
            window.location.href = `/verification`;
          }
        });
      }
    });
  }

  const [showUpload, setShowUpload] = useState(false);
  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  const [showToolTip, setShowToolTip] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowToolTip(!showToolTip);
    setTarget(event.target);
  };

  const [imageDiv, setimageDiv] = useState("block");
  const [formDiv, setformDiv] = useState("none");

  function imageDivController() {
    setimageDiv("block");
    setformDiv("none");
  }

  function formDivController() {
    setimageDiv("none");
    setformDiv("block");
  }

  const [submitShowDelay, setsubmitShowDelay] = useState(true);
  const [submitShowDelayLabel, setsubmitShowDelayLabel] = useState(true);
  const [buttonDelay, setbuttonDelay] = useState("Upload Permit");
  function buttonSubmitDelay() {
    setTimeout(function () {
      setsubmitShowDelay(false);
      setbuttonDelay("Upload Permit");
      setsubmitShowDelayLabel(true);
    }, 10000);
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Modal show={showUpload} onHide={handleCloseUpload}>
        <Modal.Body>
          <Alert variant="success" onClose={handleCloseUpload} dismissible>
            <Alert.Heading>Upload File Successfully</Alert.Heading>
            <p>
              Wait for the validation of your account on your registered email.
            </p>
            <hr />
            <p className="mb-0">Thankyou for choosing TerraVet!</p>
          </Alert>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{ display: "inline-block" }}>
          <strong>Confirmation</strong>
          <p>Are you sure you want to proceed ?</p>

          <Container
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              style={{
                marginLeft: 10,
                backgroundColor: "#0A94A4",
              }}
              type="submit"
              onClick={submitPermit}
            >
              Save Changes
            </Button>
          </Container>
        </Modal.Body>
      </Modal>

      <Card
        style={{
          backgroundColor: "white",
          padding: 50,
        }}
      >
        <Row>
          <Col>
            <div style={{ marginLeft: 25 }}>
              <h1 style={{ color: "#0A94A4", textAlign: "left" }}>
                Why do I need to get Verified?
              </h1>
              <p style={{ textAlign: "left" }}>
                It is a one-time validation process that we do to make sure you
                are a genuine veterinary clinic.
                <br /> When you are verified, you will have access to more
                features and services.
              </p>

              <Container
                style={{
                  display: submittedNot,
                }}
              >
                <Row>
                  <h2 style={{ color: "#0A94A4" }}>After Verification</h2>
                </Row>
                <Row>
                  <p>Unlock more features like:</p>
                </Row>
                <Row>
                  <Col>
                    <Card style={cardcss}>
                      <Image src={imgUrlFindVet} style={imagecss} />
                      <Card.Body>
                        <Card.Title style={textcss}>
                          Visibility of Vet Clinic
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={cardcss}>
                      <Image src={imgUrlRating} style={imagecss} />
                      <Card.Body>
                        <Card.Title style={textcss}>
                          Get Ratings from the Pet Owners
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={cardcss}>
                      <Image src={imgUrlProductPlus} style={imagecss} />
                      <Card.Body>
                        <Card.Title style={textcss}>
                          Add Product and Services
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Button
                    variant="outline-primary"
                    style={{
                      display: imageDiv,
                    }}
                    // onClick={handleShow}
                    onClick={formDivController}
                  >
                    Verified Now
                  </Button>
                </Row>
              </Container>

              <div
                style={{
                  display: submittedFile,
                  justifyContent: "start",
                }}
              >
                <h1 style={{ color: "#0A94A4", textAlign: "left" }}>
                  Permit Verification
                </h1>

                <p style={{ textAlign: "left" }}>
                  Your permit is under verification of our administrator. Wait
                  for your confirmation to gain full access to your account.
                </p>

                <Button
                  variant="outline-primary"
                  style={{
                    display: imageDiv,
                  }}
                  // onClick={handleShow}
                  onClick={formDivController}
                >
                  Resubmit Permit
                </Button>
              </div>
            </div>
          </Col>

          <Col>
            <Container
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "flex-end",
              }}
            >
              <BsFillInfoCircleFill
                onClick={handleClick}
                style={{
                  color: "#0A94A4",
                  fontSize: 30,
                  cursor: "pointer",
                }}
              />
            </Container>

            <Overlay
              show={showToolTip}
              target={target}
              placement="bottom"
              container={ref.current}
              containerPadding={20}
            >
              <Popover id="popover-contained">
                <Popover.Header as="h3">
                  <strong>Helper</strong>
                </Popover.Header>
                <Popover.Body>
                  This page is for uploading your valid permit. The form only
                  supports PDF file format.
                </Popover.Body>
              </Popover>
            </Overlay>

            <div
              style={{
                display: imageDiv,
              }}
            >
              <Image
                src={uploadImage}
                style={{
                  height: 505,
                  marginTop: 30,
                }}
              />
            </div>

            <div
              style={{
                display: formDiv,
              }}
            >
              <Form noValidate validated={validated} onSubmit={handleShow}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Container>
                    <Image
                      src={uploadImageForm}
                      style={{
                        height: 300,
                      }}
                    />
                  </Container>

                  <Form.Label>Vet Permit Upload</Form.Label>
                  <Form.Control
                    type="file"
                    accept="application/pdf,application/vnd.ms-excel"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setpetmitUpload(file);
                      uploadPermit(e.target.files[0]);
                      e.preventDefault();
                    }}
                  />
                  <Form.Text className="text-muted">
                    This form only accept pdf file format.
                  </Form.Text>

                </Form.Group>

                <p hidden={submitShowDelayLabel}>
                  Please wait for a moment. We're verifying your file.
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </p>

                <Button
                  variant="outline-secondary"
                  onClick={imageDivController}
                >
                  Close
                </Button>
                <Button
                  style={{
                    marginLeft: 10,
                    backgroundColor: "#0A94A4",
                  }}
                  disabled={submitShowDelay}
                  type="submit"
                >
                  {buttonDelay}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>

      {/* --------------------------------------------------------------------------------------------------------------------- */}
    </div>
  );
};

export default VerificationTab;
