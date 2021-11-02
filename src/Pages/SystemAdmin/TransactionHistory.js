import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Col,
  Button,
  Modal,
  Row,
  Form,
  OverlayTrigger,
  Popover,
  Container,
  Image,
  Overlay,
  FloatingLabel,
} from "react-bootstrap";
import Axios from "axios";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../Components/Host";
import { FormatDate, FormatDateAndTime } from "../../Components/FormatDateTime";

function TransactionHistory(props) {
  const [counter, setcounter] = useState(0);
  const [appointmentInfo, setappointmentInfo] = useState([]);
  const [reservationInfo, setreservationInfo] = useState([]);

  const [services, setservices] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/services/system/admin/${props.email}`).then(
        (response) => {
          setservices(response.data);
          // console.log(response.data)
        }
      );
      setcounter(counter + 1);
    }
    // alert(props.data.vet_admin_id);
  }, [services]);

  const [appointment, setappointment] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/appointments/system/admin/${props.email}`).then(
        (response) => {
          setappointment(response.data);
          // console.log(response.data)
        }
      );
    }
  }, [appointment]);

  const [reservation, setreservation] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/reservations/system/admin/${props.email}`).then(
        (response) => {
          setreservation(response.data);
          // console.log(response.data)
        }
      );
    }
  }, [reservation]);

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columnsAppointments = [
    {
      title: "Appointment ID",
      field: "appointment_id",
      sorting: true,
      defaultSort: "asc",
    },
    {
      title: "Pet Owner Name",
      field: "name",
      sorting: true,
    },
    {
      title: "Service Name",
      field: "service_name",
      sorting: true,
    },
    {
      title: "Appointment Status",
      field: "appointment_status",
      sorting: true,
    },
    {
      title: "Fee",
      field: "service_fee",
      render: (rowData) =>
        rowData.price !== "" && "₱" + rowData.service_fee + ".00",
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Information" })}
          >
            <Button
              variant="info"
              className="mr-3"
              onClick={(e) => {
                e.preventDefault();
                setappointmentInfo(row);
                // console.log(appointmentInfo);
                handleShowAppointment();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const columnsReservation = [
    {
      title: "Reservation ID",
      field: "reserve_id",
      sorting: true,
      defaultSort: "asc",
    },
    {
      title: "Pet Owner Name",
      field: "name",
      sorting: true,
    },
    {
      title: "Product Name",
      field: "product_name",
      sorting: true,
    },
    {
      title: "Price",
      render: (rowData) => rowData.price !== "" && "₱" + rowData.price + ".00",
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Information" })}
          >
            <Button
              variant="info"
              className="mr-3"
              onClick={(e) => {
                e.preventDefault();
                setreservationInfo(row);
                // console.log(reservatoionInfo);
                handleShowReservation();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} />
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

  // Appointment
  const [showAppointment, setShowAppointment] = useState(false);

  const handleCloseAppointment = () => setShowAppointment(false);
  const handleShowAppointment = () => setShowAppointment(true);

  // Reservation
  const [showReservation, setShowReservation] = useState(false);

  const handleCloseReservation = () => setShowReservation(false);
  const handleShowReservation = () => setShowReservation(true);

  return (
    <div
      style={{
        display: "flex",
        height: "auto",
        backgroundColor: "white",
        width: "100%",
        padding: 0,
      }}
    >
      {/* Appointment */}
      <Modal show={showAppointment} onHide={handleCloseAppointment}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Appointment Service
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {appointmentInfo.service_name}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Pet Owner
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {appointmentInfo.name}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Status
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {appointmentInfo.appointment_status}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Appointment Date
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {appointmentInfo.date_scheduled}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Appointment Time
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {appointmentInfo.time_scheduled}
            </p>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Reservation */}
      <Modal show={showReservation} onHide={handleCloseReservation}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
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
              {reservationInfo.product_name}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Pet Owner
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {reservationInfo.name}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Status
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {reservationInfo.reservation_status}
            </p>

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
              {reservationInfo.reserve_quantity}
            </p>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Data Table */}

      <Container
        style={{
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#19B9CC",
          }}
        >
          Appointments
        </h2>

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
                This table shows the list of registered services in the vet
                clinic.{" "}
              </p>
            </Popover.Body>
          </Popover>
        </Overlay>

        <MaterialTable
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          columns={columnsAppointments}
          data={appointment}
          title={""}
          cellEditable={false}
          options={{
            sorting: true,
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
      </Container>

      <Container
        style={{
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#19B9CC",
          }}
        >
          Reservations
        </h2>

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
                This table shows the list of registered services in the vet
                clinic.{" "}
              </p>
            </Popover.Body>
          </Popover>
        </Overlay>

        <MaterialTable
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          columns={columnsReservation}
          data={reservation}
          title={""}
          cellEditable={false}
          options={{
            sorting: true,
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
      </Container>
    </div>
  );
}
export default TransactionHistory;
