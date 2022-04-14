import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import DataTable from "react-data-table-component";
import "./PetOwnerTable.css";
import { ToastContainer } from "react-toastify";
import { ToastDelete, ToastUpdate } from "../../Components/Toast";
import { hostUrl } from "../../Components/Host";

function PetOwnerTable() {
  // pet information
  const [counter, setcounter] = useState(0);
  const [pet, setPet] = useState([]);

  //for view of pet owner data
  const [viewDataProfileChecker, setviewDataProfileChecker] = useState(false);

  const [viewDataProfile, setviewDataProfile] = useState([]);

  const [updateRefresher, setupdateRefresher] = useState(false);

  //information of pet owners need to update
  const [updatePetOwnerId, setUpdatePetOwnerId] = useState("");
  const [updatePetOwnerName, setUpdatePetOwnerName] = useState("");
  const [updatePetOwnerEmail, setUpdatePetOwnerEmail] = useState("");
  const [updatePetOwnerAddress, setUpdatePetOwnerAddress] = useState("");
  const [updatePetOwnerContactNumber, setUpdatePetOwnerContactNumber] =
    useState("");
  const [updatePetOwnerProfile, setupdatePetOwnerProfile] = useState("");

  //delete functionality
  const [showDeleteId, setShowDeleteId] = useState();
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [show, setShow] = useState(false);

  const handleShow = (petOwnerData) => {
    // console.log(petOwnerData);
    setShow(true);
    setUpdatePetOwnerName(petOwnerData.name);
    setUpdatePetOwnerId(petOwnerData.pet_owner_id);
    setUpdatePetOwnerEmail(petOwnerData.email);
    setUpdatePetOwnerAddress(petOwnerData.address);
    setUpdatePetOwnerContactNumber(petOwnerData.contact_number);
    setupdatePetOwnerProfile(petOwnerData.profilePicture);
  };

  const [data, setdata] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/petowner`).then((response) => {
        setdata(response.data);
      });
      setcounter(counter + 1);
    }
  }, [updateRefresher]);

  function getPet(petOwnerId) {
    Axios.get(`${hostUrl}/pets/:${petOwnerId}`).then((response) => {
      setPet(response.data);
      // console.log(pet);
    });
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: "contact_number",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ flexDirection: "row", display: "flex" }}>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Details" })}
          >
            <Button
              variant="info"
              className="mr-3"
              style={{
                marginRight: 10,
              }}
              onClick={() => {
                setviewDataProfile(row);
                setviewDataProfileChecker(true);
                getPet(row.pet_owner_id);
                setShow(false);
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>



          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Archived Details" })}
          >
            <Button
              variant="danger"
              style={{
                marginRight: 10,
              }}
              onClick={() => {
                handleShowDelete();
                setShowDeleteId(row.pet_owner_id);
              }}
            >
              <AiOutlineDelete style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
      sortable: true,
    },
  ];

  const [q, setq] = useState("");

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

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

  const deletePetOwner = (show) => {
    Axios.put(`${hostUrl}/petowner/archived/${showDeleteId}`);
    // alert(showDeleteId);
    handleCloseDelete();
    ToastDelete();
    setShow(false);
    setviewDataProfileChecker(false);
    setupdateRefresher(!updateRefresher);
    setviewDataProfile([]);

    Axios.get(`${hostUrl}/petowner`).then((response) => {
      setdata(response.data);
    });
  };

  const updatePetOwner = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      Axios.put(`${hostUrl}/petowner/update/${updatePetOwnerId}`, {
        updatePetOwnerName: updatePetOwnerName,
        updatePetOwnerEmail: updatePetOwnerEmail,
        updatePetOwnerAddress: updatePetOwnerAddress,
        updatePetOwnerContactNumber: updatePetOwnerContactNumber,
      });

      ToastUpdate();
      setShow(false);
      setviewDataProfileChecker(false);
      setviewDataProfile([]);
      setupdateRefresher(!updateRefresher);
    }
  };

  var profileDetails = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={{ padding: 20 }}>
      <ToastContainer />

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Archiving</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure, you want to archived this pet owner?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={deletePetOwner}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Data Table */}

      <Row>
        <Col>
          <Card>
            <Card
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Card.Body>
                <DataTable
                  actions={
                    <Form.Group>
                      <Form.Control
                        type="text"
                        value={q}
                        placeholder={"Search"}
                        onChange={(e) => setq(e.target.value)}
                      />{" "}
                    </Form.Group>
                  }
                  title={"Pet Owner"}
                  pagination
                  columns={columns}
                  data={search(data)}
                  responsive={true}
                  defaultSortField="name"
                />
              </Card.Body>
            </Card>
          </Card>
        </Col>
      </Row>

      {/* pet owner profile data */}
      {!show && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card
                style={{
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                {!viewDataProfileChecker ? (
                  <Card.Body>
                    <Row style={{ display: "flex", justifyContent: "center" }}>
                      Nothing to show
                    </Row>
                  </Card.Body>
                ) : (
                  <Card.Body>
                    <Row>
                      <Col sm="2" className="ml-3 ">
                        <Row className="mt-3" style={profileDetails}>
                          <img
                            src={viewDataProfile.profilePicture}
                            style={{
                              height: 150,
                              width: 150,
                              borderRadius: 100,
                              border: "7px",
                              borderStyle: "solid",
                              borderColor: "transparent",
                              marginTop: "2vh",
                            }}
                          ></img>
                        </Row>

                        <Row className="mt-3" style={profileDetails}>
                          <strong style={{ fontSize: 20 }}>
                            {viewDataProfile.name}
                          </strong>
                        </Row>
                      </Col>

                      <Col className="ml-5">
                        <Row className="mt-3" style={{ fontSize: 25 }}>
                          <strong>Pet Owner Details</strong>
                        </Row>
                        <Row
                          className="ml-5 mt-3"
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Email </strong>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{ fontSize: 20, color: "black" }}
                        >
                          <p>{viewDataProfile.email}</p>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Address </strong>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{ fontSize: 20, color: "black" }}
                        >
                          <p>{viewDataProfile.address}</p>
                        </Row>

                        <Row
                          className="ml-5"
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Contact Number </strong>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{ fontSize: 20, color: "black" }}
                        >
                          <p>{viewDataProfile.contact_number}</p>
                        </Row>

                        <Row
                          className="ml-5"
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Date Created </strong>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{ fontSize: 20, color: "black" }}
                        >
                          <p>
                            {formatDateAndTime(viewDataProfile.created_date)}
                          </p>
                        </Row>
                      </Col>
                      <Col className="ml-5">
                        <Row style={{ fontSize: 25 }}>
                          <Col
                            className="mt-3"
                            style={{ display: "flex", alignItems: "start" }}
                          >
                            <strong>Pets</strong>
                          </Col>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "end",
                              justifyContent: "flex-end",
                              marginRight: 10,
                            }}
                          >
                            <MdClear
                              style={{ fontSize: 25, cursor: "pointer" }}
                              onClick={() => {
                                setviewDataProfileChecker(false);
                                setviewDataProfile([]);
                              }}
                            />
                          </Col>
                        </Row>

                        <Row
                          className="mt-3"
                          id="petContainer"
                          style={{
                            fontSize: 25,
                            maxHeight: 205,
                            display: "flex",
                            overflowY: "auto",
                          }}
                        >
                          {pet.length === 0 ? (
                            <p>No pets registered</p>
                          ) : (
                            pet.map((val) => {
                              return (
                                <div>
                                  <Card
                                    className="mb-3"
                                    style={{
                                      boxShadow:
                                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                      height: 200,
                                      width: 450,
                                    }}
                                  >
                                    <Row>
                                      <Col sm="4" style={profileDetails}>
                                        <img
                                          src={val.pet_picture}
                                          style={{
                                            backgroundColor: "blanchedalmond",
                                            height: 75,
                                            width: 75,
                                            borderRadius: 50,
                                            border: "7px",
                                            borderStyle: "solid",
                                            borderColor: "transparent",
                                            marginTop: "1vh",
                                          }}
                                        ></img>
                                      </Col>
                                      <Col
                                        sm="8"
                                        style={{
                                          display: "block",
                                          justifyContent: "start",
                                        }}
                                      >
                                        <Row
                                          className="mt-3"
                                          style={{ fontSize: 25 }}
                                        >
                                          <strong>Pets Details</strong>
                                        </Row>
                                        <Row>
                                          <Col>
                                            <Row
                                              style={{
                                                fontSize: 15,
                                                color: "grey",
                                              }}
                                            >
                                              <strong>Name: </strong>
                                            </Row>
                                            <Row
                                              style={{
                                                fontSize: 20,
                                                color: "black",
                                              }}
                                            >
                                              <p>{val.pet_name}</p>
                                            </Row>
                                          </Col>
                                          <Col>
                                            <Row
                                              style={{
                                                fontSize: 15,
                                                color: "grey",
                                              }}
                                            >
                                              <strong>Breed: </strong>
                                            </Row>
                                            <Row
                                              style={{
                                                fontSize: 20,
                                                color: "black",
                                              }}
                                            >
                                              <p>{val.breed_of_pet}</p>
                                            </Row>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col>
                                            <Row
                                              style={{
                                                fontSize: 15,
                                                color: "grey",
                                              }}
                                            >
                                              <strong>Type of Pet: </strong>
                                            </Row>
                                            <Row
                                              style={{
                                                fontSize: 20,
                                                color: "black",
                                              }}
                                            >
                                              <p>{val.type_of_pet}</p>
                                            </Row>
                                          </Col>
                                          <Col>
                                            <Row
                                              style={{
                                                fontSize: 15,
                                                color: "grey",
                                              }}
                                            >
                                              <strong>Gender: </strong>
                                            </Row>
                                            <Row
                                              style={{
                                                fontSize: 20,
                                                color: "black",
                                              }}
                                            >
                                              <p>{val.gender}</p>
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Card>{" "}
                                </div>
                              );
                            })
                          )}
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                )}
              </Card>
            </Card>
          </Col>
        </Row>
      )}

      {/* edit pet owner */}
      {show && (
        <Row className="mt-4">
          <Form validated={true} noValidate onSubmit={updatePetOwner}>
            <Col>
              <Card>
                <Card
                  style={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <Card.Body>
                    <Row>
                      <Col sm="2" className="ml-3 ">
                        <Row className="mt-3" style={profileDetails}>
                          <img
                            src={updatePetOwnerProfile}
                            style={{
                              height: 150,
                              width: 150,
                              borderRadius: 100,
                              border: "7px",
                              borderStyle: "solid",
                              borderColor: "transparent",
                              marginTop: "2vh",
                            }}
                          ></img>
                        </Row>

                        <Row
                          className=" mt-3"
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Name </strong>
                        </Row>
                        <Row
                          className="ml-3"

                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control
                              type="text"
                              minLength={5}
                              maxLength={50}
                              required
                              pattern="^[a-zA-Z ]*$"
                              value={updatePetOwnerName}
                              onChange={(e) => {
                                setUpdatePetOwnerName(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Row>
                      </Col>

                      <Col className="ml-5">
                        <Row className="mt-3" style={{ fontSize: 25 }}>
                          <strong>Pet Owner Details</strong>
                        </Row>
                        <Row
                          className="ml-5 mt-3"
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Email </strong>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{
                            fontSize: 20,
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control
                              type="email"
                              pattern=".+@gmail\.com|.+@yahoo\.com|.+@hotmail\.com|.+@aol\.com|.+@hotmail\.co\.uk"
                              required
                              value={updatePetOwnerEmail}
                              onChange={(e) => {
                                setUpdatePetOwnerEmail(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Row>
                        <Row
                          className="ml-5 "
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Address </strong>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{ fontSize: 20, color: "black" }}
                        >
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control
                              type="text"
                              as="textarea"
                              minLength={10}
                              maxLength={50}
                              pattern="^[a-zA-Z ]*$"
                              required
                              rows={3}
                              cols={50}
                              value={updatePetOwnerAddress}
                              onChange={(e) => {
                                setUpdatePetOwnerAddress(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Row>

                        <Row
                          className="ml-5"
                          style={{ fontSize: 15, color: "grey" }}
                        >
                          <strong>Contact Number </strong>
                        </Row>
                        <Row
                          className="ml-5"
                          style={{
                            fontSize: 20,
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control
                              type="text"
                              maxLength={11}
                              minLength={11}
                              pattern="\d*"
                              required
                              value={updatePetOwnerContactNumber}
                              onChange={(e) => {
                                setUpdatePetOwnerContactNumber(e.target.value);
                              }}
                            />
                          </Form.Group>
                        </Row>
                      </Col>
                      <Col sm="4">
                        <Row style={{ fontSize: 25 }}>
                          <Col style={{ display: "flex", alignItems: "start" }}>
                            <strong>Actions</strong>
                          </Col>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "end",
                              justifyContent: "flex-end",
                              marginRight: 10,
                            }}
                          >
                            <MdClear
                              style={{ fontSize: 25, cursor: "pointer" }}
                              onClick={() => {
                                setShow(false);
                                setviewDataProfileChecker(false);
                                setviewDataProfile([]);
                              }}
                            />
                          </Col>
                        </Row>

                        <Row style={{ fontSize: 20 }}>
                          <Button variant="success" type="submit">
                            Update Changes
                          </Button>
                        </Row>

                        <Row className="mt-3 ml-5" style={{ fontSize: 20 }}>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setShow(false);
                              setviewDataProfileChecker(false);
                              setviewDataProfile([]);
                            }}
                          >
                            Cancel Changes
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Card>
            </Col>
          </Form>
        </Row>
      )}
    </div>
  );
}

export default PetOwnerTable;
