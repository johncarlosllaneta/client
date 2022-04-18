import React from "react";
import { useState, useEffect, useRef } from "react";
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
import Axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPurchaseTagAlt } from "react-icons/bi";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import { useParams } from "react-router-dom";

function ProductReservation() {
  let { vetid } = useParams();

  const [counter, setcounter] = useState(0);
  const [reservation, setreservation] = useState([]);
  useEffect(() => {
    var id = vetid.toString().replace("10##01", "/");

    if (counter < 3) {
      Axios.get(`${hostUrl}/pending/reservation/${id}`).then((response) => {
        setreservation(response.data);
      });
      // console.log(reservation);

      // Axios.put(`${hostUrl}/expiration/reservation/${id}`);
      setcounter(counter + 1);
    }
  }, []);

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
      title: "Reservation ID",
      field: "reserve_id",
      sorting: true,
    },
    {
      title: "Product Name",
      field: "name",
      sorting: true,
      render: (row) => (
        <div>
          {" "}
          <Image
            src={row.product_image}
            style={{ height: 50, display: "inline" }}
          />{" "}
          <p style={{ display: "inline" }}>{row.product_name}</p>
        </div>
      ),
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
      render: (row) => <div>{formatDate(row.date_reserve)}</div>,
    },

    {
      title: "Quantity",
      field: "reserve_quantity",
      sorting: true,
    },
    {
      title: "Action",
      render: (row) => (
        <div style={{ flexDirection: "row", display: "flex" }}>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Information" })}
          >
            <Button
              variant="info"
              style={{ color: "white", marginRight: 5 }}
              onClick={(e) => {
                e.preventDefault();
                setproductInfo(row);
                handleShowProductDetails();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
              {/* View Reservation */}
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Reservation Done" })}
          >
            <Button
              variant="primary"
              style={{ marginRight: 5 }}
              onClick={(e) => {
                e.preventDefault();
                setreservationID(row.reserve_id);
                setstockUsed(row.quantity);
                setquantity(row.reserve_quantity);
                setproduct_id(row.product_id);
                handleShowProductConfirmation();
              }}
            >
              <BiPurchaseTagAlt style={{ fontSize: 25 }} />
              {/* Accept Reservation */}
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

          var id = vetid.toString().replace("10##01", "/");

          // var decreaseStock = stockUsed - quantity;
          // Axios.put(`${hostUrl}/stockUsed/decrease/product/${product_id}`, {
          //   decreaseStock: decreaseStock,
          // });
          // // alert(stockUsed - quantity);

          Axios.get(`${hostUrl}/pending/reservation/${id}`).then((response) => {
            setreservation(response.data);
          });
          handleCloseProductConfirmation();
        }
      }
    );
    // alert(reservationID);
  }

  return (
    <div>
      {/* View Details */}
      <Modal show={showProductDetails} onHide={handleCloseProductDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Infomation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",

                padding: 0,
                margin: 0,
              }}
            >
              <Image
                src={productInfo.product_image}
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
              }}
            >
              Product Name
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {productInfo.product_name}
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
                fontWeight: "bold",
              }}
            >
              {productInfo.product_desc}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "#19B9CC",
                  }}
                >
                  Quantity
                </h2>
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {productInfo.reserve_quantity}
                </p>
              </div>
              <div>
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "#19B9CC",
                  }}
                >
                  Total Price
                </h2>
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {"₱ " +
                    productInfo.reserve_quantity * productInfo.price +
                    ".00"}
                </p>
              </div>
            </div>
          </Container>
        </Modal.Body>
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
