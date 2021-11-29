import React, { useState } from "react";
import { Col, Nav, Tab, Row, Alert, Button } from "react-bootstrap";
import VerificationTab from "./VerificationTab";
import VetProfileTab from "./VetProfileTab";
import { GoVerified } from "react-icons/go";
import { MdPets } from "react-icons/md";
import { FaClinicMedical } from "react-icons/fa";
import {
  AiFillSchedule,
  AiFillSecurityScan,
  AiOutlineAudit,
} from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import background from "../../Images/bg.png";

const UnVetVerticableTab = () => {
  var cssLinkDisable = {
    marginLeft: "5%",
    marginBottom: "5%",
    height: "auto",
    display: "inline-block",
  };

  var cssLink = {
    borderLeft: "1px solid white",
    marginLeft: "5%",
    marginBottom: "5%",
    height: "auto",
    display: "inline-block",
  };

  var animation = {
    marginLeft: "5%",
    marginBottom: "5%",
    display: "inline-block",
  };

  var cssLinkTabOne = {
    height: "6vh",
    backgroundColor: "transparent",
    borderTop: "0px solid black",
    borderRight: "0px solid black",
    borderBottom: "0px solid black",
    color: "#57D4FF",
  };

  var cssLinkTabTwo = {
    height: "6vh",
    backgroundColor: "transparent",
    borderTop: "0px solid black",
    borderRight: "0px solid black",
    borderBottom: "0px solid black",
    color: "grey",
  };

  var cssLinkTabDisable = {
    height: "6vh",
    backgroundColor: "transparent",
    borderTop: "0px solid black",
    borderRight: "0px solid black",
    borderBottom: "0px solid black",
    borderLeft: "0px solid black",
    color: "gray",
  };
  var screenh = window.screen.availHeight - 21;
  const [linkStyleOne, setlinkStyleOne] = useState(cssLink);
  const [linkStyleTwo, setlinkStyleTwo] = useState(animation);

  const [linkStyleOneTab, setlinkStyleOneTab] = useState(cssLinkTabOne);
  const [linkStyleTwoTab, setlinkStyleTwoTab] = useState(cssLinkTabTwo);

  const [show, setShow] = useState(false);

  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="vetProfCnt">
        <Row>
          <Col sm="2" className="mt-4" style={{ position: "fixed" }}>
            <div
              style={{
                position: "fixed",
                backgroundColor: "white",
                borderRadius: 50,
                marginTop: 25,
                marginBottom: 20,
                marginLeft: 60,
                marginRight: 60,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <h5
                className="mt-5 ml-4"
                style={{ textAlign: "left", color: "gray" }}
              >
                <strong>Dashboard Pane</strong>
              </h5>
              <Nav
                fill
                variant="tabs"
                className="flex-column mt-3 ml-2"
                style={{
                  width: "15vw",
                  backgroundColor: "transparent",
                  marginBottom: 25,
                }}
              >
                <Nav.Item style={linkStyleOne}>
                  <Nav.Link
                    eventKey="vetProfCnt"
                    style={linkStyleOneTab}
                    onClick={() => {
                      setlinkStyleOne(cssLink);
                      setlinkStyleTwo(animation);
                      setlinkStyleOneTab(cssLinkTabOne);
                      setlinkStyleTwoTab(cssLinkTabTwo);
                    }}
                  >
                    <IoPersonCircleSharp
                      className="mr-3 mt-1 "
                      style={{ fontSize: "200%", float: "left" }}
                    />
                    <h3
                      className="mt-1"
                      style={{ fontSize: "150%", float: "left" }}
                    >
                      Profile
                    </h3>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item style={linkStyleTwo}>
                  <Nav.Link
                    eventKey="verifiedCnt"
                    style={linkStyleTwoTab}
                    onClick={() => {
                      setlinkStyleOne(animation);
                      setlinkStyleTwo(cssLink);
                      setlinkStyleOneTab(cssLinkTabTwo);
                      setlinkStyleTwoTab(cssLinkTabOne);
                    }}
                  >
                    <GoVerified
                      className="mr-3 mt-1"
                      style={{ fontSize: "200%", float: "left" }}
                    />
                    <h3
                      className="mt-1"
                      style={{ fontSize: "150%", float: "left" }}
                    >
                      Verification
                    </h3>
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <h5
                className="mt-2 ml-3"
                style={{ textAlign: "left", color: "gray" }}
              >
                <strong>Activities</strong>
              </h5>
              <Nav
                fill
                variant="tabs"
                className="flex-column mt-3 ml-2"
                style={{ width: "15vw", backgroundColor: "transparent" }}
              >
                <Nav.Item style={cssLinkDisable}>
                  <Nav.Link
                    eventKey="vetProfCnt"
                    style={cssLinkTabDisable}
                    onClick={() => {
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 3000);
                    }}
                  >
                    <MdPets
                      className="mr-3 "
                      style={{ fontSize: "200%", float: "left" }}
                    />
                    <h3 style={{ fontSize: "150%", float: "left" }}>Pets</h3>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item style={cssLinkDisable}>
                  <Nav.Link
                    eventKey="vetProfCnt"
                    style={cssLinkTabDisable}
                    onClick={() => {
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 3000);
                    }}
                  >
                    <FaClinicMedical
                      className="mr-3 "
                      style={{ fontSize: "200%", float: "left" }}
                    />
                    <h3 style={{ fontSize: "150%", float: "left" }}>
                      Vet Clinic
                    </h3>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item style={cssLinkDisable}>
                  <Nav.Link
                    eventKey="vetProfCnt"
                    style={cssLinkTabDisable}
                    onClick={() => {
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 3000);
                    }}
                  >
                    <AiFillSchedule
                      className="mr-3 "
                      style={{ fontSize: "200%", float: "left" }}
                    />
                    <h3 style={{ fontSize: "150%", float: "left" }}>
                      Appointments
                    </h3>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item style={cssLinkDisable}>
                  <Nav.Link
                    eventKey="vetProfCnt"
                    style={cssLinkTabDisable}
                    onClick={() => {
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 3000);
                    }}
                  >
                    <AiOutlineAudit
                      className="mr-3 "
                      style={{ fontSize: "200%", float: "left" }}
                    />
                    <h3 style={{ fontSize: "130%", float: "left" }}>
                      Transaction Logs
                    </h3>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item style={cssLinkDisable}>
                  <Nav.Link
                    eventKey="vetProfCnt"
                    style={cssLinkTabDisable}
                    onClick={() => {
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 3000);
                    }}
                  >
                    <AiFillSecurityScan
                      className="mr-3 "
                      style={{ fontSize: "200%", float: "left" }}
                    />
                    <h3 style={{ fontSize: "120%", float: "left" }}>
                      Visitor Monitoring
                    </h3>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          <Col
            sm={9}
            className="mt-5"
            style={{ borderRadius: 10, marginLeft: 400, height: screenh }}
          >
            <Alert show={show} variant="danger" onClose={() => setShow(false)}>
              <Alert.Heading>Account Not Verified</Alert.Heading>
              <p>
                You need to verify your account to access other feature of
                Terravet. For more information go to Verification tab.
              </p>
            </Alert>
            <Tab.Content>
              <Tab.Pane eventKey="vetProfCnt">
                <VetProfileTab />
              </Tab.Pane>
              <Tab.Pane eventKey="verifiedCnt">
                <VerificationTab />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default UnVetVerticableTab;
