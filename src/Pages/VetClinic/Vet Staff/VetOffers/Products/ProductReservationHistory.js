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
  Row,
} from "react-bootstrap";
import Axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import { useParams } from "react-router-dom";
import { FormatDateAndTime } from "../../../../../Components/FormatDateTime";
import { IoChevronBack } from "react-icons/io5";
function ProductReservationHistory(props) {
  let { vetid } = useParams();

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
  const [counter, setcounter] = useState(0);
  useEffect(async () => {
    var id = props.user.toString().replace("10##01", "/");
    Axios.get(`${hostUrl}/history/reservation/${id}`).then((response) => {
      setreservation(response.data);
    });
  }, []);

  // const [reservationDetails, setreservationDetails] = useState([]);
  // function viewDetails(reservation_id) {
  //   Axios.get(
  //     `${hostUrl}/pending/reservation/viewdetails/${reservation_id}`
  //   ).then((response) => {
  //     setreservationDetails(response.data[0]);
  //   });
  //   // console.log(reservationDetails);
  //   handleShowView();
  // }

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

  function confirmAppointment(reservation_id) {
    alert(reservation_id);
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Product Name",
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
      sorting: true,
      render: (row) => (
        <div>
          <p style={{ display: "inline" }}>{row.name}</p>
        </div>
      ),
      sorting: true,
    },
    {
      title: "Date Reserve",
      render: (row) => (
        <div>
          <p style={{ display: "inline" }}>{formatDate(row.date_reserve)}</p>
        </div>
      ),
      defaultSort: "asc",
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
              className="mr-3"
              style={{
                color: "white",
              }}
              onClick={(e) => {
                e.preventDefault();
                setproductInfo(row);
                handleShowProductDetails();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Details
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

  return (
    <div style={{ margin: 20 }}>
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h4
                  style={{
                    fontWeight: "bold",
                    color: "#19B9CC",
                  }}
                >
                  Quantity
                </h4>
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {productInfo.reserve_quantity}
                </p>
              </div>
              <div>
                <h4
                  style={{
                    fontWeight: "bold",
                    color: "#19B9CC",
                  }}
                >
                  Total Price
                </h4>
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

            <h4
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Pet Owner Name
            </h4>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {productInfo.name}
            </p>

            <h4
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Date Accomplished
            </h4>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {dateConvertion(productInfo.date_accomplished)}
            </p>
          </Container>
        </Modal.Body>
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
              window.location.href = `/products/${vetid}`;
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
