import React from 'react'
import { Modal, Alert } from "react-bootstrap";

function ModalAlertProductView(props) {
    const [show, setShow] = useState(false);

    return (
        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Alert variant={props.variant} >
                        <Alert.Heading>Product Information</Alert.Heading>
                        <Container>
                            <Container
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Image src={props.productInfo.product_image} rounded />
                            </Container>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    color: "#19B9CC",
                                }}
                            >
                                Product Name
                            </h2>
                            <p
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                {props.productInfo.product_name}
                            </p>

                            <h2
                                style={{
                                    fontWeight: "bold",
                                    color: "#19B9CC",
                                }}
                            >
                                Product Description
                            </h2>
                            <p
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                {props.productInfo.product_desc}
                            </p>


                        </Container>

                    </Alert>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export { ModalAlertProductView }
