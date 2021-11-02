import React from "react";
import { useState } from "react";
import { Button, Modal, Row, Popover, OverlayTrigger } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
const VisitorTab = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    // setPetHealthRecord(pet_health_record);
  };

  var data = [
    {
      pet_owner: "Jimuel Mercado",
      date_visited: "June 03, 2021",
      time_visited: "05:00 PM",
    },
    {
      pet_owner: "Jimuel Mercado",
      date_visited: "June 05, 2021",
      time_visited: "01:00 PM",
    },
    {
      pet_owner: "Jimuel Mercado",
      date_visited: "June 05, 2021",
      time_visited: "08:00 AM",
    },
    {
      pet_owner: "Jimuel Mercado",
      date_visited: "June 08, 2021",
      time_visited: "01:00 PM",
    },
    {
      pet_owner: "Jimuel Mercado",
      date_visited: "June 11, 2021",
      time_visited: "12:00 PM",
    },
  ];

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Pet Owner Name",
      field: "pet_owner",
      defaultSort: "asc",
    },
    {
      title: "Date Visited",
      field: "date_visited",
      sorting: true,
    },
    {
      title: "Time Visited",
      field: "time_visited",
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
              className="mr-3"
              onClick={() => {
                alert("hi");
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} />
              View Information
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Jumbotron fluid>
            <Container>
              <h1>Health Record</h1>
              <Image
                src={dog}
                alt="dog"
                className="card-img"
                style={{ width: "50%", height: "50%" }}
              ></Image>
            </Container>
          </Jumbotron> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Data Table */}
      <MaterialTable
        columns={columns}
        data={data}
        title={"Visitor Table"}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
        }}
        actions={[
          {
            icon: "add",
            tooltip: "Add Services",
            isFreeAction: true,
            onClick: (event) => alert("You want to add a new row"),
          },
        ]}
      />

      <Row className="mr-3" style={{ justifyContent: "flex-end" }}>
        <Button
          variant="info"
          onClick={() => {
            handleShow();
            // val.product_id,
            // val.product_name,
            // val.product_description,
            // val.product_quantity
          }}
        >
          Qr Code
        </Button>
      </Row>
    </div>
  );
};

export default VisitorTab;
