import React from "react";
import { Container } from "react-bootstrap";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import SideNavBar from "./SideNavBar";
import PetFindVetMain from "./PetFindVetMain";

function FindVetMain() {
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
        <SideNavBar active={"appointment"} />
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
          <PetFindVetMain />
        </Container>
      </div>
    </div>
  );
}

export default FindVetMain;
