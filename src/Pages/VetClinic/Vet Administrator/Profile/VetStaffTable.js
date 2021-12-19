import React from 'react'
import { FloatingLabel, Form, Row, Button } from 'react-bootstrap'
import VetStaffProfile from './VetStaffProfile'

function VetStaffTable(props) {
    return (
        <div>
            <Row

            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                        height: '5vh'
                    }}
                >
                    <div>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Search"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="search"

                            />
                        </FloatingLabel>
                    </div>
                    <Button
                        onClick={() => {
                            window.open("/registration/vet staff", "_blank").focus();

                        }}
                        style={{
                            marginLeft: 10
                        }}
                    >
                        Register Vet Staff
                    </Button>
                </div>

            </Row>

            <Row
                style={{
                    marginTop: 20
                }}
            >
                <VetStaffProfile />
            </Row>
        </div>
    )
}

export default VetStaffTable
