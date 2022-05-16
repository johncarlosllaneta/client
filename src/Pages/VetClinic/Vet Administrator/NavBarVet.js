import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Row, Col, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { BsChatDotsFill } from "react-icons/bs";
import Axios from "axios";
import "../../../css/navBarHome.css";
import { hostUrl } from "../../../Components/Host";
// import Avatar from "react-avatar";

// import { Badge, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@material-ui/core";
// import { MailOutlined, Settings } from "@material-ui/icons";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import { MailOutlined } from "@material-ui/icons";
import { AiFillCaretDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import logo from "../../../Images/logo.png";
import { messages, numberNewThreads, users } from "../../../Components/User";
import getUser from "../../../Components/userData";
import { MenuList } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { dateConvertion } from "../../../Components/FormatDateTime";

function NavBarVet(props) {
  // const [user, setuser] = useState([]);
  const [numberNewThread, setnumberNewThread] = useState(0);
  const [user, setuser] = useState([]);
  var token = localStorage.getItem("ajwt");

  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    messages(userData);

    notifReserved(userData.vetid);
    notifDetails(userData.vetid);
    notifMessage(userData.vetid);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notifAnchor, setnotifAnchor] = React.useState(null);
  const openNotif = Boolean(notifAnchor);
  const notifhandleClick = (event) => {
    setnotifAnchor(event.currentTarget);
    viewNotif(user.vetid);
    notifReserved(user.vetid);
  };
  const notifhandleClose = () => {
    setnotifAnchor(null);
  };

  const logoutUser = () => {
    Axios.put(`${hostUrl}/logout/user/vetclinic/${user.vetid}`).then(
      (response) => {
        if (response.data.message == "Success") {
          Axios.post(`${hostUrl}/vetclinic/verified/logout/system/logs`, {
            name: user.vet_name,
          });
          Axios.delete(`${hostUrl}/logout`, {
            token: localStorage.getItem("rjwt"),
          });
          localStorage.clear();
          window.location.replace("/");
        }
      }
    );
  };

  const [numberNewReserved, setnumberNewReserved] = useState(0);

  const notifReserved = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(
      `${hostUrl}/vetadmin/notification/length/${id}`
    );
    // console.log(result.data);
    setnumberNewReserved(result.data.view);
  };

  const [notif, setnotif] = useState([]);
  const notifDetails = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/vetadmin/notification/${id}`);
    // console.log(result.data);
    setnotif(result.data);
  };

  function viewNotif(id) {
    Axios.put(`${hostUrl}/vetadmin/notification/viewed/${id}`);
  }

  const notifMessage = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(
      `${hostUrl}/vetadmin/notification/messages/length/${id}`
    );
    // console.log(result.data);
    setnumberNewThread(result.data.view);
  };

  function timeFormatter(time) {
    var timeCurrent = time.split(":");
    if (timeCurrent[0] === "16") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "17") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "18") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "19") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "20") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "21") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "22") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "23") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "24") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "01") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "02") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "03") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "04") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "05") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "06") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "07") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "08") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "09") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "10") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "11") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "12") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "13") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "14") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "15") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    }
  }

  return (
    <Navbar
      expand="sm"
      style={{
        backgroundColor: "#354A5F",
        padding: 0,
        width: "inherit",
      }}
    >
      <div hidden={props.showLogo}>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            style={{ marginLeft: 10 }}
            className="d-inline-block align-top"
          />{" "}
          TERRAVET
        </Navbar.Brand>
      </div>

      <Navbar.Collapse
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "end",
          margin: 0,
          padding: 0,
        }}
      >
        <Box sx={{ flexGrow: 0, paddingTop: 0 }}>
          <Tooltip title={"Home"}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              hidden={props.showHome}
              onClick={() => {
                window.location.href = `/`;
              }}
            >
              <HomeIcon
                style={{
                  color: "white",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* notification */}
          <Tooltip title={"Notification"}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              hidden={props.showMessage}
              // onClick={() => {
              //   window.location.href = `/talk to vet`;
              // }}
              onClick={notifhandleClick}
            >
              <Badge badgeContent={numberNewReserved} color="error">
                <NotificationsIcon
                  style={{
                    color: "white",
                  }}
                />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notifAnchor}
            id="notif-menu"
            open={openNotif}
            onClose={notifhandleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Container
              style={{
                textAlign: "center",
              }}
            >
              <h6 style={{}}>Notification</h6> <hr style={{ marginTop: 0 }} />
            </Container>
            <div style={{ height: 400, width: 400, overflowY: "auto" }}>
              {notif.length > 0 ? (
                notif.map((val) => {
                  return (
                    <MenuList>
                      <Row style={{ width: 380 }}>
                        <div style={{ paddingRight: 20, paddingLeft: 30 }}>
                          <Row>
                            <Col>
                              <text>
                                {dateConvertion(
                                  val.date_time_created.toString().split("T")[0]
                                )}
                              </text>
                            </Col>
                            <Col>
                              <text style={{ float: "right" }}>
                                {timeFormatter(
                                  val.date_time_created
                                    .toString()
                                    .split("T")[1]
                                    .substring(
                                      0,
                                      val.date_time_created
                                        .toString()
                                        .split("T")[1].length - 5
                                    )
                                )}
                              </text>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              sm={3}
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              <Avatar
                                round={true}
                                size={60}
                                src={val.profilePicture}
                                name={val.name}
                              />
                            </Col>
                            <Col sm={9}>
                              <Row>Name:{val.name}</Row>
                              <Row>{val.category}</Row>
                              <Row>Status:{val.status}</Row>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                      <Divider />
                    </MenuList>
                  );
                })
              ) : (
                <h5></h5>
              )}
            </div>
          </Menu>

          <Tooltip title={"Messages"}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              hidden={props.showMessage}
              onClick={() => {
                Axios.put(
                  `${hostUrl}/vetadmin/notification/messages/viewed/${user.vetid}`
                ).then((response) => {
                  if (response.data.message == "Correct") {
                    window.location.href = `/talk to vet`;
                  }
                });
              }}
            >
              <Badge badgeContent={numberNewThread} color="error">
                <MessageIcon
                  style={{
                    color: "white",
                  }}
                />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={user.vet_name}>
            <IconButton onClick={handleClick}>
              <Avatar
                round={true}
                size={35}
                style={{
                  marginBottom: 0,
                }}
                src={user.vet_picture}
                name={user.vet_name}
              />
              <AiFillCaretDown
                style={{
                  color: "white",
                }}
                size={20}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div
              style={{
                padding: 10,
                // backgroundColor: 'whitesmoke'
              }}
            >
              <p>
                Signed in as <br /> <strong>{user.vet_name}</strong>
              </p>
              <Divider />
              <MenuItem
                onClick={() => {
                  window.location.href = `/profile`;
                }}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginTop: 10,
                }}
              >
                <Avatar
                  round={true}
                  size={15}
                  style={{}}
                  src={user.vet_picture}
                  name={user.vet_name}
                />
                {/* <Avatar src={user.vet_picture} sizes="" /> */}
                My profile
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  window.location.replace("/vet/settings");
                }}
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>

              <MenuItem
                onClick={logoutUser}
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>
          </Menu>
        </Box>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarVet;
