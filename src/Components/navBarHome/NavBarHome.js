import React, { useState, useEffect } from "react";
import {
  Navbar,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "../.././css/navBarHome.css";
import { hostUrl } from "../Host";
import logo from "../../Images/logo.png";
import { users } from "../User";
import { Box, Tooltip, IconButton, Menu, Divider, MenuItem, Avatar, Badge } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AiFillCaretDown } from "react-icons/ai";

function NavBarHome(props) {
  const [user, setuser] = useState([]);
  const [userole, setuserole] = useState("");

  var accountImg;
  const [numberNewThread, setnumberNewThread] = useState(0);

  useEffect(() => {
    setuser(users[0]);

    // Axios.get(
    //   `${hostUrl}/petOwner/messages/notification/length/${users[0].pet_owner_id}`
    // ).then((response) => {
    //   setnumberNewThread(response.data.view);
    // });

  }, []);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const logoutUser = () => {
    // axios.delete("http://localhost:3001/logout", {
    //   token: localStorage.getItem("rjwt"),
    // });
    Axios.post(`${hostUrl}/pet_owner/logout/system/logs`, {
      name: user.name,
    });

    localStorage.clear();
    window.location.replace("/");
  };

  const setting = () => {
    if (parseInt(userole) === 1) {
      window.location.replace("/petOwner/settings");
    } else if (parseInt(userole) === 2) {
      window.location.replace("/vet/settings");
    } else if (parseInt(userole) === 3) {
      window.location.replace("/admin/settings");
    }
  };




  function dateConvertion(date) {
    var str = date.split("-");
    var year = str[0];
    var month;
    var day = str[2];

    if (str[1] === "01") {
      month = "January";
    } else if (str[1] === "02") {
      month = "February";
    } else if (str[1] === "03") {
      month = "March";
    } else if (str[1] === "04") {
      month = "April";
    } else if (str[1] === "05") {
      month = "May";
    } else if (str[1] === "06") {
      month = "June";
    } else if (str[1] === "07") {
      month = "July";
    } else if (str[1] === "08") {
      month = "August";
    } else if (str[1] === "09") {
      month = "September";
    } else if (str[1] === "10") {
      month = "October";
    } else if (str[1] === "11") {
      month = "November";
    } else if (str[1] === "12") {
      month = "December";
    }

    return month + " " + day + ", " + year;
  }

  function viewing() {
    Axios.put(`${hostUrl}/petOwner/messages/notification/${user.pet_owner_id}`);
  }
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
      }}
      fixed="top"
    >
      <Navbar.Brand href="/" style={landingPageName}>
        {" "}
        <Image src={logo} style={logocss} /> TERRAVET
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{
          margin: 10,
        }}
      />
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

              <HomeIcon

                style={{
                  color: '#3BD2E3',

                }}
              />

            </IconButton>
          </Tooltip>

          <Tooltip title={"Messages"}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"
              hidden={props.showMessage}
              onClick={() => {
                window.location.href = `/talk to vet`;
              }}
            >
              <Badge badgeContent={numberNewThread} color="error">
                <MessageIcon

                  style={{
                    color: '#3BD2E3',

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
                src={users[0].profilePicture}
                name={users[0].name}
              />
              <AiFillCaretDown style={{
                color: '#3BD2E3',

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
                  src={users[0].profilePicture}
                  name={users[0].name}
                />
                {/* <Avatar src={user.vet_picture} sizes="" /> */}
                My profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => {
                window.location.replace("/vet/settings");
              }}
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

export default NavBarHome;
