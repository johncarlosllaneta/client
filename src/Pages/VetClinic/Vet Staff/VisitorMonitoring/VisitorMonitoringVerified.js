import React, { useState, useEffect, useParams } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import HistoryTab from "./HistoryTab";
// import QrCode from "../../Images/qr-code.png";
import QRCode from "qrcode";
import Axios from "axios";
import { hostUrl } from "../../../../Components/Host";
import SideNavBarVetStaff from "../SideNavBarVetStaff";
import NavBarStaff from "../NavBarStaff";
import { Skeleton, useMediaQuery } from "@mui/material";
import getUser from "../../../../Components/userData";

function VisitorMonitoringVerified() {
  // let { vetid } = useParams();
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
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
  }, []);

  useEffect(async () => {
    QRCode.toDataURL(`${user.vetid}`).then(setqrCode);
  }, [user]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
        <SideNavBarVetStaff active={"visitormonitoring"} />
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
          <NavBarStaff showLogo={false} showHome={false} />
        </div>

        {user.length == 0 ? (
          <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
        ) : (
          <div
            style={{
              height: "85%",
              border: "1px",
            }}
          >
            <Row>
              <div style={{ padding: 20, textAlign: "left", color: "#3BD2E3" }}>
                <h1>Visitor Monitoring</h1>
              </div>
            </Row>
            <Row>
              <HistoryTab visitor={user.vetid} />
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default VisitorMonitoringVerified;
