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
import { BsFillImageFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import { useParams } from "react-router-dom";
import { apps } from "../../../../../Components/base";
const PharmacyTable = () => {
  let { vetid } = useParams();

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
  const [updateMedicineNumber, setupdateMedicineNumber] = useState();
  const [pharmacy, setpharmacy] = useState([]);
  const [pharmacyUpdateId, setpharmacyUpdateId] = useState();
  const [pharmacyUpdateImage, setpharmacyUpdateImage] = useState();
  const [pharmacyUpdateName, setpharmacyUpdateName] = useState();
  const [pharmacyUpdateDescription, setpharmacyUpdateDescription] = useState();
  const [pharmacyUpdatePrice, setpharmacyUpdatePrice] = useState();
  const [pharmacyUpdateStatus, setpharmacyUpdateStatus] = useState();
  const [pharmacyUpdateNumber, setpharmacyUpdateNumber] = useState();
  const [viewMedicine, setviewMedicine] = useState("block");
  const [viewDisableField, setviewDisableField] = useState(false);
  const [viewTitle, setviewTitle] = useState("Update Medicine Details");

  const [counter, setcounter] = useState(0);
  useEffect(async () => {
    var id = vetid.toString().replace("10##01", "/");
    Axios.get(`${hostUrl}/pharmacy/${id}`).then((response) => {
      setpharmacy(response.data);
    });
  }, []);

  function refreshTable() {
    var id = vetid.toString().replace("10##01", "/");
    Axios.get(`${hostUrl}/pharmacy/${id}`).then((response) => {
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
      title: "Medicine ID",
      field: "med_id",
      defaultSort: "asc",
    },
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
      title: "Lot ID",
      field: "medicine_number",
      sorting: true,
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
                setpharmacyUpdateNumber(row.medicine_number);
                handleShowUpdate();
                setviewDisableField(true);
                setviewMedicine("none");
                setviewTitle("View Medicine Details");
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
              style={{
                marginRight: 5,
              }}
              onClick={(e) => {
                // Edit Medicine
                // alert(row.medicine_id);
                e.preventDefault();
                setpharmacyUpdateId(row.med_id);
                setpharmacyUpdateImage(row.medicine_image);
                setpharmacyUpdateName(row.medicine_name);
                setpharmacyUpdateDescription(row.medicine_description);
                setpharmacyUpdateStatus(row.status);
                setpharmacyUpdatePrice(row.price);
                setpharmacyUpdateNumber(row.medicine_number);
                handleShowUpdate();
              }}
            >
              <BiPencil style={{ fontSize: 25 }} />
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
              <IoMdTrash style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>
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
    var id = vetid.toString().replace("10##01", "/");
    Axios.post(`${hostUrl}/pharmacy/insert/${id}`, {
      insertMedicineImage: imageUploadedUrl,
      insertMedicineName: updateMedicineName,
      insertMedicineDescription: updateMedicineDescription,
      insertMedicinePrice: updateMedicinePrice,
      insertMedicineNumber: updateMedicineNumber,
    });

    setimageUploadedUrl("");
    setPreview(null);
    setUpdateMedicineName("");
    setUpdateMedicineDescription("");
    setUpdateMedicinePrice("");
    setupdateMedicineNumber("");
    handleClose2();
    Axios.get(`${hostUrl}/pharmacy/${id}`).then((response) => {
      setpharmacy(response.data);
    });
  }

  const deleteMedicine = () => {
    const vet = vetid;
    var id = vetid.toString().replace("10##01", "/");
    Axios.post(`${hostUrl}/pharmacy/delete/${medicine_id}`, {
      vetid: id,
    });
  };

  const updateMedicine = () => {
    Axios.put(`${hostUrl}/pharmacy/update/${pharmacyUpdateId}`, {
      vetid: vetid,
      medicine_image: pharmacyUpdateImage,
      medicine_name: pharmacyUpdateName,
      medicine_description: pharmacyUpdateDescription,
      medicine_price: pharmacyUpdatePrice,
      status: pharmacyUpdateStatus,
      medicine_number: pharmacyUpdateNumber,
    });

    Axios.get(`${hostUrl}/pharmacy/${vetid}`).then((response) => {
      setpharmacy(response.data);
    });
    handleCloseUpdate();
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
        width: "77vw",
        marginLeft: 40,
        marginTop: 70,
      }}
    >
      {/* Delete */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Medicine? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteMedicine();
              handleCloseDelete();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Updating */}
      <Modal
        show={showConfirmationUpdate}
        onHide={handleCloseConfirmationUpdate}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update this product? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationUpdate}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateMedicine();
              handleCloseConfirmationUpdate();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Inserting */}
      <Modal
        show={showConfirmationInsert}
        onHide={handleCloseConfirmationInsert}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to add this Medicine? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationInsert}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              insertMedicines();
              handleCloseConfirmationInsert();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* //Add */}
      <Modal show={show2} onHide={handleClose2} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Insert Medicine</Modal.Title>
        </Modal.Header>
        <Row>
          <Form
            noValidate
            validated={true}
            onSubmit={insertMedicineConfirmation}
          >
            <Modal.Body>
              <Row>
                <Col>
                  <Form.Group onClick={onClickProfile}>
                    {preview ? (
                      <Image
                        style={{
                          border: "1px solid grey",
                          backgroundColor: "lightblue",
                          height: 400,
                          width: 500,
                          objectFit: "fill",
                        }}
                        src={preview}
                        alt={"preview"}
                      />
                    ) : (
                      <div
                        style={{
                          border: "1px solid grey",
                          backgroundColor: "#FAFAFA",
                          height: 200,
                          width: 300,
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <Container
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            msTransform: "translate(-50%, -50%)",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <p>
                            Upload Image File
                            <br />
                            <BsFillImageFill
                              style={{
                                fontSize: 80,
                                color: "#57D4FF",
                                marginLeft: 20,
                              }}
                            />
                          </p>
                        </Container>
                      </div>
                    )}
                    <input
                      type="file"
                      id="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                      accept="image/*"
                      required
                      name="profile_pet"
                      // value={profile}
                      // key="profile_petowner"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file && file.type.substr(0, 5) === "image") {
                          console.log(event.target.value);
                          // setprofile(event.target.value);
                          setimageUrl(file);
                          uploadImage(file);
                        } else {
                          setimageUrl(null);
                        }
                      }}
                    />
                    <Form.Control.Feedback type="valid">
                      You've input a valid image.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Image is required in this form.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicProduct"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Medicine Number"
                    >
                      <Form.Control
                        type="text"
                        value={updateMedicineNumber}
                        pattern="\d*"
                        maxLength={15}
                        required
                        onChange={(e) => {
                          setupdateMedicineNumber(e.target.value);
                        }}
                        minLength={8}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid medicine number .
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine number.
                      </Form.Control.Feedback>
                      {/* <Form.Text id="passwordHelpBlock" muted>
                        Price should be exact. ex. ₱ 100
                      </Form.Text> */}
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
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Medicine Name"
                    >
                      <Form.Control
                        type="text"
                        value={updateMedicineName}
                        placeholder="Sample Medicine"
                        required
                        onChange={(e) => {
                          setUpdateMedicineName(e.target.value);
                        }}
                        minLength={5}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid name.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine name.
                      </Form.Control.Feedback>
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
                        style={{ height: 200 }}
                        value={updateMedicineDescription}
                        placeholder="Sample Medicine Description"
                        required
                        onChange={(e) => {
                          setUpdateMedicineDescription(e.target.value);
                        }}
                        minLength={10}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid description.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine description.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicMedicineQ"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FloatingLabel controlId="floatingInputPrice" label="Price">
                      <Form.Control
                        type="text"
                        value={updateMedicinePrice}
                        pattern="\d*"
                        maxLength={5}
                        required
                        onChange={(e) => {
                          setUpdateMedicinePrice(e.target.value);
                        }}
                        minLength={1}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid price .
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine price.
                      </Form.Control.Feedback>
                      <Form.Text id="passwordHelpBlock" muted>
                        Price should be exact. ex. ₱ 100
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Row>
      </Modal>

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
                        cursor: "pointer",
                      }}
                      src={pharmacyUpdateImage}
                      alt={"preview"}
                    />

                    <input
                      type="file"
                      id="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                      accept="image/*"
                      name="profile_pet"
                      disabled={viewDisableField}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file && file.type.substr(0, 5) === "image") {
                          console.log(event.target.value);
                          // setprofile(event.target.value)
                          setimageUrl(file);
                          uploadImage(file);
                        } else {
                          setimageUrl(null);
                        }
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicProduct"
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Medicine Number"
                    >
                      <Form.Control
                        type="text"
                        value={pharmacyUpdateNumber}
                        maxLength={15}
                        disabled={viewDisableField}
                        required
                        onChange={(e) => {
                          setupdateMedicineNumber(e.target.value);
                        }}
                        minLength={8}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid medicine number .
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine number.
                      </Form.Control.Feedback>
                      {/* <Form.Text id="passwordHelpBlock" muted>
                        Price should be exact. ex. ₱ 100
                      </Form.Text> */}
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formBasicProduct">
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Medicine Name"
                    >
                      <Form.Control
                        type="text"
                        value={pharmacyUpdateName}
                        required
                        disabled={viewDisableField}
                        onChange={(e) => {
                          setpharmacyUpdateName(e.target.value);
                        }}
                        minLength={5}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid name.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine name.
                      </Form.Control.Feedback>
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
                        style={{ height: 200 }}
                        disabled={viewDisableField}
                        value={pharmacyUpdateDescription}
                        placeholder="Sample Medicine Description"
                        required
                        onChange={(e) => {
                          setpharmacyUpdateDescription(e.target.value);
                        }}
                        minLength={10}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid description.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine description.
                      </Form.Control.Feedback>
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
                      onChange={(e) => {
                        setpharmacyUpdateStatus(e.target.value);
                      }}
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
                        type="text"
                        disabled={viewDisableField}
                        value={pharmacyUpdatePrice}
                        pattern="\d*"
                        maxLength={5}
                        required
                        onChange={(e) => {
                          setpharmacyUpdatePrice(e.target.value);
                        }}
                        minLength={1}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid price .
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid medicine price.
                      </Form.Control.Feedback>
                      <Form.Text id="passwordHelpBlock" muted>
                        Price should be exact. ex. ₱ 100
                      </Form.Text>
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

      {/* Data Table */}
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
              }}
              actions={[
                {
                  icon: "add",
                  tooltip: "Add Medicine",
                  isFreeAction: true,
                  onClick: (event) => handleShow2(),
                },
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
    </div>
  );
};

export default PharmacyTable;
