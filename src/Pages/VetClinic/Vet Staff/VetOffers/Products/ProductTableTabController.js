import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Tabs,
  Tab,
  Row,
  Col,
  NavDropdown,
  Navbar,
  Badge,
} from "react-bootstrap";
import "../../../../../css/vetClinic.css";
import ProductReservation from "./ProductReservation";
import ProductReservationHistory from "./ProductReservationHistory";
import { IoNotificationsSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { useParams } from "react-router";
import { hostUrl } from "../../../../../Components/Host";
import Axios from "axios";

function ProductTableTabController() {
  let { vetid } = useParams();
  const [key, setKey] = useState("reserve");

  const [notifReserved, setnotifReserved] = useState([]);
  const [numberOfUnviewedReserved, setnumberOfUnviewedReserved] = useState(0);

  const [counter, setcounter] = useState(0);
  useEffect(async () => {
    Axios.get(`${hostUrl}/vetclinic/notification/reservation/${vetid}`).then(
      (response) => {
        setnotifReserved(response.data);
      }
    );

    Axios.get(
      `${hostUrl}/vetclinic/notification/reservation/length/${vetid}`
    ).then((response) => {
      setnumberOfUnviewedReserved(response.data.view);
      // alert(response.data.view);
    });
  }, []);

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
      {String(numberOfUnviewedReserved) === "0" ? (
        <Badge bg="primary" pill style={{ fontSize: 20, color: "whitesmoke" }}>
          <IoNotificationsSharp style={{ fontSize: 25, color: "whitesmoke" }} />
        </Badge>
      ) : (
        <Badge bg="primary" pill style={{ fontSize: 25, color: "whitesmoke" }}>
          <IoNotificationsSharp style={{ fontSize: 30, color: "whitesmoke" }} />
          {String(numberOfUnviewedReserved)}
        </Badge>
      )}
    </div>
  );

  function viewing() {
    Axios.put(`${hostUrl}/vetclinic/notification/reservation/viewed/${vetid}`);
  }
  return (
    <div
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "white",
        marginTop: 30,
        padding: 10,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginTop: 20 }}>
          <h3>Resevation Table</h3>
        </div>

        <Navbar>
          <NavDropdown title={notifTitle} onClick={viewing}>
            <NavDropdown.Header>Notification</NavDropdown.Header>
            <div style={{ height: 400, overflowY: "auto", width: 450 }}>
              {notifReserved.length > 0 ? (
                notifReserved.map((val) => {
                  return (
                    <NavDropdown.Item>
                      <div>
                        <Row>
                          <Col>
                            <text>
                              {dateConvertion(
                                val.date_time_created.toString().split("T")[0]
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
                            <Row>{val.product_name}</Row>
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
      </div>
      <Card>
        <Tabs
          style={{ paddingBottom: 20 }}
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab
            eventKey="reserve"
            title={
              <strong
                style={{
                  paddingLeft: 100,
                  paddingRight: 100,
                  letterSpacing: 2,
                }}
              >
                Reservation
              </strong>
            }
          >
            <ProductReservation />
          </Tab>
          <Tab
            eventKey="history"
            title={
              <strong style={{ paddingLeft: 100, paddingRight: 100 }}>
                History
              </strong>
            }
          >
            <ProductReservationHistory />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
}

export default ProductTableTabController;
