import React, { useState, useEffect } from "react";
import {
  Navbar,
  DropdownButton,
  Dropdown,
  Container,
  Image,
  Badge,
  Toast,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdNotifications } from "react-icons/io";
import { AiFillCheckCircle } from "react-icons/ai";
import logo from "../Images/logo.png";
import Axios from "axios";

function NavBarHome() {
  const [user, setuser] = useState([]);
  const [userole, setuserole] = useState("");
  var name;
  var toast;
  var accountImg;
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    var roles = localStorage.getItem("role");

    setuserole(roles);
    // alert(userole);
    Axios.get("http://localhost:3001/home", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setuser(response.data.result[0]);
      // console.log(user);
    });
  }, [user]);

  if (parseInt(userole) === 1) {
    name = (
      <p className="mt-3">
        <strong>Welcome !</strong> {user.name}
      </p>
    );
  } else if (parseInt(userole) === 2) {
    name = (
      <p className="mt-3">
        <strong>Welcome !</strong> {user.vet_name}
      </p>
    );
  } else if (parseInt(userole) === 3) {
    name = (
      <p className="mt-3">
        <strong>Welcome !</strong> {user.name}
      </p>
    );
  }

  if (parseInt(userole) === 1) {
    toast = (
      <div className="" style={{ display: "inline-flex" }}>
        <AiFillCheckCircle
          style={{ fontSize: 20, textAlign: "right", marginRight: 5 }}
        />
        <p>
          <strong> Welcome !</strong> {user.name}
        </p>
      </div>
    );
  } else if (parseInt(userole) === 2) {
    toast = (
      <div className="" style={{ display: "inline-flex" }}>
        <AiFillCheckCircle
          style={{ fontSize: 20, textAlign: "right", marginRight: 5 }}
        />
        <p>
          <span> </span>
          <strong>Welcome !</strong> {user.vet_name}
        </p>
      </div>
    );
  } else if (parseInt(userole) === 3) {
    toast = (
      <div className="" style={{ display: "inline-flex" }}>
        <AiFillCheckCircle
          style={{ fontSize: 20, textAlign: "right", marginRight: 5 }}
        />
        <p>
          <strong> Welcome !</strong> {user.name}
        </p>
      </div>
    );
  }

  if (parseInt(userole) === 1) {
    accountImg = (
      <img
        src={user.profilePicture}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          border: "7px",
          borderStyle: "solid",
          borderColor: "transparent",
          marginTop: "2vh",
        }}
      ></img>
    );
  } else if (parseInt(userole) === 2) {
    accountImg = (
      <img
        src={user.vet_picture}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          border: "7px",
          borderStyle: "solid",
          borderColor: "transparent",
          marginTop: "2vh",
        }}
      ></img>
    );
  } else if (parseInt(userole) === 3) {
    accountImg = (
      <img
        src={user.profilePicture}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          border: "7px",
          borderStyle: "solid",
          borderColor: "transparent",
          marginTop: "2vh",
        }}
      ></img>
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

  const logoutUser = () => {
    // axios.delete("http://localhost:3001/logout", {
    //   token: localStorage.getItem("rjwt"),
    // });

    localStorage.clear();
    window.location.replace("/");
  };

  const [show, setShow] = useState(true);

  var circleAvatar = accountImg;

  return (
    <Navbar
      expand="lg"
      style={{
        justifyContent: "space-evenly",
        height: 100,
        backgroundColor: colors.LightBlue,
      }}
      className="navbar fixed-top"
    >
      <Navbar.Brand className="ml-3" href="/" style={landingPageName}>
        {" "}
        <Image src={logo} style={logocss} /> TERRAVET
      </Navbar.Brand>

      <Container style={{ justifyContent: "flex-end" }}>
        <DropdownButton
          className="mt-1"
          key="responsive"
          id="dropdown-custom-components"
          variant="alert"
          drop="down"
          title={
            <Badge variant="light">
              <IoMdNotifications style={{ fontSize: 20 }} />
              10
            </Badge>
          }
        >
          <Dropdown.Item eventKey="2">Notification 1</Dropdown.Item>
          <Dropdown.Item eventKey="3">Notification 2</Dropdown.Item>
        </DropdownButton>

        {name}

        <DropdownButton
          key="responsivee"
          id="dropdown-custom-components"
          variant="alert"
          drop="down"
          title={circleAvatar}
          menuAlign="right"
        >
          <Dropdown.Item as="button">Change Password</Dropdown.Item>
          <Dropdown.Item as="button" onClick={logoutUser}>
            Logout
          </Dropdown.Item>
        </DropdownButton>

        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          style={{
            backgroundColor: "#57D4FF",
            color: "white",
            fontSize: 12,
            height: 45,
          }}
        >
          <Toast.Body>{toast}</Toast.Body>
        </Toast>
      </Container>
    </Navbar>
  );
}

export default NavBarHome;
