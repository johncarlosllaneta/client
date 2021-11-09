import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  OverlayTrigger,
  Popover,
  Overlay,
} from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import { useParams } from "react-router-dom";

function HistoryReservation() {
  let { vetid } = useParams();
  var id = vetid.toString().replace("10##01", "/");
  const [showInsert, setShowInsert] = useState(false);
  const handleCloseInsert = () => setShowInsert(false);
  const handleShowInsert = () => {
    setShowInsert(true);
    // setUpdateProductId(id);
    // setUpdateProductName(name);
    // setUpdateProductDescription(desc);
    // setUpdateProductQuantity(quantity);
  };
  const [counter, setcounter] = useState(0);

  const [appointment, setappointment] = useState([]);
  useEffect(() => {
    if (counter < 10) {
      Axios.get(`${hostUrl}/history/appointment/${id}`).then((response) => {
        setappointment(response.data);
      });
      setcounter(counter + 1);
    }
  }, [appointment]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
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
      title: "Status",
      field: "appointment_status",
      sorting: true,
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
              style={{
                marginRight: 5,
                color: "white",
              }}
              onClick={() => {
                viewDetails(row.appointment_id);
                ModalView();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
              View Information
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

  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const ModalView = () => {
    setShowView(true);
  };

  const [appointmentDetails, setappointmentDetails] = useState([]);
  function viewDetails(appointment_id) {
    Axios.get(`${hostUrl}/appointment/viewdetails/${appointment_id}`).then(
      (response) => {
        setappointmentDetails(response.data[0]);
      }
    );
    // console.log(appointmentDetails);
    // handleShowView();
  }

  return (
    <div>
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
              This table shows the list of appointment history in the vet
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

export default HistoryReservation;
