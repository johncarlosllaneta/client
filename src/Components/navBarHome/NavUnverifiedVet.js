import React, { useState, useEffect } from "react";
import { Col, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
import Axios from "axios";
import "../.././css/navBarHome.css";
import { hostUrl } from "../Host";
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
import logo from "../../Images/logo.png";
import getUser from "../userData";


function NavUnverifiedVet(props) {


  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }



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

export default NavUnverifiedVet;
