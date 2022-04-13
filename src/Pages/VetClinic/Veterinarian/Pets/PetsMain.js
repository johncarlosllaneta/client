import React, { useState, useEffect, useParams } from "react";
import NavBarDoc from "../NavBarDoc";
import SideNavBarVetDoctor from "../SideNavBarVetDoctor";
import PetsPage from "./Widgets/PetsPage";
import getUser from "../../../../Components/userData";
import { Skeleton, useMediaQuery } from "@mui/material";
function PetsMain() {
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
        <SideNavBarVetDoctor active={"pets"} />
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
        {user.length == 0 ? (
          <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
        ) : (
          <div style={{ height: "85%", border: "1px", padding: 5 }}>
            <PetsPage user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PetsMain;
