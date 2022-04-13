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
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../../Components/Host";
import { useParams, BrowserRouter, Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineFileDone } from "react-icons/ai";
import { FaFilePrescription } from "react-icons/fa";
import getUser from "../../../../../../Components/userData";
import { dateConvertion } from "../../../../../../Components/FormatDateTime";
import { ToastExamine } from "../../../../../../Components/Toast";
import { ToastContainer } from "react-toastify";
function Examination() {
  const [examination, setexamination] = useState([]);
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getExamination(userData.vetid);
  }, []);

  const getExamination = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/doc/pets/examination/${id}`);
    // console.log(result.data);
    setexamination(result.data);
  };

  const [viewDisableField, setviewDisableField] = useState(false);
  //modal
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

  const insertPrescription = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowConfirmationInsert();
      handleClose2();
    }

    setValidated(true);
  };
  const handleShowUpdate = () => setShowUpdate(true);

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
  const [category, setcategory] = useState();
  const [medicalId, setmedicalId] = useState();

  function insertMedicines(medicalId) {
    Axios.put(`${hostUrl}/doc/examination/${medicalId}`, {
      prescrip: prescription,
      findings: findings,
      medicalId: medicalId,
    });

    setprescription("");
    setfindings("");
    handleClose2();

    ToastExamine();

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  function refreshTable() {
    Axios.get(`${hostUrl}/doc/pets/examination/${user.vetid}`).then(
      (response) => {
        setexamination(response.data);
      }
    );
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Appointment ID",
      field: "appointment_id",
      defaultSort: "asc",
    },
    {
      title: "Pet Owner",
      field: "pet_owner_name",
      sorting: true,
    },
    {
      title: "Pet",
      field: "pet_name",
      sorting: true,
    },
    {
      title: "Service Name",
      field: "service_name",
      sorting: true,
    },

    {
      title: "Category",
      field: "category",
      sorting: true,
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
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={
              row.category == "Pet Examination"
                ? renderTooltip({ msg: "Add prescription and findings" })
                : renderTooltip({ msg: "Add prescription" })
            }
          >
            <Button
              variant="info"
              style={{
                marginRight: 10,
                color: "white",
              }}
              onClick={(e) => {
                setappointId(row.appointment_id);
                setpetOwnerName(row.name);
                setserviceId(row.service_id);
                setserviceName(row.service_name);
                setpetId(row.pet_id);
                setpetName(row.pet_name);
                settime(row.time_scheduled);
                setvetAdminId(user.vetid);
                setvetDocId(user.vet_doc_id);
                setcategory(row.category);
                setmedicalId(row.medical_history_id);
                setdate(
                  dateConvertion(row.date_scheduled.toString().split("T")[0])
                );
                setviewDisableField(true);
                handleShow2();
              }}
            >
              <FaFilePrescription style={{ fontSize: 25 }} /> Prescription
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ToastContainer />
      <Modal
        show={showConfirmationInsert}
        onHide={handleCloseConfirmationInsert}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want you are done to this examination?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationInsert}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              insertMedicines(medicalId);
              handleCloseConfirmationInsert();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Examination Details</Modal.Title>
        </Modal.Header>
        <Row>
          <Form noValidate validated={true} onSubmit={insertPrescription}>
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

                {category == "Pet Examination" ? (
                  <Col>
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
                          required
                          value={findings}
                          placeholder="Sample Prescription"
                          onChange={(e) => {
                            setfindings(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Form.Group>

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
                          required
                          placeholder="Sample Prescription"
                          onChange={(e) => {
                            setprescription(e.target.value);
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
                  </Col>
                ) : (
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
                          required
                          placeholder="Sample Prescription"
                          onChange={(e) => {
                            setprescription(e.target.value);
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
                  </Col>
                )}
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
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
            data={examination}
            title={" "}
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

export default Examination;
