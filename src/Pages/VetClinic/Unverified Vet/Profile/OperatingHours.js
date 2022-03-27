import React from 'react'
import { Col, Container, Row, Form, FloatingLabel } from 'react-bootstrap'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';



function OperatingHours() {
    return (
        <div>
            <Container
                style={{
                    padding: 15
                }}
            >
                <div
                    style={{
                        textAlign: 'left',
                        padding: 20,
                        color: 'grey'
                    }}
                >
                    <h5>Specify the operating hours:</h5>
                </div>
                <Row>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            Monday
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FormControlLabel control={<Switch defaultChecked />} label="Open" />
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Opening"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Closing"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            Tuesday
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FormControlLabel control={<Switch defaultChecked />} label="Open" />
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Opening"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Closing"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            Wednesday
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FormControlLabel control={<Switch defaultChecked />} label="Open" />
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Opening"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Closing"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            Thursday
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FormControlLabel control={<Switch defaultChecked />} label="Open" />
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Opening"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Closing"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            Friday
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FormControlLabel control={<Switch defaultChecked />} label="Open" />
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Opening"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Closing"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            Saturday
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FormControlLabel control={<Switch defaultChecked />} label="Open" />
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Opening"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Closing"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            Sunday
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FormControlLabel control={<Switch defaultChecked />} label="Open" />
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Opening"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                    <Col>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Closing"
                                className="mb-3"
                            >
                                <Form.Control type="time" placeholder="mon" />
                            </FloatingLabel>
                        </Container>
                    </Col>
                </Row>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start'
                    }}
                >
                    <Button
                        variant='contained'
                    >
                        Launch
                    </Button>
                </div>
            </Container>
        </div >
    )
}

export default OperatingHours