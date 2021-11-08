import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  Image,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { hostUrl } from "../../Components/Host";
import Axios from "axios";
import "../../css/PetMyCart.css";
import { Divider } from "@material-ui/core";

function CartHistory(props) {
  const [products, setproducts] = useState([]);
  const [productName, setproductName] = useState();
  const [productDescription, setproductDescription] = useState();
  const [totalPrice, settotalPrice] = useState();
  const [expire, setexpire] = useState();
  const [quantity, setquantity] = useState();
  const [productPic, setproductPic] = useState();
  const [reserveId, setreserveId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [showAlert, setShowAlert] = useState(false);
  // const handleCloseAlert = () => setShowAlert(false);
  // const handleShowAlert = () => setShowAlert(true);

  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(
        `${hostUrl}/reservation/history/${props.data.pet_owner_id}`
      ).then((response) => {
        setproducts(response.data);
        console.log(products);
      });
      setcounter(counter + 1);
    }
  }, [products]);

  function convertTimeExpired(date) {
    var time = new Date(date);
    let hours = time.toTimeString().split(":")[0];

    let timeConverted = 0;
    if (hours === "00") {
      timeConverted = 0;
    } else if (hours === "01") {
      timeConverted = 1;
    } else if (hours === "02") {
      timeConverted = 2;
    } else if (hours === "03") {
      timeConverted = 3;
    } else if (hours === "04") {
      timeConverted = 4;
    } else if (hours === "05") {
      timeConverted = 5;
    } else if (hours === "06") {
      timeConverted = 6;
    } else if (hours === "07") {
      timeConverted = 7;
    } else if (hours === "08") {
      timeConverted = 8;
    } else if (hours === "09") {
      timeConverted = 9;
    } else if (hours === "10") {
      timeConverted = 10;
    } else if (hours === "11") {
      timeConverted = 11;
    } else if (hours === "12") {
      timeConverted = 12;
    } else if (hours === "13") {
      timeConverted = 13;
    } else if (hours === "14") {
      timeConverted = 14;
    } else if (hours === "15") {
      timeConverted = 15;
    } else if (hours === "16") {
      timeConverted = 16;
    } else if (hours === "17") {
      timeConverted = 17;
    } else if (hours === "18") {
      timeConverted = 18;
    } else if (hours === "19") {
      timeConverted = 19;
    } else if (hours === "20") {
      timeConverted = 20;
    } else if (hours === "21") {
      timeConverted = 21;
    } else if (hours === "22") {
      timeConverted = 22;
    } else if (hours === "23") {
      timeConverted = 23;
    } else if (hours === "24") {
      timeConverted = 24;
    }

    return 24 - timeConverted;
    // console.log(time.toTimeString().split(':')[0]);
  }

  function handleCancel() {
    Axios.put(`${hostUrl}/reservation/cancel`, {
      reserveId: reserveId,
    }).then((response) => { });
    handleClose();
  }

  return (
    <div
      style={{
        width: "77vw",
        marginTop: 20,
      }}
    >
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              marginBottom: 10,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Image src={productPic} height={130} />
          </div>
          <Divider />
          <p>
            <strong>Product Name: </strong>
            {productName}
          </p>
          <p>
            <strong>Product Description: </strong>
            {productDescription}
          </p>
          <p>
            <strong>Quantity: </strong> {quantity}
          </p>
          <p>
            <strong>Expire in: </strong>
            {expire}hr/s
          </p>
          <p>
            <strong>Total price: </strong>₱{totalPrice}.00
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col>
          <Container>
            <h1
              style={{
                color: "#3BD2E3",
                textAlign: "left",
              }}
            >
              Reservation History
            </h1>
          </Container>
        </Col>

        <Col>
          <Container
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              href={"/my&cart"}
              style={{
                borderRadius: 20,
                border: "3px solid white",
                backgroundColor: "#3BD2E3",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: '5vw',
                minWidth: 150,
              }}
            >
              Back
            </Button>
          </Container>
        </Col>
      </Row>

      <Container
        id="itemHistory"
        style={{
          height: '50vh',
          backgroundColor: "white",
          borderRadius: 30,
          padding: 40,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          overflowY: "auto",
          marginTop: 20
        }}
      >
        {products.map((val) => {
          return (
            <div>
              <Card
                onClick={() => {
                  setproductName(val.product_name);
                  setproductDescription(val.product_desc);
                  setquantity(val.reserve_quantity);
                  settotalPrice(val.price * val.reserve_quantity);
                  setexpire(convertTimeExpired(val.date_reserve));
                  setproductPic(val.product_image);
                  setreserveId(val.reserve_id);
                  handleShow();
                }}
                style={{
                  padding: 20,
                  margin: 10,
                  cursor: 'pointer',
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <Row>
                  <Col
                    id='itemProduct'
                    sm={2}
                  // style={{
                  //   borderRight: "2px solid grey",
                  // }}
                  >
                    {/* date and time */}
                    <div style={{}}>
                      <Image src={val.product_image} height={100} />
                    </div>
                  </Col>
                  <Col
                    sm={3}
                    style={
                      {
                        // borderRight: '2px solid grey',
                      }
                    }
                  >
                    <div
                      style={{
                        marginTop: 20,

                        textAlign: "left",
                      }}
                    >
                      <h2>{val.product_name}</h2>

                      <h6
                        style={{
                          color: "#3BD2E3",
                        }}
                      >
                        {" "}
                        Product Name
                      </h6>
                    </div>
                  </Col>
                  <Col
                    sm={5}
                    style={
                      {
                        // borderRight: '2px solid grey',
                      }
                    }
                  >
                    {/* price */}
                    <Row>
                      <Col>
                        <div
                          style={{
                            marginTop: 10,
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <h5 style={{}}> ₱ {val.price}.00</h5>
                            <h6
                              style={{
                                color: "#3BD2E3",
                                marginTop: -10,
                              }}
                            >
                              {" "}
                              Price{" "}
                            </h6>
                          </div>

                          <div>
                            <h5 style={{}}>
                              {" "}
                              ₱ {val.price * val.reserve_quantity}.00
                            </h5>
                            <h6
                              style={{
                                color: "#3BD2E3",
                                marginTop: -10,
                              }}
                            >
                              {" "}
                              Total Price
                            </h6>
                          </div>
                        </div>
                      </Col>

                      <Col>
                        <div
                          style={{
                            marginTop: 10,
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <h5 style={{}}>{val.reserve_quantity}</h5>
                            <h6
                              style={{
                                color: "#3BD2E3",
                                marginTop: -10,
                              }}
                            >
                              {" "}
                              Quantity{" "}
                            </h6>
                          </div>

                          <div>
                            <h5 style={{}}>
                              {" "}
                              {convertTimeExpired(val.date_reserve)}hr/s
                            </h5>
                            <h6
                              style={{
                                color: "#3BD2E3",
                                marginTop: -10,
                              }}
                            >
                              {" "}
                              Expires in
                            </h6>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>

                </Row>
              </Card>
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default CartHistory;
