import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PetsTable from "./PetsTable";
import NavBarVet from '../NavBarVet';
import SideNavBarVetAdmin from "../SideNavBarVetAdmin";
import axios from "axios";
import { hostUrl } from "../../../../Components/Host";

function PetsVerified() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  const [user, setuser] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    axios.get(`${hostUrl}/home`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      console.log(response.data.result[0]);
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
        <SideNavBarVetAdmin active={"pets"} user={user} />
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
          <NavBarVet showLogo={true} showHome={true} user={user} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <PetsTable user={user} />
        </div>
      </div>
    </div>
  );
}

export default PetsVerified;
