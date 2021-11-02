import React, { useState, useEffect } from "react";
import {
  Row,
  Card,
  Col,
  Container,
  Button,
  Modal,
  NavDropdown,
  Navbar,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
// import "../PetOwner/Css/petAppointmentStyle.css";
import "../../css/Appointment.css";
import { hostUrl } from "../../Components/Host";
import Avatar from "react-avatar";
import { IoNotificationsSharp } from "react-icons/io5";
const PetAppointment = () => {
  const [user, setuser] = useState([]);
  const [numberOfUnviewedNotif, setnumberOfUnviewedNotif] = useState(0);

  const [counter, setcounter] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 2) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);

        Axios.get(
          `${hostUrl}/petOwner/notification/length/${user.pet_owner_id}`
        ).then((response) => {
          setnumberOfUnviewedNotif(response.data.view);
          // alert(response.data.view);
        });
      });
      setcounter(counter + 1);
    }
  }, [user]);

  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    if (counter < 2) {
      Axios.get(`${hostUrl}/appointments/:${user.pet_owner_id}`).then(
        (response) => {
          setAppointment(response.data);
        }
      );
    }
    // console.log(appointment);
  }, [appointment]);

  const [appointmentPending, setAppointmentPending] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/appointments/pending/:${user.pet_owner_id}`).then(
        (response) => {
          setAppointmentPending(response.data);
        }
      );
    }
    // console.log(appointmentPending);
  }, [appointmentPending]);

  const [notif, setnotif] = useState([]);
  useEffect(() => {
    Axios.get(`${hostUrl}/petOwner/notification/${user.pet_owner_id}`).then(
      (response) => {
        setnotif(response.data);
      }
    );
    // console.log(notif);
  }, [notif]);

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

  function timeFormatter(time) {
    var timeCurrent = time.split(":");

    if (timeCurrent[0] == "16") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "17") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "18") {
      return "2:" + timeCurrent[1 + ":"] + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "19") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "20") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "21") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "22") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "23") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "24") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "01") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "02") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "03") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "04") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "05") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "06") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "07") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "08") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "09") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "10") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "11") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "12") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "13") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "14") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "15") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    }
  }

  const notifTitle = (
    <div>
      {String(numberOfUnviewedNotif) === "0" ? (
        <Badge bg="primary" pill style={{ fontSize: 25, color: "whitesmoke" }}>
          <IoNotificationsSharp style={{ fontSize: 30, color: "whitesmoke" }} />
        </Badge>
      ) : (
        <Badge bg="primary" pill style={{ fontSize: 25, color: "whitesmoke" }}>
          <IoNotificationsSharp style={{ fontSize: 30, color: "whitesmoke" }} />
          {String(numberOfUnviewedNotif)}
        </Badge>
      )}
    </div>
  );
  function viewing() {
    Axios.put(`${hostUrl}/petOwner/notification/viewed/${user.pet_owner_id}`);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [serviceName, setserviceName] = useState();
  const [serviceDescription, setserviceDescription] = useState();
  const [vetName, setvetName] = useState();
  const [timeSet, settimeSet] = useState();
  const [dateSet, setdateSet] = useState();
  const [fee, setfee] = useState();
  const [petName, setpetName] = useState();
  const [status, setstatus] = useState();
  const [appointmentId, setappointmentId] = useState();
  const [serviceId, setserviceId] = useState();

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

  const cancelAppointment = () => {
    Axios.put(`${hostUrl}/petowner/appointment/cancel/${appointmentId}`).then(
      (response) => {
        Axios.post(`${hostUrl}/notification/appointment`, {
          appointment_id: appointmentId,
          service_id: serviceId,
          status: "Cancelled",
        });
      }
    );
  };

  return (
    <div
      style={{
        width: "77vw",
        marginLeft: 40,
        marginTop: 30,
      }}
    >
      <Modal show={show1} onHide={handleClose1}>
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
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              cancelAppointment();
              handleClose1();
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col>
          <Container style={{ display: "flex", flexDirection: "row" }}>
            <h1
              style={{
                color: "#3BD2E3",
                textAlign: "left",
              }}
            >
              Upcoming Appointment
            </h1>
            <Navbar>
              <NavDropdown
                title={notifTitle}
                id="navbarScrollingDropdown"
                // align={"end"}
                onClick={viewing}
              >
                <NavDropdown.Header>Notification</NavDropdown.Header>
                <div style={{ height: 400, overflowY: "auto" }}>
                  {notif.map((val) => {
                    return (
                      <NavDropdown.Item style={{ width: 400 }}>
                        <div>
                          <Row>
                            <Col>
                              <text>
                                {" "}
                                {dateConvertion(
                                  val.date_time_created.toString().split("T")[0]
                                )}
                              </text>
                            </Col>
                            <Col>
                              <text style={{ float: "right" }}>
                                {" "}
                                {timeFormatter(
                                  val.date_time_created
                                    .toString()
                                    .split("T")[1]
                                    .substring(
                                      0,
                                      val.date_time_created
                                        .toString()
                                        .split("T")[1].length - 5
                                    )
                                )}
                              </text>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              sm={3}
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <Avatar
                                round={true}
                                size={60}
                                src={val.vet_picture}
                                name={val.vet_name}
                              />
                            </Col>
                            <Col sm={9}>
                              <Row>{val.vet_name}</Row>
                              <Row>{val.service_name}</Row>
                              <Row>Status:{val.status}</Row>
                            </Col>
                          </Row>
                        </div>
                      </NavDropdown.Item>
                    );
                  })}
                </div>
              </NavDropdown>
            </Navbar>
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
              href={"/petOwner/Appointment"}
              style={{
                borderRadius: 20,
                border: "3px solid white",
                backgroundColor: "#3BD2E3",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: "inline",
              }}
            >
              Add appointment
            </Button>

            <Button
              href={"/petOwner/Appointment/History"}
              style={{
                borderRadius: 20,
                border: "3px solid white",
                backgroundColor: "#3BD2E3",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                display: "inline",
                marginLeft: 25,

                paddingLeft: 50,
                paddingRight: 50,
              }}
            >
              History
            </Button>
          </Container>
        </Col>
      </Row>
      <div
        id="petContainer"
        style={{
          height: 300,
          maxHeight: 300,
          display: "flex",
          overflowX: "auto",
          backgroundColor: "white",
          borderRadius: 15,
          padding: 40,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {appointment.length > 0 ? (
          appointment.map((val) => {
            return (
              <div>
                <Card
                  onClick={() => {
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
                  id="item"
                  style={{
                    padding: 15,
                    cursor: "pointer",
                  }}
                >
                  <h3>{val.service_name}</h3>
                  <p>
                    <strong>Date: </strong>{" "}
                    {dateConvertion(String(val.date_scheduled).split("T")[0])}{" "}
                  </p>
                  <p>
                    <strong>Time: </strong> {val.time_scheduled}{" "}
                  </p>
                  <p>
                    <strong>Appointment ID: </strong> {val.appointment_id}{" "}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "gray",
                      }}
                    >
                      Click for more info
                    </p>
                  </div>
                </Card>
              </div>
            );
          })
        ) : (
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>No show result</p>
          </Container>
        )}
      </div>

      <Container
        style={{
          marginTop: 20,
        }}
      >
        <h1
          style={{
            color: "#3BD2E3",
            textAlign: "left",
            marginLeft: -70,
          }}
        >
          Pending Appointments
        </h1>
      </Container>

      <div
        id="wrapper"
        style={{
          height: 350,
          display: "inline-list-item",
          overflowY: "auto",
          backgroundColor: "white",
          borderRadius: 30,
          padding: 40,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {appointmentPending.map((val) => {
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
                          setappointmentId(val.appointment_id);
                          setserviceId(val.service_id);
                          handleShow1();
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
};

export default PetAppointment;
