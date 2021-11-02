import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBarAdmin from "./NavBarAdmin";
import Home from "./Home";
import PetOwnerTable from "./PetOwnerTable";
import SideNavBar from "./SideNavBar";

function PetOwnerAdmin() {
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
        <SideNavBar active={"petowner"} />
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
          <PetOwnerTable />
        </Container>
      </div>
    </div>
  );
}

export default PetOwnerAdmin;
