import React, { useState, useEffect } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import SideNavbarVerified from "./SideNavbarVerified";
import HistoryTab from "./HistoryTab";
// import QrCode from "../../Images/qr-code.png";
import NavBarVet from "./NavBarVet";
import QRCode from "qrcode";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";

function VisitorMonitoringVerified() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  const [user, setuser] = useState([]);
  const [qrCode, setqrCode] = useState("");
  const [vetName, setvetName] = useState();

  const [counter, setcounter] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 2) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
      });
      setcounter(counter + 1);
    }
  }, [user]);

  useEffect(() => {
    QRCode.toDataURL(`${user.vetid}`).then(setqrCode);
  }, [user]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div style={{ zoom: value }}>
      <div>
        <SideNavbarVerified active={"visitormonitoring"} />
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
        <Container
          style={{
            borderRadius: 30,
            backgroundColor: "#FFFFFF",
            height: 740,
            maxWidth: "100%",
            margin: 10,
            paddingLeft: 300,
          }}
        >
          <Row>
            <div style={{ padding: 20, textAlign: "left", color: "#3BD2E3" }}>
              <h1>Visitor Monitoring</h1>
            </div>
          </Row>
          <Row>
            <Col
              sm="5"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: 20,
              }}
            >
              <Image
                src={qrCode}
                alt={"QrCode"}
                style={{ height: 350, maxWidth: "100%" }}
              />

              <Button
                style={{
                  backgroundColor: "#3BD2E3",
                  borderRadius: 30,
                  paddingLeft: 40,
                  paddingRight: 40,
                  borderColor: "#FFFFFF",
                }}
                download
                href={qrCode}
              >
                Download
              </Button>
            </Col>
            <Col sm="7">
              <HistoryTab />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default VisitorMonitoringVerified;
