import React from "react";
import NavBarStaff from "../../NavBarStaff";
import SideNavBarVetStaff from "../../SideNavBarVetStaff";
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
        <SideNavBarVetStaff active={"pharmacy"} />
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
          <NavBarStaff />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <PharmacyTable />
        </div>
      </div>
    </div>
  );
}

export default PharmacyMain;
