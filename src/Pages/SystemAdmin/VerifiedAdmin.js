import React from "react";
import { Container } from "react-bootstrap";
import NavBarAdmin from "./NavBarAdmin";
import SideNavBar from "./SideNavBar";
import VetClinicVerifiedTable from "./VetClinicVerifiedTable";

function VerifiedAdmin() {
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
        <SideNavBar active={"verified"} />
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
          <NavBarAdmin />
        </Container>
        <Container>
          <VetClinicVerifiedTable />
        </Container>
      </div>
    </div>
  );
}

export default VerifiedAdmin;
