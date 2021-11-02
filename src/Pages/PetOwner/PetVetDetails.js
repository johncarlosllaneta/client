import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
import background from "../../Images/bg.png";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import Avatar from "react-avatar";
import RatingsAndFeedback from "../VetClinic/RatingsAndFeedback";
import VetDetailsRatings from "./VetDetailsRatings";
const ratingChanged = (newRating) => {
  console.log(newRating);
};

function PetVetDetails() {
  let { vetid } = useParams();
  // alert(vetid);
  // var id = vetid.toString().replace('101101', '/');
  // alert(id);

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
  const [vetclinic, setVetClinic] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/vetclinic/verified/${vetid}`).then((response) => {
        setVetClinic(response.data[0]);
        // console.log(vetclinic.vet_name);
        // alert(vetclinic.vet_name);

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
    }
  }, [vetclinic]);

  function timeConvertion(time) {
    const timeString12hr = new Date(
      "2021-01-01T" + time + "Z"
    ).toLocaleTimeString(
      {},
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );
    return timeString12hr;
  }

  // user information

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

  const talkToVet = () => {};

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: window.screen.height,
        marginTop: 110,
        zoom: value,
      }}
    >
      <NavBarAppointments />

      <div
        style={{
          display: "flex",
          padding: 20,
        }}
      >
        <div>
          <Button
            href="/petOwner/Appointment"
            style={{
              display: "inline",
              backgroundColor: "#3BD2E3",
              paddingLeft: 30,
              paddingRight: 30,
              borderRadius: 30,
              borderColor: "#FFFFFF",
              marginLeft: 30,
            }}
          >
            Back
          </Button>
        </div>
        <Container>
          <h5
            style={{
              color: "#696969",
              fontWeight: "bold",
              display: "inline",
              marginLeft: -100,
              fontSize: 40,
            }}
          >
            Veterinary Clinic Details
          </h5>
        </Container>
      </div>

      <Container>
        <Card
          style={{
            backgroundColor: "white",
            height: "70vh",
            width: "80vw",
            marginLeft: -100,
          }}
        >
          <Row>
            <Col xs={8}>
              <Container
                style={{
                  backgroundColor: "white",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  height: 150,
                  margin: 40,
                }}
              >
                <Row>
                  <Col>
                    {/* avatar */}
                    <Avatar
                      src={vetclinic.vet_picture}
                      name={vetclinic.vet_name}
                      size={100}
                      round
                      style={{
                        marginTop: 20,
                      }}
                    />
                  </Col>

                  <Col xs={4}>
                    {/* vet name */}
                    <Row>
                      <h3
                        style={{
                          textAlign: "left",
                          marginTop: 15,
                        }}
                      >
                        {vetclinic.vet_name}
                      </h3>
                    </Row>
                    <Row>
                      <h5
                        style={{
                          textAlign: "left",
                        }}
                      >
                        Veterinary Clinic
                      </h5>
                    </Row>
                    <Row>
                      <p
                        style={{
                          textAlign: "left",
                          fontSize: 13,
                        }}
                      >
                        {vetclinic.vet_address}
                      </p>
                    </Row>
                  </Col>

                  {/* get direction */}
                  {/* <Col>
                 

                    <Button
                      style={{
                        borderRadius: 30,
                        borderWidth: 5,
                        borderColor: "#FFFFFF",
                        paddingRight: 20,
                        paddingLeft: 20,
                        backgroundColor: "#3BD2E3",

                        marginTop: 45,
                      }}
                    >
                      Direction
                    </Button>
                  </Col> */}

                  <Col>
                    {/* view shop */}

                    <Button
                      href={`/petOwner/Appointment/vetdetails/category/${vetclinic.vetid}`}
                      // href={`/petOwner/Appointment/vetdetails/service/${vetclinic.vetid}`}
                      style={{
                        borderRadius: 30,
                        borderWidth: 5,
                        borderColor: "#FFFFFF",
                        paddingRight: 20,
                        paddingLeft: 20,
                        backgroundColor: "#3BD2E3",

                        marginTop: 45,
                      }}
                    >
                      Visit Vet
                    </Button>

                    <Button
                      onClick={() => {
                        Axios.post(`${hostUrl}/talktovet/thread/creating`, {
                          pet_owner_id: user.pet_owner_id,
                          vetid: vetid,
                        }).then((response) => {
                          window.location.replace("/petOwner/talkVet");
                        });
                      }}
                      style={{
                        borderRadius: 30,
                        borderWidth: 5,
                        borderColor: "#FFFFFF",
                        paddingRight: 20,
                        paddingLeft: 20,
                        backgroundColor: "#3BD2E3",
                        marginTop: 45,
                      }}
                    >
                      Talk to Vet
                    </Button>
                  </Col>
                </Row>
              </Container>

              {/* vet information */}
              <Row>
                <Col>
                  <Row>
                    <h3
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      {vetclinic.email}
                    </h3>

                    <h6
                      style={{
                        color: "#19B9CC",
                      }}
                    >
                      Email
                    </h6>
                  </Row>
                  <Row>
                    <h3
                      style={{
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      {vetclinic.vet_contact_number}
                    </h3>

                    <h6
                      style={{
                        color: "#19B9CC",
                      }}
                    >
                      Contact Number
                    </h6>
                  </Row>
                </Col>

                <Col>
                  {/* Schedule */}
                  <h5
                    style={{
                      color: "#19B9CC",
                    }}
                  >
                    Operating Schedule
                  </h5>

                  <Row
                    style={{
                      marginLeft: 50,
                    }}
                  >
                    <Col>
                      {/* days */}
                      <Row>Monday</Row>
                      <Row>Tuesday</Row>
                      <Row>Wednesday</Row>
                      <Row>Thursday</Row>
                      <Row>Friday</Row>
                      <Row>Saturday</Row>
                      <Row>Sunday</Row>
                    </Col>

                    <Col>
                      {/* Opening */}
                      <Row>{OpeningMonday}</Row>
                      <Row>{OpeningTuesday}</Row>
                      <Row>{OpeningWednesday}</Row>
                      <Row>{OpeningThursday}</Row>
                      <Row>{OpeningFriday}</Row>
                      <Row>{OpeningSaturday}</Row>
                      <Row>{OpeningSunday}</Row>
                    </Col>

                    <Col>
                      {/* Closing */}
                      <Row>{ClosingMonday}</Row>
                      <Row>{ClosingTuesday}</Row>
                      <Row>{ClosingWednesday}</Row>
                      <Row>{ClosingThursday}</Row>
                      <Row>{ClosingFriday}</Row>
                      <Row>{ClosingSaturday}</Row>
                      <Row>{ClosingSunday}</Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col xl={4}>
              {/* review and feedback */}
              <Container>
                <Card
                  style={{
                    height: "60vh",
                    width: "20vw",
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    marginLeft: 40,
                    marginTop: 40,
                  }}
                >
                  <Container>
                    {/* title header */}
                    <h5
                      style={{
                        color: "#19B9CC",
                        marginTop: 10,
                      }}
                    >
                      Ratings and Feedback
                    </h5>
                    <hr />
                  </Container>

                  <div>
                    {/* Card Mapping */}

                    <Card>
                      <VetDetailsRatings />
                    </Card>
                  </div>
                </Card>
              </Container>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default PetVetDetails;
