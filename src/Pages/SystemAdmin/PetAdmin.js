import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBarAdmin from "./NavBarAdmin";
import Home from "./Home";
import PetOwnerTable from "./PetOwnerTable";
import PetsTable from "./PetsTable";
import SideNavBar from "./SideNavBar";

function PetAdmin() {
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
          <NavBarAdmin />
        </Container>
        <Container>
          <PetsTable />
        </Container>
      </div>
    </div>
  );
}

export default PetAdmin;
