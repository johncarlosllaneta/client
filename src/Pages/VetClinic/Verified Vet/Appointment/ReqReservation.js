import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  OverlayTrigger,
  Popover,
  Overlay,
} from "react-bootstrap";
import Axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { FiCheckSquare } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../Components/Host";
import { useParams } from "react-router-dom";

const ReqReservation = (props) => {
  let { vetid } = useParams();
  var id = vetid.toString().replace("10##01", "/");
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const ModalView = () => {
    setShowView(true);
  };

  const [counter, setcounter] = useState(0);
  const [notifService_id, setnotifService_id] = useState();
  const [appointment, setappointment] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/pending/appointment/${id}`).then((response) => {
        setappointment(response.data);
      });
      setcounter(counter + 1);
    }
  }, [appointment]);

  // useEffect(() => {
  //   if (counter < 6) {
  //     Axios.put(`${hostUrl}/expiration/pending/appointment/${id}`);
  //   }
  // }, []);

  const [appointmentDetails, setappointmentDetails] = useState([]);
  function viewDetails(appointment_id) {
    Axios.get(
      `${hostUrl}/pending/appointment/viewdetails/${appointment_id}`
    ).then((response) => {
      setappointmentDetails(response.data[0]);
    });
    // console.log(appointmentDetails);
    // handleShowView();
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

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Appointment ID",
      field: "appointment_id",
    },
    {
      title: "Pet Owner Name",
      field: "name",
    },
    {
      title: "Service Name",
      field: "service_name",
      sorting: true,
    },
    {
      title: "Date Schedule",
      field: "date_scheduled",
      defaultSort: "desc",
      render: (row) => dateConvertion(String(row.date_scheduled).split("T")[0]),
      sorting: true,
    },

    {
      title: "Time Schedule",
      field: "time_scheduled",
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
              style={{
                marginRight: 5,
              }}
              onClick={() => {
                viewDetails(row.appointment_id);
                ModalView();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Accept Appointment" })}
          >
            <Button
              variant="primary"
              style={{
                marginRight: 5,
              }}
              onClick={() => {
                setappointmentID(row.appointment_id);
                setnotifService_id(row.service_id);
                handleShowModalAccept();
              }}
            >
              <FiCheckSquare style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Decline Appointment" })}
          >
            <Button
              variant="danger"
              onClick={() => {
                setappointmentID(row.appointment_id);
                setnotifService_id(row.service_id);
                handleShowModalDecline();
              }}
            >
              <TiCancel style={{ fontSize: 25 }} />
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

  // Accept Appointment
  const [appointmentID, setappointmentID] = useState();
  const acceptAppointment = () => {
    Axios.put(`${hostUrl}/vetclinic/appointment/accept/${appointmentID}`).then(
      (response) => {
        Axios.get(`${hostUrl}/pending/appointment/${id}`).then((response) => {
          setappointment(response.data);
        });
        Axios.post(`${hostUrl}/notification/appointment`, {
          appointment_id: appointmentID,
          service_id: notifService_id,
          status: "Approved",
        });
      }
    );
  };
  // Decline Appointment
  const declinedAppointment = () => {
    Axios.put(`${hostUrl}/vetclinic/appointment/decline/${appointmentID}`).then(
      (response) => {
        Axios.get(`${hostUrl}/pending/appointment/${id}`).then((response) => {
          setappointment(response.data);
        });
        Axios.post(`${hostUrl}/notification/appointment`, {
          appointment_id: appointmentID,
          service_id: notifService_id,
          status: "Declined",
        });
      }
    );
  };

  // Accept appointment modal
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const handleCloseAcceptModal = () => setShowAcceptModal(false);
  const handleShowModalAccept = () => setShowAcceptModal(true);

  // Decline appointment modal
  const [showDeclinedModal, setShowDeclinedModal] = useState(false);
  const handleCloseDeclinedModal = () => setShowDeclinedModal(false);
  const handleShowModalDecline = () => setShowDeclinedModal(true);

  return (
    <div>
      {/* Accept appointment */}
      <Modal
        show={showAcceptModal}
        onHide={handleCloseAcceptModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to accept this appointment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAcceptModal}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              acceptAppointment();
              handleCloseAcceptModal();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Declined appointment */}
      <Modal
        show={showDeclinedModal}
        onHide={handleCloseDeclinedModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to decline this appointment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeclinedModal}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              declinedAppointment();
              handleCloseDeclinedModal();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Details */}
      <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Service Information</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Service Name: </strong> {appointmentDetails.service_name}
          </p>
          <p>
            <strong>Service Description: </strong>{" "}
            {appointmentDetails.service_description}
          </p>
          <p>
            <strong>Date: </strong>{" "}
            {formatDate(appointmentDetails.date_scheduled)} <br></br>{" "}
            <strong>Time: </strong> {appointmentDetails.time_scheduled}
          </p>
          <p>
            <strong>Fee: </strong> {appointmentDetails.service_fee}
          </p>
          <p>
            <strong>Pet Owner: </strong> {appointmentDetails.name}
          </p>
          <p>
            <strong>Pet Involved: </strong> {appointmentDetails.pet_name}
          </p>
          <p>
            <strong>Status: </strong> {appointmentDetails.appointment_status}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Data Table */}

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
              This table shows the list of pending appointment in the vet
              clinic.{" "}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>

      <MaterialTable
        columns={columns}
        data={appointment}
        title={""}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          pageSize: 10,
          paging: true,
          searchAutoFocus: true,
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
};

export default ReqReservation;
