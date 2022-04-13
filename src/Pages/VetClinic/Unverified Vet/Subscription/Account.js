import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { hostUrl } from "../../../../Components/Host";
import { ToastUpdateSubscribe } from "../../../../Components/Toast";
import Basic from "./Basic";
import Essential from "./Essential";
import Pro from "./Pro";

function Account(props) {
  const updateSubscription = () => {
    axios
      .put(`${hostUrl}/vetclinic/reset/${props.user.vetid}`)
      .then((response) => {
        if (response.data == "Success") {
          axios
            .get(`${hostUrl}/vet/uploads`, {
              params: {
                email: props.user.email,
              },
            })
            .then((response) => {
              if (response.data.message === "Correct") {
                // alert("logging in");
                localStorage.setItem("ajwt", response.data.accessToken);
                localStorage.setItem("rjwt", response.data.refreshToken);
                localStorage.setItem("isLogin", true);
                localStorage.setItem("role", response.data.role);
                if (response.data.role === 2) {
                  localStorage.setItem("vetStatus", response.data.vetStatus);
                  localStorage.setItem("id", response.data.id);
                }

                ToastUpdateSubscribe();

                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            });
        }
      });
  };

  return (
    <div>
      <Container>
        <h1 style={{ textAlign: "left" }}>Account</h1>
        <hr />
        <Row>
          <Col sm={3}>
            <Container
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <h4>Membership</h4>
            </Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Button
                variant="contained"
                // color='info'
                style={{
                  backgroundColor: "grey",
                }}
                onClick={updateSubscription}
              >
                Update Membership
              </Button>
            </Container>
          </Col>

          <Col sm={9}>
            <Row>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  {props.user.subscriptionType == "Pro" ? (
                    <h5>Professional</h5>
                  ) : (
                    <div>
                      {" "}
                      {props.user.subscriptionType == "Basic" ? (
                        <h5>Basic</h5>
                      ) : (
                        <div>
                          {" "}
                          {props.user.subscriptionType == "Essential" ? (
                            <h5>Essential</h5>
                          ) : (
                            <p></p>
                          )}{" "}
                        </div>
                      )}{" "}
                    </div>
                  )}
                </Container>
              </Col>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <p>Subscription Type</p>
                </Container>
              </Col>
            </Row>

            <Row>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  {props.user.subscriptionType == "Pro" ? (
                    <h5>1,000.00 / Monthly</h5>
                  ) : (
                    <div>
                      {" "}
                      {props.user.subscriptionType == "Basic" ? (
                        <h5>250.00 / Monthly</h5>
                      ) : (
                        <div>
                          {" "}
                          {props.user.subscriptionType == "Essential" ? (
                            <h5>500.00 / Monthly</h5>
                          ) : (
                            <p></p>
                          )}{" "}
                        </div>
                      )}{" "}
                    </div>
                  )}
                </Container>
              </Col>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <p>Subscription Price</p>
                </Container>
              </Col>
            </Row>

            <Row>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <h5>{props.user.email}</h5>
                </Container>
              </Col>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <p>Subscriber Email</p>
                </Container>
              </Col>
            </Row>

            <hr />
            <Row>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  {props.user.subscriptionType == "Pro" ? (
                    <Pro />
                  ) : (
                    <div>
                      {" "}
                      {props.user.subscriptionType == "Basic" ? (
                        <Basic />
                      ) : (
                        <div>
                          {" "}
                          {props.user.subscriptionType == "Essential" ? (
                            <Essential />
                          ) : (
                            <p></p>
                          )}{" "}
                        </div>
                      )}{" "}
                    </div>
                  )}
                </Container>
              </Col>
              <Col>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <p>Plan Details</p>
                </Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Account;
