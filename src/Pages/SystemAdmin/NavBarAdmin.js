import React, { useState, useEffect } from "react";
import { Col, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
import Axios from "axios";
import "../../navBarHome.css";
import { hostUrl } from "../../Components/Host";
import Avatar from "react-avatar";

function NavBarHome() {
  const [user, setuser] = useState([]);
  const [userole, setuserole] = useState("");
  const [counter, setcounter] = useState(0);
  var name;
  var toast;
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

  const logoutUser = () => {
    // axios.delete("http://localhost:3001/logout", {
    //   token: localStorage.getItem("rjwt"),
    // });
    Axios.post(`${hostUrl}/systemAdmin/logout/system/logs`, {
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

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "white",
      }}
    >
      {/* <Navbar.Brand className='ml-3' href="/" style={landingPageName}>
        {" "}
        <Image src={logo} style={logocss} /> TERRAVET
      </Navbar.Brand> */}

      <Navbar.Collapse
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "end",
          margin: 0,
          padding: 0,
        }}
      >
        {/* <NavDropdown.Item>
            <div>
              <Row>
                <Col sm={3}>
                  <Avatar round={true} size={50} />
                </Col>
                <Col sm={7}>
                  <Row>Vet Name</Row>
                  <Row>Service name : Status</Row>
                </Col>
                <Col sm={2}>
                  <Row>Date</Row>
                  <Row>Time</Row>
                </Col>
              </Row>
            </div>
          </NavDropdown.Item> */}

        <NavDropdown
          style={{ fontSize: 20, marginRight: 50, margin: 0 }}
          title={name}
          drop="down"
        >
          <NavDropdown.Item onClick={setting}>Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarHome;
