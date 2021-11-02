import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import SideNavBar from "./SideNavBar";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import dashboardImage from "../../Images/dashboard.png";
import NavUnverifiedVet from "../../Components/navBarHome/NavUnverifiedVet";
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
    <div style={{ zoom: value }}>
      <div>
        <SideNavBar active={"dashboard"} />
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
          <NavUnverifiedVet />
        </Container>
        <Container>
          <div
            style={{
              backgroundColor: "white",
              padding: 50,
              marginTop: 50,
              marginLeft: 30,
              width: "80vw",
            }}
          >
            <Row>
              <Col>
                <h1
                  style={{
                    color: "#0A94A4",
                    textAlign: "left",
                    marginTop: 190,
                    fontSize: 50,
                  }}
                >
                  Welcome to TerraVet
                </h1>
                <p style={{ textAlign: "left", fontSize: 20 }}>
                  This account belongs to the veterinary clinic.
                  <br />
                  Your account is currently unverified. Verify your account and
                  you will have access to more features and services.
                </p>
              </Col>

              <Col>
                <Image
                  src={dashboardImage}
                  style={{
                    height: 505,
                    marginTop: 30,
                  }}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
