import React, { useState, useEffect } from "react";
import { Alert, Button, Container, Form, Image } from "react-bootstrap";
import PinInput from "react-pin-input";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import axios from "axios";
import { hostUrl } from "./Host";
import Logo from "../Images/assets/logo.png";
const ForgetCode = () => {
  let { phoneNumber } = useParams();
  // alert(phoneNumber);

  let code;
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [verification_code, setverification_code] = useState();
  const [responsedata, setresponsedata] = useState();

  const submitCode = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();

      axios
        .post(`${hostUrl}/sendSMS/verify/${phoneNumber}`, {
          verificationCode: code,
        })
        .then((response) => {
          // alert(response.data.message);
          setresponsedata(response.data);
        });
      setValidated(true);
    }
  };

  let userroles;
  useEffect(() => {
    if (responsedata !== undefined) {
      if (responsedata.message === "failed") {
        // alert('Invalid Number');
        setShow(true);
      } else {
        userroles = responsedata.datas[0].userrole;
        // alert(userroles);
        window.location.href = `/forgetNew/${phoneNumber + userroles}`;
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
        padding: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        noValidate
        // validated={validated}
        onSubmit={submitCode}
      >
        <Image src={Logo} />
        <h1
          style={{
            color: "#0A94A4",
            fontWeight: "bolder",
            fontOpticalSizing: "auto",
          }}
        >
          Verify Code
        </h1>
        <p style={{ fontOpticalSizing: "auto" }}>
          Check your inbox, you'll receive a code to verify here so you can
          reset your account password.
        </p>

        <Alert show={show} variant={"danger"}>
          Invalid verification code.
        </Alert>
        {/* <Form.Group controlId="formCode">
          <Form.Control
            type="text"
            maxLength={4}
            minLength={4}
            placeholder="Enter code"
            pattern="\d*"
            title={"Invalid code, verification code should be 4 digit code."}
            onChange={(e) => {
              setverification_code(e.target.value);
            }}
            style={{ marginBottom: 10 }}
          />
        </Form.Group> */}
        <PinInput
          length={4}
          initialValue=""
          onChange={(value, index) => {
            code = value;
            console.log(code);
          }}
          type="numeric"
          inputMode="number"
          style={{
            // padding: "10px",
            borderColor: "#707070",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          inputStyle={{ borderColor: "#707070" }}
          inputFocusStyle={{ borderColor: "#4BEFEF" }}
          // onComplete={(value, index) => {}}
          autoSelect={true}
          focus={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        {/* <Container
          style={{
            display: "flex",
            padding: 0,
            textAlign: "left",
          }}
        > */}
        <Form.Text
          style={{
            color: "blue",
            cursor: "pointer",
            textAlign: "left",
          }}
          onClick={() => {
            axios.post(`${hostUrl}/sendSMS/${phoneNumber}`);
            window.location.href = `/forgetCode/${phoneNumber}`;
          }}
        >
          Resend code ?
        </Form.Text>
        {/* </Container> */}

        <br />

        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#3BD2E3",
            // paddingLeft: 150,
            // paddingRight: 150,
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

export default ForgetCode;
