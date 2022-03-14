import React from "react";
import NavBarDoc from "../../NavBarDoc";
import SideNavBarVetDoctor from "../../SideNavBarVetDoctor";
import PharmacyPage from "./PharmacyPage";
import PharmacyTable from "./PharmacyTable";
function PharmacyMain() {
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
        <SideNavBarVetDoctor active={"pharmacy"} />
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
          <NavBarDoc showLogo={false} showHome={false} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <PharmacyTable />
        </div>
      </div>
    </div>
  );
}

export default PharmacyMain;
