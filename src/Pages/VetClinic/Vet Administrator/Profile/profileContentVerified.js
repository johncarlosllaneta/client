import React from "react";
import { Container } from "react-bootstrap";

import SideNavBarVetAdmin from '../SideNavBarVetAdmin';
import NavBarVet from '../NavBarVet';
import VetProfileTab from "./VetProfileTab";

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
    <div>
      <div
        style={{
          width: "100%",
          border: "1px",
          float: "left",
          margin: 0,
          padding: 0,
        }}
      >
        <div style={{ height: "15%", border: "1px ", padding: 0 }}>
          <NavBarVet showLogo={false} showHome={false} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <VetProfileTab />
        </div>
      </div>
    </div>
  );
}

export default profileContentVerified;
