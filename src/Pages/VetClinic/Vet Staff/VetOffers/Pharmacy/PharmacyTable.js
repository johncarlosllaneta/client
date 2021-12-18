import React from "react";
import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import MaterialTable from "material-table";
import { AiOutlineSearch } from "react-icons/ai";
function PharmacyTable() {
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Item Image",
      field: "image",
      defaultSort: "asc",
    },
    {
      title: "Item Name",
      field: "item_name",
      defaultSort: "asc",
    },
    {
      title: "Category",
      field: "date",
      sorting: true,
    },
    {
      title: "Quantity",
      field: "date",
      sorting: true,
    },
    {
      title: "Price",
      field: "date",
      sorting: true,
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Vaccine History" })}
          >
            <Button
              variant="info"
              style={{
                marginRight: 5,
                color: "white",
              }}
              //   onClick={(e) => {
              //     e.preventDefault();
              //     window.location.href = `/pets/${id}/${row.pet_id}`;
              //   }}
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
      <Row>
        <Col>
          <MaterialTable
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            columns={columns}
            // data={pet}
            title={"Pharmacy Table"}
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

export default PharmacyTable;
