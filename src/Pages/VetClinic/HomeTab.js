import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { FaUserAlt, FaPaw, FaClinicMedical } from "react-icons/fa";
import PetPopulationGraph from "./PetPopulationGraph";
import RatingsAndFeedback from "./RatingsAndFeedback";
import { hostUrl } from "../../Components/Host";
import { isEmptyObject } from "jquery";

function HomeTab(props) {
  const [user, setuser] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 6) {
      if (user.length === 0) {
        var token = localStorage.getItem("ajwt");
        axios
          .get(`${hostUrl}/home`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setuser(response.data.result[0]);
            // console.log(user);
          });
      }
      setcounter(counter + 1);
    }
  }, [user]);

  var bgColors = {
    Blue: "white",
    Cyan: "white",
    LBlue: "white",
    LTBlue: "white",
  };

  // var numberOfVetClinic = 120;
  // var numberOfPetOwners = 420;
  // const [numberOfPets, setnumberOfPets] = useState("");
  // var numberOfPendingRequest = 23;

  const [numberOfPets, setNumberOfPets] = useState();
  const [numberOfPendingReserved, setnumberOfPendingReserved] = useState();
  const [numberOfPendingRequest, setNumberOfPendingRequest] = useState();
  const [averageRating, setaverageRating] = useState();

  useEffect(() => {
    if (counter < 6) {
      axios
        .get(`${hostUrl}/pets/vetclinic/length/${user.vetid}`)
        .then((response) => {
          setNumberOfPets(response.data.pets);
        });
    }
  }, [numberOfPets, user]);

  useEffect(() => {
    if (counter < 6) {
      axios
        .get(`${hostUrl}/reserved/vetclinic/length/:${user.vetid}`)
        .then((response) => {
          setnumberOfPendingReserved(response.data.reserved);
        });
    }
  }, [numberOfPendingReserved, user]);

  useEffect(() => {
    if (counter < 6) {
      axios
        .get(`${hostUrl}/pending/vetclinic/length/:${user.vetid}`)
        .then((response) => {
          setNumberOfPendingRequest(response.data.pending);
        });
    }
  }, [numberOfPendingRequest, user]);

  useEffect(() => {
    if (counter < 6) {
      axios
        .get(`${hostUrl}/vetRatings/vetclinic/length/:${user.vetid}`)
        .then((response) => {
          setaverageRating(response.data.averageRatings);
        });
    }
  }, [averageRating, user]);

  function oneDecimal(ratess) {
    return Math.round(ratess * 10) / 10;
  }
  var screenh = window.screen.height - 300;
  return (
    <div
      style={{
        width: "80vw",
        marginTop: 20,
        marginLeft: 20,
      }}
    >
      <Row className=" ml-5 " style={{ paddingBottom: 30 }}>
        <Col>
          <Card
            style={{
              backgroundColor: bgColors.LBlue,
              color: "#3BD2E3",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <FaPaw style={{ fontSize: 100 }} />
                </Col>
                <Col>
                  <h1>{numberOfPets !== "" && numberOfPets}</h1>
                  <strong>Pets</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            style={{
              backgroundColor: bgColors.Cyan,
              color: "#3BD2E3",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <FaUserAlt style={{ fontSize: 100 }} />
                </Col>
                <Col>
                  <h1>
                    {numberOfPendingReserved !== "" && numberOfPendingReserved}
                  </h1>
                  <strong>Pending Reserved Products</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            style={{
              backgroundColor: bgColors.LTBlue,
              color: "#3BD2E3",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <FaClinicMedical style={{ fontSize: 100 }} />
                </Col>
                <Col>
                  <h1>
                    {numberOfPendingRequest !== "" && numberOfPendingRequest}
                  </h1>
                  <strong>Pending Request Appointment</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              backgroundColor: bgColors.LTBlue,
              color: "#3BD2E3",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <BsFillStarFill style={{ fontSize: 100 }} />
                </Col>
                <Col>
                  <h1>
                    {isNaN(oneDecimal(averageRating))
                      ? "--"
                      : oneDecimal(averageRating)}
                  </h1>
                  <strong>Average Ratings</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm={8}>
          <PetPopulationGraph clinic={user} />
        </Col>

        <Col sm={4} style={{ display: "flex" }}>
          <Card
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              width: "100%",
            }}
          >
            <Card.Body>
              <h5
                style={{ color: "#19B9CC", textAlign: "left" }}
                className="mt-2"
              >
                Ratings and Feedback
              </h5>
              <Card style={{ height: "90%", padding: 10 }}>
                <RatingsAndFeedback data={user} />
                {/* <h5>Hello</h5> */}
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomeTab;
