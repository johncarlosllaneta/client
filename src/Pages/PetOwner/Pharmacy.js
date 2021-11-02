import React, { useEffect, useState } from "react";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import background from "../../Images/bg.png";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  FloatingLabel,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
import "../../css/ProductShop.css";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import { IoMdAdd } from "react-icons/io";
import { BiMinus } from "react-icons/bi";

function Pharmacy() {
  let { vetid } = useParams();

  const [counters, setcounters] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (counters < 6) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });
      setcounters(counters + 1);
    }
  }, [counters, user]);

  const [pharmacy, setpharmacy] = useState([]);

  useEffect(() => {
    if (counters < 6) {
      Axios.get(`${hostUrl}/pharmacy/${vetid}`).then((response) => {
        setpharmacy(response.data);
        // console.log(pharmacy);
      });
    }
  }, [pharmacy]);

  // Product details
  const [productImage, setproductImage] = useState();
  const [productName, setproductName] = useState();
  const [productDescription, setproductDescription] = useState();
  const [productPrice, setproductPrice] = useState();
  const [productQuantity, setproductQuantity] = useState();

  // Product Orders
  const [productID, setproductID] = useState();
  let orders = [];
  var ors = [];
  const [addToCart, setaddToCart] = useState(false);
  const [notToCart, setnotToCart] = useState(true);
  const [counter, setcounter] = useState(0);
  const [productsOrder, setproductsOrder] = useState([]);
  const [placeOrderController, setplaceOrderController] = useState(true);
  const [minusController, setminusController] = useState(true);
  const [reservationController, setreservationController] = useState(true);
  const [total, settotal] = useState(0);

  useEffect(() => {
    if (productsOrder.length >= 1) {
      let totals = 0;
      productsOrder.map((val) => {
        totals = parseInt(val.productPrice) * val.orderQuantity;
      });
      settotal(total + totals);
    }
  }, [productsOrder]);

  useEffect(() => {
    if (counter > 0) {
      setplaceOrderController(false);
      setminusController(false);
    } else {
      setplaceOrderController(true);
      setminusController(true);
    }
  }, [counter]);

  useEffect(() => {
    if (productsOrder.length > 0) {
      setreservationController(false);
    } else {
      setreservationController(true);
    }
  }, [productsOrder]);

  // Modal Controller
  const [showProductDetails, setShowProductDetails] = useState(false);
  const handleCloseProductDetails = () => setShowProductDetails(false);
  const handleShowProductDetails = () => setShowProductDetails(true);

  // Modal Spinner Controller
  const [showSpinner, setShowSpinner] = useState(false);
  const handleCloseSpinner = () => setShowSpinner(false);
  const handleShowSpinner = () => setShowSpinner(true);

  // Search
  const [q, setq] = useState("");
  const [category, setcategory] = useState("");
  const [typePet, settypePet] = useState(vetid);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    // console.log(columns);
    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "90vh",
        marginTop: 110,
        zoom: value,
      }}
    >
      <Modal
        show={showProductDetails}
        onHide={handleCloseProductDetails}
        centered
        size="lg"
      >
        <Modal.Body>
          <Row>
            <Col>
              {/* Image */}
              <Image src={productImage} sizes={800} />
            </Col>
            <Col>
              {/* Content */}
              <h1>{productName}</h1>
              <div
                style={{
                  height: 200,
                }}
              >
                <p>{productDescription}</p>
              </div>

              <div>
                <strong>
                  {" "}
                  <p
                    style={{
                      color: "#3BD2E3",
                      display: "inline",
                    }}
                  >
                    {" "}
                    Price:{" "}
                  </p>
                  <p
                    style={{
                      display: "inline",
                    }}
                  >
                    {" "}
                    ₱ {productPrice}.00
                  </p>
                </strong>
              </div>

              <div>
                <strong>
                  {" "}
                  <p
                    style={{
                      color: "#3BD2E3",
                      display: "inline",
                    }}
                  >
                    {" "}
                    Status:{" "}
                  </p>
                  <p
                    style={{
                      display: "inline",
                    }}
                  >
                    {" "}
                    {productQuantity !== 0 ? "Available" : "Not Available"} pcs.
                    left
                  </p>
                </strong>
              </div>

              <Container
                hidden={notToCart}
                // hidden={false}
                style={{}}
              >
                <Row>
                  <Col>
                    <Button
                      variant="secondary"
                      style={{
                        width: "100%",
                      }}
                      onClick={(e) => {
                        setaddToCart(false);
                        setnotToCart(true);

                        e.preventDefault();
                      }}
                    >
                      Back
                    </Button>
                  </Col>
                </Row>
              </Container>

              <Container
                hidden={addToCart}
                style={{
                  marginTop: 30,
                }}
              >
                <Row>
                  <Col>
                    <Button
                      variant="secondary"
                      onClick={handleCloseProductDetails}
                      style={{
                        width: "100%",
                      }}
                    >
                      Close
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <NavBarAppointments />

      <div
        style={{
          display: "flex",
          padding: 20,
        }}
      >
        <div>
          <Button
            href={`/petOwner/Appointment/vetdetails/category/${vetid}`}
            style={{
              display: "inline",
              backgroundColor: "#3BD2E3",
              paddingLeft: 30,
              paddingRight: 30,
              borderRadius: 30,
              borderColor: "#FFFFFF",
              marginLeft: 30,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            Back
          </Button>
        </div>
      </div>

      <Row>
        <Col>
          <Container
            style={{
              backgroundColor: "white",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              height: "70vh",
              marginTop: 10,
              paddingTop: 50,
            }}
          >
            <Container>
              <h5
                style={{
                  color: "#696969",
                  fontWeight: "bold",
                  display: "inline",

                  fontSize: 40,
                }}
              >
                Pharmacy
              </h5>
            </Container>
            {/*Menus */}
            <div
              style={{
                height: "5vh",
              }}
            >
              <Row>
                <Col>
                  <div
                    style={{
                      width: 300,
                    }}
                  >
                    <Form.Group
                      as={Row}
                      controlId="formHorizontalEmail"
                      style={{
                        marginTop: 0,
                        marginLeft: 30,
                      }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setq(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </Col>

                <Col>
                  <div>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalEmail"
                    >
                      <Form.Label column sm={4}>
                        Type of pet
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Select
                          onChange={(e) => {
                            settypePet(e.target.value);
                            e.preventDefault();
                          }}
                        >
                          <option value={vetid}>All</option>
                          <option value={"Cat"}>Cat</option>
                          <option value={"Dog"}>Dog</option>
                          <option value={"Home Pets"}>Home Pets</option>
                        </Form.Select>
                      </Col>
                    </Form.Group>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </div>

            {/* Content */}

            <div
              style={{
                width: "100%",
                height: "70%",
                backgroundColor: "grey",
                marginTop: 10,
                borderRadius: 30,
                display: "flex",
                overflowY: "auto",
                maxWidth: "100%",
                flexWrap: "wrap",
                rowGap: 40,
                columnGap: 5,
              }}
            >
              {search(pharmacy).map((val) => {
                return (
                  <div
                    style={{
                      backgroundColor: "white",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      height: 275,
                      width: 200,
                      margin: 25,
                    }}
                  >
                    <Container>
                      <Image
                        src={val.medicine_image}
                        height={100}
                        style={{
                          marginTop: 20,
                        }}
                      />
                    </Container>

                    <div
                      style={{
                        height: 60,
                        padding: 5,
                      }}
                    >
                      <p
                        style={{
                          maxWidth: "100%",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {val.medicine_name}
                      </p>
                    </div>

                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{
                          color: "#3BD2E3",
                          display: "inline",
                          marginLeft: 10,
                        }}
                      >
                        {" "}
                        Price:{" "}
                      </p>
                      <p
                        style={{
                          display: "inline",
                        }}
                      >
                        {" "}
                        ₱ {val.price}.00
                      </p>
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        marginRight: 10,
                        marginBottom: -5,
                      }}
                    >
                      <p
                        style={{
                          display: "inline",
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        {val.status !== 0 ? "Available" : "Not Available"}{" "}
                      </p>
                    </div>

                    <Container
                      style={{
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setproductID(val.medicine_id);
                          setproductImage(val.medicine_image);
                          setproductName(val.medicine_name);
                          setproductDescription(val.medicine_description);
                          setproductPrice(val.price);
                          setproductQuantity(val.status);
                          handleShowProductDetails();
                        }}
                        style={{
                          backgroundColor: "#3BD2E3",
                          borderColor: "white",
                          marginTop: 5,
                          marginRight: -15,
                        }}
                      >
                        View Product
                      </Button>
                    </Container>
                  </div>
                );
              })}
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Pharmacy;
