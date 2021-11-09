import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  Image,
  Modal,
  Navbar,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { hostUrl } from "../../Components/Host";
import Axios from "axios";
import "../../css/PetMyCart.css";
import { Divider } from "@material-ui/core";
import { IoNotificationsSharp } from "react-icons/io5";
import Avatar from "react-avatar";

const PetMyCart = (props) => {
  const [products, setproducts] = useState([]);
  const [productName, setproductName] = useState();
  const [productDescription, setproductDescription] = useState();
  const [totalPrice, settotalPrice] = useState();
  const [expire, setexpire] = useState();
  const [quantity, setquantity] = useState();
  const [productPic, setproductPic] = useState();
  const [reserveId, setreserveId] = useState("");
  const [productId, setproductId] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [showAlert, setShowAlert] = useState(false);
  // const handleCloseAlert = () => setShowAlert(false);
  // const handleShowAlert = () => setShowAlert(true);

  const [notifReserved, setnotifReserved] = useState([]);
  const [numberOfUnviewedReserved, setnumberOfUnviewedReserved] = useState(0);
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/reservation/${props.data.pet_owner_id}`).then(
        (response) => {
          setproducts(response.data);
          console.log(products);
        }
      );

      Axios.get(
        `${hostUrl}/petOwner/notification/reservation/length/${props.data.pet_owner_id}`
      ).then((response) => {
        setnumberOfUnviewedReserved(response.data.view);
        // alert(response.data.view);
      });

      setcounter(counter + 1);
    }
  }, [products, numberOfUnviewedReserved]);

  useEffect(() => {
    if (counter < 6) {
      Axios.get(
        `${hostUrl}/petOwner/notification/reservation/${props.data.pet_owner_id}`
      ).then((response) => {
        setnotifReserved(response.data);
      });
    }
  }, [notifReserved]);

  function convertTimeExpired(date) {
    var time = new Date();
    let hours = time.getHours();
    // alert(hours);
    let timeConverted = 0;
    if (hours == "00") {
      timeConverted = 0;
    } else if (hours == "01") {
      timeConverted = 1;
    } else if (hours == "02") {
      timeConverted = 2;
    } else if (hours == "03") {
      timeConverted = 3;
    } else if (hours == "04") {
      timeConverted = 4;
    } else if (hours == "05") {
      timeConverted = 5;
    } else if (hours == "06") {
      timeConverted = 6;
    } else if (hours == "07") {
      timeConverted = 7;
    } else if (hours == "08") {
      timeConverted = 8;
    } else if (hours == "09") {
      timeConverted = 9;
    } else if (hours == "10") {
      timeConverted = 10;
    } else if (hours == "11") {
      timeConverted = 11;
    } else if (hours == "12") {
      timeConverted = 12;
    } else if (hours == "13") {
      timeConverted = 13;
    } else if (hours == "14") {
      timeConverted = 14;
    } else if (hours == "15") {
      timeConverted = 15;
    } else if (hours == "16") {
      timeConverted = 16;
    } else if (hours == "17") {
      timeConverted = 17;
    } else if (hours == "18") {
      timeConverted = 18;
    } else if (hours == "19") {
      timeConverted = 19;
    } else if (hours == "20") {
      timeConverted = 20;
    } else if (hours == "21") {
      timeConverted = 21;
    } else if (hours == "22") {
      timeConverted = 22;
    } else if (hours == "23") {
      timeConverted = 23;
    } else if (hours == "24") {
      timeConverted = 24;
    }

    return 24 - hours;
    // console.log(time.toTimeString().split(':')[0]);
  }

  function dateConvertion(date) {
    var str = date.split("-");
    var year = str[0];
    var month;
    var day = str[2];

    if (str[1] === "01") {
      month = "January";
    } else if (str[1] === "02") {
      month = "February";
    } else if (str[1] === "03") {
      month = "March";
    } else if (str[1] === "04") {
      month = "April";
    } else if (str[1] === "05") {
      month = "May";
    } else if (str[1] === "06") {
      month = "June";
    } else if (str[1] === "07") {
      month = "July";
    } else if (str[1] === "08") {
      month = "August";
    } else if (str[1] === "09") {
      month = "September";
    } else if (str[1] === "10") {
      month = "October";
    } else if (str[1] === "11") {
      month = "November";
    } else if (str[1] === "12") {
      month = "December";
    }

    return month + " " + day + ", " + year;
  }

  function timeFormatter(time) {
    var timeCurrent = time.split(":");

    if (timeCurrent[0] == "16") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "17") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "18") {
      return "2:" + timeCurrent[1 + ":"] + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "19") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "20") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "21") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "22") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "23") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "24") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "01") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "02") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "03") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "04") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "05") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "06") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "07") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "08") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "09") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "10") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "11") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "12") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "13") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "14") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "15") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    }
  }

  const notifTitle = (
    <div>
      {String(numberOfUnviewedReserved) === "0" ? (
        <Badge bg="primary" pill style={{ fontSize: 25, color: "whitesmoke" }}>
          <IoNotificationsSharp style={{ fontSize: 30, color: "whitesmoke" }} />
        </Badge>
      ) : (
        <Badge bg="primary" pill style={{ fontSize: 25, color: "whitesmoke" }}>
          <IoNotificationsSharp style={{ fontSize: 30, color: "whitesmoke" }} />
          {String(numberOfUnviewedReserved)}
        </Badge>
      )}
    </div>
  );

  function handleCancel() {
    Axios.put(`${hostUrl}/reservation/cancel`, {
      id: reserveId,
      product_id: productId,
      quantity: quantity,
    }).then((response) => {
      if (response.data.message === "Cancelled Reservation") {
        Axios.get(
          `${hostUrl}/petOwner/notification/reservation/${props.data.pet_owner_id}`
        ).then((response) => {
          setnotifReserved(response.data);
        });
        Axios.post(`${hostUrl}/notification/reserved/cancelled`, {
          reserve_id: reserveId,
          product_id: productId,
          status: "Cancelled",
        });
      }
    });


    handleClose();
  }

  function viewing() {
    Axios.put(
      `${hostUrl}/petOwner/notification/reservation/viewed/${props.data.pet_owner_id}`
    );
  }

  return (
    <div
      style={{
        width: "77vw",
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
          <Container style={{ display: "flex", flexDirection: "row" }}>
            <h1
              style={{
                color: "#3BD2E3",
                textAlign: "left",
              }}
            >
              Reservation
            </h1>
            <Navbar>
              <NavDropdown title={notifTitle} onClick={viewing}>
                <NavDropdown.Header>Notification</NavDropdown.Header>
                <div style={{ height: 400, overflowY: "auto", width: 420 }}>
                  {notifReserved.length > 0 ? (
                    notifReserved.map((val) => {
                      return (
                        <NavDropdown.Item style={{ width: 400 }}>
                          <div>
                            <Row>
                              <Col>
                                <text>
                                  {dateConvertion(
                                    val.date_time_created
                                      .toString()
                                      .split("T")[0]
                                  )}
                                </text>
                              </Col>
                              <Col>
                                <text style={{ float: "right" }}>
                                  {timeFormatter(
                                    val.date_time_created
                                      .toString()
                                      .split("T")[1]
                                      .substring(
                                        0,
                                        val.date_time_created
                                          .toString()
                                          .split("T")[1].length - 5
                                      )
                                  )}
                                </text>
                              </Col>
                            </Row>
                            <Row>
                              <Col
                                sm={3}
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {" "}
                                <Avatar
                                  round={true}
                                  size={60}
                                  src={val.vet_picture}
                                  name={val.vet_name}
                                />
                              </Col>
                              <Col sm={9}>
                                <Row>{val.vet_name}</Row>
                                <Row>{val.product_name}</Row>
                                <Row>Status:{val.status}</Row>
                              </Col>
                            </Row>
                          </div>
                        </NavDropdown.Item>
                      );
                    })
                  ) : (
                    <h5>No notification</h5>
                  )}
                </div>
              </NavDropdown>
            </Navbar>
          </Container>
        </Col>

        <Col>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: 15,
            }}
          >
            <Button
              href={"/pet owner/Show Now"}
              style={{
                borderRadius: 20,
                border: "3px solid white",
                backgroundColor: "#3BD2E3",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: '5vw',
                minWidth: 150,
                fontSizeAdjust: 'inherit'
              }}
            >
              Shop now
            </Button>

            <Button
              href={"/my&cart/history"}
              style={{
                borderRadius: 20,
                border: "3px solid white",
                backgroundColor: "#3BD2E3",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: '5vw',
                minWidth: 150,
                fontSizeAdjust: 'inherit'
              }}
            >
              History
            </Button>
          </Container>
        </Col>
      </Row>

      <Container
        id="itemHistory"
        style={{
          height: '55vh',
          backgroundColor: "white",
          borderRadius: 30,
          padding: 40,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          overflowY: "auto",
          marginBottom: 20
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
                  setproductId(val.product_id);
                  // alert(val.product_id);
                  handleShow();
                }}
                style={{
                  padding: 20,
                  margin: 10,
                  cursor: 'pointer'
                }}
              >
                <Row>
                  <Col
                    id="itemProduct"
                    sm={2}

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
};

export default PetMyCart;
