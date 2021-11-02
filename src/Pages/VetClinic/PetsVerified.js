import React from "react";
import { Container } from "react-bootstrap";
import SideNavbarVerified from "./SideNavbarVerified";
import PetsTable from "./PetsTable";
import NavBarVet from "./NavBarVet";

function PetsVerified() {
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
        <SideNavbarVerified active={"pets"} />
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
          <PetsTable />
        </Container>
      </div>
    </div>
  );
}

export default PetsVerified;
