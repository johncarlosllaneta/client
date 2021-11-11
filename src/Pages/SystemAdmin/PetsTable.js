import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Card,
  Modal,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import DataTable from "react-data-table-component";
import PetsData from "./PetsData";
import { FormatDate } from "../../Components/FormatDateTime";
import GraphGender from "./GraphGender";
import PetsDataUpdate from "./PetsDataUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastDelete, ToastUpdate } from "../../Components/Toast";
import { hostUrl } from "../../Components/Host";

function PetsTable() {
  const [counter, setcounter] = useState(0);
  const [pet, setPet] = useState([]);
  const [petDetails, setPetDetails] = useState([]);
  const [updatePetDetails, setupdatePetDetails] = useState([]);

  const [profileAndEditChecker, setprofileAndEditChecker] = useState(true);

  //modal delete controller
  const [id, setid] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  function closingInfoProfile() {
    setPetDetails([]);
  }

  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/pets`).then((response) => {
        setPet(response.data);
      });
      setcounter(counter + 1);
    }
  }, [profileAndEditChecker]);

  const [numberOfMale, setnumberOfMale] = useState("");
  const [numberOfFemale, setnumberOfFemale] = useState("");

  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/pets/gender/male`).then((response) => {
        setnumberOfMale(response.data.male);
      });
    }
  }, [numberOfMale, profileAndEditChecker]);

  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/pets/gender/female`).then((response) => {
        setnumberOfFemale(response.data.female);
      });
    }
  }, [numberOfFemale, profileAndEditChecker]);

  const [q, setq] = useState("");
  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      name: "Pet Name",
      selector: "pet_name",
      sortable: true,
    },
    {
      name: "Type of Pet",
      selector: "type_of_pet",
      sortable: true,
    },
    {
      name: "Breed",
      selector: "breed_of_pet",
      sortable: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
    },
    {
      name: "Birth Date",
      cell: (row) => <p>{FormatDate({ datetime: row.birth_day })}</p>,
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
                setPetDetails(row);
                setprofileAndEditChecker(true);
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
                marginRight: 10,
              }}
              onClick={() => {
                setupdatePetDetails(row);
                setprofileAndEditChecker(false);
              }}
            >
              <FaRegEdit style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Remove Pet" })}
          >
            <Button
              variant="danger"
              style={{
                marginRight: 10,
              }}
              onClick={() => {
                setid(row.pet_id);
                handleShowDelete();
                // alert(id);
                // alert(row.pet_id);
              }}
            >
              <AiOutlineDelete style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
      sortable: false,
    },
  ];

  function changeStateProfileAndUpdateChecker() {
    setprofileAndEditChecker(true);
  }

  function updateListPet() {
    Axios.get(`${hostUrl}/pets`).then((response) => {
      setPet(response.data);
      changeStateProfileAndUpdateChecker(true);
    });
  }

  function deletePet() {
    // alert(id);

    Axios.put(`${hostUrl}/pets/archived/${id}`)
      .then((response) => {
        if (response.data.message == "Successfully Deleted") {
          ToastDelete();
          updateListPet();
          handleCloseDelete();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`${hostUrl}/pets`).then((response) => {
      setPet(response.data);
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <ToastContainer />
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Archiving</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this pet?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deletePet(id);
            }}
          >
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
                  title={"Pets"}
                  pagination
                  columns={columns}
                  data={search(pet)}
                  responsive={true}
                  defaultSortField="pet_name"
                />
              </Card.Body>
            </Card>
          </Card>
        </Col>
      </Row>

      <Row style={{ display: "flex", justifyContent: "center" }}>
        {profileAndEditChecker ? (
          <Col sm={8}>
            {/* pet profile data */}
            {petDetails.length !== 0 ? (
              <div className="mt-4">
                <Card
                  style={{
                    position: "relative",
                    display: "flex",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    padding: 10,
                    height: 360,
                  }}
                >
                  <Row>
                    <Col sm={10}>
                      <PetsData data={petDetails} />
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "end",
                        marginRight: 50,
                      }}
                    >
                      <MdClear
                        className="mt-4"
                        style={{ fontSize: 25, cursor: "pointer" }}
                        onClick={() => {
                          closingInfoProfile();
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </div>
            ) : (
              <div className="mt-4">
                <Card
                  style={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <Row>
                    <Col className="mt-4 mb-4">
                      <strong>Nothing to show</strong>
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          </Col>
        ) : (
          <Col>
            <Card
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <PetsDataUpdate
                data={updatePetDetails}
                dataOne={changeStateProfileAndUpdateChecker}
                onUpdateList={updateListPet}
              />
            </Card>
          </Col>
        )}

        <Col sm={4} className="mt-4">
          <GraphGender male={numberOfMale} female={numberOfFemale} />
        </Col>
      </Row>

      <Row></Row>
    </div>
  );
}

export default PetsTable;
