import React from 'react'
import {
    Button,
    Modal,
    OverlayTrigger,
    Popover,
    Overlay,
    Image,
    Container,
    Navbar,
    NavDropdown,
    Row,
    Col,
} from "react-bootstrap";

function ProductDescription(props) {
    return (
        <Container>
            <Modal.Header closeButton>
                <Modal.Title>Reservation Infomation</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Container
                    style={{
                        display: "flex",
                        justifyContent: "center",

                        padding: 0,
                        margin: 0,
                    }}
                >
                    <Image
                        src={props.productInfo.product_image}
                        rounded
                        style={{
                            width: 450,
                            height: 450,
                        }}
                    />
                </Container>
                <h2
                    style={{
                        fontWeight: "bold",
                        color: "#19B9CC",
                        marginBottom: 0
                    }}
                >
                    Product Name
                </h2>
                <p
                    style={{
                        fontWeight: "bold",
                        marginBottom: 0,
                        textAlign: 'center'
                    }}
                >
                    {props.productInfo.product_name}
                </p>

                <h4
                    style={{
                        fontWeight: "bold",
                        color: "#19B9CC",
                        marginBottom: 0
                    }}
                >
                    Product Description
                </h4>
                <p
                    style={{
                        fontWeight: "bold",
                        marginBottom: 0
                    }}
                >
                    {props.productInfo.product_desc}
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 0,

                    }}
                >
                    <div>
                        <h4
                            style={{
                                fontWeight: "bold",
                                color: "#19B9CC",
                                marginBottom: 0
                            }}
                        >
                            Quantity
                        </h4>
                        <p
                            style={{
                                fontWeight: "bold",
                                marginBottom: 0
                            }}
                        >
                            {props.productInfo.quantity}
                        </p>
                    </div>
                    <div>
                        <h4
                            style={{
                                fontWeight: "bold",
                                color: "#19B9CC",
                                marginBottom: 0
                            }}
                        >
                            Total Price
                        </h4>
                        <p
                            style={{
                                fontWeight: "bold",
                                marginBottom: 0
                            }}
                        >
                            {"₱ " +
                                props.productInfo.price +
                                ".00"}
                        </p>
                    </div>
                </div>

            </Modal.Body>
        </Container>
    )
}

export default ProductDescription