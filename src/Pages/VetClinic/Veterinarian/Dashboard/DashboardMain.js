import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { hostUrl } from "../../../../Components/Host";
import HomeTab from "../../../VetClinic/Verified Vet/Dashboard/HomeTab";
import SideNavBarVetDoctor from "../SideNavBarVetDoctor";
import NavBarDoc from "../NavBarDoc";
function DashboardMain() {
  const [user, setuser] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    axios
      .get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setuser(response.data.result[0]);
      });
  }, []);
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
        <SideNavBarVetDoctor active={"dashboard"} />
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
          <NavBarDoc showLogo={true} showHome={true} user={user} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <HomeTab user={"Veterinarian"} userData={user} />
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;
