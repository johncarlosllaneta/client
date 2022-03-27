import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import logo from "../../../Images/logo.png";
import "../../../css/SideNavBar.css";
import { HiHome } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import { IoPersonCircleSharp } from "react-icons/io5";
import PersonIcon from '@mui/icons-material/Person';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import getUser from "../../../Components/userData";

function SideNavBar(props) {
  const [dashboard, setdashboard] = useState();
  const [profile, setprofile] = useState();
  const [vetOffers, setvetOffers] = useState();
  const [verify, setverify] = useState();
  useEffect(() => {
    if (props.active === "dashboard") {
      setdashboard("#19B9CC");
    } else if (props.active === "verify") {
      setverify("#19B9CC");
    } else if (props.active === "profile") {
      setprofile("#19B9CC");
    } else if (props.active === "vet offers") {
      setvetOffers("#19B9CC");
    }
  }, []);

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
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


      {
        user.length != 0
          ?
          <div
            hidden={user.isEmailVerify != 0 ? false : true}
          >
            <Container
              id="ContainerNavItem"
              style={{
                backgroundColor: profile,
              }}
            >
              <a id="anchorTag" href="/profile">
                <PersonIcon id="icons" />
                Profile
              </a>
            </Container>


            <Container
              id="ContainerNavItem"
              style={{
                backgroundColor: vetOffers,
              }}
            >
              <a id="anchorTag" href="/vetOffers">
                <AddBusinessIcon id="icons" />
                Vet Offers
              </a>
            </Container>
          </div>
          :
          <></>
      }




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
