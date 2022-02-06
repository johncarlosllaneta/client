import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { BsChatDotsFill } from "react-icons/bs";
import Axios from "axios";
import "../../../css/navBarHome.css";
import { hostUrl } from "../../../Components/Host";
import Avatar from "react-avatar";

import {
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { MailOutlined, Settings } from "@material-ui/icons";
import { AiFillCaretDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
function NavBarDoc() {
  const [user, setuser] = useState([]);
  const [userole, setuserole] = useState("");
  const [counter, setcounter] = useState(0);
  const [numberNewThread, setnumberNewThread] = useState(0);
  var name;
  // var toast;
  var accountImg;
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    var roles = localStorage.getItem("role");

    setuserole(roles);
    // alert(userole);

    if (counter < 6) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });

      Axios.get(
        `${hostUrl}/vetclinic/messages/notification/length/${user.vetid}`
      ).then((response) => {
        setnumberNewThread(response.data.view);
        // alert(response.data.view);
      });
      setcounter(counter + 1);
    }
  }, [user]);

  if (parseInt(userole) === 1) {
    name = (
      <div style={{ display: "inline-flex" }}>
        <Avatar
          round={true}
          size={50}
          style={{
            marginTop: 10,
          }}
          src={user.profilePicture}
          name={user.name}
        />

        <p
          style={{
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          {" "}
          {user.name}
          <br />{" "}
          <p
            style={{
              fontSize: 12,
              color: "#3BD2E3",
              marginTop: -5,
              textAlign: "left",
            }}
          >
            Pet Owner
          </p>
        </p>
      </div>
    );
  } else if (parseInt(userole) === 2) {
    name = (
      <div style={{ display: "inline-flex" }}>
        <Avatar
          round={true}
          size={50}
          style={{
            marginTop: 10,
          }}
          src={user.vet_picture}
          name={user.vet_name}
        />

        <p
          style={{
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          {" "}
          {user.vet_name}
          <br />{" "}
          <p
            style={{
              fontSize: 12,
              color: "#3BD2E3",
              marginTop: -5,
              textAlign: "left",
            }}
          >
            Vet Clinic
          </p>
        </p>
      </div>
    );
  } else if (parseInt(userole) === 3) {
    name = (
      <div style={{ display: "inline-flex" }}>
        <Avatar
          round={true}
          size={50}
          style={{
            marginTop: 10,
          }}
          src={user.profilePicture}
          name={user.name}
        />

        <p
          style={{
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          {" "}
          {user.name}
          <br />{" "}
          <p
            style={{
              fontSize: 12,
              color: "#3BD2E3",
              marginTop: -5,
              textAlign: "left",
            }}
          >
            System Admin
          </p>
        </p>
      </div>
    );
  } else if (parseInt(userole) === 4) {
    name = (
      <div style={{ display: "inline-flex" }}>
        <Avatar
          round={true}
          size={50}
          style={{
            marginTop: 10,
          }}
          src={user.profilePicture}
          name={user.vet_doc_fname}
        />

        <p
          style={{
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          {" "}
          {user.vet_doc_fname}
          <br />{" "}
          <p
            style={{
              fontSize: 12,
              color: "#3BD2E3",
              marginTop: -5,
              textAlign: "left",
            }}
          >
            Veterinarian
          </p>
        </p>
      </div>
    );
  } else if (parseInt(userole) === 5) {
    name = (
      <div style={{ display: "inline-flex" }}>
        <Avatar
          round={true}
          size={50}
          style={{
            marginTop: 10,
          }}
          src={user.vet_staff_profilePic}
          name={
            user.vet_staff_fname
            // user.vet_staff_fname + user.vet_staff_lname + user.vet_staff_mname
          }
        />

        <p
          style={{
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          {" "}
          {user.vet_staff_fname}
          <br />{" "}
          <p
            style={{
              fontSize: 12,
              color: "#3BD2E3",
              marginTop: -5,
              textAlign: "left",
            }}
          >
            Staff
          </p>
        </p>
      </div>
    );
  }

  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };

  var logocss = {
    width: 50,
    height: 50,
  };

  var landingPageName = {
    fontWeight: "bold",
    color: colors.Blue,
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    Axios.delete("http://localhost:3001/logout", {
      token: localStorage.getItem("rjwt"),
    });

    Axios.post(`${hostUrl}/vetclinic/verified/logout/system/logs`, {
      name: user.vet_name,
    });
    localStorage.clear();
    window.location.replace("/");
  };

  const vetSettings = () => {
    // axios.delete("http://localhost:3001/logout", {
    //   token: localStorage.getItem("rjwt"),
    // });
    if (parseInt(userole) === 1) {
      window.location.replace("/petOwner/settings");
    } else if (parseInt(userole) === 2) {
      window.location.replace("/vet/settings");
    } else if (parseInt(userole) === 3) {
      window.location.replace("/admin/settings");
    } else if (parseInt(userole) === 4) {
      window.location.replace("/admin/settings");
    } else if (parseInt(userole) === 5) {
      window.location.replace("/admin/settings");
    }
  };

  const [show, setShow] = useState(true);

  var circleAvatar = accountImg;

  function viewing() {
    Axios.put(`${hostUrl}/vetclinic/messages/notification/${user.vetid}`);
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
      <Navbar.Collapse
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "end",
          margin: 0,
          padding: 0,
        }}
      >
        {/* <NavDropdown
          style={{ fontSize: 20, marginRight: 50, margin: 0 }}
          title={name}
        >
          <NavDropdown.Item onClick={vetSettings}>Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
        </NavDropdown> */}

        <Box sx={{ flexGrow: 0, paddingTop: 0 }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {
              window.location.href = `/talk to vet`;
            }}
          >
            <Badge badgeContent={numberNewThread} color="error">
              <MailOutlined
                style={{
                  color: "white",
                }}
              />
            </Badge>
          </IconButton>
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
                  width: 50,
                  height: 35,
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
                backgroundColor: "whitesmoke",
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
            </div>
            <Divider />
            <MenuItem
              style={{
                backgroundColor: "whitesmoke",
              }}
            >
              <Avatar
                round={true}
                size={25}
                style={{
                  marginBottom: 0,
                  marginRight: 25,
                }}
                src={user.vet_doc_profilePic}
                name={
                  user.vet_doc_fname +
                  " " +
                  user.vet_doc_mname +
                  " " +
                  user.vet_doc_lname
                }
              />{" "}
              My profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={vetSettings}
              style={{
                backgroundColor: "whitesmoke",
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
                backgroundColor: "whitesmoke",
              }}
            >
              <ListItemIcon>
                <IoLogOut fontSize="large" style={{ marginLeft: 5 }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarDoc;
