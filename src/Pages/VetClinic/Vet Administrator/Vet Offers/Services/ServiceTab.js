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
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import imageI from "../../../../../Images/CHECKUP.png";
import imageII from "../../../../../Images/examination copy.png";
import imageIII from "../../../../../Images/baths.png";
import imageIV from "../../../../../Images/preventive.png";
import imageV from "../../../../../Images/scopy.png";
import imageVI from "../../../../../Images/surgeryWhite.png"
import getUser from "../../../../../Components/userData";
import { ToastContainer } from "react-toastify";
import { ToastDelete, ToastServicesUpdate } from "../../../../../Components/Toast";


const ServiceTab = (props) => {

  // alert(id);
  //category
  const [consulation, setconsulation] = useState(true);
  const [petExamination, setpetExamination] = useState(true);
  const [petGrooming, setpetGrooming] = useState(true);
  const [preventiveControls, setpreventiveControls] = useState(true);
  const [vaccination, setvaccination] = useState(true);
  const [inHouseLab, setinHouseLab] = useState(true);
  const [services, setservices] = useState([]);




  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    if (userData.enableConsultation == 1) {
      setconsulation(false);
    }
    if (userData.enableExamination == 1) {
      setpetExamination(false);
    }

    if (userData.enableGrooming == 1) {
      setpetGrooming(false);
    }
    if (userData.enableVaccination == 1) {
      setvaccination(false);
    }
    if (userData.enablePreventiveControls == 1) {
      setpreventiveControls(false);
    }

    if (userData.enableInHouseLab == 1) {
      setinHouseLab(false);
    }

    Axios.get(`${hostUrl}/services/:${userData.vetid}`).then((response) => {
      setservices(response.data);
      // console.log(response.data)
    });
  }, []);


  const [serviceName, setServiceName] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [serviceFee, setserviceFee] = useState();
  const [showInsert, setShowInsert] = useState(false);
  const [category, setCategory] = useState();
  const handleCloseInsert = () => setShowInsert(false);
  const handleShowInsert = () => setShowInsert(true);

  const [updateService, setupdateService] = useState([]);

  const [updateServiceId, setupdateServiceId] = useState();
  const [updateServiceName, setupdateServiceName] = useState();
  const [updateServiceDescription, setupdateServiceDescription] = useState();
  const [updateServiceFee, setupdateServiceFee] = useState();
  const [updateServiceCategory, setupdateServiceCategory] = useState();

  const [showServices, setShowServices] = useState(false);
  const handleCloseServices = () => setShowServices(false);
  const handleShowServices = (val) => {
    setupdateServiceId(val.service_id);
    setupdateServiceName(val.service_name);
    setupdateServiceDescription(val.service_description);
    setupdateServiceFee(val.service_fee);
    setupdateServiceCategory(val.category);
    // alert(updateServiceCategory);
    setShowServices(true);
  };

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (val) => {
    setupdateServiceId(val.service_id);
    setupdateServiceName(val.service_name);
    setupdateServiceDescription(val.service_description);
    setupdateServiceFee(val.service_fee);
    setupdateServiceCategory(val.category);
    setShowUpdate(true);
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (val) => {
    setupdateServiceId(val.service_id);
    setShowDelete(true);
  };



  const [validated, setValidated] = useState(false);

  const submitService = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      Axios.post(`${hostUrl}/services/insert/:${user.vetid}`, {
        serviceName: serviceName,
        serviceDescription: serviceDescription,
        service_fee: serviceFee,
        category: category,
      }).then((response) => {
        handleCloseInsert();
      });
    }

    setValidated(true);
  };

  const updatedService = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      Axios.put(`${hostUrl}/service/update/${updateServiceId}`, {
        updateServiceName: updateServiceName,
        updateServiceDescription: updateServiceDescription,
        updateServiceFee: updateServiceFee,
        updateServiceCategory: updateServiceCategory,
      }).then((response) => {
        handleCloseUpdate();
        Axios.get(`${hostUrl}/services/:${user.vetid}`).then((response) => {
          setservices(response.data);
          // console.log(response.data)
          ToastServicesUpdate();
        });
      });
    }

    setValidated(true);
  };

  const deleteService = () => {
    Axios.delete(`${hostUrl}/service/delete/:${updateServiceId}`, {}).then(
      (response) => {
        // alert(response.data.message);
        Axios.get(`${hostUrl}/services/:${user.vetid}`).then((response) => {
          setservices(response.data);
          // console.log(response.data)
          ToastDelete();
        });
      }
    );
  };

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Service Name",
      field: "service_name",
      sorting: true,
    },
    {
      title: "Category",
      field: "category",
      sorting: true,
      defaultSort: "asc",
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
                marginRight: 10,
              }}
              onClick={() => {
                handleShowServices(row);
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Edit Details" })}
          >
            <Button
              variant="primary"
              className="mr-3"
              style={{
                color: "white",
                marginRight: 10,
              }}
              onClick={() => {
                handleShowUpdate(row);
              }}
            >
              <FaRegEdit style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Delete Details" })}
          >
            <Button
              variant="danger"
              onClick={() => {
                handleShowDelete(row);
              }}
            >
              <AiOutlineDelete style={{ fontSize: 25 }} />
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

  return (
    <div style={{ padding: 20 }}>

      <ToastContainer />
      <Modal show={showServices} onHide={handleCloseServices}>
        <Modal.Header closeButton>
          <Modal.Title>Service Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <strong>Service Name</strong>
            <p>{updateServiceName}</p>
            <strong>Service Description</strong>
            <p>{updateServiceDescription}</p>
            <strong>Service Fee</strong>
            <p>{updateServiceFee}</p>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? you want to delete this service?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteService(updateServiceId);
              handleCloseDelete();
              // updateProduct(updateProductId);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={updatedService}>
          <Modal.Body>
            <Form.Group controlId="exampleForm.SelectCustom">
              <FloatingLabel
                controlId="floatingInputPrice"
                label="Service Category"
              >
                <Form.Select
                  custom
                  defaultValue={updateServiceCategory}
                  onChange={(e) => {
                    setupdateServiceCategory(e.target.value);
                  }}
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Pet Examination">Pet Examination</option>
                  <option value="Pet Grooming">Pet Grooming </option>
                  <option value="Preventive Controls">
                    Preventive Services
                  </option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Surgery">Surgery</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <FloatingLabel
                controlId="floatingInputPrice"
                label="Service Name"
              >
                <Form.Control
                  type="text"
                  minLength={5}
                  required
                  value={updateServiceName}
                  placeholder="Sample Service"
                  onChange={(e) => {
                    setupdateServiceName(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="valid">
                  You've input a valid service name.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Service name is required in this form.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProductD">
              <FloatingLabel controlId="floatingInputPrice" label="Description">
                <Form.Control
                  type="text"
                  as="textarea"
                  style={{ height: 200 }}
                  required
                  minLength={10}
                  value={updateServiceDescription}
                  placeholder="Sample Service description"
                  onChange={(e) => {
                    setupdateServiceDescription(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="valid">
                  You've input a valid description.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please input a valid medicine description.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <FloatingLabel controlId="floatingInputPrice" label="Service Fee">
                <Form.Control
                  type="text"
                  pattern="\d*"
                  maxLength={5}
                  required
                  minLength={1}
                  value={updateServiceFee}
                  placeholder="Sample Service"
                  onChange={(e) => {
                    setupdateServiceFee(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="valid">
                  You've input a valid fee .
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please input a valid service fee.
                </Form.Control.Feedback>
                <Form.Text id="passwordHelpBlock" muted>
                  Service Fee should be exact. ex. ₱ 100
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showInsert} onHide={handleCloseInsert}>
        <Modal.Header closeButton>
          <Modal.Title>Add Services</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={submitService}>
          <Modal.Body>
            <Form.Group controlId="exampleForm.SelectCustom">
              <FloatingLabel
                controlId="floatingInputPrice"
                label="Service Category"
              >
                <Form.Select
                  custom
                  required
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={null}></option>
                  <option value="Consultation">Consultation</option>
                  <option value="Pet Examination">Pet Examination</option>
                  <option value="Pet Grooming">Pet Grooming </option>
                  <option value="Preventive Controls">
                    Preventive Services
                  </option>
                  <option value="Vaccination">Vaccination</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <FloatingLabel
                controlId="floatingInputPrice"
                label="Service Name"
              >
                <Form.Control
                  type="text"
                  // value={updateProductName}
                  placeholder="Sample Service"
                  minLength={5}
                  required
                  onChange={(e) => {
                    setServiceName(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="valid">
                  You've input a valid service name.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Service name is required in this form.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProductD">
              <FloatingLabel controlId="floatingInputPrice" label="Description">
                <Form.Control
                  type="text"
                  as="textarea"
                  style={{ height: 200 }}
                  required
                  minLength={10}
                  placeholder="Sample Service description"
                  onChange={(e) => {
                    setServiceDescription(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="valid">
                  You've input a valid description.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please input a valid medicine description.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProduct">
              <FloatingLabel controlId="floatingInputPrice" label="Service Fee">
                <Form.Control
                  type="text"
                  pattern="\d*"
                  maxLength={5}
                  required
                  minLength={1}
                  // value={updateProductName}
                  placeholder="Sample Service Fee"
                  onChange={(e) => {
                    setserviceFee(e.target.value);
                  }}
                />

                <Form.Control.Feedback type="valid">
                  You've input a valid fee .
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please input a valid service fee.
                </Form.Control.Feedback>
                <Form.Text id="passwordHelpBlock" muted>
                  Service Fee should be exact. ex. ₱ 100
                </Form.Text>
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseInsert}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div style={{ justifyContent: "left", display: "flex" }}>
        <h5
          style={{
            color: "#696969",
            fontWeight: "bold",
            fontSize: 40,
          }}
        >
          Service Category
        </h5>
      </div>
      <div
        style={{
          height: "20vh",
          width: "75vw",
          backgroundColor: "white",
          padding: 25,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Row>


          <Col hidden={consulation}>
            <Link
              to={`/services/consultation/${user.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "15vh",
                  width: "10vw",
                  padding: 10,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div>
                  <Image
                    src={imageI}
                    style={{
                      height: "8vh",
                      width: "5vw",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                      margin: 0,
                    }}
                  >
                    Consultation
                  </p>
                </div>
              </Container>
            </Link>
          </Col>

          <Col hidden={petExamination}>
            <Link
              to={`/services/pet&examination/${user.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "15vh",
                  width: "10vw",
                  padding: 10,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div>
                  <Image
                    src={imageII}
                    style={{
                      height: "8vh",
                      width: "5vw",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                      margin: 0,
                    }}
                  >
                    Pet Examination
                  </p>
                </div>
              </Container>
            </Link>
          </Col>

          <Col hidden={petGrooming}>
            <Link
              to={`/services/pet&grooming/${user.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "15vh",
                  width: "10vw",
                  padding: 10,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div>
                  <Image
                    src={imageIII}
                    style={{
                      height: "8vh",
                      width: "5vw",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                      margin: 0,
                    }}
                  >
                    Pet Grooming
                  </p>
                </div>
              </Container>
            </Link>
          </Col>

          <Col hidden={preventiveControls}>
            <Link
              to={`/services/preventive&control/${user.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "15vh",
                  padding: 10,
                  width: "10vw",
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div>
                  <Image
                    src={imageIV}
                    style={{
                      height: "7vh",
                      width: "5vw",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                      margin: 0,
                    }}
                  >
                    Preventive Control
                  </p>
                </div>
              </Container>
            </Link>
          </Col>

          <Col hidden={vaccination}>
            <Link
              to={`/services/vaccination/${user.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "15vh",
                  width: "10vw",
                  padding: 10,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div>
                  <Image
                    src={imageV}
                    style={{
                      height: "8vh",
                      width: "5vw",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                      margin: 0,
                    }}
                  >
                    Vaccination
                  </p>
                </div>
              </Container>
            </Link>
          </Col>

          <Col hidden={inHouseLab}>
            <Link
              to={`/services/surgery/${user.vetid}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#3BD2E3",
                  height: "15vh",
                  width: "10vw",
                  padding: 10,
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: 5,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <div>
                  <Image
                    src={imageVI}
                    style={{
                      height: "8vh",
                      width: "5vw",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                      margin: 0,
                    }}
                  >
                    Surgery
                  </p>
                </div>
              </Container>
            </Link>
          </Col>
        </Row>
      </div>

      {/* Data Table */}

      <Row>
        <Col>
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
              marginTop: 10,
              width: "75vw",
            }}
            columns={columns}
            data={services}
            title={"Services Table"}
            cellEditable={false}
            options={{
              sorting: true,
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
        </Col>
      </Row>
    </div>
  );
};

export default ServiceTab;
