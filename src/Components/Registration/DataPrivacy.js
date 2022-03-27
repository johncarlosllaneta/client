import React from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Image,
    FloatingLabel,
} from "react-bootstrap";
import DataPrivacyNotice from '../DataPrivacyNotice';
import logo from "../../../src/Images/logo.png";
import { Button } from '@mui/material';

function DataPrivacy(props) {
    return (
        <Col>
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
            <h1
                style={{
                    textAlign: "center",
                    fontSizeAdjust: 50,
                    color: "#0A94A4",
                    fontWeight: "bold",
                    fontOpticalSizing: "auto",
                }}
            >
                Data Privacy Notice
            </h1>

            <Container
                id="dataPrivacy"
                style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    minWidth: 350,
                    maxWidth: "60%",
                    width: 600,
                    height: 550,
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: 30,
                    padding: 10,
                }}
            >
                <DataPrivacyNotice />
            </Container>
            <Button
                style={{
                    backgroundColor: "#0A94A4",
                    width: "25%",
                    borderRadius: 5,
                    color: 'white',
                    fontWeight: "bold",
                    fontSize: 15,
                    textAlign: "center",
                }}
                className="mt-3" onClick={props.nextStep}>
                I Accept Privacy Policy
            </Button>
        </Col>
    )
}

export default DataPrivacy