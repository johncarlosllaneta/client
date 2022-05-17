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
                <h4
                    style={{
                        fontWeight: "bold",
                        color: "#19B9CC",
                        marginBottom: 0,
                        textAlign: 'center',
                    }}
                >
                    Product Name
                </h4>
                <p
                    style={{
                        fontWeight: "bold",
                        marginBottom: 0,
                        textAlign: 'center',
                        fontSize: 14
                    }}
                >
                    {props.productInfo.product_name}
                </p>

                <h6
                    style={{
                        fontWeight: "bold",
                        color: "#19B9CC",
                        marginBottom: 0
                    }}
                >
                    Product Description
                </h6>
                <p
                    style={{
                        fontWeight: "bold",
                        marginBottom: 0,
                        fontSize: 12
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
                        <h6
                            style={{
                                fontWeight: "bold",
                                color: "#19B9CC",
                                marginBottom: 0
                            }}
                        >
                            Quantity
                        </h6>
                        <p
                            style={{
                                fontWeight: "bold",
                                marginBottom: 0,
                                fontSize: 14
                            }}
                        >
                            {props.productInfo.quantity}
                        </p>
                    </div>
                    <div>
                        <h6
                            style={{
                                fontWeight: "bold",
                                color: "#19B9CC",
                                marginBottom: 0
                            }}
                        >
                            Total Price
                        </h6>
                        <p
                            style={{
                                fontWeight: "bold",
                                marginBottom: 0,
                                fontSize: 14
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