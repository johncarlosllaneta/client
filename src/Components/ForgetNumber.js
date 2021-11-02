import React, { useState, useEffect } from "react";
import { Form, Button, Nav, Image, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../Images/assets/logo.png";
import axios from "axios";
import { hostUrl } from "./Host";

const ForgetEmail = () => {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [phoneNumber, setphoneNumber] = useState();
  const [responsedata, setresponsedata] = useState();
  const [formValidation, setformValidation] = useState();
  const sendSMS = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();

      axios.post(`${hostUrl}/sendSMS/${phoneNumber}`).then((response) => {
        // alert(response.data.message);
        setresponsedata(response.data.message);
      });
      setValidated(true);
    }
  };

  useEffect(() => {
    if (responsedata !== undefined) {
      if (responsedata === "invalid number") {
        // alert('Invalid Number');
        setShow(true);
        // setValidated(true)
        setformValidation(true);
      } else {
        window.location.href = `/forgetCode/${phoneNumber}`;
      }
    }
  }, [responsedata]);

  return (
    <Container
      style={{
        paddingTop: 50,
        backgroundColor: "white",
        minWidth: 350,
        maxWidth: "60%",
        width: 500,
        height: 500,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        marginLeft: 20,
      }}
    >
      <Form
        noValidate
        // validated={validated}
        onSubmit={sendSMS}
      >
        <Image src={Logo} />
        <h1
          style={{
            color: "#0A94A4",
            fontWeight: "bolder",
            fontOpticalSizing: "auto",
          }}
        >
          Forgot Password
        </h1>
        <Alert show={show} variant={"danger"}>
          Invalid phone number.
        </Alert>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="Phone Number"
            pattern="^09{1}[0-9]{9}"
            isInvalid={formValidation}
            maxLength={11}
            minLength={11}
            placeholder={"Phone number"}
            title={"Invalid Phone Number, contact number should start in 09"}
            required
            onChange={(e) => {
              setphoneNumber(e.target.value);
            }}
            style={{ marginBottom: 10 }}
          />
        </Form.Group>
        <Button
          style={{
            backgroundColor: "#3BD2E3",
            // paddingLeft: 150,
            // paddingRight: 150,
            width: "100%",
            borderColor: "#FFFFFF",
          }}
          type="submit"
        >
          Verify
        </Button>
        <p>
          Have an account ?<Nav.Link href="/login">Login</Nav.Link>
        </p>
      </Form>
    </Container>
  );
};

export default ForgetEmail;
