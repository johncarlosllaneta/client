import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, BrowserRouter, Link } from "react-router-dom";
import background from "../../Images/bg.png";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import Avatar from "react-avatar";
import imageI from "../../Images/dog-food.png";
import imageII from "../../Images/drugs .png";
import imageIII from "../../Images/pngwing .png";
import "../../css/VetCategory.css";

function VetCategory() {
  let { vetid } = useParams();

  const [pharmacy, setpharmacy] = useState(false);
  const [product, setproduct] = useState(false);
  const [services, setservices] = useState(false);

  const [counter, setcounter] = useState(0);
  const [vetclinic, setVetClinic] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/vetclinic/verified/${vetid}`).then((response) => {
        setVetClinic(response.data[0]);
        // console.log(vetclinic.vet_name);
        // alert(vetclinic.vet_name);

        if (response.data[0].enablePharmacy !== 1) {
          setpharmacy(true);
        }
        if (response.data[0].enableProduct !== 1) {
          setproduct(true);
        }

        if (response.data[0].enableServices !== 1) {
          setservices(true);
        }
      });
      setcounter(counter + 1);
    }
    // alert(pharmacy + " " + product + " " + services);
  }, [vetclinic]);

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

        marginTop: 110,
        zoom: value,
      }}
    >
      <NavBarAppointments />

      <Row>
        <Col>
          <Container>
            <h1
              style={{
                color: "grey",
                textAlign: "center",

              }}
            >
              Vet Offers
            </h1>
          </Container>
        </Col>

        <Col>
          <Container
            style={{
              display: "flex",
              height: '100%',
              justifyContent: "flex-end",
              alignContent: 'center'
            }}
          >
            <div
              id='divPetVetDetails'

            >


              <Button
                href={`/petOwner/Appointment/vetdetails/${vetid}`}
                style={{
                  borderRadius: 20,
                  border: "3px solid white",
                  backgroundColor: "#3BD2E3",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  // display: "inline",
                  minWidth: 150,
                  width: '10vw',

                }}
              >
                Back
              </Button>
            </div>
          </Container>
        </Col>
      </Row>





      <Container
        id='containerVetCategory'
      >
        <Container

          id='containerVetInformation'

        >
          {/* Vet information */}

          <Row
            style={{
              padding: 5
            }}
          >
            <Col

              id='avatarVetImage'
            >
              {/* avatar */}
              <Avatar
                src={vetclinic.vet_picture}
                name={vetclinic.vet_name}
                round
              />
            </Col>

            <Col >
              {/* vet name */}
              <Row>
                <h3
                  id='h3VetName'
                // style={{
                //   textAlign: "left",
                //   marginTop: 10,
                //   fontSizeAdjust: 'inherit',
                //   fontSize: '1.5rem',
                // }}
                >
                  {vetclinic.vet_name}
                </h3>
              </Row>
              <Row>
                <h5
                  id='h5VetClinic'
                  style={{
                    textAlign: "left",
                  }}
                >
                  Veterinary Clinic
                </h5>
              </Row>
              <Row>
                <p
                  id='pVetClinicAddress'
                  style={{
                    textAlign: "left",

                  }}
                >
                  {vetclinic.vet_address}
                </p>
              </Row>
            </Col>

            <Col>
              {/* email */}
              <Row>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 15,
                  }}
                >
                  {vetclinic.email}
                </h3>

                <h6
                  style={{
                    color: "#19B9CC",
                    fontSize: 15,
                  }}
                >
                  Email
                </h6>
              </Row>
              <Row>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {vetclinic.vet_contact_number}
                </h3>

                <h6
                  style={{
                    color: "#19B9CC",
                    fontSize: 15,
                  }}
                >
                  Contact Number
                </h6>
              </Row>
            </Col>

            {/* talk to vet */}
            {/* <Col>
            

              <Button
                href="/petOwner/Appointment/vetdetails/:vetid/talkVet"
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
            </Col> */}
          </Row>
        </Container>

        <Row>
          <Col hidden={product}>
            <Link
              to={`/pet owner/reservation/products/${vetclinic.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "35vh",
                  width: "35vh",
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  marginTop: 40,
                }}
              >
                <Image
                  src={imageI}
                  style={{
                    height: 200,
                    marginTop: 20,
                  }}
                />
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  Products
                </h1>
              </Container>
            </Link>
          </Col>

          <Col hidden={pharmacy}>
            <Link
              to={`/pet owner/pharmacy/${vetclinic.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "35vh",
                  width: "35vh",
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  marginTop: 40,
                }}
              >
                <Image
                  src={imageII}
                  style={{
                    height: 200,
                    marginTop: 30,
                  }}
                />
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  Pharmacy
                </h1>
              </Container>
            </Link>
          </Col>

          <Col hidden={services}>
            <Link
              to={`/petOwner/Appointment/vetdetails/service/${vetclinic.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "35vh",
                  width: "35vh",
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  marginTop: 40,
                }}
              >
                <Image
                  src={imageIII}
                  style={{
                    height: 200,
                    marginTop: 30,
                  }}
                />
                <h1
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  Services
                </h1>
              </Container>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VetCategory;
