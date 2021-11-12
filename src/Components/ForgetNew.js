import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import Axios from "axios";
import { hostUrl } from "./Host";
import Logo from "../Images/assets/logo.png";
const ForgetNew = () => {
  let { phoneNumber } = useParams();
  // alert(phoneNumber);

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  let userrole;
  let phone_number;

  const [validated, setValidated] = useState(false);
  const handleEmailPassword = (e) => {
    userrole = phoneNumber.toString().substr(phoneNumber.toString().length - 1);
    // alert(userrole);
    phone_number = phoneNumber
      .toString()
      .substring(0, phoneNumber.toString().length - 1);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      // alert(userrole + "  " + phone_number);
      Axios.post(`${hostUrl}/changepassword/${password}`, {
        userrole: userrole,
        phoneNumber: phone_number,
      }).then((response) => {
        if (response.status === 200) {
          logsFogertPass();
          window.location.href = "/login";
          // window.location.replace('/login');
          window.close();
        } else {
          alert("Failed to reset your password");
          window.location.href = "/forgetEmail";
        }
      });
    }

    setValidated(true);
  };

  function logsFogertPass() {
    Axios.post(`${hostUrl}/forget/password/system/logs`, {
      phoneNumber: phone_number,
      user_role: userrole,
    });
  }

  return (
    <Container
      style={{
        paddingTop: 50,
        backgroundColor: "white",
        minWidth: 350,
        maxWidth: "60%",
        width: 500,
        height: 550,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: 30,
        padding: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form noValidate validated={validated} onSubmit={handleEmailPassword}>
        <Image src={Logo} />
        <h1
          style={{
            fontOpticalSizing: "auto",
            fontSize: 30,
            color: "#0A94A4",
            fontWeight: "bolder",
          }}
        >
          Password Reset
        </h1>
        <Form.Group controlId="formPassword">
          <FloatingLabel
            controlId="floatingInputPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$"
              title="Must contain at least one number and one uppercase and lowercase letter and one special character, and at least 8 or more characters"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must contain at least one number, special character,
              uppercase and lowercase letter, and at least 8 or more characters
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Form.Group
          style={{
            textAlign: "left",
          }}
        >
          <FloatingLabel
            controlId="floatingInputPassword"
            label="Confirm Password"
            className="mb-3"
          >
            <Form.Control
              style={{ height: 50, backgroundColor: "white" }}
              type="password"
              placeholder="Confirm Password"
              pattern={password}
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password should be the same with the first password you've
              enter.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#3BD2E3",
            width: "100%",
            borderColor: "#FFFFFF",
          }}
        >
          Verify
        </Button>
      </Form>
    </Container>
  );
};

export default ForgetNew;
