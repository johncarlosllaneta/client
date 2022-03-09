import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Col,
  Button,
  Modal,
  Row,
  Form,
  OverlayTrigger,
  Popover,
  Image,
  Container,
  FloatingLabel,
  Overlay,
} from "react-bootstrap";
import Axios from "axios";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";

import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import { useParams } from "react-router-dom";
import { apps } from "../../../../../Components/base";
import { users } from "../../../../../Components/User";
import { Skeleton } from "@mui/material";
import getUser from "../../../../../Components/userData";

const PharmacyTab = (props) => {

  //Insert
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  const [updateMedicineName, setUpdateMedicineName] = useState("");
  const [updateMedicineDescription, setUpdateMedicineDescription] =
    useState("");
  const [updateMedicinePrice, setUpdateMedicinePrice] = useState();
  const [pharmacy, setpharmacy] = useState([]);
  const [lotId, setlotId] = useState();
  const [pharmacyUpdateId, setpharmacyUpdateId] = useState();
  const [pharmacyUpdateImage, setpharmacyUpdateImage] = useState();
  const [pharmacyUpdateName, setpharmacyUpdateName] = useState();
  const [pharmacyUpdateDescription, setpharmacyUpdateDescription] = useState();
  const [pharmacyUpdatePrice, setpharmacyUpdatePrice] = useState();
  const [pharmacyUpdateStatus, setpharmacyUpdateStatus] = useState();
  const [viewMedicine, setviewMedicine] = useState("block");
  const [viewDisableField, setviewDisableField] = useState(false);
  const [viewTitle, setviewTitle] = useState("Update Medicine Details");

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    getPharmacy(userData);
  }, []);

  const getPharmacy = async (userData) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/pharmacy/${userData.vetid}`);
    // console.log(result.data);
    setpharmacy(result.data);
  }

  function refreshTable() {
    Axios.get(`${hostUrl}/pharmacy/${user.vetid}`).then((response) => {
      setpharmacy(response.data);
    });
  }

  const [imageUrl, setimageUrl] = useState();
  const [imageUploadedUrl, setimageUploadedUrl] = useState();
  const [preview, setPreview] = useState();
  const inputFile = useRef(null);
  const onClickProfile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const uploadImage = async (e) => {
    const storageRef = apps.storage().ref();
    const filRef = storageRef.child(e.name);
    await filRef.put(e);
    setimageUploadedUrl(await filRef.getDownloadURL());
  };

  useEffect(() => {
    if (imageUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imageUrl);
      console.log(imageUrl);
    } else {
      setPreview(null);
    }
  }, [imageUrl]);

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Medicine Image",
      render: (row) => (
        <div>
          <Image
            src={row.medicine_image}
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
      title: "Lot Number",
      field: "lot_id",
      defaultSort: "asc",
    },
    {
      title: "Medicine Name",
      field: "medicine_name",
      sorting: true,
    },
    {
      title: "Status",
      field: "status",
      sorting: true,
      render: (rowData) =>
        rowData.status === 1 ? "Available" : "Not Available",
    },
    {
      title: "Price",
      field: "price",
      sorting: true,
      render: (rowData) => rowData.price !== "" && "₱" + rowData.price + ".00",
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
              style={{
                marginRight: 5,
                color: 'white'
              }}
              onClick={(e) => {
                // View medicine
                e.preventDefault();
                setpharmacyUpdateId(row.med_id);
                setpharmacyUpdateImage(row.medicine_image);
                setpharmacyUpdateName(row.medicine_name);
                setpharmacyUpdateDescription(row.medicine_description);
                setpharmacyUpdateStatus(row.status);
                setpharmacyUpdatePrice(row.price);
                setlotId(row.lot_id);
                handleShowUpdate();
                setviewDisableField(true);
                setviewMedicine("none");
                setviewTitle("View Medicine Details");
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: 'white' }} /> View Medicine
            </Button>
          </OverlayTrigger>
          {/* 
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Edit Details" })}
          >
            <Button
              variant="primary"
              style={{
                marginRight: 5,
              }}
              onClick={(e) => {
                // Edit Medicine
                // alert(row.medicine_id)
                e.preventDefault();
                setpharmacyUpdateId(row.med_id);
                setpharmacyUpdateImage(row.medicine_image);
                setpharmacyUpdateName(row.medicine_name);
                setpharmacyUpdateDescription(row.medicine_description);
                setpharmacyUpdateStatus(row.status);
                setpharmacyUpdatePrice(row.price);
                setlotId(row.lot_id);
                handleShowUpdate();
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
              style={{
                marginRight: 5,
              }}
              onClick={() => {
                // Delete Medicine
                setmedicine_id(row.med_id);
                handleShowDelete();
              }}
            >
              <AiOutlineDelete style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger> */}
        </div>
      ),
    },
  ];

  const [validated, setValidated] = useState(false);

  const insertMedicineConfirmation = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowConfirmationInsert();
    }

    setValidated(true);
  };

  const updateMedicineConfirmation = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowConfirmationUpdate();
    }

    setValidated(true);
  };

  function insertMedicines() {

    Axios.post(`${hostUrl}/pharmacy/insert/${user.vetid}`, {
      insertMedicineImage: imageUploadedUrl,
      insertMedicineName: updateMedicineName,
      insertMedicineDescription: updateMedicineDescription,
      insertMedicinePrice: updateMedicinePrice,
      lotid: lotId
    }).then((response) => {
      if (response.data.message == 'Success') {
        setimageUploadedUrl();
        setPreview();
        setUpdateMedicineName();
        setUpdateMedicineDescription();
        setUpdateMedicinePrice();
        setlotId();
        handleClose2();
        refreshTable();
      }
    });


  }

  const deleteMedicine = () => {
    Axios.post(`${hostUrl}/pharmacy/delete/${medicine_id}`, {
      vetid: user.vetid,
    })
      .then((response) => {
        if (response.data.message == 'Success') {
          refreshTable()
        }
      });
  };

  const updateMedicine = () => {
    Axios.put(`${hostUrl}/pharmacy/update/${pharmacyUpdateId}`, {
      vetid: user.vetid,
      medicine_image: pharmacyUpdateImage,
      medicine_name: pharmacyUpdateName,
      medicine_description: pharmacyUpdateDescription,
      medicine_price: pharmacyUpdatePrice,
      status: pharmacyUpdateStatus,
    }).then((response) => {
      if (response.data.message == 'Success') {
        refreshTable();
        handleCloseUpdate();
      }
    });

  };

  // Modal Delete
  const [showDelete, setShowDelete] = useState(false);
  const [medicine_id, setmedicine_id] = useState();
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  // Modal Confirmation Insert
  const [showConfirmationInsert, setshowConfirmationInsert] = useState(false);
  const handleCloseConfirmationInsert = () => setshowConfirmationInsert(false);
  const handleShowConfirmationInsert = () => setshowConfirmationInsert(true);

  // Modal Confirmation Update
  const [showConfirmationUpdate, setshowConfirmationUpdate] = useState(false);
  const handleCloseConfirmationUpdate = () => setshowConfirmationUpdate(false);
  const handleShowConfirmationUpdate = () => setshowConfirmationUpdate(true);

  // Modal Update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setviewMedicine("block");
    setviewDisableField(false);
    setviewTitle("Update Medicine Details");
  };
  const handleShowUpdate = () => setShowUpdate(true);

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

        // marginLeft: 40,
        // marginTop: 70,
      }}
    >

      {/* //Edit Medicine Details*/}
      <Modal show={showUpdate} onHide={handleCloseUpdate} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{viewTitle}</Modal.Title>
        </Modal.Header>
        <Row>
          <Form
            noValidate
            validated={true}
            onSubmit={updateMedicineConfirmation}
          >
            <Modal.Body>
              <Row>
                <Col sm={6}>
                  <Form.Group>
                    <Image
                      style={{
                        border: "1px solid grey",
                        backgroundColor: "lightblue",
                        height: 400,
                        width: 500,
                        objectFit: "fill",
                      }}
                      src={pharmacyUpdateImage}
                      alt={"preview"}
                    />

                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formBasicProduct">
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Lot Number"
                    >
                      <Form.Control
                        type="text"
                        value={lotId}
                        readOnly={true}
                      />


                    </FloatingLabel>
                  </Form.Group>


                  <Form.Group controlId="formBasicProduct">
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Medicine Name"
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <Form.Control
                        type="text"
                        value={pharmacyUpdateName}
                        disabled={viewDisableField}
                      />


                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicMedicineD"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Description"
                    >
                      <Form.Control
                        type="text"
                        as="textarea"
                        style={{ height: 100 }}
                        disabled={viewDisableField}
                        value={pharmacyUpdateDescription}
                        placeholder="Sample Medicine Description"
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Status"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      defaultValue={pharmacyUpdateStatus}
                      disabled={viewDisableField}
                    >
                      <option value="1">Available</option>
                      <option value="0">Not Available</option>
                    </Form.Select>
                  </FloatingLabel>

                  <Form.Group
                    controlId="formBasicMedicineQ"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FloatingLabel controlId="floatingInputPrice" label="Price">
                      <Form.Control
                        disabled={viewDisableField}
                        value={pharmacyUpdatePrice}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>

            <div
              style={{
                display: viewMedicine,
              }}
            >
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </div>
          </Form>
        </Row>
      </Modal>


      {/* header */}
      <div
        style={{
          display: 'inline-flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div>

          <h1>Pharmacy</h1>
        </div>



      </div>

      {/* Data Table */}
      {pharmacy.length > 0 ?
        <Row>
          <Col>
            <div
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: "white",
              }}
            >
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
                      This table shows the list of registered medicine in the vet
                      clinic.{" "}
                    </p>
                  </Popover.Body>
                </Popover>
              </Overlay>

              <MaterialTable
                ref={ref}
                columns={columns}
                data={pharmacy}
                title={"Medicine Table"}
                cellEditable={false}
                options={{
                  sorting: true,
                  pageSize: '10',

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
            </div>
          </Col>
        </Row>
        :
        <Skeleton height={'70vh'} variant="rectangular" />
      }
    </div>
  );
};

export default PharmacyTab;
