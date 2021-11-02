import React, { useState, useEffect } from "react";
import { Col, Nav, Tab, Row, Dropdown } from "react-bootstrap";
import { BsHouseDoorFill } from "react-icons/bs";
import { MdPets } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import PetHistory from "./PetHistory";
import PetMyCart from "./PetMyCart";
import PetAppointment from "./PetAppointment";
import PetOwnerPets from "./PetOwnerPets";
import PetProfile from "./PetProfile";
import TabHome from "./TabHome";
import PetTracing from "./PetTracing";
import { BiScan } from "react-icons/bi";
import { AiFillSchedule, AiOutlineAudit } from "react-icons/ai";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";

const PetOwnerVertical = () => {
  const [user, setuser] = useState([]);

  useEffect(() => {
    if (user.length === 0) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });
    }
  }, [user]);

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
  var screenh = window.screen.availHeight - 21;

  const [linkStyleOne, setlinkStyleOne] = useState(cssLink);
  const [linkStyleTwo, setlinkStyleTwo] = useState(animation);
  const [linkStyleThree, setlinkStyleThree] = useState(animation);
  const [linkStyleFourth, setlinkStyleFourth] = useState(animation);
  const [linkStyleFifth, setlinkStyleFifth] = useState(animation);
  const [linkStyleSixth, setlinkStyleSixth] = useState(animation);
  const [linkStyleSeven, setlinkStyleSeven] = useState(animation);

  const [linkStyleOneTab, setlinkStyleOneTab] = useState(cssLinkTabOne);
  const [linkStyleTwoTab, setlinkStyleTwoTab] = useState(cssLinkTabTwo);
  const [linkStyleThreeTab, setlinkStyleThreeTab] = useState(cssLinkTabTwo);
  const [linkStyleFourthTab, setlinkStyleFourthTab] = useState(cssLinkTabTwo);
  const [linkStyleFifthTab, setlinkStyleFifthTab] = useState(cssLinkTabTwo);
  const [linkStyleSixthTab, setlinkStyleSixthTab] = useState(cssLinkTabTwo);
  const [linkStyleSevenTab, setlinkStyleSevenTab] = useState(cssLinkTabTwo);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="homeCnt">
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
            <Nav
              fill
              variant="tabs"
              className="flex-column mt-5 ml-2"
              style={{
                width: "15vw",
                backgroundColor: "transparent",
                marginBottom: 120,
              }}
            >
              <Nav.Item style={linkStyleOne}>
                <Nav.Link
                  eventKey="homeCnt"
                  style={linkStyleOneTab}
                  onClick={() => {
                    setlinkStyleOne(cssLink);
                    setlinkStyleTwo(animation);
                    setlinkStyleThree(animation);
                    setlinkStyleFourth(animation);
                    setlinkStyleFifth(animation);
                    setlinkStyleSixth(animation);
                    setlinkStyleSeven(cssLink);

                    setlinkStyleOneTab(cssLinkTabOne);
                    setlinkStyleTwoTab(cssLinkTabTwo);
                    setlinkStyleThreeTab(cssLinkTabTwo);
                    setlinkStyleFourthTab(cssLinkTabTwo);
                    setlinkStyleFifthTab(cssLinkTabTwo);
                    setlinkStyleSixthTab(cssLinkTabTwo);
                    setlinkStyleSevenTab(cssLinkTabTwo);
                  }}
                >
                  <BsHouseDoorFill
                    className="mr-3 mt-1"
                    style={{ fontSize: "200%", float: "left" }}
                  />
                  <h3
                    className="mt-1"
                    style={{ fontSize: "150%", float: "left" }}
                  >
                    Home
                  </h3>
                </Nav.Link>
              </Nav.Item>

              {/* <Nav.Item style={linkStyleTwo}>
                <Nav.Link
                  eventKey="profCnt"
                  style={linkStyleTwoTab}
                  onClick={() => {
                    setlinkStyleOne(cssLink);
                    setlinkStyleTwo(animation);
                    setlinkStyleThree(cssLink);
                    setlinkStyleFourth(cssLink);
                    setlinkStyleFifth(cssLink);
                    setlinkStyleSixth(cssLink);
                    setlinkStyleSeven(cssLink);

                    setlinkStyleOneTab(cssLinkTabTwo);
                    setlinkStyleTwoTab(cssLinkTabOne);
                    setlinkStyleThreeTab(cssLinkTabTwo);
                    setlinkStyleFourthTab(cssLinkTabTwo);
                    setlinkStyleFifthTab(cssLinkTabTwo);
                    setlinkStyleSixthTab(cssLinkTabTwo);
                    setlinkStyleSevenTab(cssLinkTabTwo);
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
              </Nav.Item> */}

              <Nav.Item style={linkStyleThree}>
                <Nav.Link
                  eventKey="petsCnt"
                  style={linkStyleThreeTab}
                  onClick={() => {
                    setlinkStyleOne(animation);
                    setlinkStyleTwo(animation);
                    setlinkStyleThree(cssLink);
                    setlinkStyleFourth(animation);
                    setlinkStyleFifth(animation);
                    setlinkStyleSixth(animation);
                    setlinkStyleSeven(cssLink);

                    setlinkStyleOneTab(cssLinkTabTwo);
                    setlinkStyleTwoTab(cssLinkTabTwo);
                    setlinkStyleThreeTab(cssLinkTabOne);
                    setlinkStyleFourthTab(cssLinkTabTwo);
                    setlinkStyleFifthTab(cssLinkTabTwo);
                    setlinkStyleSixthTab(cssLinkTabTwo);
                    setlinkStyleSevenTab(cssLinkTabTwo);
                  }}
                >
                  <MdPets
                    className="mr-3 "
                    style={{ fontSize: "200%", float: "left" }}
                  />
                  <h3 style={{ fontSize: "150%", float: "left" }}>Pets</h3>
                </Nav.Link>
              </Nav.Item>

              <Dropdown.Divider />

              <h5
                className="mt-2 ml-2"
                style={{ textAlign: "left", color: "gray" }}
              >
                Activities
              </h5>

              <Nav.Item style={linkStyleFourth}>
                <Nav.Link
                  eventKey="appointCnt"
                  style={linkStyleFourthTab}
                  onClick={() => {
                    setlinkStyleOne(animation);
                    setlinkStyleTwo(animation);
                    setlinkStyleThree(animation);
                    setlinkStyleFourth(cssLink);
                    setlinkStyleFifth(animation);
                    setlinkStyleSixth(animation);
                    setlinkStyleSeven(cssLink);

                    setlinkStyleOneTab(cssLinkTabTwo);
                    setlinkStyleTwoTab(cssLinkTabTwo);
                    setlinkStyleThreeTab(cssLinkTabTwo);
                    setlinkStyleFourthTab(cssLinkTabOne);
                    setlinkStyleFifthTab(cssLinkTabTwo);
                    setlinkStyleSixthTab(cssLinkTabTwo);
                    setlinkStyleSevenTab(cssLinkTabTwo);
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

              <Nav.Item style={linkStyleFifth}>
                <Nav.Link
                  eventKey="cartCnt"
                  style={linkStyleFifthTab}
                  onClick={() => {
                    setlinkStyleOne(animation);
                    setlinkStyleTwo(animation);
                    setlinkStyleThree(animation);
                    setlinkStyleFourth(animation);
                    setlinkStyleFifth(cssLink);
                    setlinkStyleSixth(animation);
                    setlinkStyleSeven(cssLink);

                    setlinkStyleOneTab(cssLinkTabTwo);
                    setlinkStyleTwoTab(cssLinkTabTwo);
                    setlinkStyleThreeTab(cssLinkTabTwo);
                    setlinkStyleFourthTab(cssLinkTabTwo);
                    setlinkStyleFifthTab(cssLinkTabOne);
                    setlinkStyleSixthTab(cssLinkTabTwo);
                    setlinkStyleSevenTab(cssLinkTabTwo);
                  }}
                >
                  <FaShoppingCart
                    className="mr-3 "
                    style={{ fontSize: "200%", float: "left" }}
                  />
                  <h3 style={{ fontSize: "150%", float: "left" }}>My Cart</h3>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item style={linkStyleSixth}>
                <Nav.Link
                  eventKey="historyCnt"
                  style={linkStyleSixthTab}
                  onClick={() => {
                    setlinkStyleOne(animation);
                    setlinkStyleTwo(animation);
                    setlinkStyleThree(animation);
                    setlinkStyleFourth(animation);
                    setlinkStyleFifth(animation);
                    setlinkStyleSixth(cssLink);
                    setlinkStyleSeven(cssLink);

                    setlinkStyleOneTab(cssLinkTabTwo);
                    setlinkStyleTwoTab(cssLinkTabTwo);
                    setlinkStyleThreeTab(cssLinkTabTwo);
                    setlinkStyleFourthTab(cssLinkTabTwo);
                    setlinkStyleFifthTab(cssLinkTabTwo);
                    setlinkStyleSixthTab(cssLinkTabOne);
                    setlinkStyleSevenTab(cssLinkTabTwo);
                  }}
                >
                  <AiOutlineAudit
                    className="mr-3 "
                    style={{ fontSize: "200%", float: "left" }}
                  />
                  <h3 style={{ fontSize: "150%", float: "left" }}>History</h3>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item style={linkStyleSeven}>
                <Nav.Link
                  eventKey="cntTracCnt"
                  style={linkStyleSevenTab}
                  onClick={() => {
                    setlinkStyleOne(animation);
                    setlinkStyleTwo(animation);
                    setlinkStyleThree(animation);
                    setlinkStyleFourth(animation);
                    setlinkStyleFifth(animation);
                    setlinkStyleSixth(animation);
                    setlinkStyleSeven(cssLink);

                    setlinkStyleOneTab(cssLinkTabTwo);
                    setlinkStyleTwoTab(cssLinkTabTwo);
                    setlinkStyleThreeTab(cssLinkTabTwo);
                    setlinkStyleFourthTab(cssLinkTabTwo);
                    setlinkStyleFifthTab(cssLinkTabTwo);
                    setlinkStyleSixthTab(cssLinkTabTwo);
                    setlinkStyleSevenTab(cssLinkTabOne);
                  }}
                >
                  <BiScan
                    className="mr-3 "
                    style={{ fontSize: "200%", float: "left" }}
                  />
                  <h3 style={{ fontSize: "150%", float: "left" }}>
                    Contact Tracing
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
          <Tab.Content>
            <Tab.Pane eventKey="homeCnt">
              <TabHome data={user} />
            </Tab.Pane>
            <Tab.Pane eventKey="profCnt">
              <PetProfile data={user} />
            </Tab.Pane>
            <Tab.Pane eventKey="petsCnt">
              <PetOwnerPets data={user} />
            </Tab.Pane>
            <Tab.Pane eventKey="appointCnt">
              <PetAppointment data={user} />
            </Tab.Pane>
            <Tab.Pane eventKey="cartCnt">
              <PetMyCart data={user} />
            </Tab.Pane>
            <Tab.Pane eventKey="historyCnt">
              <PetHistory data={user} />
            </Tab.Pane>
            <Tab.Pane eventKey="cntTracCnt">
              <PetTracing data={user} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default PetOwnerVertical;
