import React, { useState, useEffect } from "react";
import { Badge, Col, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
import Axios from "axios";
import "../../navBarHome.css";
import Notification from "../Notification";
import { hostUrl } from "../Host";
import Avatar from "react-avatar";

function NavBarHome() {
  const [user, setuser] = useState([]);
  const [userole, setuserole] = useState("");
  var name;
  var toast;
  var accountImg;

  const [counter, setcounter] = useState(0);
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

  const [show, setShow] = useState(true);

  var circleAvatar = accountImg;

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

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "white",
        padding: 0,
        width: "85vw",
        marginLeft: 20,
      }}
    >
      {/* <Navbar.Brand className='ml-3' href="/" style={landingPageName}>
        {" "}
        <Image src={logo} style={logocss} /> TERRAVET
      </Navbar.Brand> */}

      <Navbar.Collapse className="justify-content-end">
        <a
          href="/petOwner/talkVet"
          className="mb-2"
          id="talkToVet"
          style={{ color: "grey", fontSize: 30 }}
        >
          <BsChatDotsFill />
        </a>

        <NavDropdown style={{ fontSize: 20, marginRight: 50 }} title={name}>
          <NavDropdown.Item onClick={setting}>Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarHome;
