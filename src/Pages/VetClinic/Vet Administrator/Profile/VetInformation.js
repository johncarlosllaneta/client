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
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline'
                                }}
                            >
                                <IoMailSharp
                                    style={{
                                        color: '#57D4FF',
                                        fontSize: '3vw',
                                        display: 'inline'
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'inline'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'block'
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
                        <Col xs={3}>
                            <IoLocationSharp
                                style={{
                                    color: '#57D4FF',
                                    fontSize: '3vw'
                                }}
                            />
                        </Col>

                        <Col xs={9}
                            style={{
                                padding: 0
                            }}
                        >
                            <div
                                style={{
                                    display: 'block'
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
                        </Col>
                    </Row>
                </Col>



                <Col>
                    <Row>
                        <Col xs={3}>
                            <AiFillPhone
                                style={{
                                    color: '#57D4FF',
                                    fontSize: '3vw'
                                }}
                            />
                        </Col>

                        <Col xs={9}
                            style={{
                                padding: 0
                            }}
                        >
                            <div
                                style={{
                                    display: 'block'
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
                        </Col>
                    </Row>
                </Col>



            </Row>
        </div>
    )
}

export default VetInformation
