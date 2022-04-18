import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Row, Col } from "react-bootstrap";

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
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../../Images/logo.png";
// import {
//   messages,
//   numberNewThreads,
//   users,
//   notifAppointment,
//   numberNewAppointment,
// } from "../../../Components/User";
import getUser from "../../../Components/userData";
import {
  dateConvertion,
  timeFormatter,
} from "../../../Components/FormatDateTime";
import { MenuList } from "@material-ui/core";

function NavBarDoc(props) {
  // const [user, setuser] = useState([]);
  // const [numberNewAppoint, setnumberNewAppoint] = useState(0);
  const [user, setuser] = useState([]);
  var token = localStorage.getItem("ajwt");

  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    notifAppointment(userData.vetid);
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
    notifAppointment(user.vetid);
  };
  const notifhandleClose = () => {
    setnotifAnchor(null);
  };

  const logoutUser = () => {
    Axios.delete(`${hostUrl}/logout`, {
      token: localStorage.getItem("rjwt"),
    });

    Axios.put(`${hostUrl}/logout/user/vetclinic/${user.vetid}`);

    Axios.post(`${hostUrl}/vetclinic/verified/logout/system/logs`, {
      name:
        user.vet_doc_fname +
        " " +
        user.vet_doc_mname +
        " " +
        user.vet_doc_lname,
    });
    localStorage.clear();
    window.location.replace("/");
  };

  const [numberNewAppointment, setnumberNewAppointment] = useState(0);

  const notifAppointment = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(
      `${hostUrl}/vetclinic/notification/length/${id}`
    );
    // console.log(result.data);
    setnumberNewAppointment(result.data.view);
  };

  const [notif, setnotif] = useState([]);
  const notifDetails = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/vetclinic/notification/${id}`);
    // console.log(result.data);
    setnotif(result.data);
  };

  // function notifAppointment(id) {
  //   Axios.get(`${hostUrl}/vetclinic/notification/length/${id}`).then(
  //     (response) => {
  //       setnumberNewAppointment(response.data.view);
  //       // alert(response.data.view);
  //     }
  //   );
  // }

  function viewNotif(id) {
    Axios.put(`${hostUrl}/vetclinic/notification/viewed/${id}`);
  }

  const [numberNewThread, setnumberNewThread] = useState(0);

  const notifMessage = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(
      `${hostUrl}/vetadmin/notification/messages/length/${id}`
    );
    // console.log(result.data);
    setnumberNewThread(result.data.view);
  };

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
        <Navbar.Brand href="#home" style={{ color: "white" }}>
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

          <Tooltip title={"Notification"}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              hidden={props.showMessage}
              // onClick={() => {
              //   // viewNotif(user.vetid);
              //   // notifAppointment(user.vetid);
              // }}
              onClick={notifhandleClick}
            >
              <Badge badgeContent={numberNewAppointment} color="error">
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
                              <Row>Service:{val.service_name}</Row>
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
                <h5>No notification</h5>
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
                Axios.put(`${hostUrl}/vetadmin/notification/messages/viewed/${user.vetid}`)
                  .then((response) => {
                    if (response.data.message == 'Correct') {
                      window.location.href = `/talk to vet`;
                    }
                  })
                  ;

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

          <Tooltip
            title={
              user.vet_doc_fname +
              " " +
              user.vet_doc_mname +
              " " +
              user.vet_doc_lname
            }
          >
            <IconButton onClick={handleClick}>
              <Avatar
                round={true}
                size={35}
                style={{
                  marginBottom: 0,
                }}
                src={user.vet_doc_profilePic}
                name={
                  user.vet_doc_fname +
                  " " +
                  user.vet_doc_mname +
                  " " +
                  user.vet_doc_lname
                }
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
                Signed in as <br />{" "}
                <strong>
                  {user.vet_doc_fname +
                    " " +
                    user.vet_doc_mname +
                    " " +
                    user.vet_doc_lname}
                </strong>
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
                  src={user.vet_doc_profilePic}
                  name={
                    user.vet_doc_fname +
                    " " +
                    user.vet_doc_mname +
                    " " +
                    user.vet_doc_lname
                  }
                />
                {/* <Avatar src={user.vet_picture} sizes="" /> */}
                My profile
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  window.location.replace("/veterinarian/settings");
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

export default NavBarDoc;
