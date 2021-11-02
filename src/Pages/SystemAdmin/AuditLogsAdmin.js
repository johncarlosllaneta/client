import React from "react";
import { Container } from "react-bootstrap";
import NavBarAdmin from "./NavBarAdmin";
import History from "./History";
import SideNavBar from "./SideNavBar";

function AuditLogsAdmin() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div style={{ zoom: value }}>
      <div>
        <SideNavBar active={"auditlogs"} />
      </div>

      <div
        style={{
          backgroundColor: "#F1F9FC",
          height: "100vh",
        }}
      >
        <Container
          style={{
            padding: 0,
          }}
        >
          <NavBarAdmin />
        </Container>
        <Container>
          <History />
        </Container>
      </div>
    </div>
  );
}

export default AuditLogsAdmin;
