import React, { useState, useEffect } from "react";
import { Button, Container, Card, Spinner } from "react-bootstrap";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { GiFemale, GiMale } from "react-icons/gi";

function PetCarousel(props) {
  // const [petHealthRecord, setPetHealthRecord] = useState([]);
  // const [show, setShow] = useState(false);
  const [counter, setcounter] = useState(0);
  const [pet, setPet] = useState([]);
  useEffect(() => {
    if (counter < 10) {
      Axios.get(`${hostUrl}/pets/:${props.petOwnerId}`).then((response) => {
        setPet(response.data);
        // console.log(pet);
      });
      setcounter(counter + 1);
    }
  }, [pet]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  return (
    <div>
      <Container style={{}}>
        <Carousel responsive={responsive}>
          {pet.length != 0 ? (
            pet.map((val) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Card
                    onClick={() => {
                      window.location.href = `/pets/${val.pet_id}`;
                    }}
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

                      backgroundColor: "white",
                      borderColor: "white",
                      padding: 0,
                      cursor: "pointer",
                      minWidth: 200,
                      width: '20vw',
                      height: 'auto',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={val.pet_picture}
                      style={{ height: '30vh' }}
                    />
                    <Card.Body
                      style={{
                        padding: 0,
                      }}
                    >
                      <Card.Title>
                        <p
                          style={{
                            color: "#056068",
                            fontWeight: "bold",
                            fontSize: 30,
                            marginTop: 20,
                          }}
                        >
                          {" "}
                          {val.pet_name}{" "}
                          {val.gender == "Male" ? (
                            <span>
                              <GiMale />
                            </span>
                          ) : (
                            <span>
                              <GiFemale />
                            </span>
                          )}{" "}
                        </p>
                      </Card.Title>

                      <Container
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#19B9CC",
                          marginTop: 40,
                          height: 60,
                        }}
                      >
                        <p
                          style={{
                            color: "white",
                            marginTop: 10,
                          }}
                        >
                          View more
                        </p>
                      </Container>
                    </Card.Body>
                  </Card>
                </div>
              );
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
    </div>
  );
}

export default PetCarousel;
