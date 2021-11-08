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
          <NavUnverifiedVet />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <div
            style={{
              padding: 30,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "75vw",
                height: "80vh",
              }}
            >
              <Row>
                <Col>
                  <h1
                    style={{
                      color: "#0A94A4",
                      textAlign: "left",
                      marginTop: 250,
                      fontSize: 50,
                    }}
                  >
                    Welcome to TerraVet
                  </h1>
                  <p style={{ textAlign: "left", fontSize: 20 }}>
                    This account belongs to the veterinary clinic.
                    <br />
                    Your account is currently unverified. Verify your account
                    and you will have access to more features and services.
                  </p>
                </Col>

                <Col>
                  <Image
                    src={dashboardImage}
                    style={{
                      height: 505,
                      marginTop: 100,
                    }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
