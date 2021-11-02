import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import SideNavBar from "./SideNavBar";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import PetOwnerPets from "./PetOwnerPets";

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
      <div>
        <SideNavBar active={"pets"} />
      </div>

      <div
        style={{
          backgroundColor: "#F1F9FC",
          height: "100vh",
        }}
      >
        <Container
          style={{
            padding: 0,
          }}
        >
          <NavBarHome />
        </Container>
        <Container>
          <PetOwnerPets />
        </Container>
      </div>
    </div>
  );
}

export default PetsMain;
