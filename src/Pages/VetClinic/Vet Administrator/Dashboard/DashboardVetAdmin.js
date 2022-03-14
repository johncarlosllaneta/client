import axios from "axios";
import React, { useState, useEffect } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { hostUrl } from "../../../../Components/Host";
import HomeTab from "../../Verified Vet/Dashboard/HomeTab";
import NavBarVet from "../NavBarVet";
import SideNavBarVetAdmin from "../SideNavBarVetAdmin";

function DashboardVetAdmin() {
  const [user, setuser] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    axios
      .get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
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
        <SideNavBarVetAdmin active={"dashboard"} />
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
          <NavBarVet showLogo={true} showHome={true} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <HomeTab user={"Vet Admin"} userData={user} />
        </div>
      </div>
    </div>
  );
}

export default DashboardVetAdmin;
