import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card, Spinner, Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PetCarouselHome from "./PetCarouselHome";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import News from "../../Components/News";
import { NewsContextProvider } from "../../Components/NewsContext";
import AppointmentHomePage from "./AppointmentHomePage";
import { facts } from "../../Components/Facts";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const TabHome = (props) => {
  const [counter, setcounter] = useState(0);
  const [pet, setPet] = useState([]);

  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/pets/:${props.data.pet_owner_id}`).then(
        (response) => {
          setPet(response.data);
          // console.log(pet);
        }
      );
      setcounter(counter + 1);
    }
  }, [pet]);

  const [randomFacts, setrandomFacts] = useState(0);
  useEffect(() => {
    setrandomFacts(Math.floor(Math.random() * 434));
  }, []);

  return (
    <div
      style={{
        width: "77vw",
        marginLeft: 40,
        marginTop: 70,
      }}
    >
      <Row style={{ backgroundColor: "transparent" }}>
        <Col sm={8}>
          <Container style={{ margin: 10 }}>
            <Row style={{ marginTop: 10 }}>
              <Row
                className="mb-3"
                style={{
                  backgroundColor: "white",
                  height: 375,
                  borderRadius: 30,
                }}
              >
                <Container
                  style={{
                    borderRadius: 30,
                    width: 970,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    padding: 20,
                    marginBottom: 20,
                  }}
                >
                  <h4 style={{ color: "#19B9CC", textAlign: "left" }}>Pets</h4>

                  <Carousel responsive={responsive}>
                    {pet.length != 0 ? (
                      pet.map((val) => {
                        return <PetCarouselHome data={val} />;
                      })
                    ) : (
                      <Spinner
                        animation="border"
                        role="status"
                        style={{ marginLeft: 450, marginTop: 100 }}
                      >
                        <span className="visually-hidden"></span>
                      </Spinner>
                    )}
                  </Carousel>
                </Container>
              </Row>
              <Row
                style={{
                  backgroundColor: "white",
                  borderRadius: 30,
                  marginTop: 40,
                }}
              >
                <Container
                  style={{
                    borderRadius: 30,
                    backgroundColor: "white",
                    padding: 20,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    marginTop: 20,
                  }}
                >
                  <div className="news">
                    <h3
                      style={{
                        fontWeight: "bold",
                        color: "#19B9CC",
                        textAlign: "left",
                      }}
                    >
                      Animal Information
                    </h3>

                    <p>{facts[randomFacts]["fact"]}</p>
                  </div>
                </Container>
              </Row>
            </Row>
          </Container>
        </Col>
        <Col sm={4}>
          <Container
            style={{
              marginLeft: 40,
              borderRadius: 30,
              backgroundColor: "white",
              height: 700,
              padding: 30,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Row className="mb-2">
              <Col>
                <h5
                  style={{ color: "#19B9CC", textAlign: "left" }}
                  className="mt-2"
                >
                  Appointment
                </h5>
              </Col>

              <Col>
                <Button
                  onClick={() => {
                    window.location.href = "/appointment";
                  }}
                  style={{
                    display: "inline-flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    float: "right",
                  }}
                >
                  Set Appointment
                </Button>
              </Col>
            </Row>

            <AppointmentHomePage data={props.data} />
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default TabHome;
