import React from "react";
import { Container } from "react-bootstrap";
import SideNavBar from "./SideNavBar";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import VerificationTab from "./VerificationTab";
function VerifyContent() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div
      style={{
        marginLeft: 25,
        zoom: value,
      }}
    >
      <div>
        <SideNavBar active={"verify"} />
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
          <NavBarHome />
        </Container>
        <Container>
          <VerificationTab />
        </Container>
      </div>
    </div>
  );
}

export default VerifyContent;
