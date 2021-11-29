import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
import background from "../../Images/bg.png";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import Avatar from "react-avatar";
import RatingsAndFeedback from "../VetClinic/Verified Vet/Dashboard/RatingsAndFeedback";
import VetDetailsRatings from "./VetDetailsRatings";
import "../../css/PetVetDetails.css";
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

  const talkToVet = () => { };

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  const [talkToVetExist, settalkToVetExist] = useState(false);
  useEffect(() => {
    // alert(user.pet_owner_id + " " + vetid);
    Axios.post(`${hostUrl}/talktovet/thread/exist`, {
      pet_owner_id: user.pet_owner_id,
      vetid: vetid,
    }).then((response) => {
      // alert(response.data.exist);
      if (response.data.exist == true) {
        settalkToVetExist(true);
      } else {
        settalkToVetExist(false);
      }
    });
  }, [user]);
  // alert(aspectratiowidth);
  return (
    <div
      style={{
        zoom: value,
      }}
    >
      <NavBarAppointments />
      <div
        style={{
          backgroundImage: `url(${background})`,
          height: "auto",
          padding: 0,
          marginTop: 150,
        }}
      >
        <Row>
          <Col>
            <Container>
              <h1
                style={{
                  color: "grey",
                  textAlign: "center",
                }}
              >
                Veterinary Clinic Details
              </h1>
            </Container>
          </Col>

          <Col>
            <Container
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "flex-end",
                alignContent: "center",
              }}
            >
              <div id="divPetVetDetails">
                <Button
                  href="/petOwner/Appointment"
                  style={{
                    borderRadius: 20,
                    border: "3px solid white",
                    backgroundColor: "#3BD2E3",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    // display: "inline",
                    minWidth: 150,
                    width: "10vw",
                  }}
                >
                  Back
                </Button>
              </div>
            </Container>
          </Col>
        </Row>

        <Row
          style={{
            marginTop: 15,
          }}
        >
          <Container
            id="containerVetDetailsHolder"
          // style={{
          //   display: 'flex',
          //   justifyContent: 'center',
          //   height: 'auto',
          //   marginBottom: 20
          // }}
          >
            <Card
              style={{
                backgroundColor: "white",
                height: "auto",
                width: "80vw",
                minWidth: 300,
              }}
            >
              <Row>
                <Col
                  xs={8}
                // style={{
                //   height: 'auto'
                // }}
                >
                  <Container id="containerVetDetails">
                    <Row>
                      <Col>
                        {/* avatar */}
                        <Avatar
                          className="avatarVetDetails"
                          src={vetclinic.vet_picture}
                          name={vetclinic.vet_name}
                          round
                          style={{
                            marginTop: 20,
                          }}
                        />
                      </Col>

                      <Col>
                        {/* vet name */}
                        <Row>
                          <h3
                            style={{
                              textAlign: "left",
                              marginTop: 15,
                              fontSizeAdjust: "inherit",
                              fontSize: "1.5rem",
                            }}
                          >
                            {vetclinic.vet_name}
                          </h3>
                        </Row>
                        <Row>
                          <h5
                            style={{
                              textAlign: "left",
                              fontSizeAdjust: "inherit",
                              fontSize: "1.5vh",
                            }}
                          >
                            Veterinary Clinic
                          </h5>
                        </Row>
                        <Row>
                          <p
                            style={{
                              textAlign: "left",
                              fontSize: "2vh",
                            }}
                          >
                            {vetclinic.vet_address}
                          </p>
                        </Row>
                      </Col>

                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {/* view shop */}
                            <Row>
                              <Col>
                                <Button
                                  href={`/petOwner/Appointment/vetdetails/category/${vetclinic.vetid}`}
                                  // href={`/petOwner/Appointment/vetdetails/service/${vetclinic.vetid}`}
                                  style={{
                                    borderRadius: 30,
                                    borderWidth: 5,
                                    borderColor: "#FFFFFF",
                                    width: "5vw",
                                    minWidth: 150,
                                    fontSize: "2vh",
                                    backgroundColor: "#3BD2E3",
                                  }}
                                >
                                  Visit Vet
                                </Button>
                              </Col>
                              <Col hidden={talkToVetExist}>
                                <Button
                                  onClick={() => {
                                    Axios.post(
                                      `${hostUrl}/talktovet/thread/creating`,
                                      {
                                        pet_owner_id: user.pet_owner_id,
                                        vetid: vetid,
                                      }
                                    ).then((response) => {
                                      window.location.replace(
                                        "/petOwner/talkVet"
                                      );
                                    });
                                  }}
                                  style={{
                                    borderRadius: 30,
                                    borderWidth: 5,
                                    borderColor: "#FFFFFF",
                                    width: "5vw",
                                    minWidth: 150,
                                    fontSize: "2vh",
                                    backgroundColor: "#3BD2E3",
                                  }}
                                >
                                  Talk to Vet
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>

                  {/* vet information */}
                  <Row id="rowVetInformation">
                    <Col>
                      <Row>
                        <h3
                          id="h3VetDetailsEmail"
                        // style={{
                        //   fontSize: 25,
                        //   fontWeight: "bold",
                        // }}
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

                <Col
                  id="colRateAndFeedback"
                  style={{
                    height: "auto",
                    width: "10vw",
                  }}
                >
                  {/* review and feedback */}
                  <Container>
                    <Card
                      style={{
                        height: "auto",
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
              {/* vet information */}
              <Row id="rowVetInformationMobile">
                <Col>
                  <Row>
                    <h3

                    // style={{
                    //   fontSize: 25,
                    //   fontWeight: "bold",
                    // }}
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
                      marginBottom: 20,
                    }}
                  >
                    <Col
                      style={{
                        marginLeft: 30,
                      }}
                    >
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
            </Card>
          </Container>
        </Row>
      </div>
    </div>
  );
}

export default PetVetDetails;
