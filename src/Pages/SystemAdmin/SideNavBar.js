import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import logo from "../../Images/logo.png";
import "../../css/SideNavBar.css";
import { HiHome } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import { MdPets } from "react-icons/md";
import { FaClinicMedical, FaUserPlus } from "react-icons/fa";
import { AiFillSecurityScan } from "react-icons/ai";
import { GiDogBowl } from "react-icons/gi";

import { BsFillPersonFill } from "react-icons/bs";

function SideNavBar(props) {
  const [dashboard, setdashboard] = useState();
  const [profile, setprofile] = useState();
  const [pets, setpets] = useState();
  const [petowner, setpetowner] = useState();
  const [vetclinic, setvetclinic] = useState();
  const [visitormonitoring, setvisitormonitoring] = useState();
  const [dropdownVetOffer, setdropdownVetOffer] = useState(true);
  const [verified, setverified] = useState("#181c21");
  const [pending, setpending] = useState("#181c21");

  const [appointment, setappointment] = useState();
  useEffect(() => {
    if (props.active === "dashboard") {
      setdashboard("#19B9CC");
    } else if (props.active === "petowner") {
      setpetowner("#19B9CC");
    } else if (props.active === "pets") {
      setpets("#19B9CC");
    } else if (props.active === "verified") {
      handleDropdown();
      setverified("#19B9CC");
    } else if (props.active === "pending") {
      handleDropdown();
      setpending("#19B9CC");
    } else if (props.active === "auditlogs") {
      setvisitormonitoring("#19B9CC");
    }
  }, []);

  function handleDropdown() {
    setdropdownVetOffer(!dropdownVetOffer);
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
          backgroundColor: petowner,
        }}
      >
        <BsFillPersonFill id="icons" />
        <a id="anchorTag" href="/petowner">
          Pet Owner
        </a>
      </Container>

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: pets,
        }}
      >
        <MdPets id="icons" />
        <a id="anchorTag" href={`/pets`}>
          Pets
        </a>
      </Container>

      {/* --- drop down */}
      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: vetclinic,
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
          Vet Clinics
        </p>
      </Container>

      <div hidden={dropdownVetOffer}>
        {/* General */}
        <Container
          id="ContainerNavItemDropDown"
          style={{
            backgroundColor: verified,
          }}
        >
          <GoVerified id="icons" />
          <a id="anchorTag" href={`/vet&clinic/verified`}>
            Verified
          </a>
        </Container>

        {/* Pending */}
        <Container
          id="ContainerNavItemDropDown"
          style={{
            backgroundColor: pending,
          }}
        >
          <GiDogBowl id="icons" />
          <a id="anchorTag" href={`/vet&clinic/pending`}>
            Pending
          </a>
        </Container>
      </div>

      {/* --- drop down */}

      <Container
        id="ContainerNavItem"
        style={{
          backgroundColor: visitormonitoring,
        }}
      >
        <AiFillSecurityScan id="icons" />
        <a id="anchorTag" href={`/visitor&monitoring`}>
          System Logs
        </a>
      </Container>

      <hr />

      <Container
        id="ContainerNavItem"
        style={{
          marginTop: 425,
          height: "8%",
          backgroundColor: "black",
        }}
      >
        <FaUserPlus id="icons" style={{ fontSize: 30, marginTop: 10 }} />

        <p
          id="anchorTag"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            window.open("/system admin/registration", "_blank").focus();
            // /system admin/registration
          }}
        >
          {" "}
          Register System Admin{" "}
        </p>
      </Container>
    </div>
  );
}

export default SideNavBar;
