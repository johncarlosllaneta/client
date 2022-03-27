import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Modal } from "react-bootstrap";

import dashboardImage from "../../../../Images/dashboard.png";
import emailVerification from "../../../../Images/emailVerification.png";

import { Button } from "@mui/material";
import NavUnverifiedVet from '../../../../Components/navBarHome/NavUnverifiedVet';
import getUser from '../../../../Components/userData';
import ModalSuccessEmailVerification from './ModalSuccessEmailVerification';
import { hostUrl } from '../../../../Components/Host';
import axios from 'axios';

function DashboardContent() {
    const [user, setuser] = useState([]);
    useEffect(async () => {
        const userData = await getUser();
        setuser(userData);
    }, []);

    // Email Verification Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Success Sent Verification
    const [showSuccessEmailVerification, setShowSuccessEmailVerification] = useState(false);

    const handleCloseSuccessEmailVerification = () => setShowSuccessEmailVerification(false);
    const handleShowSuccessEmailVerification = () => setShowSuccessEmailVerification(true);


    function sendEmailVerification() {
        axios.post(`${hostUrl}/verifyEmail/vetadmin`, {
            email: user.email,
            hostUrl: hostUrl
        }).then((response) => {
            if (response.data == 'Success') {
                handleCloseSuccessEmailVerification();
            }
        })
    }

    return (
        <div
            style={{
                width: "80%",
                border: "1px",
                float: "left",
                margin: 0,
                padding: 0,
            }}
        >
            {/* Email Success Verification */}
            <Modal
                show={showSuccessEmailVerification} onHide={handleCloseSuccessEmailVerification}
                backdrop="static"
                keyboard={false}
                centered
            >
                <ModalSuccessEmailVerification />
            </Modal>

            {/* Verify Email */}
            <Modal show={show} onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >

                <Modal.Body
                    style={{
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center',

                        }}
                    >
                        <Image src={emailVerification} width={'100%'} />
                    </div>
                    <div
                        style={{
                            display: 'block',
                            justifyContent: "flex-start",
                            color: 'white',
                            backgroundColor: '#314051',
                            padding: 10,
                        }}
                    >
                        <h4>Email Verification</h4>
                        <p>Your email should be verify first bafore managing this account. press the button to verify your account.</p>
                        <Button
                            style={{
                                color: 'white'
                            }}
                            onClick={() => {
                                handleClose();
                                handleShowSuccessEmailVerification();
                                sendEmailVerification();
                            }}
                        >
                            Verify Now
                        </Button>
                    </div>

                </Modal.Body>

            </Modal>


            <div style={{ height: "15%", border: "1px ", padding: 0 }}>
                <NavUnverifiedVet showLogo={true} showHome={true} />
            </div>
            <div style={{ height: "85%", border: "1px", padding: 5 }}>
                <div
                    style={{
                        padding: 30,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            width: "75vw",
                            height: "80vh",
                        }}
                    >
                        <Row>
                            <Col>
                                <h1
                                    style={{
                                        color: "#0A94A4",
                                        textAlign: "left",
                                        marginTop: 250,
                                        fontSize: 50,
                                    }}
                                >
                                    Welcome to TerraVet
                                </h1>
                                <p style={{ textAlign: "left", fontSize: 20 }}>
                                    This account belongs to the veterinary clinic.
                                    <br />
                                    Your account is currently unverified. Verify your account
                                    and you will have access to more features and services.
                                </p>
                                {user.length != 0 ?
                                    <Button
                                        hidden={user.isEmailVerify == 0 ? false : true}
                                        onClick={() => {

                                            if (user.isEmailVerify == 0) {
                                                handleShow();
                                            }
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                    : <></>
                                }

                            </Col>

                            <Col>
                                <Image
                                    src={dashboardImage}
                                    style={{
                                        height: 505,
                                        marginTop: 100,
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent