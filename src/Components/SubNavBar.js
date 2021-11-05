import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashLink as Link } from "react-router-hash-link";
import "../css/Screen.css";

const SubNavBar = () => {
  var tabs = {
    display: "inline-block",
    paddingRight: 100,
    fontSize: 15,
  };

  return (
    <Navbar
      bg="light"
      style={{
        justifyContent: "center",
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
      }}
      id="navbar"
    >
      <Nav style={{ justifyContent: "center" }}>
        {/* <Nav.Link>Join</Nav.Link>

        <Nav.Link>Find A Vet</Nav.Link>

        <Nav.Link>Talk to Vet</Nav.Link>

        <Nav.Link>Know Your Pet</Nav.Link>

        <Nav.Link>Pet Vaccines</Nav.Link>

        <Nav.Link>Products and Services</Nav.Link>

        <Nav.Link>About Us</Nav.Link> */}

        <ul
          style={{
            listStyle: "none",
            margin: 0,
          }}
        >
          <Link smooth to="#join">
            <li style={tabs}>Join</li>
          </Link>
          <Link smooth to="#findvet">
            <li style={tabs}>Find A Vet</li>
          </Link>
          <Link smooth to="#talkvet">
            <li style={tabs}>Talk To Vet</li>
          </Link>
          <Link smooth to="#knowpet">
            <li style={tabs}>Know Your Pet</li>
          </Link>
          <Link smooth to="#aboutus">
            <li style={tabs}>About Us</li>
          </Link>
        </ul>
      </Nav>
    </Navbar>
  );
};

export default SubNavBar;
