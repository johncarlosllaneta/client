import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import SideNavBar from "./SideNavBar";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import PetOwnerPets from "./PetOwnerPets";
import HomePage from "./HomePage";

function PetsMain() {
  // const [counter, setcounter] = useState(0);
  // const [user, setuser] = useState([]);
  // useEffect(() => {
  //   var token = localStorage.getItem("ajwt");
  //   if (counter < 6) {
  //     Axios.get(`${hostUrl}/home`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }).then((response) => {
  //       setuser(response.data.result[0]);
  //       // console.log(user);
  //     });
  //     setcounter(counter + 1);
  //   }
  // }, [counter, user]);
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  return (
    <div style={{ zoom: value }}>
      {/* <div>
        <SideNavBar active={"pets"} />
      </div> */}

      <div
        style={{
          backgroundColor: "#F1F9FC",
          height: "100vh",
        }}
      >


        <NavBarHome />

        <Row>
          <Container
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <PetOwnerPets />
          </Container>
        </Row>

        <HomePage page={3} />

      </div>
    </div>
  );
}

export default PetsMain;
