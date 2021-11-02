import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import background from "../../Images/bg.png";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Avatar from "react-avatar";
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../Components/Host";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useParams } from "react-router";
import VetDetailsTab from "./VetDetailsTab";
import { AiFillSchedule } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import VetOffers from "./VetOffers";
import TransactionHistory from "./TransactionHistory";

function VetInformation() {
  let { email } = useParams();
  const [counter, setcounter] = useState(0);
  const [vet_clinic, setvet_clinic] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/vet-details/${email}`).then((response) => {
        setvet_clinic(response.data[0]);
      });
      setcounter(counter + 1);

      // alert(vet_clinic.vet_permit);
    }
  }, [vet_clinic]);

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var values;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    values = "80%";
  } else {
    values = "100%";
  }

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
        padding: 20,
        height: "auto",
        zoom: values,
      }}
    >
      <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Business Permit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "auto", height: "auto" }}>
          <Container></Container>
        </Modal.Body>
      </Modal>
      <div>
        <Container
          style={{
            height: "auto",
            maxWidth: "100%",
            borderRadius: 30,
            backgroundColor: "#FFFFFF",
            padding: 20,
          }}
        >
          <Row>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <a
                style={{ textDecoration: "none", fontSize: 20 }}
                href="/vet&clinic/verified"
              >
                <IoChevronBack />
                Return
              </a>
            </div>
          </Row>
          <Row>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "#696969",
                    margin: 20,
                  }}
                >
                  Vet Profile
                </h2>
                <BsFillInfoCircleFill style={{ fontSize: 40, margin: 20 }} />
              </div>
              <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Container
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: 30,
                    height: 150,
                    maxWidth: "100%",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={vet_clinic.vet_picture}
                    name={vet_clinic.vet_name}
                    roundedCircle
                    style={{ height: 100, width: 100 }}
                  />
                  <div style={{ textAlign: "left", marginLeft: 10 }}>
                    <h3 style={{ color: "#8A8A8A", fontWeight: "bold" }}>
                      {vet_clinic.vet_name}
                    </h3>
                    <h5 style={{ color: "#19B9CC", fontWeight: "bold" }}>
                      Vet Clinic
                    </h5>
                  </div>

                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "50vw",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "end",
                    }}
                  >
                    <Button
                      className="mt-2 ml-5"
                      style={{ display: "flex", width: 200 }}
                      onClick={() => {
                        // setShow(true);
                        window.open(vet_clinic.vet_permit, "_blank").focus();
                      }}
                      variant="primary"
                    >
                      <CgFileDocument
                        style={{ fontSize: 20, marginRight: 10 }}
                      />{" "}
                      View Permit
                    </Button>
                  </div>
                </Container>

                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="wrapped label tabs example"
                        indicatorColor={"primary"}
                      >
                        <Tab wrapped label="Information" value="1" />
                        <Tab wrapped label="Vet Offers" value="2" />
                        <Tab wrapped label="Transaction History" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <VetDetailsTab email={email} />
                    </TabPanel>
                    <TabPanel value="2">
                      <VetOffers email={email} />
                    </TabPanel>
                    <TabPanel value="3">
                      <TransactionHistory email={email} />
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default VetInformation;
