import React, { useState, useEffect } from "react";
import { Navbar, Image, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/logo.png";
import Axios from "axios";
import "../../navBarHome.css";
import { hostUrl } from "../Host";
import Avatar from "react-avatar";
function NavBarAppointments() {
  const [user, setuser] = useState([]);
  const [userole, setuserole] = useState("");
  var name;
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

    localStorage.clear();
    window.location.replace("/");
  };

  const setting = () => {
    window.location.replace("/settings");
  };

  return (
    <Navbar
      collapseOnSelect expand="sm"
      style={{
        backgroundColor: "white",
        padding: 0,
      }}
      fixed="top"
    >
      <Navbar.Brand className="ml-3" href="/" style={landingPageName}>
        {" "}
        <Image src={logo} style={logocss} /> TERRAVET
      </Navbar.Brand>

      <Navbar.Collapse className="justify-content-end">
        {/* <a href="/petOwner/talkVet" className='mb-2' id='talkToVet' style={{ color: 'grey', fontSize: 30 }}><BsChatDotsFill /></a> */}

        {/* <NavDropdown title={<IoNotificationsSharp style={{ fontSize: 30, color: 'grey' }} />} id="navbarScrollingDropdown" alignRight={true}>
                    <NavDropdown.Header>Notification</NavDropdown.Header>
                    {data.map((val) => {
                        return (
                            <Notification img={val.img} name={val.name} description={val.description} />
                        )
                    })}
                    <NavDropdown.Header style={{ textAlign: 'center' }}><a href="#" >See More</a></NavDropdown.Header>
                </NavDropdown> */}

        <NavDropdown style={{ fontSize: 20, marginRight: 50 }} title={name}>
          <NavDropdown.Item onClick={setting}>Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarAppointments;
