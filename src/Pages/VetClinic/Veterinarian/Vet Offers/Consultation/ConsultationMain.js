import React from "react";
import NavBarDoc from "../../NavBarDoc";
import SideNavBarVetDoctor from "../../SideNavBarVetDoctor";

import ConsultationPage from "./ConsultationPage";
function ConsultationMain() {
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
        <SideNavBarVetDoctor active={"consultation"} />
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
          {/* navbar */}
          <NavBarDoc showLogo={true} showHome={true} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <ConsultationPage />
        </div>
      </div>
    </div>
  );
}

export default ConsultationMain;
