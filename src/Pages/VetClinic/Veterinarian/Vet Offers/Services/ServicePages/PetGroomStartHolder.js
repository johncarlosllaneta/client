import React from "react";
import { Container } from "react-bootstrap";

import PetGroomStart from "./PetGroomStart";
import SideNavBarVetDoctor from "../../../SideNavBarVetDoctor";
import NavBarDoc from "../../../NavBarDoc";

function PetGroomStartHolder() {
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
        <SideNavBarVetDoctor active={"services"} />
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
          <NavBarDoc showLogo={true} showHome={true} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <PetGroomStart />
        </div>
      </div>
    </div>
  );
}

export default PetGroomStartHolder;
