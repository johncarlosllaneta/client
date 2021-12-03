import React from 'react'
import { Card, Row, Col } from "react-bootstrap";

function DashboardContainer(props) {
    return (
        <div>
            <Card
                style={{
                    backgroundColor: 'white',
                    color: "#3BD2E3",
                    height: "15vh",
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
            >
                <Card.Body
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Row>
                        <Col>

                            {props.icon}
                        </Col>
                        <Col>

                            <h2
                                style={{
                                    marginBottom: 0
                                }}
                            >{isNaN(props.quantity) ? '--' : props.quantity}</h2>
                            <strong
                                style={{
                                    marginTop: 0
                                }}
                            >{props.category}</strong>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default DashboardContainer
