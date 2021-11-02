import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  Col,
  Container,
  Button,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "../PetOwner/Css/petAppointmentStyle.css";
import { hostUrl } from "../../Components/Host";
import ReactStars from "react-rating-stars-component";
import reactStars from "react-rating-stars-component";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

function AppointmentHistory(props) {
  const [appointment, setAppointment] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(
        `${hostUrl}/appointments/histories/:${props.data.pet_owner_id}`
      ).then((response) => {
        setAppointment(response.data);
      });
      setcounter(counter + 1);
    }
    // console.log(appointment);
  }, [appointment]);

  function dateConvertion(date) {
    var str = date.split("-");
    var year = str[0];
    var month;
    var day = str[2];

    if (str[1] === "01") {
      month = "January";
    } else if (str[1] === "02") {
      month = "February";
    } else if (str[1] === "03") {
      month = "March";
    } else if (str[1] === "04") {
      month = "April";
    } else if (str[1] === "05") {
      month = "May";
    } else if (str[1] === "06") {
      month = "June";
    } else if (str[1] === "07") {
      month = "July";
    } else if (str[1] === "08") {
      month = "August";
    } else if (str[1] === "09") {
      month = "September";
    } else if (str[1] === "10") {
      month = "October";
    } else if (str[1] === "11") {
      month = "November";
    } else if (str[1] === "12") {
      month = "December";
    }

    return month + " " + day + ", " + year;
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [appointment_id, setappointment_id] = useState();
  const [serviceName, setserviceName] = useState();
  const [serviceDescription, setserviceDescription] = useState();
  const [vetName, setvetName] = useState();
  const [timeSet, settimeSet] = useState();
  const [dateSet, setdateSet] = useState();
  const [fee, setfee] = useState();
  const [petName, setpetName] = useState();
  const [status, setstatus] = useState();

  function getVetName(vetid) {
    Axios.get(`${hostUrl}/vetclinic/verified/appointment/${vetid}`).then(
      (response) => {
        setvetName(response.data[0].vet_name);
      }
    );
  }

  function getPetName(pet_id) {
    Axios.get(`${hostUrl}/pets/appointment/${pet_id}`).then((response) => {
      setpetName(response.data[0].pet_name);
    });
  }

  // controller for rate and feedback modal
  const [showRateAndFeedback, setShowRateAndFeedback] = useState(false);

  const handleCloseRateAndFeedback = () => setShowRateAndFeedback(false);
  const handleShowRateAndFeedback = () => setShowRateAndFeedback(true);
  const [ratings, setratings] = useState();
  const ratingChanged = (newRating) => {
    // alert(newRating);
    setratings(newRating);
  };
  const [comment, setcomment] = useState();
  const [validated, setValidated] = useState(false);

  function handleEmailPassword(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      Axios.post(`${hostUrl}/ratings&feedback/${appointment_id}`, {
        ratings: ratings,
        comments: comment,
      }).then((response) => {
        if (response.data.message == "success") {
          setShowRateAndFeedback(false);
        }
      });
    }

    setValidated(true);
  }

  return (
    <div
      style={{
        width: "77vw",
        marginLeft: 40,
        marginTop: 30,
      }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Service Name: </strong> {serviceName}
          </p>
          <p>
            <strong>Service Description: </strong> {serviceDescription}
          </p>
          <p>
            <strong>Vet Name: </strong> {vetName}
          </p>
          <p>
            <strong>Date: </strong> {dateSet} <br></br> <strong>Time: </strong>{" "}
            {timeSet}
          </p>
          <p>
            <strong>Fee: </strong> {fee}
          </p>
          <p>
            <strong>Pet Involved: </strong> {petName}
          </p>
          <p>
            <strong>Status: </strong> {status}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShowRateAndFeedback();
            }}
          >
            Rate and Feedback
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for rate and feedback */}
      <Modal
        show={showRateAndFeedback}
        onHide={handleCloseRateAndFeedback}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Rate and Feedback</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleEmailPassword}>
          <Modal.Body>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h4>How was your experience?</h4>
            </Container>

            <Container
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={50}
                isHalf={true}
                emptyIcon={<BsStar />}
                halfIcon={<BsStarHalf />}
                fullIcon={<BsStarFill />}
                activeColor="#ffd700"
              />
            </Container>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  minLength={5}
                  maxLength={200}
                  required
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please type a valid comment.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Row>
        <Col>
          <Container>
            <h1
              style={{
                color: "#3BD2E3",
                textAlign: "left",
              }}
            >
              Appointment History
            </h1>
          </Container>
        </Col>

        <Col>
          <Container
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              href={"/appointment"}
              style={{
                borderRadius: 20,
                border: "3px solid white",
                backgroundColor: "#3BD2E3",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: "inline",
                paddingLeft: 50,
                paddingRight: 50,
              }}
            >
              Back
            </Button>
          </Container>
        </Col>
      </Row>

      <div
        id="wrapper"
        style={{
          height: 700,
          display: "inline-list-item",
          overflowY: "auto",
          backgroundColor: "white",
          borderRadius: 30,
          padding: 40,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {appointment.map((val) => {
          return (
            <div>
              <Card
                id="itemHistory"
                style={{
                  padding: 20,
                  margin: 10,
                }}
              >
                <Row>
                  <Col>
                    {/* date and time */}
                    <div
                      style={{
                        marginTop: 20,
                        borderRight: "2px solid grey",
                      }}
                    >
                      <h2>
                        {dateConvertion(val.date_scheduled.split("T")[0])}{" "}
                      </h2>

                      <h6>{val.time_scheduled} </h6>
                    </div>
                  </Col>
                  <Col sm={4}>
                    {/* service name */}

                    <div
                      style={{
                        marginTop: 20,
                        borderRight: "2px solid grey",
                      }}
                    >
                      <h2>{val.service_name}</h2>

                      <h6
                        style={{
                          color: "#3BD2E3",
                        }}
                      >
                        {" "}
                        Service Name
                      </h6>
                    </div>
                  </Col>
                  <Col>
                    {/* vet clinic */}
                    <div
                      style={{
                        marginTop: 20,
                        borderRight: "2px solid grey",
                      }}
                    >
                      <h4>{val.vet_name}</h4>

                      <h6
                        style={{
                          color: "#3BD2E3",
                        }}
                      >
                        {" "}
                        Veterinary Clinic
                      </h6>
                    </div>
                  </Col>
                  <Col>
                    {/* button */}
                    <Container
                      style={{
                        paddingTop: 25,
                      }}
                    >
                      <Button
                        style={{
                          borderRadius: 30,
                          width: 200,
                          backgroundColor: "#3BD2E3",
                          borderColor: "transparent",
                        }}
                        onClick={() => {
                          setappointment_id(val.appointment_id);
                          setserviceName(val.service_name);
                          setserviceDescription(val.service_description);
                          getVetName(val.vetid);
                          settimeSet(val.time_scheduled);
                          setdateSet(
                            dateConvertion(val.date_scheduled.split("T")[0])
                          );
                          setfee(val.service_fee);
                          getPetName(val.pet_id);
                          setstatus(val.appointment_status);
                          handleShow();
                        }}
                      >
                        View Details
                      </Button>
                    </Container>
                  </Col>
                </Row>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentHistory;
