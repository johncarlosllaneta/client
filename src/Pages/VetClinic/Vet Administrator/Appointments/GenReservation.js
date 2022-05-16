import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Popover,
  Overlay,
  FloatingLabel,
  Row,
} from "react-bootstrap";
import { AiOutlineSearch, AiOutlineFileDone } from "react-icons/ai";

import { TiCancel } from "react-icons/ti";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../Components/Host";
import { useParams } from "react-router-dom";
import AddAppointment from "./AddAppointment";

const GenReservation = (props) => {

  const [notifService_id, setnotifService_id] = useState();


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
      title: "Service Category",
      field: "category",
      sorting: true,
    },
    {
      title: "Date Schedule",
      field: "date_scheduled",
      sorting: true,
      defaultSort: "desc",
      render: (row) => dateConvertion(String(row.date_scheduled).split("T")[0]),
    },
    {
      title: "Time Schedule",
      field: "time_scheduled",
      sorting: true,
    },
    {
      title: "Action",
      render: (row) => (
        <div style={{ display: "flex", flexDirection: "row " }}>
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
            overlay={renderTooltip({ msg: "Done Appointment" })}
          >
            <Button
              variant="primary"
              style={{
                marginRight: 5,
              }}
              onClick={() => {
                setpet_id(row.pet_id);
                setappointmentID(row.appointment_id);
                setcategory(row.category);
                setnotifService_id(row.service_id);
                setserviceName(row.service_name);
                handleShowModalFinish();
              }}
            >
              <AiOutlineFileDone style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Void Appointment" })}
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

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

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
    Axios.get(
      `${hostUrl}/confirm/appointment/viewdetails/${appointment_id}`
    ).then((response) => {
      setappointmentDetails(response.data[0]);
    });
    // console.log(appointmentDetails);
    // handleShowView();
  }

  // Decline Appointment
  const [appointmentID, setappointmentID] = useState();
  const declinedAppointment = () => {
    Axios.put(`${hostUrl}/vetclinic/appointment/decline/${appointmentID}`).then(
      (response) => {
        props.refreshTables(props.vetid);
        Axios.post(`${hostUrl}/notification/appointment`, {
          appointment_id: appointmentID,
          service_id: notifService_id,
          status: "Void",
        });
      }
    );
  };
  // Decline appointment modal
  const [showDeclinedModal, setShowDeclinedModal] = useState(false);
  const handleCloseDeclinedModal = () => setShowDeclinedModal(false);
  const handleShowModalDecline = () => setShowDeclinedModal(true);

  // Finishing Appointment
  const [category, setcategory] = useState();
  const finishAppointment = () => {
    Axios.put(`${hostUrl}/vetclinic/appointment/done/${appointmentID}`).then(
      (response) => {
        props.refreshTables(props.vetid);
        Axios.post(`${hostUrl}/notification/appointment`, {
          appointment_id: appointmentID,
          service_id: notifService_id,
          status: "Done",
        });
      }
    );
  };
  // Finishing appointment modal
  const [showFinishModal, setShowFinishModal] = useState(false);
  const handleCloseFinishModal = () => setShowFinishModal(false);
  const handleShowModalFinish = () => setShowFinishModal(true);

  // Vaccination appointment modal
  const [showVaccinationModal, setShowVaccinationModal] = useState(false);
  const handleCloseVaccinationModal = () => setShowVaccinationModal(false);
  const handleShowModalVaccination = () => setShowVaccinationModal(true);

  // Vaccination insertion
  const insertVaccineInformation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      Axios.post(`${hostUrl}/pets/vaccination/record/${pet_id}`, {
        weight: weight,
        appointment_id: appointmentID,
        vaccineName: vaccineName,
        againts: againts,
        manufacturer: manufacturer,
        vaccineNumber: vaccineNumber,
      });
      Axios.put(`${hostUrl}/vetclinic/appointment/done/${appointmentID}`)
      Axios.post(`${hostUrl}/notification/appointment`, {
        appointment_id: appointmentID,
        service_id: notifService_id,
        status: "Done",
      });
      props.refreshTables(props.vetid);

      setValidated(false);
      handleCloseVaccinationModal();
    }

    setValidated(true);
  };

  // validation
  const [validated, setValidated] = useState(false);

  // vaccine information
  const [pet_id, setpet_id] = useState();
  const [vaccineName, setvaccineName] = useState();
  const [againts, setagaints] = useState();
  const [manufacturer, setmanufacturer] = useState();
  const [vaccineNumber, setvaccineNumber] = useState();
  const [weight, setweight] = useState();

  const [serviceName, setserviceName] = useState();

  return (
    <div>




      {/* Finish appointment */}
      <Modal
        show={showFinishModal}
        onHide={handleCloseFinishModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to finish this appointment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFinishModal}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // alert(category)
              if (category === "Vaccination") {
                Axios.post(`${hostUrl}/pets/vaccination/record/${pet_id}`, {
                  weight: '',
                  appointment_id: appointmentID,
                  vaccineName: '',
                  againts: '',
                  manufacturer: '',
                  vaccineNumber: '',
                });
                Axios.put(`${hostUrl}/vetclinic/appointment/done/${appointmentID}`)
                Axios.post(`${hostUrl}/notification/appointment`, {
                  appointment_id: appointmentID,
                  service_id: notifService_id,
                  status: "Done",
                });
                setTimeout(() => {
                  props.refreshTables(props.vetid);
                }, 2000);
                handleCloseFinishModal();
              }
              else if (category === "Preventive Controls" || category === "Pet Examination") {

                Axios.post(`${hostUrl}/pets/medicalhistory/record/${pet_id}`, {
                  appointment_id: appointmentID,
                  service_id: notifService_id,
                  vetid: props.vetid

                });
                Axios.put(`${hostUrl}/vetclinic/appointment/done/${appointmentID}`)
                Axios.post(`${hostUrl}/notification/appointment`, {
                  appointment_id: appointmentID,
                  service_id: notifService_id,
                  status: "Done",
                });
                setTimeout(() => {
                  props.refreshTables(props.vetid);
                }, 2000);

                handleCloseFinishModal();
              }

              else if (category === "Consultation") {

                Axios.post(`${hostUrl}/pets/consultation/records/${pet_id}`, {
                  appointment_id: appointmentID,
                  service_id: notifService_id,
                  vetid: props.vetid,
                  consultationType: serviceName
                });
                Axios.put(`${hostUrl}/vetclinic/appointment/done/${appointmentID}`)
                Axios.post(`${hostUrl}/notification/appointment`, {
                  appointment_id: appointmentID,
                  service_id: notifService_id,
                  status: "Done",
                });
                setTimeout(() => {
                  props.refreshTables(props.vetid);
                }, 2000);

                handleCloseFinishModal();
              }
              else {
                finishAppointment();
                handleCloseFinishModal();
              }
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
        <Modal.Body>Do you want to cancel this appointment?</Modal.Body>
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
              This table shows the list of confirmed appointment in the vet
              clinic.{" "}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>

      <MaterialTable
        columns={columns}
        data={props.appointmentConfirm}
        title={"Confirmed Appointments"}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          paging: true,
          pageSize: 10,
        }}
        actions={[
          // {
          //   icon: "add",
          //   tooltip: "Add appointment",
          //   isFreeAction: true,
          //   onClick: handleShowModalAddAppointment,
          // },
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

export default GenReservation;
