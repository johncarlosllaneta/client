import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { AiFillInfoCircle } from "react-icons/ai";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import { useParams } from "react-router-dom";
const TracingCard = (props) => {
  const [visitor, setvisitor] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/petOwner/visitor/${props.data}`).then(
        (response) => {
          setvisitor(response.data);
          console.log(visitor);
        }
      );
      setcounter(counter + 1);
    }
  }, [visitor]);

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

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  return (
    <div
      style={{
        display: "list-item",
        flexWrap: "wrap",
        overflowY: "auto",
        height: 570,
        padding: 5,
      }}
    >
      {visitor.length != 0 ? (
        visitor.map((val) => {
          return (
            <Card
              style={{
                backgroundColor: "#FFFFFF",
                height: 130,
                width: 1350,
                borderRadius: 30,
                padding: 10,
              }}
            >
              <Row>
                <Col
                  sm={4}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginLeft: 30,
                    borderRightWidth: 2,
                    borderRightStyle: "solid",
                  }}
                >
                  <h5 style={{ fontWeight: "bold", marginTop: 25 }}>
                    Veterinary Clinic
                  </h5>
                  <p style={{ textIndent: 15 }}>{val.vet_name}</p>
                </Col>
                <Col sm={7}>
                  <Row>
                    <Col
                      sm={7}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        marginLeft: 30,
                      }}
                    >
                      <h5 style={{ fontWeight: "bold", marginTop: 25 }}>
                        Date & Time
                      </h5>
                      <p style={{ textIndent: 15 }}>
                        {dateConvertion(
                          val.date_visited.toString().split("T")[0]
                        ) +
                          " " +
                          tConvert(
                            val.date_visited
                              .toString()
                              .split("T")[1]
                              .substring(
                                0,
                                val.date_visited.toString().split("T")[1]
                                  .length - 5
                              )
                          )}
                      </p>
                    </Col>
                    <Col
                      sm={4}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AiFillInfoCircle style={{ fontSize: 40 }} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>No customer</h1>
        </div>
      )}
    </div>
  );
};

export default TracingCard;
