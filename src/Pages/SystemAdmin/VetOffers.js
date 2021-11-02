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
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../Components/Host";

function VetOffers(props) {
  const [counter, setcounter] = useState(0);
  const [productInfo, setproductInfo] = useState([]);
  // Product
  const [showProduct, setShowProduct] = useState(false);
  const handleCloseProduct = () => setShowProduct(false);
  const handleShowProduct = () => setShowProduct(true);

  const [pharmacyInfo, setpharmacyInfo] = useState([]);
  // Pharmacy
  const [showPharmacy, setShowPharmacy] = useState(false);
  const handleClosePharmacy = () => setShowPharmacy(false);
  const handleShowPharmacy = () => setShowPharmacy(true);

  const [servicesInfo, setservicesInfo] = useState([]);
  // Services
  const [showServices, setShowServices] = useState(false);
  const handleCloseServices = () => setShowServices(false);
  const handleShowServices = () => setShowServices(true);

  const [services, setservices] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/services/system/admin/${props.email}`).then(
        (response) => {
          setservices(response.data);
          // console.log(response.data)
        }
      );
      setcounter(counter + 1);
    }
  }, [services]);

  const [pharmacy, setpharmacy] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/pharmacy/system/admin/${props.email}`).then(
        (response) => {
          setpharmacy(response.data);
          // console.log(response.data)
        }
      );
    }
  }, [pharmacy]);

  const [product, setproduct] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/products/system/admin/${props.email}`).then(
        (response) => {
          setproduct(response.data);
          // console.log(response.data)
        }
      );
    }
  }, [product]);

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columnsServices = [
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
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "View Information" })}
          >
            <Button
              variant="info"
              className="mr-3"
              onClick={(e) => {
                e.preventDefault();
                setservicesInfo(row);
                // console.log(appointmentInfo);
                handleShowServices();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const columnsPharmacy = [
    {
      title: "Medicine_id",
      field: "medicine_id",
      sorting: true,
      defaultSort: "asc",
    },
    {
      title: "Medicine Name",
      field: "medicine_name",
      sorting: true,
    },
    {
      title: "Price",
      render: (rowData) => rowData.price !== "" && "₱" + rowData.price + ".00",
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
              onClick={(e) => {
                e.preventDefault();
                setpharmacyInfo(row);
                // console.log(appointmentInfo);
                handleShowPharmacy();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const columnsProducts = [
    {
      title: "Product ID",
      field: "product_id",
      sorting: true,
      defaultSort: "asc",
    },
    {
      title: "Product Name",
      field: "product_name",
      sorting: true,
    },
    {
      title: "Category",
      field: "category",
      sorting: true,
    },
    {
      title: "Fee",
      field: "service_fee",
      render: (rowData) => rowData.price !== "" && "₱" + rowData.price + ".00",
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
              onClick={(e) => {
                e.preventDefault();
                setproductInfo(row);
                // console.log(appointmentInfo);
                handleShowProduct();
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} />
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
    <div
      style={{
        display: "flex",
        height: "auto",
        backgroundColor: "white",
        width: "100%",
        padding: 0,
      }}
    >
      {/* Products */}
      <Modal show={showProduct} onHide={handleCloseProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image src={productInfo.product_image} rounded />
            </Container>
            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Product Name
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {productInfo.product_name}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Product Description
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {productInfo.product_desc}
            </p>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Pharmacy */}
      <Modal show={showPharmacy} onHide={handleClosePharmacy}>
        <Modal.Header closeButton>
          <Modal.Title>Medicine Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image src={pharmacyInfo.medicine_image} rounded />
            </Container>
            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Medicine Name
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {pharmacyInfo.medicine_name}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Medicine Description
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {pharmacyInfo.medicine_description}
            </p>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Services */}
      <Modal show={showServices} onHide={handleCloseServices}>
        <Modal.Header closeButton>
          <Modal.Title>Service Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Service Name
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {servicesInfo.service_name}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Description
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {servicesInfo.service_description}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Category
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {servicesInfo.category}
            </p>

            <h2
              style={{
                fontWeight: "bold",
                color: "#19B9CC",
              }}
            >
              Service Fee
            </h2>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              {`₱ ${servicesInfo.service_fee}.00`}
            </p>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Data Table */}

      <Container
        style={{
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#19B9CC",
          }}
        >
          Products
        </h2>

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
          }}
          columns={columnsProducts}
          data={product}
          title={""}
          cellEditable={false}
          options={{
            sorting: true,
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
      </Container>

      <Container
        style={{
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#19B9CC",
          }}
        >
          Pharmacy
        </h2>

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
          }}
          columns={columnsPharmacy}
          data={pharmacy}
          title={""}
          cellEditable={false}
          options={{
            sorting: true,
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
      </Container>

      <Container
        style={{
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#19B9CC",
          }}
        >
          Services
        </h2>

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
          }}
          columns={columnsServices}
          data={services}
          title={""}
          cellEditable={false}
          options={{
            sorting: true,
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
      </Container>
    </div>
  );
}
export default VetOffers;
