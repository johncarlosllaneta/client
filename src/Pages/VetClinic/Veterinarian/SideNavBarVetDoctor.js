import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import logo from "../../../Images/logo.png";
import "../../../css/SideNavBar.css";
import { HiHome } from "react-icons/hi";
import { MdPets } from "react-icons/md";
import { FaClinicMedical, FaStethoscope } from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";
import { AiFillSchedule, AiFillSecurityScan } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiServiceFill } from "react-icons/ri";
import { GiDogBowl } from "react-icons/gi";
import Axios from "axios";
import { hostUrl } from "../../../Components/Host";
import { MdFiberNew } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import getUser from "../../../Components/userData";

function SideNavBarVetDoctor(props) {
  const [consultationChecker, setconsultationChecker] = useState();
  const [pharmacyChecker, setpharmacyChecker] = useState();
  const [productChecker, setproductChecker] = useState();
  const [servicesChecker, setservicesChecker] = useState();
  const [consultationCheckerEnabler, setconsultationCheckerEnabler] =
    useState("none");
  const [pharmacyCheckerEnabler, setpharmacyCheckerEnabler] = useState("none");
  const [servicesCheckerEnabler, setservicesCheckerEnabler] = useState("none");

  const [numberOfUnviewedReserved, setnumberOfUnviewedReserved] = useState(0);
  const [numberOfUnviewedAppointment, setnumberOfUnviewedAppointment] =
    useState(0);

  const [vetID, setvetID] = useState("");
  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    Axios.get(`${hostUrl}/doc/${userData.vet_doc_id}`).then((response) => {
      setuser(response.data[0]);
    });
    setconsultationChecker(1);
    setpharmacyChecker(1);
    setproductChecker(user.enableProduct);
    setservicesChecker(1);
    // console.log(user);
    // alert(vetID.toString().replace('/', '10##01'))

    Axios.get(
      `${hostUrl}/vetclinic/notification/isNew/length/${user.vetid}`
    ).then((response) => {
      setnumberOfUnviewedAppointment(response.data.view);
      // alert(response.data.view);
    });

    Axios.get(
      `${hostUrl}/vetclinic/notification/reservation/isNew/length/${user.vetid}`
    ).then((response) => {
      setnumberOfUnviewedReserved(response.data.view);
      // alert(response.data.view);
    });
  }, []);

  useEffect(() => {
    if (consultationChecker === 1) {
      setconsultationCheckerEnabler("block");
    }
    if (pharmacyChecker === 1) {
      setpharmacyCheckerEnabler("block");
    }
    if (servicesChecker === 1) {
      setservicesCheckerEnabler("block");
    }
  }, [pharmacyChecker, productChecker, servicesChecker, consultationChecker]);

  const [dashboard, setdashboard] = useState();
  const [profile, setprofile] = useState();
  const [pets, setpets] = useState();
  const [vetoffer, setvetoffer] = useState();
  const [dropdownVetOffer, setdropdownVetOffer] = useState(true);
  const [consultation, setconsultation] = useState("#181c21");
  const [pharmacy, setpharmacy] = useState("#181c21");
  const [services, setservices] = useState("#181c21");
  const [appointment, setappointment] = useState();
  useEffect(() => {
    if (props.active === "dashboard") {
      setdashboard("#19B9CC");
    } else if (props.active === "profile") {
      setprofile("#19B9CC");
    } else if (props.active === "pets") {
      setpets("#19B9CC");
    } else if (props.active === "vetoffer") {
      setvetoffer("#19B9CC");
    } else if (props.active === "appointment") {
      setappointment("#19B9CC");
    } else if (props.active === "consultation") {
      handleDropdown();
      setconsultation("#19B9CC");
    } else if (props.active === "pharmacy") {
      handleDropdown();
      setpharmacy("#19B9CC");
    } else if (props.active === "services") {
      handleDropdown();
      setservices("#19B9CC");
    }
  }, []);

  function handleDropdown() {
    setdropdownVetOffer(!dropdownVetOffer);
  }

  // function viewingReserved() {
  //   Axios.put(
  //     `${hostUrl}/vetclinic/notification/reservation/isNew/${user.vetid}`
  //   );
  // }

  // function viewingAppointment() {
  //   Axios.put(`${hostUrl}/vetclinic/notification/isNew/${user.vetid}`);
  // }
  return (
    <div id="sideNavBar">
      <Container
        style={{
          padding: 30,
        }}
      >
        <Image
          src={logo}
          style={{
            height: 40,
          }}
        />
        <a
          href="/dashboard"
          style={{
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 10,
            fontSize: 30,
            textDecoration: "none",
            color: "white",
          }}
        >
          TERRAVET
        </a>
      </Container>
      <hr />

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: dashboard,
        }}
      >
        <a id="anchorTag" href="/dashboard">
          <HiHome id="icons" />
          Dashboard
        </a>
      </Container>

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: profile,
        }}
      >
        <IoPersonCircleSharp id="icons" />
        <a id="anchorTag" href="/profile">
          Profile
        </a>
      </Container>

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: pets,
        }}
      >
        <MdPets id="icons" />
        <a id="anchorTag" href={`/pets/${user.vetid}`}>
          Pets
        </a>
      </Container>

      {/* --- drop down */}
      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: vetoffer,
        }}
      >
        {numberOfUnviewedReserved != 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <FaClinicMedical id="icons" />
            <p
              id="anchorTag"
              style={{
                cursor: "pointer",
              }}
              onClick={handleDropdown}
            >
              Vet Offers
            </p>
            <GoPrimitiveDot
              style={{
                color: "#f8d210",
                marginLeft: 25,
                fontSize: 28,
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <FaClinicMedical id="icons" />
            <p
              id="anchorTag"
              style={{
                cursor: "pointer",
              }}
              onClick={handleDropdown}
            >
              Vet Offers
            </p>
          </div>
        )}
      </Container>

      <div hidden={dropdownVetOffer}>
        <div
          style={{
            display: consultationCheckerEnabler,
          }}
        >
          {/* Consultation */}
          <Container
            id="ContainerNavItemDropDown"
            style={{
              backgroundColor: consultation,
            }}
          >
            <FaStethoscope id="icons" />
            <a id="anchorTag" href={`/consultation/${user.vetid}`}>
              Consultation
            </a>
          </Container>
        </div>

        <div
          style={{
            display: pharmacyCheckerEnabler,
          }}
        >
          {/* Pharmacy */}
          <Container
            id="ContainerNavItemDropDown"
            style={{
              backgroundColor: pharmacy,
            }}
          >
            <MdLocalPharmacy id="icons" />
            <a id="anchorTag" href={`/pharmacy/${user.vetid}`}>
              Pharmacy
            </a>
          </Container>
        </div>
        <div
          style={{
            display: servicesCheckerEnabler,
          }}
        >
          {/* Services */}
          <Container
            id="ContainerNavItemDropDown"
            style={{
              backgroundColor: services,
            }}
          >
            <RiServiceFill id="icons" />
            <a id="anchorTag" href={`/services/${user.vetid}`}>
              Services
            </a>
          </Container>
        </div>
      </div>

      {/* --- drop down */}

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: appointment,
        }}
        // onClick={viewingAppointment}
      >
        {numberOfUnviewedAppointment != 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <AiFillSchedule id="icons" />
            <a id="anchorTag" href={`/appointments/${user.vetid}`}>
              Appointments
            </a>
            <MdFiberNew
              style={{
                color: "#f8d210",
                marginLeft: 25,
                fontSize: 28,
              }}
            />
          </div>
        ) : (
          <div>
            <AiFillSchedule id="icons" />
            <a id="anchorTag" href={`/appointments/${user.vetid}`}>
              Appointments
            </a>
          </div>
        )}
      </Container>

      {/* <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: visitormonitoring,
        }}
      >
        <AiFillSecurityScan id="icons" />
        <a id="anchorTag" href={`/visitor&monitoring/${user.vetid}`}>
          Visitor Monitoring
        </a>
      </Container> */}

      <hr />
    </div>
  );
}

export default SideNavBarVetDoctor;
