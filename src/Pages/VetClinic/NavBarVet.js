import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Row, Col, Badge } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { BsChatDotsFill } from "react-icons/bs";
import Axios from "axios";
import "../../navBarHome.css";
import { hostUrl } from "../../Components/Host";
import Avatar from "react-avatar";

function NavBarVet() {
  const [user, setuser] = useState([]);
  const [userole, setuserole] = useState("");
  const [counter, setcounter] = useState(0);
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

  // function tConvert(time) {
  //   // Check correct time format and split into components
  //   time = time
  //     .toString()
  //     .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  //   if (time.length > 1) {
  //     // If time format correct
  //     time = time.slice(1); // Remove full string match value
  //     time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
  //     time[0] = +time[0] % 12 || 12; // Adjust hours
  //   }
  //   return time.join(""); // return adjusted time or original string
  // }

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "white",
        padding: 0,
        width: "inherit",
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
        <a
          href="/talk to vet"
          className="mb-2"
          id="talkToVet"
          style={{ color: "grey", fontSize: 30 }}
        >
          <BsChatDotsFill />
        </a>

        <NavDropdown
          style={{ fontSize: 20, marginRight: 50, margin: 0 }}
          title={name}
        >
          <NavDropdown.Item onClick={vetSettings}>Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarVet;
