import React, { useState, useEffect } from "react";
import { Container, Row, Button, Card, Image, Col } from "react-bootstrap";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
import background from "../../Images/bg.png";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import imageI from "../../Images/CHECKUP.png";
import imageII from "../../Images/examination copy.png";
import imageIII from "../../Images/baths.png";
import imageIV from "../../Images/preventive.png";
import imageV from "../../Images/scopy.png";
import imageVI from "../../Images/INHOUSEW.png";
import "../../css/PetProdServ.css";

const PetProdServ = () => {
  let { vetid } = useParams();
  // alert(vetid);

  const [counter, setcounter] = useState(0);
  const [services, setservices] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/services/${vetid}`).then((response) => {
        setservices(response.data);
        // console.log(response.data)
      });
      setcounter(counter + 1);
    }
    // alert(user.vet_admin_id);
  }, [services]);

  const [details, setdetails] = useState();

  //category
  const [consulation, setconsulation] = useState(false);
  const [petExamination, setpetExamination] = useState(false);
  const [petGrooming, setpetGrooming] = useState(false);
  const [preventiveControls, setpreventiveControls] = useState(false);
  const [vaccination, setvaccination] = useState(false);
  const [inHouseLab, setinHouseLab] = useState(false);

  const [vetclinic, setVetClinic] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(
        `${hostUrl}/petOwner/Appointment/vetdetails/category/:${vetid}`
      ).then((response) => {
        setVetClinic(response.data[0]);
        // console.log(vetclinic.vet_name);
        // alert(vetclinic.vet_name);

        if (response.data[0].enableConsultation !== 1) {
          setconsulation(true);
        }
        if (response.data[0].enableExamination !== 1) {
          setpetExamination(true);
        }

        if (response.data[0].enableGrooming !== 1) {
          setpetGrooming(true);
        }
        if (response.data[0].enableVaccination !== 1) {
          setvaccination(true);
        }
        if (response.data[0].enablePreventiveControls !== 1) {
          setpreventiveControls(true);
        }

        if (response.data[0].enableInHouseLab !== 1) {
          setinHouseLab(true);
        }
      });
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
        height: "90vh",
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
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            Back
          </Button>
        </div>
      </div>

      <Container
        id='containerServices'
      >
        <Container>
          <h5
            style={{
              color: "#3BD2E3",
              fontWeight: "bold",
              display: "inline",
              marginBottom: 40,
              fontSize: 50,
            }}
          >
            Services
          </h5>
        </Container>

        {/* services */}

        <Row id='rowServices'>
          <Col hidden={consulation}>
            <Link
              to={`/petOwner/Appointment/vetdetails/service/servicedetail/${`Consultation&${vetid}`}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                id='containerServicesItems'

              >
                <Image
                  id='imageService'
                  src={imageI}

                />
              </Container>
            </Link>
            <h5
              style={{
                color: "#3BD2E3",
                fontWeight: "bolder",
                marginTop: 10,
              }}
            >
              Consultation
            </h5>
          </Col>

          <Col hidden={petExamination}>
            <Link
              to={`/petOwner/Appointment/vetdetails/service/servicedetail/${`Pet Examination&${vetid}`}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                id='containerServicesItems'

              >
                <Image
                  id='imageService'
                  src={imageII}

                />
              </Container>
            </Link>
            <h5
              style={{
                color: "#3BD2E3",
                fontWeight: "bolder",
                marginTop: 10,
              }}
            >
              Pet Examination
            </h5>
          </Col>

          <Col hidden={petGrooming}>
            <Link
              to={`/petOwner/Appointment/vetdetails/service/servicedetail/${`Pet Grooming&${vetid}`}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                id='containerServicesItems'

              >
                <Image
                  id='imageService'
                  src={imageIII}

                />
              </Container>
            </Link>

            <h5
              style={{
                color: "#3BD2E3",
                fontWeight: "bolder",
                marginTop: 10,
              }}
            >
              Pet Gromming
            </h5>
          </Col>

          <Col hidden={preventiveControls}>
            <Link
              to={`/petOwner/Appointment/vetdetails/service/servicedetail/${`Preventive Controls&${vetid}`}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                id='containerServicesItems'

              >
                <Image
                  id='imageService'
                  src={imageIV}

                />
              </Container>
            </Link>

            <h5
              style={{
                color: "#3BD2E3",
                fontWeight: "bolder",
                marginTop: 10,
              }}
            >
              Preventive Control
            </h5>
          </Col>

          <Col hidden={vaccination}>
            <Link
              to={`/petOwner/Appointment/vetdetails/service/servicedetail/${`Vaccination&${vetid}`}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                id='containerServicesItems'

              >
                <Image
                  id='imageService'
                  src={imageV}
                />
              </Container>
            </Link>
            <h5
              style={{
                color: "#3BD2E3",
                fontWeight: "bolder",
                marginTop: 10,
              }}
            >
              Vaccination
            </h5>
          </Col>


        </Row>

        <Container
          id='containerInformation'

        >
          <h5
            id='h5ServiceTitle'
          >
            Pet Examination
          </h5>

          <p>
            The Definition Of A Consultation Is A Meeting With A Professional Or
            Expert For Purposes Of Gaining Information, Or The Act Or Process Of
            Formally Discussing And Collaborating On Something.{" "}
          </p>
        </Container>
      </Container>
    </div>
  );
};

export default PetProdServ;
