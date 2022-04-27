import PetRecord from "./PetRecord";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import SideNavBarVetDoctor from "../../SideNavBarVetDoctor";
import NavBarDoc from "../../NavBarDoc";
import getUser from "../../../../../Components/userData";
import { Skeleton } from "@mui/material";
function PetPanelTableController() {
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
        <SideNavBarVetDoctor active={"pets"} user={user} />
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
          <NavBarDoc showLogo={true} showHome={true} user={user} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          {/* {user.length == 0 ? (
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          ) : ( */}
          <PetRecord user={user} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default PetPanelTableController;
