import React from "react";
import Avatar from "react-avatar";
import { Button, Col, Row } from "react-bootstrap";
import SampleImage from "../../../../../Images/JCEL.jpg";
import ProfileContainer from "./ProfileContainer";
import { MdEmail, MdPlace, MdPermContactCalendar } from "react-icons/md";
function ProfilePage() {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Col>
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
                    src={SampleImage}
                    name={"Jhaycee Llaneta"}
                  />
                </div>
              </Col>
              <Col>
                <div style={{ paddingTop: 40 }}>
                  <Row style={{ fontSize: 20 }}>My name is</Row>
                  <Row style={{ fontSize: 32 }}>Mr. Michael Noval</Row>
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
              padding: 10,
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
                title={"IgnacioDelpilar@gmail.com"}
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
                title={"0956781739024"}
                subtext={"Contact Number"}
              />
            </div>
          </div>
        </Row>
      </Col>
    </div>
  );
}

export default ProfilePage;
