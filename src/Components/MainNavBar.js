import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  Image,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/logo.png";
import { Stack } from "@mui/material";
import "../css/Screen.css";

const MainNavBar = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };

  var landingPageButton = {
    backgroundColor: colors.Blue,
    width: 100,
    minWidth: 20,
    borderRadius: 50,
    borderColor: colors.Blue,
    fontWeight: "bold",
  };

  var logocss = {
    width: 50,
    height: 50,
    minWidth: 30,
    minHeight: 30,
  };

  var landingPageName = {
    fontWeight: "bold",
    color: colors.Blue,
  };

  return (
    <Navbar
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.LightBlue,
        width: "100%",
        padding: 20,
      }}
      id="mainNavBar"
      // expand="sm"
    >
      <Navbar.Brand href="/" style={landingPageName}>
        <Image src={logo} style={logocss} /> TERRAVET
      </Navbar.Brand>

      <Stack direction="horizontal" gap={2}>
        <Button
          id="landingPageButton"
          className="mr-3"
          href="/login"
          style={landingPageButton}
        >
          Login
        </Button>
        <Button
          id="landingPageButton"
          href="/register"
          style={landingPageButton}
        >
          Register
        </Button>
      </Stack>
    </Navbar>
  );
};

export default MainNavBar;
