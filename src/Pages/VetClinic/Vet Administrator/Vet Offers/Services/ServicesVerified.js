import React from "react";
import { Container } from "react-bootstrap";
import SideNavBarVetAdmin from "../../SideNavBarVetAdmin";
import ServiceTab from "./ServiceTab";
import NavBarVet from '../../../Verified Vet/NavBarVet';

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
        <SideNavBarVetAdmin active={"services"} />
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
          <NavBarVet />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <ServiceTab />
        </div>
      </div>
    </div>
  );
}

export default ServicesVerified;
