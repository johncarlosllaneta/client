import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiFillPhone } from 'react-icons/ai'
import { IoLocationSharp, IoMailSharp } from 'react-icons/io5'

function VetInformation(props) {
    return (
        <div>
            <Row>
                <Col>
                    <Row>
                        <Col
                            style={{
                                padding: 0,
                                display: 'inline-flex'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <IoMailSharp
                                    style={{
                                        color: '#57D4FF',
                                        fontSize: '3vw',
                                        // display: 'inline'
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'block',
                                        padding: 10
                                    }}
                                >
                                    <h5
                                        style={{
                                            marginBottom: 0
                                        }}
                                    >
                                        {props.user.email}
                                    </h5>
                                    <p
                                        style={{
                                            color: '#57D4FF',
                                            fontSize: 'inherit'
                                        }}
                                    >
                                        Email
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>



                <Col>
                    <Row>
                        <Col
                            style={{
                                padding: 0,
                                display: 'inline-flex'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <IoLocationSharp
                                    style={{
                                        color: '#57D4FF',
                                        fontSize: '3vw',
                                        // display: 'inline'
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'block',
                                        padding: 10
                                    }}
                                >
                                    <h5
                                        style={{
                                            marginBottom: 0
                                        }}
                                    >
                                        {props.user.vet_address}
                                    </h5>
                                    <p
                                        style={{
                                            color: '#57D4FF',
                                            fontSize: 'inherit'
                                        }}
                                    >
                                        Address
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>



                <Col>
                    <Row>
                        <Col
                            style={{
                                padding: 0,
                                display: 'inline-flex'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <AiFillPhone
                                    style={{
                                        color: '#57D4FF',
                                        fontSize: '3vw',
                                        // display: 'inline'
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'block',
                                        padding: 10
                                    }}
                                >
                                    <h5
                                        style={{
                                            marginBottom: 0
                                        }}
                                    >
                                        {props.user.vet_contact_number}
                                    </h5>
                                    <p
                                        style={{
                                            color: '#57D4FF',
                                            fontSize: 'inherit'
                                        }}
                                    >
                                        Contact Number
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>






            </Row>
        </div>
    )
}

export default VetInformation
