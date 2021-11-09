import React, { useEffect, useState } from "react";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import background from "../../Images/bg.png";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Form,
  Modal,
  Spinner,
  Navbar,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { useParams, BrowserRouter } from "react-router-dom";
import "../../css/ProductShopping.css";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import { IoMdAdd } from "react-icons/io";
import { BiMinus } from "react-icons/bi";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";


function ProductShop() {
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
    }
  }, [counters, user]);

  const [products, setproducts] = useState([]);

  useEffect(() => {
    if (counters < 6) {
      Axios.get(`${hostUrl}/products/${vetid}`).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
      setcounters(counters + 1);
    }
  }, [products]);

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

  // 'productPrice': productPrice,
  //                                                 'orderQuantity': counter
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

  // Modal Controller
  const [showProductDetailsMobile, setShowProductDetailsMobile] = useState(false);
  const handleCloseProductDetailsMobile = () => setShowProductDetailsMobile(false);
  const handleShowProductDetailsMobile = () => setShowProductDetailsMobile(true);



  // Modal Spinner Controller
  const [showSpinner, setShowSpinner] = useState(false);
  const handleCloseSpinner = () => setShowSpinner(false);
  const handleShowSpinner = () => setShowSpinner(true);

  const [reservedId, setreservedId] = useState();

  const reserveProduct = () => {
    productsOrder.map((val) => {
      Axios.post(`${hostUrl}/products/reserve/${val.productID}`, {
        pet_owner_id: val.pet_owner_id,
        vetid: val.vetid,
        quantity: val.orderQuantity,
      }).then((response) => {
        if (response.data.message === "Success") {
          Axios.get(
            `${hostUrl}/get/latest/entry/reserved/${val.pet_owner_id}/${val.vetid}`
          ).then((response) => {
            // alert(response.data[0].latestId);
            setreservedId(response.data[0].latestId);

            Axios.post(`${hostUrl}/notification/reserved`, {
              reserve_id: response.data[0].latestId,
              product_id: val.productID,
              status: "Reserved",
            });
          });
        }
      });
    });

    handleShowSpinner();
    setTimeout(() => {
      handleCloseSpinner();
      setTimeout(() => {
        window.location.replace(`/my&cart`);
      }, 1000);
    }, 2000);
  };

  // Search
  const [q, setq] = useState("");
  // const [category, setcategory] = useState("");
  // const [typePet, settypePet] = useState('');

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

  // let category = '';
  // let typePet = '';

  // Sorting Algorithm
  function sortProduct() {
    // alert('sorting');
    // alert(category);
    // alert(typePet);
    if (category != '' && typePet != '') {
      axios.post(`${hostUrl}/vetclinic/product/filtered`, {
        typeOfPet: typePet,
        category: category,
        vetid: vetid
      }).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    } else if (category != '' && typePet == '') {
      axios.post(`${hostUrl}/vetclinic/product/filtered/category`, {
        category: category,
        vetid: vetid
      }).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    }
    else if (category == '' && typePet != '') {
      axios.post(`${hostUrl}/vetclinic/product/filtered/typeOfPet`, {
        typeOfPet: typePet,
        vetid: vetid
      }).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    } else {
      Axios.get(`${hostUrl}/products/${vetid}`).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    }

  }

  const [category, setcategory] = useState('');
  const [typePet, settypePet] = useState('');
  useEffect(() => {
    if (category != '' && typePet != '') {
      axios.post(`${hostUrl}/vetclinic/product/filtered`, {
        typeOfPet: typePet,
        category: category,
        vetid: vetid
      }).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    } else if (category != '' && typePet == '') {
      axios.post(`${hostUrl}/vetclinic/product/filtered/category`, {
        category: category,
        vetid: vetid
      }).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    }
    else if (category == '' && typePet != '') {
      axios.post(`${hostUrl}/vetclinic/product/filtered/typeOfPet`, {
        typeOfPet: typePet,
        vetid: vetid
      }).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    } else {
      Axios.get(`${hostUrl}/products/${vetid}`).then((response) => {
        setproducts(response.data);
        // console.log(products);
      });
    }

  }, [category, typePet])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "90vh",
        marginTop: 110,
        zoom: value,
      }}
    >
      {/* showSpinner */}
      <Modal
        show={showSpinner}
        onHide={handleCloseSpinner}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Container
            style={{
              textAlign: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>

            <p>Please Wait... We are reserving your order.</p>
          </Container>
        </Modal.Body>
      </Modal>

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
                    Quantity:{" "}
                  </p>
                  <p
                    style={{
                      display: "inline",
                    }}
                  >
                    {" "}
                    {productQuantity} pcs. left
                  </p>
                </strong>
              </div>

              <Container
                hidden={notToCart}
                // hidden={false}
                style={{}}
              >
                <Row>
                  <Col sm={5}>
                    <Button
                      variant="primary"
                      disabled={minusController}
                      style={{
                        width: 50,
                        textAlign: "center",
                        borderRadius: 50,
                        borderColor: "white",
                        marginTop: 5,
                        marginBottom: 10,
                        float: "right",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        setcounter(counter - 1);
                      }}
                    >
                      <BiMinus
                        style={{
                          marginTop: -5,
                        }}
                      />
                    </Button>
                  </Col>
                  <Col sm={2}>
                    <h6
                      style={{
                        textAlign: "center",
                        marginTop: 15,
                      }}
                    >
                      {counter}
                    </h6>
                  </Col>
                  <Col sm={5}>
                    <Button
                      variant="primary"
                      style={{
                        width: 50,
                        textAlign: "center",
                        borderRadius: 50,
                        borderColor: "white",
                        marginTop: 5,
                        marginBottom: 10,
                        float: "left",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        setcounter(counter + 1);
                      }}
                    >
                      <IoMdAdd
                        style={{
                          marginTop: -5,
                        }}
                      />
                    </Button>
                  </Col>
                </Row>
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
                  <Col>
                    <Button
                      variant="primary"
                      disabled={placeOrderController}
                      style={{
                        width: "100%",
                      }}
                      onClick={(e) => {
                        let order = {
                          productID: productID,
                          productImage: productImage,
                          productName: productName,
                          productPrice: productPrice,
                          orderQuantity: counter,
                          pet_owner_id: user.pet_owner_id,
                          vetid: vetid,
                        };
                        ors.push(order);
                        setproductsOrder((prevArray) => [...prevArray, order]);
                        setcounter(0);
                        handleCloseProductDetails();
                        setaddToCart(false);
                        setnotToCart(true);
                        console.log(productsOrder);
                        e.preventDefault();
                      }}
                    >
                      Place Order
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

                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setnotToCart(false);
                        setaddToCart(true);
                      }}
                      style={{
                        width: "100%",
                      }}
                    >
                      Order Now
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>








      {/* --------------------------------------------------------------------------- */}
      {/* mobile */}
      <Modal
        show={showProductDetailsMobile}
        onHide={handleCloseProductDetailsMobile}
        centered

      >
        <Modal.Body>
          <Row>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {/* Image */}
              <Image src={productImage} style={{
                width: 150
              }} />
            </Col>
            <Col>
              {/* Content */}
              <h1>{productName}</h1>
              <div
                style={{
                  height: 'auto',

                }}
              >
                <p
                  style={{
                    fontSize: '3vw'
                  }}
                >{productDescription}</p>
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
                    Quantity:{" "}
                  </p>
                  <p
                    style={{
                      display: "inline",
                    }}
                  >
                    {" "}
                    {productQuantity} pcs. left
                  </p>
                </strong>
              </div>

              <Container
                hidden={notToCart}
                // hidden={false}
                style={{
                  padding: 0

                }}
              >
                <Row>
                  <Col >
                    <Button
                      variant="primary"
                      disabled={minusController}
                      style={{
                        // width: 50,
                        textAlign: "center",
                        borderRadius: 50,
                        borderColor: "white",
                        // marginTop: 5,
                        // marginBottom: 10,
                        // float: "right",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        setcounter(counter - 1);
                      }}
                    >
                      <BiMinus
                        style={{
                          marginTop: -5,
                        }}
                      />
                    </Button>
                  </Col>
                  <Col
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <h6
                      style={{
                        textAlign: "center",

                      }}
                    >
                      {counter}
                    </h6>
                  </Col>
                  <Col >
                    <Button
                      variant="primary"
                      style={{
                        // width: 50,
                        textAlign: "center",
                        borderRadius: 50,
                        borderColor: "white",
                        // marginTop: 5,
                        // marginBottom: 10,
                        // float: "left",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        setcounter(counter + 1);
                      }}
                    >
                      <IoMdAdd
                        style={{
                          marginTop: -5,
                        }}
                      />
                    </Button>
                  </Col>
                </Row>
                <Row
                  style={{
                    marginTop: 15
                  }}
                >
                  <Col

                  >
                    <Button
                      variant="secondary"
                      style={{
                        width: "100%",
                        marginBottom: 10
                      }}
                      onClick={(e) => {
                        setaddToCart(false);
                        setnotToCart(true);

                        e.preventDefault();
                      }}
                    >
                      Back
                    </Button>

                    <Button
                      variant="primary"
                      disabled={placeOrderController}
                      style={{

                        width: "100%",
                      }}
                      onClick={(e) => {
                        let order = {
                          productID: productID,
                          productImage: productImage,
                          productName: productName,
                          productPrice: productPrice,
                          orderQuantity: counter,
                          pet_owner_id: user.pet_owner_id,
                          vetid: vetid,
                        };
                        ors.push(order);
                        setproductsOrder((prevArray) => [...prevArray, order]);
                        setcounter(0);
                        handleCloseProductDetailsMobile();
                        setaddToCart(false);
                        setnotToCart(true);
                        console.log(productsOrder);
                        e.preventDefault();
                      }}
                    >
                      Place Order
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
                      onClick={handleCloseProductDetailsMobile}
                      style={{
                        width: "100%",
                        marginBottom: 10
                      }}
                    >
                      Close
                    </Button>
                  </Col>

                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setnotToCart(false);
                        setaddToCart(true);
                      }}
                      style={{
                        width: "100%",
                      }}
                    >
                      Order Now
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

      {/* Web */}

      <div
        id='rowWeb'
      >
        <Row>
          <Col sm={9}>
            <Container
              style={{
                backgroundColor: "white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                height: "70vh",
                marginTop: 10,
                paddingTop: 50,
                float: "right",
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
                  Products
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
                        <Form.Label column sm={3}>
                          Category
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Select
                            onChange={(e) => {
                              setcategory(e.target.value);

                              // category = e.target.value;
                              sortProduct();
                              e.preventDefault();
                            }}
                          >
                            <option value={''}>All</option>
                            <option value={"Accessories"}>Accessories</option>
                            <option value={"Food"}>Food</option>
                            <option value={"Merchandise"}>Merchandise</option>
                            <option value={"Toys"}>Toys</option>
                          </Form.Select>
                        </Col>
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
                              // typePet = e.target.value
                              sortProduct();
                              e.preventDefault();
                            }}
                          >
                            <option value={''}>All</option>
                            <option value={"Cat"}>Cat</option>
                            <option value={"Dogs"}>Dog</option>
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
                {search(products).map((val) => {
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
                          src={val.product_image}
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
                          {val.product_name}
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
                          {val.quantity} pcs. left
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
                            setproductID(val.product_id);
                            setproductImage(val.product_image);
                            setproductName(val.product_name);
                            setproductDescription(val.product_desc);
                            setproductPrice(val.price);
                            setproductQuantity(val.quantity);
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

          <Col sm={3}>
            <Container
              style={{
                backgroundColor: "white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                height: "70vh",
                marginTop: 10,
                paddingTop: 50,
                width: 400,
                float: "left",
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
                  My Cart
                </h5>
              </Container>

              <Container
                style={{
                  backgroundColor: "grey",
                  overflowY: "auto",
                  height: "45vh",
                  marginTop: 10,
                  padding: 20,
                  width: 350,
                }}
              >
                {/* my cart content */}

                {productsOrder.length !== 0 ? (
                  productsOrder.map((val) => {
                    return (
                      <div
                        style={{
                          backgroundColor: "white",
                          height: 100,
                          width: "100%",
                          marginBottom: 20,
                        }}
                      >
                        <Row>
                          <Col sm={5}>
                            {/* image */}
                            <Image
                              src={val.productImage}
                              height={80}
                              style={{
                                marginTop: 10,
                              }}
                            />
                          </Col>

                          <Col sm={7}>
                            {/* Content */}
                            <div
                              style={{
                                textAlign: "left",
                                paddingTop: 10,
                              }}
                            >
                              <p
                                style={{
                                  maxWidth: "100%",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 1,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {val.productName}
                              </p>
                            </div>

                            <div
                              style={{
                                textAlign: "left",
                                marginTop: -10,
                              }}
                            >
                              <p style={{}}>
                                <strong
                                  style={{
                                    color: "#3BD2E3",
                                  }}
                                >
                                  Price:{" "}
                                </strong>{" "}
                                ₱ {val.productPrice}.00
                              </p>

                              <p
                                style={{
                                  marginTop: -10,
                                }}
                              >
                                <strong
                                  style={{
                                    color: "#3BD2E3",
                                  }}
                                >
                                  Quantity:{" "}
                                </strong>{" "}
                                {val.orderQuantity}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
                ) : (
                  <p
                    style={{
                      color: "white",
                      marginTop: "60%",
                    }}
                  >
                    No product reserve
                  </p>
                )}
              </Container>
              <Row>
                <Col sm={5}>
                  <div
                    style={{
                      paddingTop: 10,
                    }}
                  >
                    <Form.Text className="text-muted">Sub Total:</Form.Text>
                  </div>
                </Col>

                <Col sm={7}>
                  <div
                    style={{
                      paddingTop: 10,
                    }}
                  >
                    <p>₱ {total}.00</p>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={5}>
                  <div
                    style={{
                      paddingTop: 10,
                    }}
                  >
                    <Form.Text className="text-muted">Done shopping ?</Form.Text>
                  </div>
                </Col>

                <Col sm={7}>
                  <div>
                    <Button
                      disabled={reservationController}
                      onClick={reserveProduct}
                      style={{
                        backgroundColor: "#3BD2E3",
                        borderColor: "white",
                        marginTop: 5,
                        width: 200,
                        marginLeft: -5,
                      }}
                    >
                      Reserve
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>





      {/* -------------------------------------------------------------------------------------- */}

      {/*Mobile */}

      <div
        id='rowMobile'
      >

        <Offcanvas show={show} onHide={handleClose} >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>My Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body >
            <Container
              style={{
                backgroundColor: "white",

                display: 'block',
                justifyContent: 'center',

              }}
            >

              <Container
                style={{
                  backgroundColor: "grey",
                  overflowY: "auto",
                  height: "50vh",
                  width: 350,
                  padding: 10
                }}
              >
                {/* my cart content */}

                {productsOrder.length !== 0 ? (
                  productsOrder.map((val) => {
                    return (
                      <div
                        style={{
                          backgroundColor: "white",
                          height: 100,
                          padding: 10,
                          marginBottom: 10
                        }}
                      >
                        <Row>
                          <Col
                            xs={3}
                            style={{

                            }}
                          >
                            {/* image */}
                            <Image
                              src={val.productImage}
                              height={80}
                              width={50}
                            />
                          </Col>
                          <Col
                            xs={9}
                          >
                            {/* Content */}
                            <p
                              style={{
                                maxWidth: "100%",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                // fontSize: 10
                              }}
                            >
                              {val.productName}
                            </p>
                            <div
                              style={{
                                lineHeight: '0.75'
                              }}
                            >
                              <p style={{ fontSize: 15 }}>
                                <strong
                                  style={{
                                    color: "#3BD2E3",
                                  }}
                                >
                                  Price:
                                </strong>
                                ₱ {val.productPrice}.00
                              </p>

                              <p
                                style={{
                                  fontSize: 15
                                }}
                              >
                                <strong
                                  style={{
                                    color: "#3BD2E3",
                                  }}
                                >
                                  Quantity:
                                </strong>
                                {val.orderQuantity}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
                ) : (
                  <p
                    style={{
                      color: "white",
                      marginTop: "60%",
                    }}
                  >
                    No product reserve
                  </p>
                )}
              </Container>
              <Row>
                <Col sm={5}>
                  <div
                    style={{
                      paddingTop: 10,
                    }}
                  >
                    <Form.Text className="text-muted">Sub Total:</Form.Text>
                  </div>
                </Col>

                <Col sm={7}>
                  <div
                    style={{
                      paddingTop: 10,
                    }}
                  >
                    <p>₱ {total}.00</p>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={5}>
                  <div
                    style={{
                      paddingTop: 10,
                    }}
                  >
                    <Form.Text className="text-muted">Done shopping ?</Form.Text>
                  </div>
                </Col>

                <Col sm={7}>
                  <div>
                    <Button
                      disabled={reservationController}
                      onClick={reserveProduct}
                      style={{
                        backgroundColor: "#3BD2E3",
                        borderColor: "white",
                        marginTop: 5,
                        width: 200,
                        marginLeft: -5,
                      }}
                    >
                      Reserve
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
        <Row>

          <Col sm={9}>
            <Container
              style={{
                backgroundColor: "white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                height: "auto",
                width: 350,
                marginTop: 10,
                paddingTop: 20,
                paddingBottom: 15
              }}
            >
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'end'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end'
                  }}
                >
                  <HiOutlineShoppingCart style={{
                    fontSize: 30,
                    color: '#19B9CC'
                  }} onClick={handleShow} />
                </div>
              </Row>

              <Container>
                <h5
                  style={{
                    color: "#696969",
                    fontWeight: "bold",
                    display: "inline",

                    fontSize: 40,
                  }}
                >
                  Products
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
                    // style={{
                    //   width: 250,
                    // }}
                    >
                      <Form.Group
                        as={Row}
                        controlId="formHorizontalEmail"
                        style={{
                          marginTop: 0,

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




                </Row>


                <Row
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Col>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label column sm={3} style={{ textAlign: 'left' }}>
                          Category
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Select
                            onChange={(e) => {

                              setcategory(e.target.value);

                              // category = e.target.value;
                              sortProduct();
                              e.preventDefault();
                            }}
                          >
                            <option value={''}>All</option>
                            <option value={"Accessories"}>Accessories</option>
                            <option value={"Food"}>Food</option>
                            <option value={"Merchandise"}>Merchandise</option>
                            <option value={"Toys"}>Toys</option>
                          </Form.Select>
                        </Col>
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
                        <Form.Label column sm={4} style={{ textAlign: 'left' }}>
                          Type of pet
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Select
                            onChange={(e) => {

                              settypePet(e.target.value);
                              // typePet = e.target.value
                              sortProduct();
                              e.preventDefault();
                            }}
                          >
                            <option value={''}>All</option>
                            <option value={"Cat"}>Cat</option>
                            <option value={"Dogs"}>Dog</option>

                          </Form.Select>
                        </Col>
                      </Form.Group>
                    </div>
                  </Col>



                </Row>
              </div>

              {/* Content */}

              <div
                style={{
                  height: "auto",
                  marginTop: 100,
                  padding: 0,
                  columnGap: 10,
                  rowGap: 20,
                  display: 'grid',
                  gridTemplateColumns: 'auto auto',
                  justifyContent: 'center'
                }}
              >
                {search(products).map((val) => {
                  return (
                    <div
                      onClick={() => {
                        setproductID(val.product_id);
                        setproductImage(val.product_image);
                        setproductName(val.product_name);
                        setproductDescription(val.product_desc);
                        setproductPrice(val.price);
                        setproductQuantity(val.quantity);
                        handleShowProductDetailsMobile();
                      }}
                      style={{
                        backgroundColor: "white",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        height: 'auto',
                        width: 150,
                        paddingLeft: 0,
                        paddingRight: 0,
                        paddingBottom: 10,

                      }}
                    >
                      <Container>
                        <Image
                          src={val.product_image}
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
                          {val.product_name}
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
                          {val.quantity} pcs. left
                        </p>
                      </div>

                      <Container
                        style={{
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >

                      </Container>
                    </div>
                  );
                })}
              </div>
            </Container>
          </Col>
        </Row>
      </div>



    </div>
  );
}

export default ProductShop;
