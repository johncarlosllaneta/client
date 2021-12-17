import React from "react";
import Avatar from "react-avatar";
import { Card, Col, Row } from "react-bootstrap";
function PetContainerProfile() {
  return (
    <div
      style={{
        paddingLeft: "15vw",
        paddingRight: "15vw",
      }}
    >
      <Card
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

          display: "flex",
        }}
      >
        <div
          style={{
            display: "inline-flex",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
              margin: 0,
            }}
          >
            <Avatar
              name={"lukas"}
              round
              size={200}
              src={
                "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              }
            />
          </div>

          <div
            style={{
              display: "block",
              justifyContent: "start",
              alignItems: "center",
              paddingTop: "10vh",
            }}
          >
            <h3
              style={{
                marginBottom: 0,
              }}
            >
              Lukas
            </h3>
            <p
              style={{
                textAlign: "left",
              }}
            >
              Aspin
            </p>
          </div>

          <Row
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3>Pet Details</h3>
            </div>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "block",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Type of Pet
                  </h5>
                  <p>Dog</p>
                </div>
                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Gender
                  </h5>
                  <p>Male</p>
                </div>
              </div>

              <div
                style={{
                  display: "block",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Birthday
                  </h5>
                  <p>September 5, 2017</p>
                </div>

                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Pet Owner
                  </h5>
                  <p>Jhaycee Llaneta</p>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default PetContainerProfile;
