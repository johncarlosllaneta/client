import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SideNavbarVerified from "../SideNavbarVerified";
import Reservation from "./Reservation";
import NavBarVet from "../NavBarVet";

function appointmentVerified() {
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
        <SideNavbarVerified active={"appointment"} />
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
          <Reservation />
        </div>
      </div>
    </div>
  );
}

export default appointmentVerified;