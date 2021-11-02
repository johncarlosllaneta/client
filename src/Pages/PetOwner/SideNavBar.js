import React, { useEffect, useState } from "react";
import { Container, Image, Badge } from "react-bootstrap";
import logo from "../../Images/logo.png";
import "../../css/SideNavBar.css";
import { HiHome, HiShoppingCart } from "react-icons/hi";
import { MdPets } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import { MdFiberNew } from "react-icons/md";
// import { FaExclamationCircle } from "react-icons/fa";
// import { GiRingingBell } from "react-icons/gi";

function SideNavBar(props) {
  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);

        Axios.get(
          `${hostUrl}/petOwner/notification/reservation/isNew/length/${user.pet_owner_id}`
        ).then((response) => {
          setnumberOfUnviewedReserved(response.data.view);
          // alert(response.data.view);
        });

        Axios.get(
          `${hostUrl}/petOwner/notification/isNew/length/${user.pet_owner_id}`
        ).then((response) => {
          setnumberOfUnviewedAppointment(response.data.view);
          // alert(response.data.view);
        });
        // console.log(user);
      });
      setcounter(counter + 1);
    }
  }, [counter, user, numberOfUnviewedReserved]);

  const [dashboard, setdashboard] = useState();
  const [pets, setpets] = useState();
  const [appointment, setappointment] = useState();
  const [mycart, setmycart] = useState();
  const [visitormonitoring, setvisitormonitoring] = useState();

  useEffect(() => {
    if (props.active === "dashboard") {
      setdashboard("#19B9CC");
    } else if (props.active === "pets") {
      setpets("#19B9CC");
    } else if (props.active === "appointment") {
      setappointment("#19B9CC");
    } else if (props.active === "mycart") {
      setmycart("#19B9CC");
    } else if (props.active === "visitormonitoring") {
      setvisitormonitoring("#19B9CC");
    }
  }, []);

  const [numberOfUnviewedReserved, setnumberOfUnviewedReserved] = useState(0);
  const [numberOfUnviewedAppointment, setnumberOfUnviewedAppointment] =
    useState(0);

  function viewingReserved() {
    Axios.put(
      `${hostUrl}/petOwner/notification/reservation/isNew/${user.pet_owner_id}`
    );
  }

  function viewingAppointment() {
    Axios.put(`${hostUrl}/petOwner/notification/isNew/${user.pet_owner_id}`);
  }
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
          href="/"
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
        <a id="anchorTag" href="/">
          <HiHome id="icons" />
          Home
        </a>
      </Container>

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: pets,
        }}
      >
        <MdPets id="icons" />
        <a id="anchorTag" href="/pets">
          Pets
        </a>
      </Container>

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: appointment,
        }}
        onClick={viewingAppointment}
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
            <a id="anchorTag" href="/appointment">
              Appointment
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
            <a id="anchorTag" href="/appointment">
              Appointment
            </a>
          </div>
        )}
      </Container>

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: mycart,
        }}
        onClick={viewingReserved}
      >
        {numberOfUnviewedReserved != 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <HiShoppingCart id="icons" />
            <a id="anchorTag" href="/my&cart">
              Reservation
            </a>
            <MdFiberNew
              style={{
                color: "#f8d210",
                marginLeft: 35,
                fontSize: 28,
              }}
            />
          </div>
        ) : (
          <div>
            <HiShoppingCart id="icons" />
            <a id="anchorTag" href="/my&cart">
              Reservation
            </a>
          </div>
        )}
      </Container>

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: visitormonitoring,
        }}
      >
        <AiFillSchedule id="icons" />
        <a id="anchorTag" href="/contact&tracing">
          Contact Tracing
        </a>
      </Container>

      <hr />
    </div>
  );
}

export default SideNavBar;
