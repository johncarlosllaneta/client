import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import background from "../../Images/bg.png";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Avatar from "react-avatar";
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../Components/Host";
import { Typography } from "@mui/material";

function VetDetailsTab(props) {
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

  const [counter, setcounter] = useState(0);
  const [vet_clinic, setvet_clinic] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/vet-details/${props.email}`).then((response) => {
        setvet_clinic(response.data[0]);
        if (
          response.data[0].scheduleMonday !== "" ||
          response.data[0].scheduleTuesday !== "" ||
          response.data[0].scheduleWednesday !== "" ||
          response.data[0].scheduleThursday !== "" ||
          response.data[0].scheduleFriday !== "" ||
          response.data[0].scheduleSaturday !== "" ||
          response.data[0].scheduleSunday !== ""
        ) {
          setOpeningMonday(
            timeConvertion(response.data[0].scheduleMonday.split(" - ")[0])
          );
          setClosingMonday(
            timeConvertion(response.data[0].scheduleMonday.split(" - ")[1])
          );
          setOpeningTuesday(
            timeConvertion(response.data[0].scheduleTuesday.split(" - ")[0])
          );
          setClosingTuesday(
            timeConvertion(response.data[0].scheduleTuesday.split(" - ")[1])
          );
          setOpeningWednesday(
            timeConvertion(response.data[0].scheduleWednesday.split(" - ")[0])
          );
          setClosingWednesday(
            timeConvertion(response.data[0].scheduleWednesday.split(" - ")[1])
          );
          setOpeningThursday(
            timeConvertion(response.data[0].scheduleThursday.split(" - ")[0])
          );
          setClosingThursday(
            timeConvertion(response.data[0].scheduleThursday.split(" - ")[1])
          );
          setOpeningFriday(
            timeConvertion(response.data[0].scheduleFriday.split(" - ")[0])
          );
          setClosingFriday(
            timeConvertion(response.data[0].scheduleFriday.split(" - ")[1])
          );
          setOpeningSaturday(
            timeConvertion(response.data[0].scheduleSaturday.split(" - ")[0])
          );
          setClosingSaturday(
            timeConvertion(response.data[0].scheduleSaturday.split(" - ")[1])
          );
          setOpeningSunday(
            timeConvertion(response.data[0].scheduleSunday.split(" - ")[0])
          );
          setClosingSunday(
            timeConvertion(response.data[0].scheduleSunday.split(" - ")[1])
          );
        }
      });
      setcounter(counter + 1);
    }
  }, [vet_clinic]);

  function timeConvertion(time) {
    const timeString12hr = new Date(
      "2021-01-01T" + time + "Z"
    ).toLocaleTimeString(
      {},
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );
    return timeString12hr;
  }
  return (
    <div>
      <Row>
        <Col md={4}>
          <div
            style={{
              textAlign: "left",
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
                margin: 20,
              }}
            >
              Email
            </h2>

            <h5
              style={{
                fontWeight: "bold",
                color: "#696969",
                marginTop: 20,
                marginLeft: 50,
              }}
            >
              {vet_clinic.email}
            </h5>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
                margin: 20,
              }}
            >
              Contact Number
            </h2>

            <h5
              style={{
                fontWeight: "bold",
                color: "#696969",
                marginTop: 20,
                marginLeft: 50,
              }}
            >
              {vet_clinic.vet_contact_number}
            </h5>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
                margin: 20,
              }}
            >
              Address
            </h2>

            <h5
              style={{
                fontWeight: "bold",
                color: "#696969",
                marginTop: 20,
                marginLeft: 50,
              }}
            >
              {vet_clinic.vet_address}
            </h5>
          </div>
        </Col>

        <Col>
          <div
            style={{
              textAlign: "left",
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
                margin: 20,
              }}
            >
              Operating Hours
            </h2>

            <Row style={{ flexGrow: 1, height: "100%" }}>
              <Col
                sm="1"
                style={{
                  color: "#19B9CC",
                }}
              >
                <Row
                  style={{
                    flexGrow: 1,
                    height: 300,
                    fontWeight: "bold",
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
              <Col sm="3">
                <Row>
                  <Col>
                    {/* Opening */}
                    <Row
                      style={{
                        flexGrow: 1,
                        height: 300,
                        rowGap: 5,
                      }}
                    >
                      <Row>
                        {OpeningSunday == "Invalid Date"
                          ? "No set time"
                          : OpeningSunday}
                      </Row>
                      <Row>
                        {OpeningMonday == "Invalid Date"
                          ? "No set time"
                          : OpeningMonday}
                      </Row>
                      <Row>
                        {OpeningTuesday == "Invalid Date"
                          ? "No set time"
                          : OpeningTuesday}
                      </Row>
                      <Row>
                        {OpeningWednesday != "Invalid Date"
                          ? "No set time"
                          : OpeningWednesday}
                      </Row>
                      <Row>
                        {OpeningThursday == "Invalid Date"
                          ? "No set time"
                          : OpeningThursday}
                      </Row>
                      <Row>
                        {OpeningFriday == "Invalid Date"
                          ? "No set time"
                          : OpeningFriday}
                      </Row>
                      <Row>
                        {OpeningSaturday == "Invalid Date"
                          ? "No set time"
                          : OpeningSaturday}
                      </Row>
                    </Row>
                  </Col>

                  <Col>
                    {/* Closing */}
                    <Row
                      style={{
                        flexGrow: 1,
                        height: 300,
                        rowGap: 5,
                      }}
                    >
                      <Row>
                        {ClosingSunday == "Invalid Date"
                          ? "No set time"
                          : ClosingSunday}
                      </Row>
                      <Row>
                        {ClosingMonday == "Invalid Date"
                          ? "No set time"
                          : ClosingMonday}
                      </Row>
                      <Row>
                        {ClosingTuesday == "Invalid Date"
                          ? "No set time"
                          : ClosingTuesday}
                      </Row>
                      <Row>
                        {ClosingWednesday == "Invalid Date"
                          ? "No set time"
                          : ClosingWednesday}
                      </Row>
                      <Row>
                        {ClosingThursday == "Invalid Date"
                          ? "No set time"
                          : ClosingThursday}
                      </Row>
                      <Row>
                        {ClosingFriday == "Invalid Date"
                          ? "No set time"
                          : ClosingFriday}
                      </Row>
                      <Row>
                        {ClosingSaturday == "Invalid Date"
                          ? "No set time"
                          : ClosingSaturday}
                      </Row>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default VetDetailsTab;
