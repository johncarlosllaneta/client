import React, { useState, useEffect } from "react";
import {
  Col,
  Button,
  Modal,
  Row,
  Form,
  OverlayTrigger,
  Popover,
  FloatingLabel,
} from "react-bootstrap";
import MaterialTable from "material-table";
import { AiOutlineSearch } from "react-icons/ai";

function VaccinePetCard(props) {
  const [vetDocFname, setvetDocFname] = useState();
  const [vetDocMname, setvetDocMname] = useState();
  const [vetDocLname, setvetDocLname] = useState();
  const [prescription, setprescription] = useState();
  const [date, setdate] = useState();
  const [time, settime] = useState();
  const [desc, setdesc] = useState();
  const [serviceName, setserviceName] = useState();
  const [manufacturer, setmanufacturer] = useState();
  const [weight, setweight] = useState();
  const [vaccineNumber, setvaccineNumber] = useState();
  const [againts, setagaints] = useState();
  const [vaccineName, setvaccineName] = useState();

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };
  const columns = [
    {
      title: "Service name",
      field: "service_name",
      defaultSort: "asc",
    },
    {
      title: "Description",
      field: "service_description",
      sorting: true,
    },
    {
      title: "Date accomplished",
      render: (row) =>
        dateConvertion(row.date_accomplished.toString().split("T")[0]),
      sorting: true,
    },
    {
      title: "Time accomplished",
      render: (row) =>
        timeFormatter(
          row.date_accomplished
            .substring()
            .split("T")[1]
            .substring(
              0,
              row.date_accomplished.substring().split("T")[1].length - 5
            )
        ),
      sorting: true,
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View details" })}
          >
            <Button
              style={{
                marginRight: 5,
                color: "white",
                fontWeight: "bold",
              }}
              onClick={(e) => {
                setprescription(row.prescription);
                setserviceName(row.service_name);
                setdesc(row.service_description);
                setdate(
                  dateConvertion(row.date_accomplished.toString().split("T")[0])
                );
                settime(
                  timeFormatter(
                    row.date_accomplished
                      .substring()
                      .split("T")[1]
                      .substring(
                        0,
                        row.date_accomplished.substring().split("T")[1].length -
                          5
                      )
                  )
                );
                setvetDocFname(row.vet_doc_fname);
                setvetDocMname(row.vet_doc_mname);
                setvetDocLname(row.vet_doc_lname);
                setagaints(row.againts);
                setmanufacturer(row.manufacturer);
                setvaccineNumber(row.vaccine_number);
                setweight(row.pet_weight);
                setvaccineName(row.vaccine_name);
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

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

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

  function timeFormatter(time) {
    var timeCurrent = time.split(":");

    if (timeCurrent[0] == "00") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "01") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "02") {
      return "2:" + timeCurrent[1 + ":"] + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "03") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "04") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "05") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "06") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "07") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "08") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "09") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "10") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "11") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "12") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "13") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "14") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "15") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "16") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "17") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "18") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "19") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "20") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "21") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "22") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "23") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    }
  }

  return (
    <div>
      <Modal show={show2} onHide={handleClose2} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Health Record Details</Modal.Title>
        </Modal.Header>
        <Row>
          <Modal.Body>
            <Row>
              <Row style={{ padding: 0, margin: 0 }}>
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
                      disabled={true}
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
                    label="Service Description"
                  >
                    <Form.Control
                      as="textarea"
                      style={{ height: "155px" }}
                      value={desc}
                      disabled={true}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Col>
                <Form.Group
                  controlId="formBasicProduct"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Doctor Name"
                  >
                    <Form.Control
                      type="text"
                      value={
                        vetDocMname == null
                          ? vetDocFname + " " + vetDocLname
                          : vetDocFname + " " + vetDocMname + " " + vetDocLname
                      }
                      disabled={true}
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
                    label="Vaccine name"
                  >
                    <Form.Control
                      type="text"
                      value={vaccineName}
                      disabled={true}
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
                    label="Vaccine Number"
                  >
                    <Form.Control
                      type="text"
                      value={vaccineNumber}
                      disabled={true}
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
                    label="Manufacturer"
                  >
                    <Form.Control
                      type="text"
                      value={manufacturer}
                      disabled={true}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  controlId="formBasicProduct"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <FloatingLabel controlId="floatingInputPrice" label="Against">
                    <Form.Control type="text" value={againts} disabled={true} />
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
                    <Form.Control type="text" value={weight} disabled={true} />
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
                    label="Date accomplished"
                  >
                    <Form.Control type="text" value={date} disabled={true} />
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
                    label="Time accomplished"
                  >
                    <Form.Control type="text" value={time} disabled={true} />
                  </FloatingLabel>
                </Form.Group>
              </Col>

              <Row style={{ padding: 0, margin: 0 }}>
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
                      disabled={true}
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
              </Row>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
          </Modal.Footer>
        </Row>
      </Modal>

      <MaterialTable
        columns={columns}
        data={props.vaccineData}
        title={"Vaccine Record"}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          pageSize: 10,
          pageSizeOptions: [10],
        }}
        style={{
          borderColor: "white",
        }}
      />
    </div>
  );
}

export default VaccinePetCard;
