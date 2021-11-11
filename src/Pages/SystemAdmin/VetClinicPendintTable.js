import React, { useState, useEffect } from "react";
import {
  Popover,
  Button,
  Card,
  OverlayTrigger,
  Col,
  Modal,
  Form,
  Row,
  Alert,
  ResponsiveEmbed,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import DataTable from "react-data-table-component";
import ViewVetPendingProfile from "./ViewVetPendingProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastDelete, ToastUpdate, ToastSuccess } from "../../Components/Toast";
import { hostUrl } from "../../Components/Host";

function VetClinicPendintTable() {
  const [counter, setcounter] = useState(0);
  const [vetclinic, setVetClinic] = useState([]);

  const [viewProfileVetData, setviewProfileVetData] = useState([]);
  const [profileAndAcceptChecker, setprofileAndAcceptChecker] = useState(false);

  const [access, setaccess] = useState();
  const [title, settitle] = useState("Pending");

  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/vetclinic/pending`).then((response) => {
        setVetClinic(response.data);
      });
      setcounter(counter + 1);
    }
  }, [profileAndAcceptChecker]);

  const [q, setq] = useState("");
  // alert(swidth);

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
      name: "Name",
      selector: "vet_name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Address",
      selector: "vet_address",
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: "vet_contact_number",
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
              onClick={() => {
                setviewProfileVetData(row);
                setprofileAndAcceptChecker(true);
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Information
            </Button>
          </OverlayTrigger>
        </div>
      ),
      sortable: false,
    },
  ];

  function cancelButton() {
    setprofileAndAcceptChecker(false);
    setviewProfileVetData([]);
  }

  function tableRefresher() {
    Axios.get(`${hostUrl}/vetclinic/pending`).then((response) => {
      setVetClinic(response.data);
      cancelButton();
    });
  }

  function tableResubmit() {
    Axios.get(`${hostUrl}/vetclinic/resubmit`).then((response) => {
      setVetClinic(response.data);
      cancelButton();
    });
  }
  function tableUnverified() {
    Axios.get(`${hostUrl}/vetclinic/unverified`).then((response) => {
      setVetClinic(response.data);
      cancelButton();
    });
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <ToastContainer />

      {/* Data Table */}
      <Row className="mt-1 ">
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
                    <div>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          value={q}
                          placeholder={"Search"}
                          onChange={(e) => setq(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Control
                        as="select"
                        onChange={(e) => {
                          if (e.target.value === "Pending") {
                            tableRefresher();
                            setaccess(false);
                            settitle("Pending");
                          } else if (e.target.value === "Resubmit") {
                            tableResubmit();
                            setaccess(true);
                            settitle("Resubmit");
                          } else if (e.target.value === "Unverified") {
                            tableUnverified();
                            setaccess(true);
                            settitle("Unverified");
                          }
                        }}
                      >
                        <option>Pending</option>
                        <option>Resubmit</option>
                        <option>Unverified</option>
                      </Form.Control>
                    </div>
                  }
                  title={title + " Table"}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 20]}
                  paginationPerPage={5}
                  columns={columns}
                  data={search(vetclinic)}
                  responsive={true}
                  defaultSortField="vet_name"
                />
              </Card.Body>
            </Card>
          </Card>
        </Col>
      </Row>

      {!profileAndAcceptChecker ? (
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
                  <strong>Nothing to Show</strong>
                </Card.Body>
              </Card>
            </Card>
          </Col>
        </Row>
      ) : (
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
                  <ViewVetPendingProfile
                    viewProfileVetData={viewProfileVetData}
                    access={access}
                    tableRefresher={tableRefresher}
                    cancelButton={cancelButton}
                    ToastSuccess={ToastSuccess}
                  />
                </Card.Body>
              </Card>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default VetClinicPendintTable;
