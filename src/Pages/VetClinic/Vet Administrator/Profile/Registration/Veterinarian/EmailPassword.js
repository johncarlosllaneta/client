import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Image, Row, Col, FloatingLabel, Form } from 'react-bootstrap'
import logo from "../../../../../../Images/logo.png";
import "../../../../../../css/RegistrationVet.css";
import { RiDownload2Fill } from 'react-icons/ri';
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../../../../../Components/Host";

function EmailPassword(props) {

    const [validated, setValidated] = useState(false);
    const [validEmails, setvalidEmails] = useState([]);
    const [counterEmails, setcounterEmails] = useState(0);
    const [emailControllerNessage, setemailControllerNessage] = useState(true);
    let emailVerification = '';
    useEffect(() => {
        if (counterEmails < 5) {
            Axios.get(`${hostUrl}/users`).then((response) => {
                setvalidEmails(response.data);
            });
        }

        setcounterEmails(counterEmails + 1);
        //   console.log(validEmails);
    }, [validEmails]);

    function userExists() {
        return validEmails.some(function (el) {
            return el.email === emailVerification;
        });
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();


    function handleEmailPassword(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            if (userExists(email)) {

                e.preventDefault();
                e.stopPropagation();

                setemailControllerNessage(false);

                console.log(userExists(email));
            } else {
                e.preventDefault();

                Axios.post(`${hostUrl}/verifyEmail`, {
                    email: email
                }).then((response) => {
                    if (response.data == ('Invalid Email')) {
                        alert('Invalid Email')
                    } else {
                        props.setPassword(password);
                        props.setEmail(email);

                        props.submitRegistration(e);
                    }
                })




            }
        }

        setValidated(true);
    }

    return (
        <div>
            <Image
                src={logo}
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

            <Container
                style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    minWidth: 350,
                    maxWidth: "60%",
                    width: 600,
                    height: 'auto',
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: 30,
                    padding: 10,
                    marginBottom: 10
                }}
            >
                <Row>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleEmailPassword}
                    >
                        <div
                            style={
                                {
                                    width: '100%'
                                }
                            }
                        >
                            <Container
                                style={{
                                    display: "block",
                                    justifyContent: "center",
                                    alignItems: "center",
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
                                    Registration
                                </h1>


                                <Row>
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
                                                    setValidated(true);



                                                    e.preventDefault();
                                                    setEmail(e.target.value);
                                                    emailVerification = e.target.value;


                                                    if (userExists()) {
                                                        setemailControllerNessage(false);
                                                    } else {
                                                        setemailControllerNessage(true);
                                                    }

                                                }}


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
                                                title="Must contain at least one number, special
                                                character, uppercase and lowercase letter, and at least 8 or
                                                more characters."
                                                required
                                                onChange={(e) => {

                                                    setPassword(e.target.value);
                                                }}
                                            />
                                            <Form.Text id="passwordHelpBlock" muted>
                                                Your password must contain at least one number, special
                                                character, uppercase and lowercase letter, and at least 8 or
                                                more characters.
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
                                                Your password should be the same with the first password
                                                you've enter.
                                            </Form.Text>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid password.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>


                            </Container>
                            <Row
                                style={{
                                    padding: 20,
                                }}
                            >

                                <Col>
                                    <Button
                                        variant='secondary'
                                        style={
                                            {
                                                width: '100%'
                                            }
                                        }
                                        onClick={(e) => {
                                            props.back(e);
                                        }}
                                    >
                                        Back
                                    </Button>
                                </Col>

                                <Col>
                                    <Button
                                        style={
                                            {
                                                width: '100%'
                                            }
                                        }
                                        type='submit'
                                    >
                                        Register
                                    </Button>
                                </Col>



                            </Row>
                        </div>

                    </Form>
                </Row>
            </Container>
        </div>
    )
}

export default EmailPassword
