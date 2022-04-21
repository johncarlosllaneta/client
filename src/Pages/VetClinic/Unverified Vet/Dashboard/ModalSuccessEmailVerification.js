import React from 'react'
import { Image, Modal } from 'react-bootstrap';
import emailSuccessVerification from "../../../../Images/emailSuccessVerification.png";

function ModalSuccessEmailVerification() {
    return (
        <div>
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
                    <Image src={emailSuccessVerification} width={'100%'} />
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
                    <p>Verification email has been sent to your email.</p>
                    <p>Confirm your account before signing in again.</p>
                </div>

            </Modal.Body>
        </div>
    )
}

export default ModalSuccessEmailVerification