import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Form,
  Card,
  Row,
  Button,
  Image,
} from "react-bootstrap";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import Axios from "axios";

import PetVetDetails from "../PetOwner/PetVetDetails";
import background from "../../Images/bg.png";
import { Link } from "react-router-dom";
import { hostUrl } from "../../Components/Host";

const PetFindVet = () => {
  // const [FindVet, setFindVet] = useState(false);
  // const [petVetDetails, setpetVetDetails] = useState(true);

  const [vetclinic, setVetClinic] = useState([]);
  useEffect(() => {
    Axios.get(`${hostUrl}/vetclinic/verified`).then((response) => {
      setVetClinic(response.data);
    });
  }, [vetclinic]);

  const [q, setq] = useState("");
  // alert(swidth);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

  return (
    <div>
      <Container style={{ marginTop: 120, padding: 20 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <h5
            style={{ display: "inline", color: "#696969", fontWeight: "bold" }}
          >
            Find Vet
          </h5>
          <Button
            href="/"
            style={{
              display: "inline",
              backgroundColor: "#3BD2E3",
              paddingLeft: 30,
              paddingRight: 30,
              borderRadius: 30,
              borderColor: "#FFFFFF",
            }}
          >
            Back
          </Button>
        </Row>
        <Container style={{ textAlign: "left" }}>
          <Form>
            <Form.Row>
              <Col xs={8}>
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
              </Col>
            </Form.Row>
          </Form>
          <h5 style={{ marginTop: 10 }}>Results</h5>
          <hr />
          {q !== "" &&
            search(vetclinic).map((val) => {
              return (
                <div>
                  <Container style={{ margin: 10 }} fluid="md">
                    <Card
                      style={{
                        width: 540,
                        height: 100,
                        borderRadius: 20,
                        borderWidth: 5,
                        backgroundColor: "#FFFF",
                        borderColor: "#19B9CC",
                        marginBottom: 3,
                        padding: 10,
                      }}
                    >
                      <Row style={{ grid: 0 }}>
                        <Col
                          className="col-md-2"
                          style={{ marginTop: 6, marginLeft: 10 }}
                        >
                          <Image
                            src={val.vet_picture}
                            style={{ height: 50, width: 50 }}
                            roundedCircle
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
                            to={`/petOwner/Appointment/vetdetails/${val.vet_admin_id}`}
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

          <h5>Veterinary Clinic near you</h5>
        </Container>
      </Container>
      {/* <Container hidden={petVetDetails}>
        <PetVetDetails vet={vetClinicInfo} />
      </Container> */}
    </div>
  );
};

export default PetFindVet;
