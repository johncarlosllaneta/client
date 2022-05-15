import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function SharedModal(props) {
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant={props.buttonYesColor === "Delete" ? "danger" : "primary"} onClick={props.handleConfirmButton} >{props.saveTitle}</Button>
            </Modal.Footer>

        </div >
    )
}

export default SharedModal;