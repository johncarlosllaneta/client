import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Button,
  Col,
  Card,
  Form,
  Modal,
  Popover,
  Overlay,
  FloatingLabel,
} from "react-bootstrap";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
import Axios from "axios";
import background from "../../Images/bg.png";
import { hostUrl } from "../../Components/Host";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import "../../css/PetServDetails.css";

const PetServDetail = () => {
  let { serviceid } = useParams();

  const [date, setdate] = useState();
  useEffect(() => {
    let yyyy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }
    let today = yyyy + "-" + mm + "-" + dd;
    setdate(today);
    // alert(today);
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleCloseForm();
      setShow(true);
    }

    setValidated(true);
  };

  const [dateSet, setdateSet] = useState();
  const [timeSet, settimeSet] = useState();

  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });
      setcounter(counter + 1);
    }
  }, [counter, user]);

  const [petId, setpetId] = useState();
  const [petName, setpetName] = useState();
  let optionss = [];

  const [pet, setPet] = useState([]);
  useEffect(() => {
    if (counter < 10) {
      Axios.get(`${hostUrl}/pets/:${user.pet_owner_id}`).then((response) => {
        response.data.forEach((element) => {
          optionss.push(element);
        });
        setPet(optionss);
        // pet.unshift('nice');
      });
    }
    // console.log(pet);
  }, [user]);

  const [services, setservices] = useState([]);
  useEffect(() => {
    // alert(serviceid.split('&')[1] + "&" + serviceid.split('&')[0]);
    if (counter < 10) {
      Axios.get(
        `${hostUrl}/services/details/info/:${serviceid.split("&")[1] + "&" + serviceid.split("&")[0]
        }`
      ).then((response) => {
        setservices(response.data);
        // console.log(response.data)
      });
    }
    // console.log(services);
  }, []);

  const [vetclinic, setVetClinic] = useState([]);
  const [monday, setmonday] = useState();
  const [tuesday, settuesday] = useState();
  const [wednesday, setwednesday] = useState();
  const [thursday, setthursday] = useState();
  const [friday, setfriday] = useState();
  const [saturday, setsaturday] = useState();
  const [sunday, setsunday] = useState();
  useEffect(() => {
    if (counter < 10) {
      Axios.get(
        `${hostUrl}/vetclinic/verified/${serviceid.split("&")[1]}`
      ).then((response) => {
        setVetClinic(response.data[0]);
        // alert(vetclinic);
      });
      if (vetclinic != undefined) {
        setmonday(vetclinic.scheduleMonday);
        settuesday(vetclinic.scheduleTuesday);
        setwednesday(vetclinic.scheduleWednesday);
        setthursday(vetclinic.scheduleThursday);
        setfriday(vetclinic.scheduleFriday);
        setsaturday(vetclinic.scheduleSaturday);
        setsunday(vetclinic.scheduleSunday);
        // alert(monday);
      }
    }
  }, [vetclinic]);

  const [serviceId, setserviceId] = useState();
  const [serviceName, setserviceName] = useState();
  const [serviceDescription, setserviceDescription] = useState();
  const [serviceFee, setserviceFee] = useState();

  const [validated, setValidated] = useState(false);
  const [appointId, setappointId] = useState();
  const submitAppointment = () => {
    Axios.post(`${hostUrl}/appointment/set`, {
      vet_admin_id: serviceid.split("&")[1],
      pet_owner_id: user.pet_owner_id,
      pet_id: petId,
      dateSet: dateSet,
      timeSet: timeSet,
      service_id: serviceId,
    }).then((response) => {
      if (response.data.message === "Success") {
        Axios.get(
          `${hostUrl}/get/latest/entry/appointment/${user.pet_owner_id}/${serviceid.split("&")[1]
          }`
        ).then((response) => {
          setappointId(response.data[0].latestId);

          Axios.post(`${hostUrl}/notification/appointment`, {
            appointment_id: response.data[0].latestId,
            service_id: serviceId,
            status: "Pending",
          });
        });
      }

      handleClose();
      window.location.replace("/appointment");
    });
  };

  const [showToolTip, setShowToolTip] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowToolTip(!showToolTip);
    setTarget(event.target);
  };

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  var time = [];

  // Form controller
  const [showFormAppointment, setShowFormAppointment] = useState(false);

  const handleCloseForm = () => setShowFormAppointment(false);
  const handleShowForm = () => setShowFormAppointment(true);

  let timerOptionChecker = [
    "12:00 AM - 01:00 AM",
    "01:00 AM - 02:00 AM",
    "02:00 AM - 03:00 AM",
    "03:00 AM - 04:00 AM",
    "04:00 AM - 05:00 AM",
    "05:00 AM - 06:00 AM",
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 AM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
    "08:00 PM - 09:00 PM",
    "09:00 PM - 10:00 PM",
    "10:00 PM - 11:00 PM",
    "11:00 PM - 12:00 AM",
  ];

  const [timerOption, settimerOption] = useState([]);

  let startT = 0;
  let endT = 0;
  function setTimeAppointment(time) {
    var times = [
      "12:00 AM - 01:00 AM",
      "01:00 AM - 02:00 AM",
      "02:00 AM - 03:00 AM",
      "03:00 AM - 04:00 AM",
      "04:00 AM - 05:00 AM",
      "05:00 AM - 06:00 AM",
      "06:00 AM - 07:00 AM",
      "07:00 AM - 08:00 AM",
      "08:00 AM - 09:00 AM",
      "09:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 AM - 01:00 PM",
      "01:00 PM - 02:00 PM",
      "02:00 PM - 03:00 PM",
      "03:00 PM - 04:00 PM",
      "04:00 PM - 05:00 PM",
      "05:00 PM - 06:00 PM",
      "06:00 PM - 07:00 PM",
      "07:00 PM - 08:00 PM",
      "08:00 PM - 09:00 PM",
      "09:00 PM - 10:00 PM",
      "10:00 PM - 11:00 PM",
      "11:00 PM - 12:00 AM",
    ];
    var start = String(time).split(" - ")[0];
    var end = String(time).split(" - ")[1];
    var startHour = parseInt(String(start).split(":")[0]);
    var endHour = parseInt(String(end).split(":")[0]);
    // alert(startHour);
    startT = startHour;
    endT = endHour;

    if (timerOption.length > 0) {
      timerOption.forEach((element, index) => {
        timerOption.pop();
      });
    }

    // alert(startT + " " + endT);
    // alert(timerOption);
    // settimerOption(times);
    times.forEach((element, index) => {
      if (index > startT && index < endT) {
        timerOption.push(element);
      }
    });

    // timerOption.splice(endHour, times.length);
    // timerOption.splice(0, startHour);

    settimerOption(timerOption);
    // console.log(timerOption);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        marginTop: 110,
        zoom: value,
      }}
    >
      {/* Modal Form */}
      <Modal show={showFormAppointment} onHide={handleCloseForm} centered>
        <Form noValidate validated={validated} onSubmit={handleShow}>
          <Modal.Body>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontWeight: "bolder",
                }}
              >
                Appointment Form
              </h3>
            </Container>
            <Form.Group
              style={{
                marginBottom: 10,
              }}
            >
              <FloatingLabel controlId="floatingSelectGrid" label="Pets">
                <Form.Select
                  required
                  style={{
                    fontWeight: "bold",
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setpetId(e.target.value);

                    // alert(petId);
                  }}
                >
                  <option value={null}></option>
                  {pet.map((val) => {
                    return <option value={val.pet_id}>{val.pet_name}</option>;
                  })}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId="formDate"
              style={{
                textAlign: "left ",
                marginBottom: 10,
              }}
            >
              <FloatingLabel controlId="floatingSelectGrid" label="Date">
                <Form.Control
                  type="date"
                  required
                  min={date}
                  onChange={(e) => {
                    e.preventDefault();
                    setdateSet(e.target.value);

                    settimerOption([]);

                    // alert(new Date(e.target.value).getDay());
                    if (new Date(e.target.value).getDay() === 0) {
                      if (String(sunday).length > 0) {
                        settimerOption(timerOptionChecker);
                        setTimeAppointment(sunday);
                      }
                    } else if (new Date(e.target.value).getDay() === 1) {
                      if (String(monday).length > 0) {
                        settimerOption(timerOptionChecker);
                        setTimeAppointment(monday);
                      }
                    } else if (new Date(e.target.value).getDay() === 2) {
                      if (String(tuesday).length > 0) {
                        settimerOption(timerOptionChecker);
                        setTimeAppointment(tuesday);
                      }
                    } else if (new Date(e.target.value).getDay() == 3) {
                      if (String(wednesday).length > 0) {
                        settimerOption(timerOptionChecker);
                        setTimeAppointment(wednesday);
                      }
                    } else if (new Date(e.target.value).getDay() == 4) {
                      if (String(thursday).length > 0) {
                        settimerOption(timerOptionChecker);
                        setTimeAppointment(thursday);
                      }
                    } else if (new Date(e.target.value).getDay() == 5) {
                      if (String(friday).length > 0) {
                        settimerOption(timerOptionChecker);
                        setTimeAppointment(friday);
                      }
                    } else if (new Date(e.target.value).getDay() == 6) {
                      if (String(saturday).length > 0) {
                        settimerOption(timerOptionChecker);
                        setTimeAppointment(saturday);
                      }
                    }
                  }}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group
              controlId="formGridStateTypeOfPet"
              style={{
                textAlign: "left ",
                marginBottom: 10,
              }}
              as={Row}
            >
              <FloatingLabel controlId="floatingSelectGrid" label="Time">
                <Form.Select
                  as="select"
                  required
                  defaultValue={0}
                  custom
                  onChange={(e) => {
                    settimeSet(e.target.value);
                  }}
                >
                  <option value={null}></option>
                  {timerOption.map((val, index) => {
                    // alert(index);
                    // if (index >= startT && index <= endT) {
                    return <option value={val}>{val}</option>;
                    // }
                  })}
                  {/* <option value={"08:00 AM - 09:00 AM"}>
                    08:00 AM - 09:00 AM
                  </option>
                  <option value={"09:00 AM - 10:00 AM"}>
                    09:00 AM - 10:00 AM
                  </option>
                  <option value={"10:00 AM - 11:00 AM"}>
                    10:00 AM - 11:00 AM
                  </option>
                  <option value={"11:00 AM - 12:00 PM"}>
                    11:00 AM - 12:00 PM
                  </option>
                  <option value={"12:00 PM - 01:00 PM"}>
                    12:00 PM - 01:00 PM
                  </option>
                  <option value={"01:00 PM - 02:00 PM"}>
                    01:00 PM - 02:00 PM
                  </option>
                  <option value={"02:00 PM - 03:00 PM"}>
                    02:00 PM - 03:00 PM
                  </option>
                  <option value={"03:00 PM - 04:00 PM"}>
                    03:00 PM - 04:00 PM
                  </option>
                  <option value={"04:00 PM - 05:00 PM"}>
                    04:00 PM - 05:00 PM
                  </option> */}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            {serviceName !== undefined ? (
              <div>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#3BD2E3",
                    fontWeight: "bold",
                    marginTop: 10,
                    borderColor: "#FFFFFF",
                    width: "100%",
                  }}
                >
                  Set Appointment
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  disabled={true}
                  style={{
                    backgroundColor: "#3BD2E3",
                    fontWeight: "bold",
                    marginTop: 10,
                    borderColor: "#FFFFFF",
                    width: "100%",
                  }}
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Set Appointment
                </Button>
              </div>
            )}

            {/* </Container> */}
          </Modal.Body>
        </Form>
      </Modal>

      <NavBarAppointments />

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontWeight: "bold" }}>
            Are you sure you want to setup an appointment?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "white",
              borderRadius: 30,
              borderWidth: 2,
              borderColor: "#3BD2E3",
              width: 100,
              fontWeight: "bolder",
              color: "#3BD2E3",
            }}
            onClick={() => {
              handleClose();
              handleShowForm();
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#3BD2E3",
              borderRadius: 30,
              borderWidth: 5,
              borderColor: "#FFFFFF",
              width: 100,
              fontWeight: "bolder",
            }}
            onClick={submitAppointment}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Container */}
      <Container
        id='containerWeb'
      >
        <Row>
          <Container
            style={{
              backgroundColor: "white",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              height: "80vh",
              width: "120vw",
              marginTop: 30,
              paddingTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <Container
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginLeft: -15,
                }}
              >
                <Button
                  href={`/petOwner/Appointment/vetdetails/service/${serviceid.split("&")[1]
                    }`}
                  style={{
                    backgroundColor: "#3BD2E3",
                    paddingLeft: 30,
                    paddingRight: 30,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: "#FFFFFF",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    marginBottom: 30,
                  }}
                >
                  Back
                </Button>
              </Container>

              <Container
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
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
                      This page allows you to see the list of services of your
                      chosen category. Upon Clicking the service you want to
                      schedule, the details of that service will be shown on the
                      right portion of the screen.
                      <br />
                      Your appointment will be complete once you fill up the
                      form below details section.
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </Container>
            </div>
            <h1
              style={{
                textAlign: "left",
                color: "#3BD2E3",
              }}
            >
              {serviceid.split("&")[0]}
            </h1>

            <Row>
              <Col>
                {/* services display */}
                <Container
                  style={{
                    backgroundColor: "#EFF1F7",
                    height: 500,
                    width: 500,
                    borderRadius: 30,
                    margin: 10,
                    textAlign: "left",
                    padding: 10,
                    // boxShadow: "1px 3px 1px 1px  grey inset"
                  }}
                >
                  <Container
                    style={{
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        overflowY: "auto",
                        rowGap: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        padding: 10,
                        // backgroundColor: 'red'
                      }}
                    >
                      {services.length !== 0
                        ? services.map((e) => {
                          return (
                            <Card
                              style={{
                                height: 90,
                                width: "60vw",
                                justifyContent: "center",
                                borderRadius: 30,
                                boxShadow:
                                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                              }}
                            >
                              <Card.Title
                                className="mt-1"
                                onClick={() => {
                                  setserviceId(e.service_id);
                                  setserviceName(e.service_name);
                                  setserviceDescription(
                                    e.service_description
                                  );
                                  setserviceFee(e.service_fee);
                                }}
                                style={{
                                  cursor: "pointer",
                                  fontSize: 25,
                                  marginLeft: 10,
                                  color: "black",
                                  fontWeight: "bold",
                                }}
                              >
                                {e.service_name}
                              </Card.Title>
                            </Card>
                          );
                        })
                        : "Empty Service"}
                    </div>
                  </Container>
                </Container>
              </Col>

              <Col sm={7}>
                {/* service info and form*/}

                <Container
                  style={{
                    height: "50vh",
                    width: "35vw",
                    marginTop: 10,
                    borderRadius: 30,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    paddingTop: 20,
                  }}
                >
                  {serviceName !== undefined ? (
                    <div>
                      {" "}
                      <h1>{serviceName}</h1>
                      <h5
                        style={{
                          color: "#3BD2E3",
                          fontWeight: "bolder",
                        }}
                      >
                        Service Name
                      </h5>
                      <Container
                        style={{
                          overflowY: "auto",
                        }}
                      >
                        <p>{serviceDescription}</p>
                      </Container>
                      <h5
                        style={{
                          color: "#3BD2E3",
                          fontWeight: "bolder",
                        }}
                      >
                        Service Description
                      </h5>
                      <h4>₱{serviceFee}.00</h4>
                      <h5
                        style={{
                          color: "#3BD2E3",
                          fontWeight: "bolder",
                        }}
                      >
                        Price
                      </h5>
                      <Button
                        style={{
                          backgroundColor: "#056068",
                          width: "100%",
                        }}
                        variant="primary"
                        onClick={handleShowForm}
                      >
                        Setup Appointment
                      </Button>
                    </div>
                  ) : (
                    <Container
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "15vh",
                      }}
                    >
                      {" "}
                      <p>No service selected</p>
                    </Container>
                  )}
                </Container>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>


      {/* Mobile */}
      <Container
        id='containerMobile'
      >
        <Row>
          <Container
            style={{
              backgroundColor: "white",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              height: "auto",
              width: 350,
              minWidth: 350,
              marginTop: 30,
              paddingTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <Container
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginLeft: -15,
                }}
              >
                <Button
                  href={`/petOwner/Appointment/vetdetails/service/${serviceid.split("&")[1]
                    }`}
                  style={{
                    backgroundColor: "#3BD2E3",
                    paddingLeft: 30,
                    paddingRight: 30,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: "#FFFFFF",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    marginBottom: 30,
                  }}
                >
                  Back
                </Button>
              </Container>

              <Container
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
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
                      This page allows you to see the list of services of your
                      chosen category. Upon Clicking the service you want to
                      schedule, the details of that service will be shown on the
                      right portion of the screen.
                      <br />
                      Your appointment will be complete once you fill up the
                      form below details section.
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </Container>
            </div>
            <h1
              style={{
                textAlign: "left",
                color: "#3BD2E3",
              }}
            >
              {serviceid.split("&")[0]}
            </h1>

            <Row>
              <Col>
                {/* services display */}
                <Container
                  style={{
                    // backgroundColor: "#EFF1F7",
                    height: 400,
                    width: 300,
                    borderRadius: 30,
                    margin: 10,
                    textAlign: "left",
                    padding: 10,
                    // boxShadow: "1px 3px 1px 1px  grey inset"
                  }}
                >
                  <Container
                    style={{
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        overflowX: "scroll",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // display: "flex",
                        // padding: 10,
                        height: 350
                        // backgroundColor: 'red'
                      }}
                    >
                      {services.length !== 0
                        ? services.map((e) => {
                          return (
                            <div>
                              <Card
                                onClick={() => {
                                  setserviceId(e.service_id);
                                  handleShowForm();
                                  setserviceName(e.service_name);
                                  setserviceDescription(
                                    e.service_description
                                  );
                                  setserviceFee(e.service_fee);
                                }}
                                style={{
                                  height: 300,
                                  width: 250,

                                  margin: 10,
                                  boxShadow:
                                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                  cursor: "pointer",
                                }}
                              >

                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 100,
                                    backgroundColor: '#3BD2E3'
                                  }}
                                >
                                  <Card.Title
                                    style={{

                                      fontSize: '5vw',

                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  >{e.service_name}</Card.Title>
                                </div>

                                <div
                                  style={{
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    paddingTop: 20
                                  }}
                                >

                                  <h6
                                    style={{
                                      fontWeight: 'bold'
                                    }}
                                  >Description</h6>
                                  <p
                                    id='pDescription'
                                  >{e.service_description}</p>
                                </div>

                                <div
                                  style={{
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                  }}
                                >

                                  <h6
                                    style={{
                                      fontWeight: 'bold'
                                    }}
                                  >Service Fee</h6>
                                  <p

                                  >{`₱  ${e.service_fee}.00`}</p>
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'end'
                                  }}
                                >

                                  <h6
                                    style={{
                                      fontSize: 10
                                    }}
                                  >Click to set appointment</h6>

                                </div>
                              </Card>
                            </div>
                          );
                        })
                        : "Empty Service"}
                    </div>
                  </Container>
                </Container>
              </Col>


            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
};

export default PetServDetail;
