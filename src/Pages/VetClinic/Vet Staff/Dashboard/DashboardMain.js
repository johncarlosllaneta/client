import React from "react";
import HomeTab from "../../../VetClinic/Verified Vet/Dashboard/HomeTab";
import NavBarVet from "../../../VetClinic/Verified Vet/NavBarVet";
import SideNavBarVetStaff from "../SideNavBarVetStaff";
function DashboardMain() {
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
        <SideNavBarVetStaff active={"dashboard"} />
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
          <NavBarVet />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <HomeTab user={"Vet Staff"} />
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
