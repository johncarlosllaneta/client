import React, { useState } from "react";
import Axios from "axios";
import logo from "../../src/Images/logo.png";
import { IoChevronBack } from "react-icons/io5";
import { hostUrl, hostUrlWeb } from "../Components/Host";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import "../css/LoginUpdated.css";
function LoginUpdated() {
  const [alertLogin, setAlertLogin] = useState("");
  const [idx, setIdx] = useState("");
  const [variant, setVariant] = useState("");
  const [display, setdisplay] = useState("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidLogin, setinvalidLogin] = useState(1)
  const [invalidButtonController, setinvalidButtonController] = useState(false);
  function refreshInvalidLogin() {
    setTimeout(() => {
      setinvalidLogin(1);
      setinvalidButtonController(false);
      setAlertLogin();
      setVariant();
      setIdx();
      setdisplay('none');
    }, 180000);
  }

  const submitLogin = (event) => {
    if (email !== "" && password !== "") {
      Axios.post(`${hostUrl}/api/login`, {
        email: email,
        password: password,
      })
        .then((response) => {
          if (response.data.message == "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);

            if (response.data.role === 1 || response.data.role === 3 || response.data.role === 4 || response.data.role === 5) {
              if (response.data.role === 1) {
                Axios.post(`${hostUrl}/pet_owner/system/logs`, {
                  name: response.data.user.name,
                });
                window.location.replace("/");
              } else {
                Axios.post(`${hostUrl}/systemAdmin/system/logs`, {
                  name: response.data.user.name,
                });
                window.location.replace("/");
              }
            }
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
              Axios.post(`${hostUrl}/vetclinic/system/logs`, {
                name: response.data.user.vet_name,
                vet_status: response.data.vetStatus,
              });
              window.location.href = `/dashboard`;
            }
          } else if (response.data.message === "Wrong password!") {
            setinvalidLogin(invalidLogin + 1);
            if (invalidLogin == 5) {
              setinvalidButtonController(true);
              setAlertLogin(
                "You have reach the maximum login attempt, please try again after 3 mins"
              );
              setVariant("danger");
              setIdx("3");
              setdisplay("block");
              refreshInvalidLogin();
            }

            if (invalidLogin < 5) {
              setAlertLogin(
                "The username and password you entered did not match our records. Please double-check and try again."
              );
              setVariant("danger");
              setIdx("3");
              setdisplay("block");
            }


          } else if (response.data.message === "User doesn't exist...") {
            setinvalidLogin(invalidLogin + 1);
            if (invalidLogin == 5) {
              setinvalidButtonController(true);
              setAlertLogin(
                "You have reach the maximum login attempt, please try again after 3 mins"
              );
              setVariant("danger");
              setIdx("3");
              setdisplay("block");
              refreshInvalidLogin()
            }

            if (invalidLogin < 5) {
              setAlertLogin(
                "The username and password you entered did not match our records. Please double-check and try again."
              );
              setVariant("danger");
              setIdx("3");
              setdisplay("block");
            }


          }
          else if (response.data.message === "Already login with other device") {
            setAlertLogin(
              "Already login with other device. Please double-check and try again."
            );
            setVariant("danger");
            setIdx("3");
            setdisplay("block");
          }
        })
        .catch((err) => alert(err));

      if (invalidLogin < 5) {
        setTimeout(() => {
          setAlertLogin(

          );
          setVariant();
          setIdx();
          setdisplay('none');
        }, 5000);
      }
      event.preventDefault();
    }
  };

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div>
      <div style={{ paddingTop: 30 }}>
        <a
          href="/"
          className="ml-5"
          style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            fontSize: 20,
          }}
        >
          <IoChevronBack style={{ marginTop: 5 }} />
          Return
        </a>
      </div>
      {/* Form Email and Password */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            minWidth: 350,
            maxWidth: "60%",
            width: 500,
            height: 600,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: 30,
          }}
        >
          <Image
            src={logo}
            className="mt-5"
            style={{
              height: 50,
            }}
          />

          <h6
            style={{
              color: "#0A94A4",
              fontWeight: "bold",
              fontOpticalSizing: "auto",
            }}
          >
            TERRAVET
          </h6>

          <h1
            style={{
              fontSizeAdjust: 30,
              color: "#0A94A4",
              fontWeight: "bold",
              fontOpticalSizing: "auto",
            }}
          >
            Sign In
          </h1>

          <Alert
            className="ml-4"
            style={{ width: "100%", display: { display } }}
            key={idx}
            variant={variant}
          >
            {alertLogin}
          </Alert>
          <Form onSubmit={submitLogin}>
            <Form.Group
              style={{
                textAlign: "left",
              }}
            >
              <FloatingLabel
                controlId="floatingInputEmail"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  style={{ height: 50, backgroundColor: "white" }}
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
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
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  style={{ height: 50, backgroundColor: "white" }}
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Form.Group>

            <Container
              style={{
                display: "flex",
                alignItems: "start",
                padding: 0,
              }}
            >
              <Form.Text
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onClick={() => {
                  window.location.href = `/forget password`;
                }}
              >
                Forgot Password ?
              </Form.Text>
            </Container>
            <Button
              disabled={invalidButtonController}
              type="submit"
              style={{
                backgroundColor: "#0A94A4",
                width: "100%",
                borderRadius: 5,
                borderColor: "white",
                fontWeight: "bold",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Login
            </Button>

            <hr></hr>
            <p>
              Haven't an account?{" "}
              <a id="registerHref" href="/register">
                Register
              </a>
            </p>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default LoginUpdated;
