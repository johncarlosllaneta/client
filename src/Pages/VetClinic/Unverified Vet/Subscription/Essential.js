import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";

function Essential(props) {
  return (
    <div>
      <Card>
        <Container
          style={{
            padding: 20,
          }}
        >
          <h2>ESSENTIAL</h2>
          <h6>Information System + Customer Management System</h6>
          <h4>₱ 500.00 / Monthly</h4>
        </Container>

        <hr />
        <Container
          style={{
            textAlign: "left",
          }}
        >
          <h6>PLUS</h6>

          <Container>
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <CheckIcon />
              <p style={{ marginLeft: 15 }}>
                1 Vet Clinic Administrator Account
              </p>
            </div>
          </Container>
          <Container>
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <CheckIcon />
              <p style={{ marginLeft: 15 }}>
                Up to 3 Veterinarian and Vet Staff Account
              </p>
            </div>
          </Container>

          <Container>
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <CheckIcon />
              <p style={{ marginLeft: 15 }}>
                Services and Appointment Management
              </p>
            </div>
          </Container>

          <Container>
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <CheckIcon />
              <p style={{ marginLeft: 15 }}>Pharmacy and Product Reservation</p>
            </div>
          </Container>

          <Container>
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <CheckIcon />
              <p style={{ marginLeft: 15 }}>Inquiry Management</p>
            </div>
          </Container>

          <Container>
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <CheckIcon />
              <p style={{ marginLeft: 15 }}>Video Consultation</p>
            </div>
          </Container>
        </Container>

        <div
          style={{
            padding: 20,
            display: "flex",
          }}
          hidden={props.buttonChecker == true ? false : true}
        >
          <Button
            variant="outlined"
            color="error"
            style={{
              width: "100%",
            }}
            onClick={() => {
              props.setsubscriptionType("Essential");
              props.handleShowModal();
            }}
          >
            SUBSCRIBE NOW
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Essential;
