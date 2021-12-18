import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Image, Row, Col, FloatingLabel, Form, Alert, Modal, Spinner } from 'react-bootstrap'
import logo from "../../../../../../Images/logo.png";
import "../../../../../../css/RegistrationVet.css";
import { RiDownload2Fill } from 'react-icons/ri';
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../../../../../Components/Host";
import PinInput from "react-pin-input";

function EmailVerification(props) {

    //Modal Resend Code
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [verificationCode, setverificationCode] = useState();


    function submitVerificationCode(e) {
        e.preventDefault();

        Axios.post(`${hostUrl}/verifyEmail/submit`, {
            email: props.email,
            verificationCode: verificationCode
        }).then((response) => {
            if (response.data == 'Email Verified') {
                props.emailVerified();
            } else {
                props.handleShowAlert();
                setTimeout(() => {
                    props.handleCloseAlert();
                }, 5000);
            }
        })
    }




    return (
        <div>

            <Modal show={show} onHide={handleClose} centered>

                <Modal.Body>
                    <Row>
                        <Container>
                            <Spinner animation="border" role="status" variant='primary'>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Container>
                        <Container>
                            Sending Verification Code to your email. Please Wait!
                        </Container>
                    </Row>
                </Modal.Body>

            </Modal>

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
                        // validated={validated}
                        onSubmit={submitVerificationCode}
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
                                    Verify Email
                                </h1>


                                <Row>
                                    <p style={{ fontOpticalSizing: "auto" }}>
                                        Check your inbox, you'll receive a code to verify your account.
                                    </p>

                                    <Alert
                                        show={props.showAlert}
                                        variant={"danger"}>
                                        Invalid verification code.
                                    </Alert>

                                    <PinInput
                                        length={4}
                                        initialValue=""
                                        onChange={(value, index) => {
                                            // code = value;
                                            // console.log(code);
                                            setverificationCode(value);
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

                                    <Form.Text
                                        style={{
                                            color: "blue",
                                            cursor: "pointer",
                                            textAlign: "left",
                                        }}
                                        onClick={(e) => {
                                            props.sendEmail(e);
                                            handleShow();
                                            setTimeout(() => {
                                                handleClose();
                                            }, 2000);
                                        }}
                                    >
                                        Resend code ?
                                    </Form.Text>
                                </Row>


                            </Container>
                            <Row
                                style={{
                                    padding: 20,
                                }}
                            >



                                <Col>
                                    <Button
                                        style={
                                            {
                                                width: '100%'
                                            }
                                        }
                                        type='submit'
                                    >
                                        Verify
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

export default EmailVerification
