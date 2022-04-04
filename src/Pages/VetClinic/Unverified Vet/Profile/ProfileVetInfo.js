import React from 'react'
import { FloatingLabel, Form, Row } from 'react-bootstrap'

function ProfileVetInfo(props) {
    return (
        <div>
            <Row>
                <div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Contact Number"
                        className="mb-3"
                    >
                        <Form.Control value={props.user.vet_contact_number} readOnly={true} />
                    </FloatingLabel>


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Address"
                        className="mb-3"
                    >
                        <Form.Control type='textarea' value={props.user.vet_address} readOnly={true} />
                    </FloatingLabel>

                </div>

            </Row>
        </div>
    )
}

export default ProfileVetInfo