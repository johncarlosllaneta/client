import React from "react";
import { useState } from "react";
import {
  Card,
  Image,
  Col,
  Button,
  Modal,
  Row,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { hostUrl } from "../../../../../Components/Host";
import Axios from "axios";
function ProductItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [show, setShow] = useState(false);
  const handleClose1 = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  function deleteProduct(id) {
    Axios.post(`${hostUrl}/product/delete/${id}`, {
      vet_id: props.product.vetid,
    });
    props.refreshTable();
  }

  // Modal Confirmation delete
  const [showConfirmationInsert, setshowConfirmationInsert] = useState(false);
  const handleCloseConfirmationInsert = () => {
    setshowConfirmationInsert(false);
  };
  const handleShowConfirmationInsert = () => {
    setshowConfirmationInsert(true);
    handleClose();
  };
  return (
    <div
      style={{
        width: "auto",
      }}
    >
      {/* delete modal confirmation*/}

      <Modal
        show={showConfirmationInsert}
        onHide={handleCloseConfirmationInsert}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationInsert}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteProduct(props.product.product_id);
              props.refreshTable();
              handleCloseConfirmationInsert();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose1} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Row>
          <Modal.Body>
            <Row>
              <Col>
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
                    src={props.product.product_image}
                    alt={"preview"}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicProduct">
                  <FloatingLabel
                    controlId="floatingInputPrice"
                    label="Product Name"
                  >
                    <Form.Control
                      type="text"
                      value={props.product.product_name}
                      disabled={true}
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
                      style={{ height: 200 }}
                      disabled={true}
                      value={props.product.product_desc}
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
                    label="Quantity"
                  >
                    <Form.Control
                      type="number"
                      disabled={true}
                      value={props.product.quantity}
                    />
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
                      disabled={true}
                      value={props.product.price}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="info" onClick={handleClose1}>
              Close
            </Button>
          </Modal.Footer>
        </Row>
      </Modal>

      <Card
        style={{
          height: "35vh",
          width: "15vw",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundColor: "white",
          display: "block",
        }}
      >
        <div
          style={{
            backgroundImage: `url('${props.product.product_image}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto",
            height: "20vh",
          }}
        >
          {/* <Image src={'https://www.petwarehouse.ph/12474-big_default/prama-delicacy-snack-sweet-melon-70g-dog-treats.jpg'} style={{
                    height: '20vh',
                    // width: '100%'
                }} /> */}

          <Tooltip title={"Options"}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleClick}
              style={{
                float: "right",
              }}
            >
              <MoreVertIcon
                style={{
                  color: "#354A5F",
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleShow();
              }}
              style={{
                display: "flex",
                justifyContent: "start",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <ListItemIcon>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <strong>View</strong>
            </MenuItem>

            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                props.setproductSelected(props.product);
                handleClose();
                props.handleShowUpdateProduct();
              }}
              style={{
                display: "flex",
                justifyContent: "start",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <strong>Update</strong>
            </MenuItem>

            <MenuItem
              onClick={handleShowConfirmationInsert}
              style={{
                display: "flex",
                justifyContent: "start",
                backgroundColor: "red",
                color: "white",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" style={{ color: "white" }} />
              </ListItemIcon>
              <strong>Delete</strong>
            </MenuItem>
          </Menu>
        </div>
        <div
          style={{
            width: "100%",
            padding: "2vh",
            textAlign: "left",
          }}
        >
          <h6>{props.product.product_name}</h6>
          <strong>₱{props.product.price}.00</strong> <br />
          <strong>Quantity: {props.product.quantity} pcs</strong>
        </div>
      </Card>
    </div>
  );
}

export default ProductItem;
