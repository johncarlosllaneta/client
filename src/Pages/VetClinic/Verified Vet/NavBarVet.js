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
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import { MailOutlined } from '@material-ui/icons';
import { AiFillCaretDown } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import logo from "../../../Images/logo.png";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function NavBarVet(props) {
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

      <div
        hidden={props.showLogo}
      >
        <Navbar.Brand
          href="#home"
          style={{ color: 'white' }}
        >

          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            style={{ marginLeft: 10 }}
            className="d-inline-block align-top"
          />{' '}
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
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"
              hidden={props.showHome}
              onClick={() => {
                window.location.href = `/`;
              }}
            >
              <Badge badgeContent={numberNewThread} color="error">
                <HomeIcon

                  style={{
                    color: 'white',

                  }}
                />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={"Messages"}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"
              onClick={() => {
                window.location.href = `/talk to vet`;
              }}
            >
              <Badge badgeContent={numberNewThread} color="error">
                <MessageIcon

                  style={{
                    color: 'white',

                  }}
                />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={user.vet_name}>
            <IconButton onClick={handleClick} >

              <Avatar
                round={true}
                size={35}
                style={{
                  marginBottom: 0
                }}
                src={user.vet_picture}
                name={user.vet_name}
              />
              <AiFillCaretDown style={{
                color: 'white',

              }} size={20} />
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
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

          >
            <div
              style={{
                padding: 10,
                // backgroundColor: 'whitesmoke'
              }}
            >
              <p>Signed in as <br /> <strong>{user.vet_name}</strong></p>
              <Divider />
              <MenuItem
                onClick={() => {
                  window.location.href = `/profile`;
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  marginTop: 10
                }}
              >
                <Avatar
                  round={true}
                  size={15}
                  style={{


                  }}
                  src={user.vet_picture}
                  name={user.vet_name}
                />
                {/* <Avatar src={user.vet_picture} sizes="" /> */}
                My profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={vetSettings}
                style={{
                  display: 'flex',
                  justifyContent: 'start'
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>

              <MenuItem onClick={logoutUser}
                style={{
                  display: 'flex',
                  justifyContent: 'start'
                }}
              >
                <ListItemIcon>
                  {/* <IoLogOut fontSize="large"
                // style={{ marginLeft: 5 }}
                /> */}
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </div>


          </Menu>
        </Box>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default NavBarVet;
