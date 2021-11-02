import React from "react";
import { Container } from "react-bootstrap";
import SideNavbarVerified from "./SideNavbarVerified";
import ServiceTab from "./ServiceTab";
import NavBarVet from "./NavBarVet";
function ServicesVerified() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div style={{ zoom: value, height: 'auto' }}>
      <div>
        <SideNavbarVerified active={"services"} />
      </div>

      <div
        style={{
          backgroundColor: "#F1F9FC",

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
          <ServiceTab />
        </Container>
      </div>
    </div>
  );
}

export default ServicesVerified;
