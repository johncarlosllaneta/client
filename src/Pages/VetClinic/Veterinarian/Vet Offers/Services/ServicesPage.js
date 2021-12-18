import React, { useEffect, useRef } from "react";
import { useState } from "react";
import imageII from "../../../../../Images/examination copy.png";
import imageIII from "../../../../../Images/baths.png";
import imageIV from "../../../../../Images/preventive.png";
import imageV from "../../../../../Images/scopy.png";
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
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import MaterialTable from "material-table";
import CategoryContainer from "./CategoryContainer";
function ServicesPage() {
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
      //   render: (rowData) =>
      //     rowData.price !== "" && "₱" + rowData.service_fee + ".00",
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
                // handleShowServices(row);
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
                // handleShowUpdate(row);
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
                // handleShowDelete(row);
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
          {/* hidden={petExamination} */}
          <Col>
            <CategoryContainer
              link={"null"}
              image={imageII}
              title={"Pet Examination"}
            />
          </Col>
          {/* hidden={petGrooming} */}
          <Col>
            <CategoryContainer
              link={"null"}
              image={imageIII}
              title={"Pet Grooming"}
            />
          </Col>
          {/* hidden={preventiveControls} */}
          <Col>
            <CategoryContainer
              link={"null"}
              image={imageIV}
              title={"Preventive"}
            />
          </Col>
          {/* hidden={vaccination} */}
          <Col>
            <CategoryContainer
              link={"null"}
              image={imageV}
              title={"Vaccination"}
            />
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
            // data={services}
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
}

export default ServicesPage;
