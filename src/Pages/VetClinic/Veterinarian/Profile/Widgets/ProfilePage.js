import React, { useState, useEffect } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import Avatar from "react-avatar";
import { Button, Col, Row } from "react-bootstrap";
import SampleImage from "../../../../../Images/JCEL.jpg";
import ProfileContainer from "./ProfileContainer";
import { MdEmail, MdPlace, MdPermContactCalendar } from "react-icons/md";
import getUser from "../../../../../Components/userData";
import { Skeleton, useMediaQuery } from "@mui/material";
function ProfilePage() {
  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  const [imgProfile, setimgProfile] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(async () => {
    const userData = await getUser();
    Axios.get(`${hostUrl}/doc/${userData.vet_doc_id}`).then((response) => {
      setuser(response.data[0]);
      setisLoading(true);
    });
  }, []);
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
                {isLoading == true ? (
                  user.vet_staff_profilePic == null || " " ? (
                    <Avatar
                      round={true}
                      size={210}
                      style={{
                        marginTop: 10,
                      }}
                      src={user.vet_doc_profilePic}
                      name={
                        user.vet_doc_mname == null
                          ? user.vet_doc_fname + " " + user.vet_doc_lname
                          : user.vet_doc_fname +
                            " " +
                            user.vet_doc_mname +
                            " " +
                            user.vet_doc_lname
                      }
                    />
                  ) : (
                    <Avatar
                      round={true}
                      size={210}
                      style={{
                        marginTop: 10,
                      }}
                      src={user.vet_doc_profilePic}
                      name={
                        user.vet_doc_mname == null
                          ? user.vet_doc_fname + " " + user.vet_doc_lname
                          : user.vet_doc_fname +
                            " " +
                            user.vet_doc_mname +
                            " " +
                            user.vet_doc_lname
                      }
                    />
                  )
                ) : (
                  <Skeleton
                    variant="rectangular"
                    height={"100%"}
                    width={"100%"}
                  />
                )}
              </div>
            </Col>

            <Col>
              {user.vet_doc_fname == null ||
              user.vet_doc_lname == null ||
              user.vet_doc_lname == null ? (
                <Skeleton variant="rectangular" height={"100%"} />
              ) : (
                <div style={{ paddingTop: 40 }}>
                  <Row style={{ fontSize: 20 }}>My name is</Row>
                  <Row style={{ fontSize: 32 }}>
                    {user.vet_doc_fname + " " + user.vet_doc_lname}
                  </Row>
                  <Row style={{ fontSize: 15, color: "#33C1D2" }}>
                    {"Veterinarian of" + " " + user.vet_name}
                  </Row>
                  <Row>
                    <Button
                      style={{
                        backgroundColor: "#18A0FB",
                        borderRadius: 10,
                        color: "#FFFFFF",
                        width: 117,
                      }}
                      onClick={() => {
                        window.location.href = `/veterinarian/settings`;
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
            {user.vet_doc_email == null ? (
              <Skeleton variant="rectangular" height={"100%"} />
            ) : (
              <ProfileContainer
                icon={<MdEmail style={{ color: "#62D7FF", fontSize: 90 }} />}
                title={user.vet_doc_email}
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
            {user.vet_doc_contactNumber == null ? (
              <Skeleton variant="rectangular" height={"100%"} />
            ) : (
              <ProfileContainer
                icon={
                  <MdPermContactCalendar
                    style={{ color: "#62D7FF", fontSize: 90 }}
                  />
                }
                title={user.vet_doc_contactNumber}
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
