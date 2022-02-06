import React, { useState, useEffect, useRef, useParams } from "react";
import {
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Popover,
  Overlay,
  FloatingLabel,
  Row,
  Image,
} from "react-bootstrap";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../../Components/Host";
import { TiCancel } from "react-icons/ti";
import { AiOutlineFileDone, AiOutlineSearch } from "react-icons/ai";
function ProductTable() {
  // let { staffId } = useParams();

  const [user, setuser] = useState([]);

  const [counter1, setcounter1] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 6) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });
      setcounter1(counter + 1);
    }
  }, [user]);

  const [counter, setcounter] = useState(0);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (counter < 3) {
      // var id = vetid.toString().replace("10##01", "/");
      // var id = staffId;
      Axios.get(`${hostUrl}/products/staff/${user.vet_staff_id}`).then(
        (response) => {
          setProduct(response.data);
        }
      );
      setcounter(counter + 1);
    }
  }, [product]);

  // function refreshTable() {
  //   // var id = vetid.toString().replace("10##01", "/");
  //   var id = staffId;
  //   Axios.get(`${hostUrl}/products/staff/${id}`).then((response) => {
  //     setProduct(response.data);
  //   });
  // }

  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Product Image",
      render: (row) => (
        <div>
          <Image
            src={row.product_image}
            style={{
              height: 50,
              width: 50,
            }}
            rounded
          />
        </div>
      ),
    },
    {
      title: "Product Id",
      field: "product_id",
    },
    {
      title: "Product Name",
      field: "product_id",
    },
    {
      title: "Category",
      field: "category",
    },
    {
      title: "Quantity",
      field: "quantity",
    },
    {
      title: "Price",
      field: "price",
    },

    {
      title: "Action",
      render: (row) => (
        <div style={{ display: "flex", flexDirection: "row " }}>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Information" })}
          >
            <Button
              variant="info"
              style={{
                marginRight: 5,
              }}
              onClick={() => {
                // viewDetails(row.appointment_id);
                // ModalView();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Done Appointment" })}
          >
            <Button
              variant="primary"
              style={{
                marginRight: 5,
              }}
              onClick={() => {
                // setpet_id(row.pet_id);
                // setappointmentID(row.appointment_id);
                // setcategory(row.category);
                // setnotifService_id(row.service_id);
                // handleShowModalFinish();
              }}
            >
              <AiOutlineFileDone style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Void Appointment" })}
          >
            <Button
              variant="danger"
              onClick={() => {
                // setappointmentID(row.appointment_id);
                // setnotifService_id(row.service_id);
                // handleShowModalDecline();
              }}
            >
              <TiCancel style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];
  return (
    <div>
      {/* Data Table */}

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
              This table shows the list of confirmed appointment in the vet
              clinic.{" "}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>

      <MaterialTable
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        columns={columns}
        data={product}
        title={"Product Table"}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          paging: true,
        }}
        actions={[
          {
            icon: "information",
            tooltip: "Helper",
            isFreeAction: true,
            // onClick: handleClick,
          },
        ]}
      />
    </div>
  );
}

export default ProductTable;
