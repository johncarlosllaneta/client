import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import SideNavBar from "./SideNavBar";
import NavBarHome from "../../../Components/navBarHome/NavBarHome";
import dashboardImage from "../../../Images/dashboard.png";
import NavUnverifiedVet from "../../../Components/navBarHome/NavUnverifiedVet";
import { Button } from "@mui/material";
import DashboardContent from "./Dashboard/DashboardContent";
function Dashboard() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
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
        <SideNavBar active={"dashboard"} />
      </div>

      <DashboardContent />
    </div>
  );
}

export default Dashboard;
