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

function PanelTableController() {
    return (
        <div
            style={{
                height: '55vh'
            }}
        >
            <Row>
                <Container>
                    <AppointmentTable />
                </Container>
            </Row>

        </div>
    )
}

export default PanelTableController
