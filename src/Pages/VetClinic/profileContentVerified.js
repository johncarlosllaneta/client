import React from "react";
import { Container } from "react-bootstrap";
import VetProfileTab from "./VetProfileTab";
import SideNavbarVerified from "./SideNavbarVerified";
import NavBarVet from "./NavBarVet";

function profileContentVerified() {
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
        <SideNavbarVerified active={"profile"} />
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
          <NavBarVet />
        </Container>
        <Container>
          <VetProfileTab />
        </Container>
      </div>
    </div>
  );
}

export default profileContentVerified;
