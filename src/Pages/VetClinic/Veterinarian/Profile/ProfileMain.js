import React from "react";
import NavBarVet from "../../Verified Vet/NavBarVet";
import NavBarDoc from "../NavBarDoc";
import SideNavBarVetDoctor from "../SideNavBarVetDoctor";
import ProfilePage from "./Widgets/ProfilePage";

function ProfileMain() {
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
        <SideNavBarVetDoctor active={"profile"} />
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
          <ProfilePage />
        </div>
      </div>
    </div>
  );
}

export default ProfileMain;
