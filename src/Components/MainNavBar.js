import React from "react";
import { Navbar, Form, FormControl, Button, Nav, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/logo.png";

const MainNavBar = () => {
  var colors = {
    Blue: "#3BD2E3",
    LightBlue: "#F1F9FC",
  };

  var landingPageButton = {
    backgroundColor: colors.Blue,
    width: 100,
    borderRadius: 50,
    borderColor: colors.Blue,
    fontWeight: "bold",
  };

  var logocss = {
    width: 50,
    height: 50,
  };

  var landingPageName = {
    fontWeight: "bold",
    color: colors.Blue,
  };

  return (
    <Navbar
      expand="lg"
      style={{
        justifyContent: "space-between",
        height: 100,
        backgroundColor: colors.LightBlue,
        width: "100%",
        padding: 20,
      }}
    >
      <Navbar.Brand href="/" style={landingPageName}>
        <Image src={logo} style={logocss} /> TERRAVET
      </Navbar.Brand>

      <Nav style={{ columnGap: 20 }}>
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
      </Nav>
    </Navbar>
  );
};

export default MainNavBar;
