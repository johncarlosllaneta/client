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
import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import { useParams } from "react-router-dom";
import { dateConvertion } from "../../../../../Components/FormatDateTime";
import { IoChevronBack } from "react-icons/io5";
import getUser from "../../../../../Components/userData";
import Cardproduct from "./CardProduct";
function ProductReservationHistory() {
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getHistory(userData.vetid);
  }, []);
  const getHistory = async (userid) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/history/reservation/${userid}`);
    // console.log(result.data);
    setreservation(result.data);
  };
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = () => {
    setShowView(true);
    // setUpdateProductId(id);
    // setUpdateProductName(name);
    // setUpdateProductDescription(desc);
    // setUpdateProductQuantity(quantity);
  };

  const [reservation, setreservation] = useState([]);

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

  function dateConvertion(dateData) {
    var dateconveted = String(dateData).split("T")[0];
    var str = dateconveted.split("-");
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

  const [viewDisableField, setviewDisableField] = useState(true);
  //details
  const [reservationID, setreservationID] = useState();
  const [orderId, setorderId] = useState();
  const [petOwnerName, setpetOwnerName] = useState();
  const [date, setdate] = useState();
  const [dateClaimed, setdateClaimed] = useState();
  const [claimBy, setclaimBy] = useState();
  const [mop, setmop] = useState();

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
      defaultSort: "asc",
      render: (row) => (
        <div>{formatDate(row.date_reserve.toString().split("T")[0])}</div>
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
              className="mr-3"
              style={{
                color: "white",
              }}
              onClick={(e) => {
                e.preventDefault();
                setreservationID(row.reserve_id);
                setorderId(row.order_id);
                setpetOwnerName(row.name);
                setdate(formatDate(row.date_reserve.toString().split("T")[0]));
                setdateClaimed(
                  formatDate(row.date_accomplished.toString().split("T")[0])
                );
                setmop(row.mop);
                setclaimBy(row.claimBy);
                listProducts(row.order_id);
                totalPrice(row.order_id);
                handleShowProductDetails();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Reservation
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

  const handleCloseProductDetails = () => setShowProductDetails(false);
  const handleShowProductDetails = () => setShowProductDetails(true);
  const [listProd, setlistProd] = useState([]);
  function listProducts(id) {
    Axios.get(`${hostUrl}/staff/order/${id}`).then((response) => {
      setlistProd(response.data);
    });
  }

  return (
    <div style={{ margin: 20 }}>
      <Modal
        show={showProductDetails}
        onHide={handleCloseProductDetails}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reservation</Modal.Title>
        </Modal.Header>
        <Row>
          <Modal.Body>
            <div>
              <Row>
                <Col>
                  <h5>Details:</h5>
                  <h6 style={{ fontWeight: "bolder" }}>
                    Date reserved: {date}
                  </h6>
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
                        disabled={viewDisableField}
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
                      <Form.Control
                        type="text"
                        value={mop}
                        placeholder="Mode of Payment"
                        disabled={viewDisableField}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>

                <Col>
                  <h5>List of Products:</h5>
                  <h6 style={{ fontWeight: "bolder" }}>
                    Date claimed: {dateClaimed}
                  </h6>
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
                      <p style={{}}>No Products</p>
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
            {/* <Button variant="primary" type="submit">
              Claimed
            </Button> */}
          </Modal.Footer>
        </Row>
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
              This table shows the history of reserved products in the vet
              clinic.{" "}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>
      {/* Data Table */}
      <Row
        style={{
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: 10,
          }}
        >
          <p
            onClick={() => {
              window.location.href = `/products`;
            }}
            style={{
              marginBottom: 0,
              color: "#3BD2E3",
              cursor: "pointer",
            }}
          >
            {" "}
            <IoChevronBack style={{ fontSize: 18 }} />{" "}
            <strong style={{ fontSize: 18 }}>Back</strong>
          </p>
        </div>
      </Row>
      <MaterialTable
        columns={columns}
        data={reservation}
        title={"Reservation  Table"}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
        }}
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
export default ProductReservationHistory;
