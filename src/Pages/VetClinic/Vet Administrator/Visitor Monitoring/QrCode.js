import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Image, Row, Col } from 'react-bootstrap'
import { users } from '../../../../Components/User';
import logo from "../../../../Images/logo.png";
import QRCode from "qrcode";

function QrCode() {

    const [qrCode, setqrCode] = useState("");
    const [vetName, setvetName] = useState();



    useEffect(() => {
        QRCode.toDataURL(`${users[0].vetid}`).then(setqrCode);
    }, []);
    return (
        <div>
            <Image
                src={logo}
                style={{
                    height: 50,
                    marginTop: 50
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
                Qr Code
            </h1>
            <Container
                style={{
                    backgroundColor: "white",
                    display: "block",
                    justifyContent: "center",
                    alignItems: 'center',
                    minWidth: 350,
                    maxWidth: "60%",
                    width: 600,
                    height: 600,
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: 30,
                    padding: 10,
                    marginBottom: 20
                }}
            >

                <div
                    style={{
                        marginTop: 30
                    }}
                >
                    <Image
                        src={qrCode}
                        alt={"QrCode"}
                        style={{ height: 350, maxWidth: "100%" }}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'end'
                    }}
                >
                    <h3
                        style={{
                            textAlign: "center",
                            fontSizeAdjust: 50,
                            color: "#0A94A4",
                            fontWeight: "bold",
                            fontOpticalSizing: "auto",
                        }}
                    >
                        Scan Me
                    </h3>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'end'
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            fontSizeAdjust: 50,
                            color: "#0A94A4",
                            fontWeight: "bold",
                            fontOpticalSizing: "auto",
                        }}
                    >
                        {users[0].vet_name}
                    </h2>
                </div>
                <div>
                    <Button
                        style={{
                            backgroundColor: "#3BD2E3",
                            borderRadius: 30,
                            paddingLeft: 40,
                            paddingRight: 40,
                            borderColor: "#FFFFFF",
                        }}
                        download
                        href={qrCode}
                    >
                        Download
                    </Button>
                </div>



            </Container>
        </div>
    )
}

export default QrCode