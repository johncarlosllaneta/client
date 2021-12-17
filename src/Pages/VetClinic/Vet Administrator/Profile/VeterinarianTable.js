import React from 'react'
import { FloatingLabel, Form, Row, Button } from 'react-bootstrap'
import VeterinarianProfile from './VeterinarianProfile'

function VeterinarianTable(props) {
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
                            window.open("/registration/veterinarian", "_blank").focus();

                        }}
                        style={{
                            marginLeft: 10
                        }}
                    >
                        Register Veterinarian
                    </Button>
                </div>

            </Row>

            <Row
                style={{
                    marginTop: 20
                }}
            >
                <VeterinarianProfile />
            </Row>
        </div>
    )
}

export default VeterinarianTable
