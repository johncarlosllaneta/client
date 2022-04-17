import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Col,
  Button,
  Modal,
  Row,
  Form,
  OverlayTrigger,
  Popover,
  Image,
  Container,
  FloatingLabel,
  Overlay,
} from "react-bootstrap";
import Axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import { useParams } from "react-router-dom";
import getUser from "../../../../../Components/userData";
import Cardproduct from "./CardProduct";
import { autocompleteClasses } from "@mui/material";
import { ToastClaim } from "../../../../../Components/Toast";
import { dateConvertion } from "../../../../../Components/FormatDateTime";
import { ToastContainer } from "react-toastify";

function ProductReservation() {
  const [counter, setcounter] = useState(0);
  const [reservation, setreservation] = useState([]);
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getReservation(userData.vetid);
  }, []);

  const getReservation = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(
      `${hostUrl}/staff/pending/order/reservation/${id}`
    );
    // console.log(result.data);
    setreservation(result.data);
  };
  function refreshTable() {
    Axios.get(`${hostUrl}/staff/pending/order/reservation/${user.vetid}`).then(
      (response) => {
        setreservation(response.data);
      }
    );
  }
  const [total, settotal] = useState(0);
  function totalPrice(id) {
    Axios.get(`${hostUrl}/staff/order/total/${id}`).then((response) => {
      settotal(response.data[0].totalprice);
    });
  }

  function formatDateAndTime(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Order Id",
      field: "order_id",
      sorting: true,
    },
    {
      title: "Pet Owner Name",
      field: "name",
      sorting: true,
    },
    {
      title: "Date Schedule",
      sorting: true,
      defaultSort: "desc",
      render: (row) => (
        <div>{dateConvertion(row.date_reserve.toString().split("T")[0])}</div>
      ),
    },
    {
      title: "Action",
      render: (row) => (
        <div style={{ flexDirection: "row", display: "flex" }}>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Reservation" })}
          >
            <Button
              variant="info"
              style={{ color: "white", marginRight: 5 }}
              onClick={(e) => {
                e.preventDefault();
                listProducts(row.order_id);
                totalPrice(row.order_id);
                setreservationID(row.reserve_id);
                setorderId(row.order_id);
                setpetOwnerName(row.name);
                setdate(
                  dateConvertion(row.date_reserve.toString().split("T")[0])
                );
                handleShowProductDetails();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
              View Reservation
              {/* View Reservation */}
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  // Popover Overlay
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowPopover(!showPopover);
    setTarget(event.target);
  };

  // view details
  const [productInfo, setproductInfo] = useState([]);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleCloseProductDetails = () => {
    setShowProductDetails(false);
  };
  const handleShowProductDetails = () => setShowProductDetails(true);

  // Done reservation
  const [reservationID, setreservationID] = useState("");
  const [stockUsed, setstockUsed] = useState("");
  const [quantity, setquantity] = useState("");
  const [product_id, setproduct_id] = useState("");
  const [showProductConfirmation, setShowProductConfirmation] = useState(false);

  const handleCloseProductConfirmation = () =>
    setShowProductConfirmation(false);
  const handleShowProductConfirmation = () => setShowProductConfirmation(true);

  function confirmAppointment() {
    Axios.put(`${hostUrl}/confirm/product/reservation/${reservationID}`).then(
      (response) => {
        if (response.data == "Success") {
          Axios.post(`${hostUrl}/notification/reserved/done`, {
            reserve_id: reservationID,
            product_id: product_id,
            status: "Purchased",
          });

          var decreaseStock = stockUsed - quantity;
          Axios.put(`${hostUrl}/stockUsed/decrease/product/${product_id}`, {
            decreaseStock: decreaseStock,
          });
          // alert(stockUsed - quantity);

          Axios.get(`${hostUrl}/pending/reservation/${user.vetid}`).then(
            (response) => {
              setreservation(response.data);
            }
          );
          handleCloseProductConfirmation();
        }
      }
    );
    // alert(reservationID);
  }

  const [listProd, setlistProd] = useState([]);
  function listProducts(id) {
    Axios.get(`${hostUrl}/staff/order/${id}`).then((response) => {
      setlistProd(response.data);
    });
  }

  async function insertClaim(id) {
    Axios.put(`${hostUrl}/staff/reservation/claim/${id}`, {
      mop: mop,
      claimBy: claimBy,
    });

    var prodList = [];

    const result = await getProdList(orderId);
    prodList.push(result);
    // console.log(result);
    console.log(prodList);
    for (var i = 0; i < prodList.length; i++) {
      alert(prodList[0][i].res_quantity);
      var decreaseStock = prodList[0][i].quantity - prodList[0][i].res_quantity;
      Axios.put(
        `${hostUrl}/stockUsed/decrease/product/${prodList[0][i].product_id}`,
        {
          decreaseStock: decreaseStock,
        }
      );
    }
    // prodList.forEach((item) => {
    //   alert(item.res_quantity + " " + item.quantity + " " + item.product_id);
    //   var decreaseStock = item.quantity - item.res_quantity;
    //   // Axios.put(`${hostUrl}/stockUsed/decrease/product/${item.product_id}`, {
    //   //   decreaseStock: decreaseStock,
    //   // });
    // });

    setmop("");
    setclaimBy("");
    handleClose2();
    refreshTable();
    ToastClaim();
  }

  const getProdList = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/staff/order/${id}`);
    // console.log(result.data);
    console.log(result.data);
    return result.data;
  };

  const [viewDisableField, setviewDisableField] = useState(false);
  //details
  const [orderId, setorderId] = useState();
  const [petOwnerName, setpetOwnerName] = useState();
  const [date, setdate] = useState();
  const [claimBy, setclaimBy] = useState();
  const [mop, setmop] = useState();

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };
  // Modal Confirmation Update
  const [showConfirmationInsert, setshowConfirmationInsert] = useState(false);
  const handleCloseConfirmationInsert = () => setshowConfirmationInsert(false);
  const handleShowConfirmationInsert = () => setshowConfirmationInsert(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const [validated, setValidated] = useState(false);

  const insertClaimed = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowConfirmationInsert();
      handleCloseProductDetails();
    }

    setValidated(true);
  };
  return (
    <div>
      <ToastContainer />
      <Modal
        show={showConfirmationInsert}
        onHide={handleCloseConfirmationInsert}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want you are save? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationInsert}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              insertClaim(reservationID);
              handleCloseConfirmationInsert();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* View Details */}
      <Modal
        show={showProductDetails}
        onHide={handleCloseProductDetails}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reservation</Modal.Title>
        </Modal.Header>
        <Row>
          <Form noValidate validated={true} onSubmit={insertClaimed}>
            <Modal.Body>
              <div>
                <Row>
                  <Col>
                    <h5>Details:</h5>
                    <h6>Date reserved:{date}</h6>
                    <Form.Group
                      controlId="formBasicProduct"
                      style={{
                        marginTop: 30,
                      }}
                    >
                      <FloatingLabel
                        controlId="floatingInputPrice"
                        label="Order Id"
                      >
                        <Form.Control
                          type="text"
                          value={orderId}
                          disabled={viewDisableField}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      controlId="formBasicProduct"
                      style={{
                        marginTop: 17,
                      }}
                    >
                      <FloatingLabel
                        controlId="floatingInputPrice"
                        label="PetOwner Name"
                      >
                        <Form.Control
                          type="text"
                          value={petOwnerName}
                          disabled={viewDisableField}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      controlId="formBasicProduct"
                      style={{
                        marginTop: 17,
                      }}
                    >
                      <FloatingLabel
                        controlId="floatingInputPrice"
                        label="Total Price"
                      >
                        <Form.Control
                          type="text"
                          value={total}
                          disabled={viewDisableField}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      controlId="formBasicProduct"
                      style={{
                        marginTop: 17,
                      }}
                    >
                      <FloatingLabel
                        controlId="floatingInputPrice"
                        label="Claim By"
                      >
                        <Form.Control
                          value={claimBy}
                          placeholder="Name"
                          required
                          onChange={(e) => {
                            setclaimBy(e.target.value);
                          }}
                        />

                        {/* <Form.Control.Feedback type="valid">
                        You've input a valid name.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine name.
                      </Form.Control.Feedback> */}
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      controlId="formBasicProduct"
                      style={{
                        marginTop: 17,
                      }}
                    >
                      <FloatingLabel
                        controlId="floatingInputPrice"
                        label="Mode of Payment"
                      >
                        {/* <Form.Control
                          type="text"
                          value={mop}
                          placeholder="Mode of Payment"
                          required
                          onChange={(e) => {
                            setmop(e.target.value);
                          }}
                        /> */}
                        <Form.Select
                          placeholder="Mode of Payment"
                          required
                          defaultValue={mop}
                          onChange={(e) => {
                            setmop(e.target.value);
                          }}
                        >
                          <option value="">Choose payment method</option>
                          <option value="Cash">Cash</option>
                          <option value="E-wallet">E-wallet</option>
                          <option value="Card">Card</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col>
                    <h5>List of Products:</h5>
                    <div
                      style={{
                        height: 400,
                        width: 440,
                        padding: 10,
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      {listProd.length != 0 ? (
                        listProd.map((val) => {
                          return (
                            <Cardproduct
                              image={val.product_image}
                              prodName={val.product_name}
                              category={val.category}
                              quantity={val.res_quantity}
                              price={val.price}
                            />
                          );
                        })
                      ) : (
                        <p>No Products</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseProductDetails}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Claimed
              </Button>
            </Modal.Footer>
          </Form>
        </Row>
      </Modal>
      {/* modal for confirmation of reservation */}
      <Modal
        show={showProductConfirmation}
        onHide={handleCloseProductConfirmation}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this reservation done ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProductConfirmation}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmAppointment();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Overlay
        show={showPopover}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Helper</Popover.Header>
          <Popover.Body>
            <p>
              This table shows the list of reserved products in the vet clinic.{" "}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>
      {/* Data Table */}
      <MaterialTable
        columns={columns}
        data={reservation}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
        }}
        title={""}
        actions={[
          {
            icon: "information",
            tooltip: "Helper",
            isFreeAction: true,
            onClick: handleClick,
          },
        ]}
      />
    </div>
  );
}

export default ProductReservation;
