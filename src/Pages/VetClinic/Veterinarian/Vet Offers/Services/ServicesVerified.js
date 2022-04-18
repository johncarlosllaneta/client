import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import ServiceTab from "./ServiceTab";
import NavBarDoc from "../../NavBarDoc";
import SideNavBarVetDoctor from "../../SideNavBarVetDoctor";
import getUser from "../../../../../Components/userData";
import { Skeleton, useMediaQuery } from "@mui/material";
function ServicesVerified() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
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
        {user.length == 0 ? (
          <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
        ) : (
          <div style={{ height: "85%", border: "1px", padding: 5 }}>
            <ServiceTab id={user.vetid} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesVerified;
