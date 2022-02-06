import React, { useState, useEffect } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import Avatar from "react-avatar";
import { Button, Col, Row } from "react-bootstrap";
import SampleImage from "../../../../../Images/JCEL.jpg";
import ProfileContainer from "./ProfileContainer";
import { MdEmail, MdPlace, MdPermContactCalendar } from "react-icons/md";
function ProfilePage() {
  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  const [imgProfile, setimgProfile] = useState("");

  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 3) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
      });
      setimgProfile(user.vet_staff_profilePic);
      setcounter(counter + 1);
    }
  }, [user]);
  return (
    <div
      style={{
        paddingTop: 140,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {/* <Col> */}
      <Row>
        <div>
          <Row>
            <Col>
              <div
                style={{
                  justifyContent: "end",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Avatar
                  round={true}
                  size={210}
                  style={{
                    marginTop: 10,
                  }}
                  src={user.vet_staff_profilePic}
                  name={user.vet_staff_fname}
                />
              </div>
            </Col>
            <Col>
              <div style={{ paddingTop: 40 }}>
                <Row style={{ fontSize: 20 }}>My name is</Row>
                <Row style={{ fontSize: 32 }}>
                  {user.vet_staff_fname +
                    " " +
                    user.vet_staff_mname +
                    " " +
                    user.vet_staff_lname}
                </Row>
                <Row style={{ fontSize: 10, color: "#33C1D2" }}>Staff</Row>
                <Row>
                  <Button
                    style={{
                      backgroundColor: "#18A0FB",
                      borderRadius: 10,
                      color: "#FFFFFF",
                      width: 117,
                    }}
                  >
                    Edit Profile
                  </Button>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: 30,
          }}
        >
          <div
            style={{
              height: 151,
              width: 318,
              borderRadius: 30,
              backgroundColor: "whitesmoke",
              paddingTop: 20,
            }}
          >
            <ProfileContainer
              icon={<MdEmail style={{ color: "#62D7FF", fontSize: 90 }} />}
              title={user.vet_staff_email}
              subtext={"Email Address"}
            />
          </div>
          <div
            style={{
              height: 151,
              width: 318,
              borderRadius: 30,
              backgroundColor: "whitesmoke",
              paddingTop: 20,
            }}
          >
            <ProfileContainer
              icon={<MdPlace style={{ color: "#62D7FF", fontSize: 90 }} />}
              title={"2529 Legarda Sampaloc Manila"}
              subtext={"Address"}
            />
          </div>
          <div
            style={{
              height: 151,
              width: 318,
              borderRadius: 30,
              backgroundColor: "whitesmoke",
              paddingTop: 20,
            }}
          >
            <ProfileContainer
              icon={
                <MdPermContactCalendar
                  style={{ color: "#62D7FF", fontSize: 90 }}
                />
              }
              title={user.vet_staff_contactNumber}
              subtext={"Contact Number"}
            />
          </div>
        </div>
      </Row>
      {/* </Col> */}
    </div>
  );
}

export default ProfilePage;
