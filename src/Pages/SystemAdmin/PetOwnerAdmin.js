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
    <div>
      <div
        style={{
          width: "20%",
          border: "1px solid transparent",
          float: "left",
          padding: 0,
          margin: 0,
        }}
      >
        <SideNavBar active={"petowner"} />
      </div>

      <div
        style={{
          width: "80%",
          border: "1px",
          float: "left",
          margin: 0,
          padding: 0,
        }}
      >
        <div style={{ height: "15%", border: "1px ", padding: 0 }}>
          <NavBarAdmin />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <PetOwnerTable />
        </div>
      </div>
    </div>
  );
}

export default PetOwnerAdmin;
