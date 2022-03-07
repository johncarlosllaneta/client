import React from 'react'
import AppointmentTable from './AppointmentTable'
import {
    Button,
    Modal,
    Form,
    OverlayTrigger,
    Popover,
    Overlay,
    FloatingLabel,
    Row,
    Container,
} from "react-bootstrap";

function PanelTableController(props) {
    // alert(props.vetid)
    return (
        <div
            style={{

            }}
        >
            <Row>
                <Container>
                    <AppointmentTable vetid={props.vetid} />
                </Container>
            </Row>

        </div>
    )
}

export default PanelTableController
