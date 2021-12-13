import React, { useState, useEffect } from 'react'
import { Row, Image, Col, Container } from 'react-bootstrap'
import DataPrivacy from './DataPrivacy'
import { IoChevronBack } from "react-icons/io5";
import EmailPassword from './EmailPassword';


function RegistrationVeterinarian() {
    const [dataPrivacyController, setdataPrivacyController] = useState(false);
    const [credentialController, setcredentialController] = useState(true);

    function acceptDataPrivacy(e) {
        e.preventDefault();
        setdataPrivacyController(true);
        setcredentialController(false)
    }


    function back(e) {
        e.preventDefault();
        setdataPrivacyController(false);
        setcredentialController(true)
    }
    function submitRegistration(e) {

    }



    return (
        <div>
            <Row className="mt-4">
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
                    Return to Home
                </a>
            </Row>
            <Row
                hidden={dataPrivacyController}
            >
                <DataPrivacy acceptDataPrivacy={acceptDataPrivacy} />
            </Row>

            <Row
                hidden={credentialController}
            >
                <EmailPassword back={back} />
            </Row>
        </div>
    )
}

export default RegistrationVeterinarian
