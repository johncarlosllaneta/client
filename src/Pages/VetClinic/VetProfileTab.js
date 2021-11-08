import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Button,
  Card,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";
import Axios from "axios";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { BiPhone } from "react-icons/bi";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { hostUrl } from "../../Components/Host";
import Avatar from "react-avatar";
import { BsClock } from "react-icons/bs";

function VetProfileTab() {
  const [user, setuser] = useState([]);
  const [imgProfile, setimgProfile] = useState("");

  const [OpeningMonday, setOpeningMonday] = useState("no set time");
  const [OpeningTuesday, setOpeningTuesday] = useState("no set time");
  const [OpeningWednesday, setOpeningWednesday] = useState("no set time");
  const [OpeningThursday, setOpeningThursday] = useState("no set time");
  const [OpeningFriday, setOpeningFriday] = useState("no set time");
  const [OpeningSaturday, setOpeningSaturday] = useState("no set time");
  const [OpeningSunday, setOpeningSunday] = useState("no set time");
  const [ClosingMonday, setClosingMonday] = useState("no set time");
  const [ClosingTuesday, setClosingTuesday] = useState("no set time");
  const [ClosingWednesday, setClosingWednesday] = useState("no set time");
  const [ClosingThursday, setClosingThursday] = useState("no set time");
  const [ClosingFriday, setClosingFriday] = useState("no set time");
  const [ClosingSaturday, setClosingSaturday] = useState("no set time");
  const [ClosingSunday, setClosingSunday] = useState("no set time");

  //get user
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 3) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);

        if (
          response.data.result[0].scheduleMonday !== "" ||
          response.data.result[0].scheduleTuesday !== "" ||
          response.data.result[0].scheduleWednesday !== "" ||
          response.data.result[0].scheduleThursday !== "" ||
          response.data.result[0].scheduleFriday !== "" ||
          response.data.result[0].scheduleSaturday !== "" ||
          response.data.result[0].scheduleSunday !== ""

          // user.scheduleMonday !== "" ||
          // user.scheduleTuesday !== "" ||
          // user.scheduleWednesday !== "" ||
          // user.scheduleThursday !== "" ||
          // user.scheduleFriday !== "" ||
          // user.scheduleSaturday !== "" ||
          // user.scheduleSunday !== ""
        ) {
          setOpeningMonday(
            timeConvertion(
              response.data.result[0].scheduleMonday.split(" - ")[0]
            )
          );
          setClosingMonday(
            timeConvertion(
              response.data.result[0].scheduleMonday.split(" - ")[1]
            )
          );
          setOpeningTuesday(
            timeConvertion(
              response.data.result[0].scheduleTuesday.split(" - ")[0]
            )
          );
          setClosingTuesday(
            timeConvertion(
              response.data.result[0].scheduleTuesday.split(" - ")[1]
            )
          );
          setOpeningWednesday(
            timeConvertion(
              response.data.result[0].scheduleWednesday.split(" - ")[0]
            )
          );
          setClosingWednesday(
            timeConvertion(
              response.data.result[0].scheduleWednesday.split(" - ")[1]
            )
          );
          setOpeningThursday(
            timeConvertion(
              response.data.result[0].scheduleThursday.split(" - ")[0]
            )
          );
          setClosingThursday(
            timeConvertion(
              response.data.result[0].scheduleThursday.split(" - ")[1]
            )
          );
          setOpeningFriday(
            timeConvertion(
              response.data.result[0].scheduleFriday.split(" - ")[0]
            )
          );
          setClosingFriday(
            timeConvertion(
              response.data.result[0].scheduleFriday.split(" - ")[1]
            )
          );
          setOpeningSaturday(
            timeConvertion(
              response.data.result[0].scheduleSaturday.split(" - ")[0]
            )
          );
          setClosingSaturday(
            timeConvertion(
              response.data.result[0].scheduleSaturday.split(" - ")[1]
            )
          );
          setOpeningSunday(
            timeConvertion(
              response.data.result[0].scheduleSunday.split(" - ")[0]
            )
          );
          setClosingSunday(
            timeConvertion(
              response.data.result[0].scheduleSunday.split(" - ")[1]
            )
          );
        }
      });
      setimgProfile(user.vet_picture);
      setcounter(counter + 1);
    }
  }, [user]);

  var cardCssBio = {
    position: "relative",
    width: "13vw",
    height: "13vh",
    borderRadius: 30,
    margin: "2vh 0vh 1vh 5vh",
    backgroundColor: "white",
    boxShadow: "#cdc8c6 -15px 20px 15px -15px",
    justifyContent: "center",
  };

  var cardCssOperation = {
    position: "relative",
    width: "100%",
    height: "50vh",
    borderRadius: 30,
    margin: "2vh 0vh 1vh 0vh",
    backgroundColor: "white",
    boxShadow: "#cdc8c6 -15px 20px 15px -15px",
  };

  var iconsCss = {
    fontSize: "300%",
    padding: 5,
    textAlign: "center",
    color: "#57D4FF",
    marginTop: "35%",
  };

  var descCssTitle = {
    fontSize: "70%",
    marginTop: "2vh",
  };

  var descCssLabel = {
    fontSize: "70%",
  };

  var descCssLabelDay = {
    fontSize: "70%",
    color: "#57D4FF",
    fontWeight: "bold",
    textAlign: "center",
  };

  const containerStyle = {
    width: "100%",
    height: "50vh",
    borderRadius: 30,
    display: "inline-flex",
    // border:
  };

  const center = {
    lat: 14.5834,
    lng: 121.0367,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB2uqvQNV8t-Zwt4mQzzX1t62I8vEbJxug",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function timeConvertion(time) {
    // alert(time);
    if (time == "" || time == undefined) {
      return "Closed";
    }
    const timeString12hr = new Date(
      "2021-01-01T" + time + "Z"
    ).toLocaleTimeString(
      {},
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );
    return timeString12hr;
  }

  return (
    <div
      style={{
        padding: 30,
      }}
    >
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Alert variant="info">
              <Alert.Heading>Vet Information</Alert.Heading>
              <Row>
                <Col>
                  <div style={{ alignContent: "center" }}>
                    <img
                      src={user.vet_picture}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        border: "7px",
                        borderStyle: "solid",
                        borderColor: "transparent",
                        marginTop: "2vh",
                      }}
                    ></img>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        <strong>Name:</strong>
                      </Form.Label>
                      <Form.Control type="text" value={user.vet_name} />
                    </Form.Group>
                  </div>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      <strong>Email:</strong>
                    </Form.Label>
                    <Form.Control type="email" value={user.email} />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      <strong>Address:</strong>
                    </Form.Label>
                    <Form.Control type="text" value={user.vet_address} />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      <strong>Contact Number:</strong>
                    </Form.Label>
                    <Form.Control type="text" value={user.vet_contact_number} />
                  </Form.Group>
                </Col>
                <Col>
                  <p>
                    <strong>Time Schedule:</strong>
                  </p>
                </Col>
              </Row>
            </Alert>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Card style={{ borderRadius: 30 }}>
        <Container style={{ maxWidth: "100%", padding: 20 }}>
          <Row>
            <Col>
              <Container style={{ alignItems: "center" }}>
                {user.vet_picture !== undefined ? (
                  <Avatar
                    src={user.vet_picture}
                    name={user.vet_name}
                    round={true}
                  />
                ) : (
                  <div
                    data-initials="GC"
                    style={{
                      backgroundColor: "#099bdd",
                      color: "white",
                      opacity: 1,
                      content: "Data Initials",
                      display: "inline-block",
                      borderRadius: "50%",
                      verticalAlign: "middle",
                      width: 50,
                      height: 50,
                      lineHeight: 50,
                      textAlign: "center",
                    }}
                  ></div>
                )}

                <h4>{user.vet_name}</h4>
                <h5>{user.vet_status}</h5>
              </Container>
              <Button
                variant="outline-info"
                className="float-right"
                // onClick={handleShow}
                href={"/vet/settings"}
              >
                Edit profile
              </Button>
            </Col>
          </Row>
          <Row style={{ padding: 10 }}>
            <Col sm="3">
              <Row>
                <Card style={cardCssBio}>
                  <Row>
                    <Col sm="3">
                      <HiOutlineMail style={iconsCss} />
                    </Col>
                    <Col sm="7">
                      <Row>
                        <h5 style={descCssTitle}>Email Address</h5>
                      </Row>
                      <Row>
                        <p style={descCssLabel}> {user.email}</p>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Row>
              <Row>
                <Card style={cardCssBio}>
                  <Row>
                    <Col sm="3">
                      <BiPhone style={iconsCss} />
                    </Col>
                    <Col sm="7">
                      <Row>
                        <h5 style={descCssTitle}>Contact Number</h5>
                      </Row>
                      <Row>
                        <p style={descCssLabel}>{user.vet_contact_number}</p>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Row>
              <Row>
                <Card style={cardCssBio}>
                  <Row>
                    <Col sm="3">
                      <HiOutlineLocationMarker style={iconsCss} />
                    </Col>
                    <Col sm="7">
                      <Row>
                        <h5 style={descCssTitle}>Location</h5>
                      </Row>
                      <Row>
                        <p style={descCssLabel}>{user.vet_address}</p>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Row>
            </Col>

            <Col
              style={{ backgroundColor: "#FFFFFF", borderRadius: 30 }}
              sm="8"
            >
              <Row style={{ flexGrow: 1, height: "100%" }}>
                <Col
                  sm="3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <BsClock style={{ fontSize: 60, color: "#19B9CC" }} />
                    <div style={{ marginTop: 20 }}>
                      <h5>
                        Opening <br /> Hours
                      </h5>
                    </div>
                  </div>
                </Col>
                <Col
                  sm="4"
                  style={{
                    color: "#19B9CC",
                  }}
                >
                  <Row
                    style={{
                      flexGrow: 1,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Row>Sunday</Row>
                    <Row>Monday</Row>
                    <Row>Tuesday</Row>
                    <Row>Wednesday</Row>
                    <Row>Thursday</Row>
                    <Row>Friday</Row>
                    <Row>Saturday</Row>
                  </Row>
                </Col>
                <Col sm="5">
                  <Row>
                    <Col>
                      {/* Opening */}
                      <Row
                        style={{
                          flexGrow: 1,
                          height: "100%",
                          rowGap: 40,
                          paddingTop: 15,
                          paddingBottom: 15,
                        }}
                      >
                        <Row>{OpeningSunday}</Row>
                        <Row>{OpeningMonday}</Row>
                        <Row>{OpeningTuesday}</Row>
                        <Row>{OpeningWednesday}</Row>
                        <Row>{OpeningThursday}</Row>
                        <Row>{OpeningFriday}</Row>
                        <Row>{OpeningSaturday}</Row>
                      </Row>
                    </Col>

                    <Col>
                      {/* Closing */}
                      <Row
                        style={{
                          flexGrow: 1,
                          height: "100%",
                          rowGap: 40,
                          paddingTop: 15,
                          paddingBottom: 15,
                        }}
                      >
                        <Row>{ClosingSunday}</Row>
                        <Row>{ClosingMonday}</Row>
                        <Row>{ClosingTuesday}</Row>
                        <Row>{ClosingWednesday}</Row>
                        <Row>{ClosingThursday}</Row>
                        <Row>{ClosingFriday}</Row>
                        <Row>{ClosingSaturday}</Row>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
}

export default VetProfileTab;
