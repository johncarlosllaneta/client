import React, { useState, useEffect, useRef } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Image,
    FloatingLabel,
} from "react-bootstrap";
import { Button } from '@mui/material';
import logo from "../../../src/Images/logo.png";
import Axios from "axios";
import { hostUrl } from "../Host";


function EmailPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [emailControllerNessage, setemailControllerNessage] = useState(true);
    const [validated, setValidated] = useState(false);
    // const [validEmails, setvalidEmails] = useState([]);

    function handleEmailPassword(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            Axios.post(`${hostUrl}/emailChecker`, {
                email: email
            }).then((response) => {
                if (response.data == true) {
                    setemailControllerNessage(false);
                } else {
                    Axios.post(`${hostUrl}/vetclinic/insert`, {
                        email: email,
                        password: password,
                        name: name
                    }).then((response) => {
                        if (response.data.message == 'Registered') {
                            Axios.post(`${hostUrl}/api/login`, {
                                email: email,
                                password: password,
                            }).then((response) => {
                                if (response.data.message == "Correct") {

                                    localStorage.setItem("ajwt", response.data.accessToken);
                                    localStorage.setItem("rjwt", response.data.refreshToken);
                                    localStorage.setItem("isLogin", true);
                                    localStorage.setItem("role", response.data.role);
                                    if (response.data.role == 2) {
                                        localStorage.setItem("vetStatus", response.data.vetStatus);
                                        localStorage.setItem("id", response.data.id);
                                        Axios.post(`${hostUrl}/vetclinic/register/system/logs`, {
                                            name: name,
                                        });
                                    }
                                    window.location.href = `/`;
                                }
                            });
                        }
                    })
                }
            })

        }

        setValidated(true);
    }

    return (
        <Container
            style={{
                backgroundColor: "white",
                minWidth: 350,
                maxWidth: "60%",
                width: 500,
                height: 'auto',
                boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                borderRadius: 30,
                marginBottom: 10,
                marginTop: 50
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
                    textAlign: "center",
                    fontSize: 25,
                    color: "#0A94A4",
                    fontWeight: "bold",
                }}
            >
                TERRAVET
            </h6>

            <Row
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        fontSizeAdjust: 50,
                        color: "#0A94A4",
                        fontWeight: "bold",
                        fontOpticalSizing: "auto",
                    }}
                >
                    Create an account
                </h1>
            </Row>

            <Container>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleEmailPassword}
                >
                    <Form.Group
                        style={{
                            textAlign: "left",
                        }}
                    >
                        <FloatingLabel
                            controlId="floatingInputName"
                            label="Vet Full Name"
                            className="mb-3"
                        >
                            <Form.Control
                                style={{
                                    height: 50,
                                    backgroundColor: "white",
                                }}
                                type="text"
                                placeholder="Name"
                                pattern="[a-zA-Z ]*$"
                                minLength={5}
                                required
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

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
                                pattern=".+@gmail\.com|.+@yahoo\.com|.+@hotmail\.com|.+@aol\.com|.+@hotmail\.co\.uk"
                                required
                                minLength={8}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                itemProp={{ endAdornment: <Button>Verify</Button> }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>

                            <Form.Text
                                id="passwordHelpBlock"
                                hidden={emailControllerNessage}
                                style={{
                                    color: "red",
                                }}
                            >
                                Invalid email. Please use other email address.
                            </Form.Text>
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
                                pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must contain at least one number, special
                                character, uppercase and lowercase letter, and at least 8 or
                                more characters
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>


                    <Button
                        type="submit"
                        className="mt-2 mb-3"
                        style={{
                            backgroundColor: "#0A94A4",
                            width: "100%",
                            borderRadius: 5,
                            color: 'white',
                            fontWeight: "bold",
                            fontSize: 15,
                            textAlign: "center",
                        }}
                    >
                        Sign up
                    </Button>
                </Form>
            </Container>
        </Container>
    )
}

export default EmailPassword