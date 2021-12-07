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
import { hostUrl } from "../../../../Components/Host";
import Avatar from "react-avatar";
import { BsClock } from "react-icons/bs";
import ScheduleVet from "./ScheduleVet";
import VetInformation from "./VetInformation";

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
        paddingRight: '5vw',
        paddingLeft: '5vw'
      }}
    >

      <div
        style={{

          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Card >
          <div
            style={{
              padding: 30,
              borderRadius: 30,
              backgroundColor: 'white',

            }}
          >
            <Row>
              <Col xs={3}>
                <Row>
                  <div
                    style={{
                      display: 'block',
                      justifyContent: 'center',
                      alignContent: 'center',
                      height: 'auto'
                    }}
                  >

                    <Avatar
                      round={true}
                      name={user.vet_name}
                      src={user.vet_picture}
                      size={'10vh'}
                      style={{ marginBottom: 15 }}
                    />


                    <p
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        marginBottom: 0
                      }}
                    >
                      {user.vet_name}
                    </p>
                    <h6
                      style={{
                        color: '#3BD2E3'
                      }}
                    >
                      Veterinary Clinic
                    </h6>

                    <Button>
                      Edit Profile
                    </Button>
                  </div>
                </Row>
              </Col>

              <Col xs={9}>
                <Row>
                  <div
                    style={{
                      display: 'block'

                    }}
                  >
                    <h4>Schedule</h4>
                    <ScheduleVet
                      OpeningMonday={OpeningMonday}
                      OpeningTuesday={OpeningTuesday}
                      OpeningWednesday={OpeningWednesday}
                      OpeningThursday={OpeningThursday}
                      OpeningFriday={OpeningFriday}
                      OpeningSaturday={OpeningSaturday}
                      OpeningSunday={OpeningSunday}
                      ClosingMonday={ClosingMonday}
                      ClosingTuesday={ClosingTuesday}
                      ClosingWednesday={ClosingWednesday}
                      ClosingThursday={ClosingThursday}
                      ClosingFriday={ClosingFriday}
                      ClosingSaturday={ClosingSaturday}
                      ClosingSunday={ClosingSunday}
                    />

                    <VetInformation
                      user={user}
                    />
                  </div>
                </Row>
              </Col>

            </Row>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default VetProfileTab;
