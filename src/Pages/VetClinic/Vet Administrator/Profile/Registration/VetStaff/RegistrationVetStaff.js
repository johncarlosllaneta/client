import React, { useState, useEffect, useRef } from 'react'
import { Row, Image, Col, Container } from 'react-bootstrap'
import DataPrivacy from './DataPrivacy'
import { IoChevronBack } from "react-icons/io5";
import EmailPassword from './EmailPassword';
import EmailVerification from './EmailVerification';
import { Step, StepLabel, Stepper } from "@material-ui/core";
import CredentialDetails from './CredentialDetails';
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../../../../../Components/Host";


function RegistrationVetStaff() {

    window.addEventListener("beforeunload", function (event) {
        event.returnValue = "";
    });

    const [dataPrivacyController, setdataPrivacyController] = useState(false);
    const [credentialController, setcredentialController] = useState(true);
    const [verifyEmailController, setverifyEmailController] = useState(true);
    const [profileCredentialsController, setprofileCredentialsController] = useState(true);

    // Credentials
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fname, setfname] = useState();
    const [lname, setlname] = useState();
    const [mname, setmname] = useState();
    const [contactNumber, setcontactNumber] = useState();
    const [gender, setgender] = useState();
    const [digitalSignature, setdigitalSignature] = useState();



    //Alert Verify Code
    const [showAlert, setShowAlert] = useState(false);

    const handleCloseAlert = () => setShowAlert(false);
    const handleShowAlert = () => setShowAlert(true);


    const [activeStep, setactiveStep] = useState(0);
    function NextStep() {
        setactiveStep(activeStep + 1);
    }

    function acceptDataPrivacy(e) {
        e.preventDefault();
        setdataPrivacyController(true);
        setcredentialController(false);
        NextStep();
    }

    function backToDataPrivacy(e) {
        e.preventDefault();
        setdataPrivacyController(false);
        setcredentialController(true);
        setactiveStep(activeStep - 1);
    }

    function submitRegistration(e) {
        e.preventDefault();
        setverifyEmailController(false);
        setcredentialController(true);
        NextStep();

    }



    function finishRegistration(e) {

        console.log(e);


    }

    function sendEmail(e) {
        e.preventDefault();
        Axios.post(`${hostUrl}/verifyEmail`, {
            email: email
        })
    }

    function emailVerified() {
        setverifyEmailController(true);
        setprofileCredentialsController(false);
        NextStep();
    }

    return (
        <div>
            <Row className="mt-4">
                <div>
                    <a
                        href="/"
                        className="ml-5"
                        style={{
                            textDecoration: "none",
                            float: "left",
                            fontSize: 20,
                            display: "flex",
                            justifyContent: "start",
                        }}
                    >
                        <IoChevronBack className="mt-1 " />
                        Exit Registration
                    </a>
                </div>
            </Row>
            <Row
                hidden={dataPrivacyController}
            >
                <DataPrivacy acceptDataPrivacy={acceptDataPrivacy} />
            </Row>

            <Row
                hidden={credentialController}
            >
                <EmailPassword back={backToDataPrivacy} submitRegistration={submitRegistration} setEmail={setEmail} setPassword={setPassword} sendEmail={sendEmail} />
            </Row>


            <Row
                hidden={verifyEmailController}
            >
                <EmailVerification
                    email={email}
                    sendEmail={sendEmail}
                    showAlert={showAlert}
                    emailVerified={emailVerified}
                    handleCloseAlert={handleCloseAlert}
                    handleShowAlert={handleShowAlert}
                />
            </Row>


            <Row
                hidden={profileCredentialsController}
            >
                <CredentialDetails
                    email={email}
                    password={password}
                    finishRegistration={finishRegistration} />
            </Row>


            {/* Stepper */}
            <Row style={{ marginTop: 20 }}>
                <Col>
                    <Container style={{ padding: 0 }}>
                        <Stepper activeStep={activeStep}>
                            <Step>
                                <StepLabel>Data Privacy</StepLabel>
                            </Step>

                            <Step>
                                <StepLabel>Email & Password</StepLabel>
                            </Step>

                            <Step>
                                <StepLabel>Email Verification</StepLabel>
                            </Step>

                            <Step>
                                <StepLabel>Credentials</StepLabel>
                            </Step>


                        </Stepper>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default RegistrationVetStaff
