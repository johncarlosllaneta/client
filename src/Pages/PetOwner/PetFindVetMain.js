import React, { useState, useEffect } from "react";
import { Col, Container, Form, Card, Row, Button } from "react-bootstrap";

import Axios from "axios";

import PetVetDetails from "../PetOwner/PetVetDetails";
import background from "../../Images/bg.png";
import { Link } from "react-router-dom";
import { hostUrl } from "../../Components/Host";
import Avatar from "react-avatar";

function PetFindVetMain() {
  const [vetclinic, setVetClinic] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/vetclinic/verified`).then((response) => {
        setVetClinic(response.data);
      });
      setcounter(counter + 1);
    }
  }, [vetclinic]);

  const [suggestedvetclinic, setsuggestedVetClinic] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      navigator.geolocation.getCurrentPosition(function (position) {
        Axios.post(`${hostUrl}/vetclinic/verified/suggestion`, {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        }).then((response) => {
          setsuggestedVetClinic(response.data);
        });
      });
    }
  }, []);

  const [q, setq] = useState("");
  // alert(swidth);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    // console.log(columns);
    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

  function vetidConverter(id) {
    var vetid = String(id).replace("/", "101101");
    return vetid;
  }

  return (
    <div
      style={{
        width: "77vw",
        marginLeft: 40,
        marginTop: 30,
      }}
    >
      <Container
        style={{
          backgroundColor: "white",
          width: "100vw",
          height: "80vh",
        }}
      >
        <div>
          <Row style={{ justifyContent: "space-between" }}>
            <Button
              href="/appointment"
              style={{
                width: "5vw",
                backgroundColor: "#3BD2E3",
                paddingLeft: 30,
                paddingRight: 30,
                borderRadius: 30,
                borderColor: "#FFFFFF",
                marginLeft: 30,
                marginTop: 30,
              }}
            >
              Back
            </Button>
            <h5
              style={{
                display: "inline",
                color: "#696969",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Find Vet
            </h5>
          </Row>

          <Container>
            <Form>
              <Form.Control
                placeholder="Find Vet"
                style={{
                  borderColor: "#19B9CC",
                  borderRadius: 30,
                  borderWidth: 2,
                }}
                value={q}
                placeholder="Search"
                onChange={(e) => setq(e.target.value)}
              />
            </Form>

            <h5 style={{ marginTop: 10 }}></h5>
            <hr />
            <div
              style={{
                width: "100%",
                height: 300,
                backgroundColor: "grey",
                marginTop: 10,
                borderRadius: 30,
                display: "flex",
                overflowY: "auto",
                maxWidth: "100%",
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              {search(vetclinic).map((val) => {
                return (
                  <div>
                    <Container
                      fluid="md"
                      style={{
                        display: "flex",
                        paddingTop: 10,
                      }}
                    >
                      <Card
                        style={{
                          width: 600,
                          height: 100,
                          borderRadius: 20,
                          borderWidth: 5,
                          backgroundColor: "#FFFF",
                          borderColor: "#19B9CC",
                          padding: 10,
                        }}
                      >
                        <Row style={{ grid: 0 }}>
                          <Col
                            className="col-md-2"
                            style={{ marginTop: 6, marginLeft: 10 }}
                          >
                            <Avatar
                              src={val.vet_picture}
                              size={50}
                              round
                              name={val.vet_name}
                            />
                          </Col>
                          <Col className="col-md-1">
                            <Container style={{ width: 300, marginLeft: -40 }}>
                              <Card.Title
                                style={{
                                  marginTop: 5,
                                  fontSize: 17,
                                  marginLeft: 1,
                                }}
                              >
                                {val.vet_name}
                              </Card.Title>
                              <p
                                style={{
                                  fontSize: 10,
                                  marginTop: -13,
                                  fontWeight: "bold",
                                  marginLeft: 3,
                                }}
                              >
                                Veterinary Clinic
                              </p>
                              <Card.Subtitle
                                style={{
                                  color: "#707070",
                                  marginTop: -17,
                                  fontSize: 12,
                                  marginLeft: 3,
                                }}
                              >
                                {val.vet_address}
                              </Card.Subtitle>
                            </Container>
                          </Col>
                          <Col className="col-md-8">
                            <Link
                              to={`/petOwner/Appointment/vetdetails/${val.vetid}`}
                            >
                              <Button
                                style={{
                                  marginTop: 12,
                                  borderRadius: 30,
                                  backgroundColor: "#3BD2E3",
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  borderColor: "transparent",
                                  marginLeft: 200,
                                }}
                              >
                                View Vet
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </Card>
                    </Container>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                textAlign: "left",
                paddingTop: 20,
              }}
            >
              <h5
                style={{
                  display: "inline",
                  color: "#696969",
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "left",
                }}
              >
                Veterinary Clinic Near You
              </h5>
            </div>
            <div
              id="wrapper"
              style={{
                maxHeight: 300,
                display: "flex",
                overflowX: "auto",
                backgroundColor: "white",
                borderRadius: 30,
                padding: 10,
                width: "100%",
              }}
            >
              {suggestedvetclinic.map((val) => {
                return (
                  <div>
                    <Card
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        width: 500,
                        height: "100%",
                        borderRadius: 20,
                        borderWidth: 5,
                        backgroundColor: "#FFFF",
                        borderColor: "#19B9CC",
                        padding: 10,
                        margin: 5,
                      }}
                    >
                      <Row style={{ grid: 0 }}>
                        <Col
                          className="col-md-2"
                          style={{ marginTop: 6, marginLeft: 10 }}
                        >
                          <Avatar
                            src={val.vet_picture}
                            size={50}
                            round
                            name={val.vet_name}
                          />
                        </Col>
                        <Col className="col-md-1">
                          <Container style={{ width: 300, marginLeft: -40 }}>
                            <Card.Title
                              style={{
                                marginTop: 5,
                                fontSize: 17,
                                marginLeft: 1,
                              }}
                            >
                              {val.vet_name}
                            </Card.Title>
                            <p
                              style={{
                                fontSize: 10,
                                marginTop: -13,
                                fontWeight: "bold",
                                marginLeft: 3,
                              }}
                            >
                              Veterinary Clinic
                            </p>
                            <Card.Subtitle
                              style={{
                                color: "#707070",
                                marginTop: -17,
                                fontSize: 12,
                                marginLeft: 3,
                              }}
                            >
                              {val.vet_address}
                            </Card.Subtitle>
                            <p
                              style={{
                                color: "#707070",

                                fontSize: 12,
                                marginLeft: 3,
                              }}
                            >
                              Distance : {val.distance} km
                            </p>
                          </Container>
                        </Col>
                        <Col className="col-md-8">
                          <Link
                            to={`/petOwner/Appointment/vetdetails/${val.vetid}`}
                          >
                            <Button
                              style={{
                                marginTop: 12,
                                borderRadius: 30,
                                backgroundColor: "#3BD2E3",
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderColor: "transparent",
                                marginLeft: 200,
                              }}
                            >
                              View Vet
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default PetFindVetMain;
