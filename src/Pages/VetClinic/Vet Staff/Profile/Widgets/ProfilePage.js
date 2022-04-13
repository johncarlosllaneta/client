import React, { useState, useEffect } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import Avatar from "react-avatar";
import { Button, Col, Row } from "react-bootstrap";
import SampleImage from "../../../../../Images/JCEL.jpg";
import ProfileContainer from "./ProfileContainer";
import { MdEmail, MdPlace, MdPermContactCalendar } from "react-icons/md";
import { Skeleton, useMediaQuery } from "@mui/material";
import getUser from "../../../../../Components/userData";
function ProfilePage() {
  const [user, setuser] = useState([]);
  const [user1, setuser1] = useState([]);
  const [imgProfile, setimgProfile] = useState("");

  useEffect(async () => {
    const userData = await getUser();
    getInfo(userData.vet_staff_id);
  }, []);

  const getInfo = async (id) => {
    const result = await Axios.get(`${hostUrl}/staff/${id}`);
    setuser(result.data[0]);
  };
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
                {user.vet_staff_profilePic == null ? (
                  <Skeleton variant="circular" height={"100%"} />
                ) : (
                  <Avatar
                    round={true}
                    size={210}
                    style={{
                      marginTop: 10,
                    }}
                    src={user.vet_staff_profilePic}
                    name={
                      user.vet_staff_fname +
                      " " +
                      user.vet_staff_mname +
                      " " +
                      user.vet_staff_lname
                    }
                  />
                )}
              </div>
            </Col>

            <Col>
              {user.vet_staff_fname == null ||
              user.vet_staff_lname == null ||
              user.vet_staff_lname == null ? (
                <Skeleton variant="rectangular" height={"100%"} />
              ) : (
                <div style={{ paddingTop: 40 }}>
                  <Row style={{ fontSize: 20 }}>My name is</Row>
                  <Row style={{ fontSize: 32 }}>
                    {user.vet_staff_fname +
                      " " +
                      user.vet_staff_mname +
                      " " +
                      user.vet_staff_lname}
                  </Row>
                  <Row style={{ fontSize: 15, color: "#33C1D2" }}>
                    {"Staff of" + " " + user.vet_name}
                  </Row>
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
              )}
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
            {user.email == null ? (
              <Skeleton variant="rectangular" height={"100%"} />
            ) : (
              <ProfileContainer
                icon={<MdEmail style={{ color: "#62D7FF", fontSize: 90 }} />}
                title={user.email}
                subtext={"Email Address"}
              />
            )}
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
            {user.vet_address == null ? (
              <Skeleton variant="rectangular" height={"100%"} />
            ) : (
              <ProfileContainer
                icon={<MdPlace style={{ color: "#62D7FF", fontSize: 90 }} />}
                title={user.vet_address}
                subtext={"Address"}
              />
            )}
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
            {user.vet_staff_contactNumber == null ? (
              <Skeleton variant="rectangular" height={"100%"} />
            ) : (
              <ProfileContainer
                icon={
                  <MdPermContactCalendar
                    style={{ color: "#62D7FF", fontSize: 90 }}
                  />
                }
                title={user.vet_staff_contactNumber}
                subtext={"Contact Number"}
              />
            )}
          </div>
        </div>
      </Row>
      {/* </Col> */}
    </div>
  );
}

export default ProfilePage;
