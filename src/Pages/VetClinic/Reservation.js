import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Card,
  Tabs,
  Tab,
  Container,
  Navbar,
  Badge,
  Col,
  NavDropdown,
} from "react-bootstrap";
import GenReservation from "./GenReservation";
import ReqReservation from "./ReqReservation";
import "../VetClinic/vetClinic.css";
import HistoryReservation from "./HistoryReservation";
import { IoNotificationsSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { useParams } from "react-router";
import { hostUrl } from "../../Components/Host";
import Axios from "axios";
const Reservation = () => {
  let { vetid } = useParams();
  const [key, setKey] = useState("general");
  const [numberOfUnviewedNotif, setnumberOfUnviewedNotif] = useState(0);

  const [counter, setcounter] = useState(0);
  const [notif, setnotif] = useState([]);
  useEffect(() => {
    if (counter < 2) {
      Axios.get(`${hostUrl}/vetclinic/notification/${vetid}`).then(
        (response) => {
          setnotif(response.data);
        }
      );

      Axios.get(`${hostUrl}/vetclinic/notification/length/${vetid}`).then(
        (response) => {
          setnumberOfUnviewedNotif(response.data.view);
          // alert(response.data.view);
        }
      );
      setcounter(counter + 1);
    }
    // console.log(notif);
  }, [notif, numberOfUnviewedNotif]);

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

    if (timeCurrent[0] === "16") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "17") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "18") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "19") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "20") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "21") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "22") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "23") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "24") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "01") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "02") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "03") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "04") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "05") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "06") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "07") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "08") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "09") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "10") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "11") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "12") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "13") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "14") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "15") {
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
    Axios.put(`${hostUrl}/vetclinic/notification/viewed/${vetid}`);
  }
  return (
    <div
      style={{
        width: "77vw",
        marginLeft: 40,
        marginTop: 70,
      }}
    >
      <Card
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundColor: "white",
        }}
      >
        <Row style={{ fontSize: 25, textAlign: "left" }}>
          <Container style={{ display: "flex", flexDirection: "row" }}>
            <h1
              style={{
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              Appointments
            </h1>
            <Navbar>
              <NavDropdown
                title={notifTitle}
                id="navbarScrollingDropdown"
                onClick={viewing}
              >
                <NavDropdown.Header>Notification</NavDropdown.Header>
                <div style={{ height: 400, overflowY: "auto" }}>
                  {notif.length > 0 ? (
                    notif.map((val) => {
                      return (
                        <NavDropdown.Item style={{ width: 400 }}>
                          <div>
                            <Row>
                              <Col>
                                <text>
                                  {dateConvertion(
                                    val.date_time_created
                                      .toString()
                                      .split("T")[0]
                                  )}
                                </text>
                              </Col>
                              <Col>
                                <text style={{ float: "right" }}>
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
                                  src={val.profilePicture}
                                  name={val.name}
                                />
                              </Col>
                              <Col sm={9}>
                                <Row>{val.name}</Row>
                                <Row>{val.service_name}</Row>
                                <Row>Status:{val.status}</Row>
                              </Col>
                            </Row>
                          </div>
                        </NavDropdown.Item>
                      );
                    })
                  ) : (
                    <h5>No notification</h5>
                  )}
                </div>
              </NavDropdown>
            </Navbar>
          </Container>
          <h5
            style={{
              color: "grey",
              margin: "0px 20px 20px 20px",
            }}
          >
            Vet clinic's data
          </h5>
        </Row>

        <Tabs
          style={{ paddingBottom: 20 }}
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab
            eventKey="general"
            title={
              <strong
                style={{
                  paddingLeft: 100,
                  paddingRight: 100,
                  letterSpacing: 2,
                }}
              >
                Pending Appointments
              </strong>
            }
          >
            {/* general */}
            {/* <ReqReservation /> */}

            <ReqReservation />
          </Tab>
          <Tab
            eventKey="pending"
            title={
              <strong style={{ paddingLeft: 100, paddingRight: 100 }}>
                Confirm Appointments
              </strong>
            }
          >
            <GenReservation />
          </Tab>

          <Tab
            eventKey="history"
            title={
              <strong style={{ paddingLeft: 100, paddingRight: 100 }}>
                Appointment History
              </strong>
            }
          >
            <HistoryReservation />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default Reservation;
