import React from "react";
import { Container } from "react-bootstrap";
import HomeTab from "./HomeTab";
import SideNavbarVerified from "./SideNavbarVerified";
import NavBarVet from "./NavBarVet";

function HomeTabContent() {
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
        <SideNavbarVerified active={"dashboard"} />
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
          <NavBarVet />
        </Container>
        <Container>
          <HomeTab />
        </Container>
      </div>
    </div>
  );
}

export default HomeTabContent;
