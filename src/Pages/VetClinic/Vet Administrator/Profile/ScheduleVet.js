import React from 'react'
import { Row, Col } from 'react-bootstrap'

function ScheduleVet(props) {
    return (
        <div
            style={{
                display: 'block'
            }}
        >
            <Row
                style={{
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    marginBottom: 10
                }}
            >
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            padding: 5,
                            paddingBottom: 0
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bolder'
                            }}
                        >Monday</h6>
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            padding: 5,
                            paddingBottom: 0
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bolder'
                            }}
                        >Tuesday</h6>
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            padding: 5,
                            paddingBottom: 0
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bolder'
                            }}
                        >Wednesday</h6>
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            padding: 5,
                            paddingBottom: 0
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bolder'
                            }}
                        >Thursday</h6>
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            padding: 5,
                            paddingBottom: 0
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bolder'
                            }}
                        >Friday</h6>
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            padding: 5,
                            paddingBottom: 0
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bolder'
                            }}
                        >Saturday</h6>
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            padding: 5,
                            paddingBottom: 0
                        }}
                    >
                        <h6
                            style={{
                                fontWeight: 'bolder'
                            }}
                        >Sunday</h6>
                    </div>
                </Col>
            </Row>
            <Row
                style={{
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    marginBottom: 30
                }}
            >
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            paddingBottom: 0,

                        }}
                    >
                        {props.OpeningMonday != 'Closed' && props.ClosingMonday != 'Closed' ? <p style={{ fontSize: '0.70vw' }}>{props.OpeningMonday + " - " + props.ClosingMonday}</p> : <p>Closed</p>}
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            paddingBottom: 0,

                        }}
                    >
                        {props.OpeningTuesday != 'Closed' && props.ClosingTuesday != 'Closed' ? <p style={{ fontSize: '0.70vw' }}>{props.OpeningTuesday + " - " + props.ClosingTuesday}</p> : <p>Closed</p>}
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            paddingBottom: 0,

                        }}
                    >
                        {props.OpeningWednesday != 'Closed' && props.ClosingWednesday != 'Closed' ? <p style={{ fontSize: '0.70vw' }}>{props.OpeningWednesday + " - " + props.ClosingWednesday}</p> : <p>Closed</p>}
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            paddingBottom: 0,

                        }}
                    >
                        {props.OpeningThursday != 'Closed' && props.ClosingThursday != 'Closed' ? <p style={{ fontSize: '0.70vw' }}>{props.OpeningThursday + " - " + props.ClosingThursday}</p> : <p>Closed</p>}
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            paddingBottom: 0,

                        }}
                    >
                        {props.OpeningFriday != 'Closed' && props.ClosingFriday != 'Closed' ? <p style={{ fontSize: '0.70vw' }}>{props.OpeningFriday + " - " + props.ClosingFriday}</p> : <p>Closed</p>}
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            paddingBottom: 0,

                        }}
                    >
                        {props.OpeningSaturday != 'Closed' && props.ClosingSaturday != 'Closed' ? <p style={{ fontSize: '0.70vw' }}>{props.OpeningSaturday + " - " + props.ClosingSaturday}</p> : <p>Closed</p>}
                    </div>
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            paddingBottom: 0,

                        }}
                    >
                        {props.OpeningSunday != 'Closed' && props.ClosingSunday != 'Closed' ? <p style={{ fontSize: '0.70vw' }}>{props.OpeningSunday + " - " + props.ClosingSunday}</p> : <p>Closed</p>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ScheduleVet
