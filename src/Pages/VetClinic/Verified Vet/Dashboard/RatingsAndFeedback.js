import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";
import Avatar from "react-avatar";
import { BsStar, BsStarFill } from "react-icons/bs";
import { hostUrl } from "../../../../Components/Host";
import Axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { useParams } from "react-router";

function RatingsAndFeedback(props) {
  // let { vetid } = useParams();
  // alert(props.data.vetid);

  const [rateList, setrateList] = useState([]);
  useEffect(() => {

    Axios.get(
      `${hostUrl}/vetRatings/vetclinic/list/${props.data.vetid}`
    ).then((response) => {
      setrateList(response.data);
    });

  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setname] = useState();
  const [rate, setrate] = useState();
  const [profilePic, setprofilePic] = useState();
  const [date, setdate] = useState();
  const [time, settime] = useState();
  const [service, setservice] = useState();
  const [feedback, setfeedback] = useState();

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
  // function getRate() {
  //   Axios.get(`${hostUrl}/vetRatings/vetclinic/list/${props.data.vetid}`).then(
  //     (response) => {
  //       setrateList(response.data[0].);
  //     }
  //   );
  // }

  return (
    <div style={{ overflowY: "auto", padding: 10 }}>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ratings and Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={5}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Avatar round={30} src={profilePic} name={name} />
                <h5>{name}</h5>
              </div>
            </Col>
            <Col xs={7}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Row>
                  <Col>
                    <strong>Service Name:</strong>
                    <p>{service}</p>
                    <strong>Date Scheduled:</strong>
                    <p>{date}</p>
                  </Col>
                  <Col>
                    <strong>Ratings:</strong>
                    <p>{rate} stars</p>
                    <strong>Time scheduled:</strong>
                    <p>{time}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Form.Control
                style={{ height: "100px" }}
                as="textarea"
                value={feedback}
                disabled
              />
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {rateList.length != 0 ? (
        rateList.map((val) => {
          return (
            <Card
              style={{ width: "100%", padding: 10 }}
              onClick={() => {
                setname(val.name);
                setservice(val.service_name);
                settime(val.time_scheduled);
                setdate(
                  dateConvertion(val.date_scheduled.toString().split("T")[0])
                );
                setprofilePic(val.profilePicture);
                setrate(val.ratings);
                setfeedback(val.comments);
                handleShow();
              }}
            >
              <Row>
                <Col sm={4}>
                  <Avatar round={50} src={val.profilePicture} name={val.name} />
                </Col>

                <Col sm={4}>
                  <Row className="mt-2">
                    <h6 style={{ fontWeight: "bold" }}>{val.name}</h6>
                  </Row>
                  <Row>
                    <p style={{ fontSize: 12 }}>{val.service_name}</p>
                  </Row>

                  <Row>
                    <p style={{ fontWeight: "bold", fontSize: 12 }}>
                      Date:
                      {dateConvertion(
                        val.date_scheduled.toString().split("T")[0]
                      )}
                    </p>
                  </Row>
                </Col>

                <Col sm={4}>
                  <Row
                    className="mt-2"
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <h6 style={{ fontWeight: "bold" }}>Ratings</h6>
                  </Row>
                  <Row
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ fontSize: 12 }}>{val.ratings} stars</p>
                  </Row>

                  <Row>
                    <p style={{ fontWeight: "bold", fontSize: 12 }}>
                      Time:{val.time_scheduled}
                    </p>
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        })
      ) : (
        <p>No rates</p>
      )}
    </div>
  );
}

export default RatingsAndFeedback;
