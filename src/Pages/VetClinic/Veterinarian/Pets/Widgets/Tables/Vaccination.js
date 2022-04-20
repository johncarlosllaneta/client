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
import { FaSyringe } from "react-icons/fa";
import getUser from "../../../../../../Components/userData";
import { dateConvertion } from "../../../../../../Components/FormatDateTime";
import { ToastVaccine } from "../../../../../../Components/Toast";
import { ToastContainer } from "react-toastify";
function Vaccination() {
  const [vaccination, setvaccination] = useState([]);
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getVaccination(userData.vetid);
  }, []);

  const getVaccination = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/doc/pets/vaccination/${id}`);
    // console.log(result.data);
    setvaccination(result.data);
  };

  function doneVaccine(immuneId) {
    Axios.put(`${hostUrl}/doc/vaccination/${immuneId}`, {
      weight: petWeight,
      vaccineName: vaccineName,
      againsts: against,
      vaccineNumber: vaccineNumber,
      manufacturer: manufacturer,
      prescription: prescription,
      immuneId: immuneId,
    });

    refreshTable();
    ToastVaccine();

    setpetWeight("");
    setagainst("");
    setvaccineName("");
    setmanufacturer("");
    setprescription("");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  function refreshTable() {
    Axios.get(`${hostUrl}/doc/pets/vaccination/${user.vetid}`).then(
      (response) => {
        setvaccination(response.data);
      }
    );
  }

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
  const [vetAdminId, setvetAdminId] = useState();
  const [vetDocId, setvetDocId] = useState();
  const [petWeight, setpetWeight] = useState();
  const [vaccineName, setvaccineName] = useState();
  const [against, setagainst] = useState();
  const [manufacturer, setmanufacturer] = useState();
  const [prescription, setprescription] = useState();
  const [vaccineNumber, setvaccineNumber] = useState();
  const [date, setdate] = useState();
  const [time, settime] = useState();
  const [immuneId, setimmuneId] = useState();

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
            overlay={renderTooltip({ msg: "add vaccine details" })}
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
                setimmuneId(row.immunization_id);
                setdate(
                  dateConvertion(row.date_scheduled.toString().split("T")[0])
                );
                setviewDisableField(true);
                handleShow2();
              }}
            >
              <FaSyringe style={{ fontSize: 25, marginRight: 4 }} /> Vaccine
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
          Are you sure you want you are done to this vaccination?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationInsert}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              doneVaccine(immuneId);
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
          <Modal.Title>Vaccine Details</Modal.Title>
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

                  <Form.Group
                    controlId="formBasicProduct"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Pet Weight"
                    >
                      <Form.Control
                        type="number"
                        required
                        value={petWeight}
                        placeholder="Weight(Kg)"
                        onChange={(e) => {
                          setpetWeight(e.target.value);
                        }}
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
                      label="Against"
                    >
                      <Form.Control
                        type="text"
                        value={against}
                        required
                        placeholder="Against"
                        onChange={(e) => {
                          setagainst(e.target.value);
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
                      label="Manufacturer"
                    >
                      <Form.Control
                        type="text"
                        value={manufacturer}
                        required
                        placeholder="Manufacturer"
                        onChange={(e) => {
                          setmanufacturer(e.target.value);
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
                      label="Vaccine Name"
                    >
                      <Form.Control
                        type="text"
                        value={vaccineName}
                        required
                        placeholder="Vaccine name"
                        onChange={(e) => {
                          setvaccineName(e.target.value);
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
                      label="Vaccine Number"
                    >
                      <Form.Control
                        type="number"
                        value={vaccineNumber}
                        required
                        placeholder="Vaccine number/Lot.#"
                        onChange={(e) => {
                          setvaccineNumber(e.target.value);
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
                        style={{ height: "170px" }}
                        value={prescription}
                        required
                        placeholder="Sample Prescription"
                        onChange={(e) => {
                          setprescription(e.target.value);
                        }}
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
            data={vaccination}
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

export default Vaccination;
