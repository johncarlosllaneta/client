import React, { useState, useEffect } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";

import HistoryTab from "./HistoryTab";
// import QrCode from "../../Images/qr-code.png";
import NavBarVet from "../NavBarVet";
import QRCode from "qrcode";
import Axios from "axios";
import { hostUrl } from "../../../../Components/Host";
import SideNavBarVetAdmin from "../SideNavBarVetAdmin";
import { users } from "../../../../Components/User";
import VisitorMonitoringHeader from "./VisitorMonitoringHeader";
import getUser from "../../../../Components/userData";
import { Skeleton } from "@mui/material";

function VisitorMonitoringVerified() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  const [qrCode, setqrCode] = useState("");
  const [vetName, setvetName] = useState();

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    QRCode.toDataURL(`${userData.vetid}`).then(setqrCode);
  }, []);



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
        <SideNavBarVetAdmin active={"visitormonitoring"} />
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
          <NavBarVet showLogo={true} showHome={true} />
        </div>
        <div
          style={{
            height: "85%",
            border: "1px",
            padding: 20,
          }}
        >
          <VisitorMonitoringHeader />
          {user.length == 0 ?
            <Skeleton variant="rectangular" height={'50vh'} width={'100%'} />
            : <HistoryTab user={user} />
          }

        </div>
      </div>
    </div>
  );
}

export default VisitorMonitoringVerified;
