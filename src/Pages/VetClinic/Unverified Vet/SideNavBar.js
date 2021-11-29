import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import logo from "../../../Images/logo.png";
import "../../../css/SideNavBar.css";
import { HiHome } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import { IoPersonCircleSharp } from "react-icons/io5";
function SideNavBar(props) {
  const [dashboard, setdashboard] = useState();
  const [profile, setprofile] = useState();
  const [verify, setverify] = useState();
  useEffect(() => {
    if (props.active === "dashboard") {
      setdashboard("#19B9CC");
    } else if (props.active === "profile") {
      setprofile("#19B9CC");
    } else if (props.active === "verify") {
      setverify("#19B9CC");
    }
  }, []);
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
          backgroundColor: verify,
        }}
      >
        <GoVerified id="icons" />
        <a id="anchorTag" href="/verification">
          Verification
        </a>
      </Container>

      <hr />
    </div>
  );
}

export default SideNavBar;
