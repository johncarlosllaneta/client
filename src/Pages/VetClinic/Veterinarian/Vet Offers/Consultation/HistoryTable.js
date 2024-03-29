import React from "react";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
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
import { useParams, BrowserRouter, Link } from "react-router-dom";
import MaterialTable from "material-table";
import { AiOutlineSearch } from "react-icons/ai";
import getUser from "../../../../../Components/userData";
import { Skeleton, useMediaQuery } from "@mui/material";
function HistoryTable() {
  // let { vetid } = useParams();
  // var id = vetid.toString().replace("10##01", "/");

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getConsultation(userData.vetid);
  }, []);
  const [consultation, setconsultation] = useState([]);
  const getConsultation = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/doc/history/appointment/${id}`);
    // console.log(result.data);
    setconsultation(result.data);
  };

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

  const [viewDisableField, setviewDisableField] = useState(false);
  //modal
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  const [appointId, setappointId] = useState();
  const [serviceId, setserviceId] = useState();
  const [serviceName, setserviceName] = useState();
  const [petOwnerName, setpetOwnerName] = useState();
  const [petId, setpetId] = useState();
  const [petName, setpetName] = useState();
  const [vetAdminId, setvetAdminId] = useState("");
  const [vetDocId, setvetDocId] = useState();
  const [prescription, setprescription] = useState();
  const [findings, setfindings] = useState();
  const [date, setdate] = useState();
  const [time, settime] = useState();

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Appointment ID",
      field: "appointment_id",
      defaultSort: "asc",
    },
    {
      title: "Pet Owner Name",
      field: "name",
      defaultSort: "asc",
    },
    {
      title: "Pet Name",
      field: "pet_name",
      defaultSort: "asc",
    },
    {
      title: "Date",
      render: (row) =>
        dateConvertion(row.date_scheduled.toString().split("T")[0]),
      sorting: true,
    },
    {
      title: "Time",
      field: "time_scheduled",
      sorting: true,
    },
    {
      title: "Service",
      field: "category",
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Details" })}
          >
            <Button
              variant="info"
              style={{
                marginRight: 5,
                color: "white",
              }}
              onClick={(e) => {
                e.preventDefault();
                setappointId(row.appointment_id);
                setpetOwnerName(row.name);
                setserviceId(row.service_id);
                setserviceName(row.service_name);
                setpetId(row.pet_id);
                setpetName(row.pet_name);
                settime(row.time_scheduled);
                setvetAdminId(user.vetid);
                setvetDocId(user.vet_doc_id);
                setdate(
                  dateConvertion(row.date_scheduled.toString().split("T")[0])
                );
                setfindings(row.findings);
                setprescription(row.prescription);
                setviewDisableField(true);
                handleShow2();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Details
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Modal show={show2} onHide={handleClose2} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>View Details</Modal.Title>
        </Modal.Header>
        <Row>
          {/* <Form noValidate validated={true} onSubmit={insertPrescription}> */}
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group
                  controlId="formBasicProduct"
                  style={{
                    marginTop: 10,
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
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Service Name"
                  >
                    <Form.Control
                      type="text"
                      value={serviceName}
                      disabled={viewDisableField}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group
                  controlId="formBasicProduct"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Pet Name"
                  >
                    <Form.Control
                      type="text"
                      value={petName}
                      disabled={viewDisableField}
                      // pattern="\d*"
                      // maxLength={15}
                      // required
                      // // onChange={(e) => {
                      // //   setupdateMedicineNumber(e.target.value);
                      // // }}
                      // minLength={8}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group
                  controlId="formBasicProduct"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Date Scheduled"
                  >
                    <Form.Control
                      type="text"
                      value={date}
                      disabled={viewDisableField}
                      // pattern="\d*"
                      // maxLength={15}
                      // required
                      // // onChange={(e) => {
                      // //   setupdateMedicineNumber(e.target.value);
                      // // }}
                      // minLength={8}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group
                  controlId="formBasicProduct"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Time Scheduled"
                  >
                    <Form.Control
                      type="text"
                      value={time}
                      disabled={viewDisableField}
                      // onChange={(e) => {
                      //   setupdateMedicineNumber(e.target.value);
                      // }}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="formBasicProduct"
                  className="mb-3"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Prescription"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "155px" }}
                      value={prescription}
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
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Findings"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "155px" }}
                      type="text"
                      value={findings}
                      disabled={viewDisableField}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
          </Modal.Footer>
          {/* </Form> */}
        </Row>
      </Modal>

      <Row>
        <Col>
          <MaterialTable
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            columns={columns}
            data={consultation}
            title={"History"}
            cellEditable={false}
            options={{
              sorting: true,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default HistoryTable;
