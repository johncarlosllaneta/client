import React, { useState, useEffect, useRef } from "react";
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
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import MaterialTable from "material-table";
import { hostUrl } from "../../Components/Host";
import { useParams } from "react-router-dom";
import { apps } from "../../Components/base";
import ProductTableTabController from "./ProductTableTabController";

function ProductTable(props) {
  let { vetid } = useParams();

  const [updateProductId, setUpdateProductId] = useState("");
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductDescription, setUpdateProductDescription] = useState("");
  const [updateProductQuantity, setUpdateProductQuantity] = useState("");
  const [updateProductPrice, setUpdateProductPrice] = useState();
  const [updateProductCategory, setupdateProductCategory] = useState();
  const [updateProductPetType, setupdateProductPetType] = useState();
  const [product, setProduct] = useState([]);

  const [productUpdateId, setproductUpdateId] = useState();
  const [productUpdateImage, setproductUpdateImage] = useState();
  const [productUpdateName, setproductUpdateName] = useState();
  const [productUpdateDescription, setproductUpdateDescription] = useState();
  const [productUpdatePrice, setproductUpdatePrice] = useState();
  const [productUpdateQuantity, setproductUpdateQuantity] = useState(0);
  const [viewProduct, setviewProduct] = useState("block");
  const [viewDisableField, setviewDisableField] = useState(false);
  const [viewTitle, setviewTitle] = useState("Update Product Details");

  // //Update
  // const [showUpdate, setShowUpdate] = useState(false);
  // const handleCloseUpdate = () => setShowUpdate(false);
  // const handleShowUpdate = (id, name, desc, quantity) => {
  //   setShowUpdate(true);
  //   setUpdateProductId(id);
  //   setUpdateProductName(name);
  //   setUpdateProductDescription(desc);
  //   setUpdateProductQuantity(quantity);
  // };
  //Insert
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 3) {
      var id = vetid.toString().replace("10##01", "/");
      Axios.get(`${hostUrl}/products/${id}`).then((response) => {
        setProduct(response.data);
      });
      setcounter(counter + 1);
    }
  }, [product]);

  function refreshTable() {
    var id = vetid.toString().replace("10##01", "/");
    Axios.get(`${hostUrl}/products/${id}`).then((response) => {
      setProduct(response.data);
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
      title: "Product ID",
      field: "product_id",
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
      title: "Quantity",
      field: "quantity",
      sorting: true,
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
              }}
              onClick={(e) => {
                // View medicine
                e.preventDefault();
                setproductUpdateId(row.product_id);
                setproductUpdateImage(row.product_image);
                setproductUpdateName(row.product_name);
                setproductUpdateDescription(row.product_desc);
                setproductUpdateQuantity(row.quantity);
                setproductUpdatePrice(row.price);
                handleShowUpdate();
                setviewDisableField(true);
                setviewProduct("none");
                setviewTitle("View Product Details");
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
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
                // alert(row.medicine_id)
                e.preventDefault();
                setproductUpdateId(row.product_id);
                setproductUpdateImage(row.product_image);
                setproductUpdateName(row.product_name);
                setproductUpdateDescription(row.product_desc);
                setproductUpdateQuantity(row.quantity);
                setproductUpdatePrice(row.price);
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
                setproduct_id(row.product_id);
                handleShowDelete();
              }}
            >
              <AiOutlineDelete style={{ fontSize: 25 }} />
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  const [validated, setValidated] = useState(false);
  const insertProductConfirmation = (e) => {
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

  const insertProduct = () => {
    Axios.post(`${hostUrl}/product/insert/${vetid}`, {
      insertProductImage: imageUploadedUrl,
      insertProductName: updateProductName,
      insertProductDescription: updateProductDescription,
      insertProductQuantity: updateProductQuantity,
      insertProductPrice: updateProductPrice,
      insertProductCategory: updateProductCategory,
      insertProductPetType: updateProductPetType,
    });

    setimageUploadedUrl("");
    setUpdateProductName("");
    setUpdateProductDescription("");
    setUpdateProductQuantity("");
    setUpdateProductPrice("");
    setupdateProductCategory("");
    setupdateProductPetType("");
    handleClose2();
    refreshTable();
  };

  const deleteProduct = () => {
    const vet = vetid;
    Axios.post(`${hostUrl}/product/delete/${product_id}`, {
      vetid: vet,
    });

    Axios.get(`${hostUrl}/products/${vet}`).then((response) => {
      setProduct(response.data);
    });
  };

  const updateProductConfirmation = (e) => {
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

  const increaseProductConfirmation = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowConfirmationIncrease();
    }

    setValidated(true);
  };

  const decreaseProductConfirmation = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowConfirmationDecrease();
    }

    setValidated(true);
  };

  const updateProduct = () => {
    Axios.put(`${hostUrl}/product/update/${productUpdateId}`, {
      updateProductName: productUpdateName,
      updateProductDescription: productUpdateDescription,
      updateProductQuantity: productUpdateQuantity,
      updateProductPrice: productUpdatePrice,
      updateProductImage: productUpdateImage,
      vetid: vetid,
    });

    Axios.get(`${hostUrl}/products/${vetid}`).then((response) => {
      setProduct(response.data);
      console.log(product);
    });
    handleCloseUpdate();
    // window.location.reload();
  };

  const [stockIn, setstockIn] = useState(0);
  const addStockProduct = () => {
    Axios.post(`${hostUrl}/product/update/stockin/${productUpdateId}`, {
      quantity: stockIn,
      vetid: vetid,
    });

    const stocks = stockIn;
    const quantity = productUpdateQuantity;
    const total = parseInt(stocks) + parseInt(quantity);

    // alert(total);

    Axios.put(`${hostUrl}/product/update/${productUpdateId}`, {
      updateProductName: productUpdateName,
      updateProductDescription: productUpdateDescription,
      updateProductQuantity: total,
      updateProductPrice: productUpdatePrice,
      updateProductImage: productUpdateImage,
      vetid: vetid,
    });

    Axios.get(`${hostUrl}/products/${vetid}`).then((response) => {
      setProduct(response.data);
    });

    handleCloseAddStock();
  };

  const [stockUsed, setstockUsed] = useState(0);
  const decreaseStockProduct = (e) => {
    Axios.post(`${hostUrl}/product/update/stockused/${productUpdateId}`, {
      quantity: stockUsed,
      vetid: vetid,
    });

    const stocks = stockUsed;
    const quantity = productUpdateQuantity;
    const total = parseInt(quantity) - parseInt(stocks);

    // alert(total);

    Axios.put(`${hostUrl}/product/update/${productUpdateId}`, {
      updateProductName: productUpdateName,
      updateProductDescription: productUpdateDescription,
      updateProductQuantity: total,
      updateProductPrice: productUpdatePrice,
      updateProductImage: productUpdateImage,
      vetid: vetid,
    });

    Axios.get(`${hostUrl}/products/${vetid}`).then((response) => {
      setProduct(response.data);
    });

    handleCloseDecreaseStock();
  };

  // Modal Delete
  const [showDelete, setShowDelete] = useState(false);
  const [product_id, setproduct_id] = useState();
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

  // Modal Confirmation Increase
  const [showConfirmationIncrease, setshowConfirmationIncrease] =
    useState(false);
  const handleCloseConfirmationIncrease = () =>
    setshowConfirmationIncrease(false);
  const handleShowConfirmationIncrease = () =>
    setshowConfirmationIncrease(true);

  // Modal Confirmation Decrease
  const [showConfirmationDecrease, setshowConfirmationDecrease] =
    useState(false);
  const handleCloseConfirmationDecrease = () =>
    setshowConfirmationDecrease(false);
  const handleShowConfirmationDecrease = () =>
    setshowConfirmationDecrease(true);

  // Modal Add stock
  const [showAddStock, setshowAddStock] = useState(false);
  const handleCloseAddStock = () => setshowAddStock(false);
  const handleShowAddStock = () => setshowAddStock(true);

  // Modal Decrease stock
  const [showDecreaseStock, setshowDecreaseStock] = useState(false);
  const handleCloseDecreaseStock = () => setshowDecreaseStock(false);
  const handleShowDecreaseStock = () => setshowDecreaseStock(true);

  // Modal Update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setviewProduct("block");
    setviewDisableField(false);
    setviewTitle("Update Product Details");
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
        marginTop: 20,
      }}
    >
      {/* Confirmation Increase */}
      <Modal
        show={showConfirmationIncrease}
        onHide={handleCloseConfirmationIncrease}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to add stock in this product?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationIncrease}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addStockProduct();
              handleCloseConfirmationIncrease();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Stock */}
      <Modal show={showAddStock} onHide={handleCloseAddStock} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          validated={true}
          onSubmit={increaseProductConfirmation}
        >
          <Modal.Body>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Quantity"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="quantity"
                disabled={true}
                value={productUpdateQuantity}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Stock"
              className="mb-3"
            >
              <Form.Control
                type="number"
                min={1}
                placeholder="quantity"
                required
                onChange={(e) => {
                  setstockIn(e.target.value);
                }}
              />
              <Form.Control.Feedback type="valid">
                You've input a valid quantity.
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input a valid product quantity.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddStock}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Confirmation Decrease */}
      <Modal
        show={showConfirmationDecrease}
        onHide={handleCloseConfirmationDecrease}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to decrease stock in this product?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationDecrease}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              decreaseStockProduct();
              handleCloseConfirmationDecrease();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Decrease Stock */}
      <Modal
        show={showDecreaseStock}
        onHide={handleCloseDecreaseStock}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Decrease Stock</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          validated={true}
          onSubmit={decreaseProductConfirmation}
        >
          <Modal.Body>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Quantity"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="quantity"
                disabled={true}
                value={productUpdateQuantity}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Stock"
              className="mb-3"
            >
              <Form.Control
                type="number"
                placeholder="quantity"
                required
                min={1}
                max={productUpdateQuantity}
                onChange={(e) => {
                  setstockUsed(e.target.value);
                }}
              />
              <Form.Control.Feedback type="valid">
                You've input a valid quantity.
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input a valid product quantity.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDecreaseStock}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteProduct();
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
              updateProduct();
              handleCloseConfirmationUpdate();
              refreshTable();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
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
            onSubmit={updateProductConfirmation}
          >
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
                      src={productUpdateImage}
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
                </Col>
                <Col>
                  <Form.Group controlId="formBasicProduct">
                    <FloatingLabel
                      controlId="floatingInputPrice"
                      label="Product Name"
                    >
                      <Form.Control
                        type="text"
                        value={productUpdateName}
                        required
                        disabled={viewDisableField}
                        onChange={(e) => {
                          setproductUpdateName(e.target.value);
                        }}
                        minLength={5}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid name.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid product name.
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
                        value={productUpdateDescription}
                        placeholder="Sample Medicine Description"
                        required
                        onChange={(e) => {
                          setproductUpdateDescription(e.target.value);
                        }}
                        minLength={10}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid description.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid product description.
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
                      label="Quantity"
                    >
                      <Form.Control
                        type="number"
                        disabled={true}
                        value={productUpdateQuantity}
                        placeholder="Sample Medicine productUpdateQuantity"
                        required
                        onChange={(e) => {
                          setproductUpdateQuantity(e.target.value);
                        }}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid quantity.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid product quantity.
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
                        disabled={viewDisableField}
                        value={productUpdatePrice}
                        pattern="\d*"
                        maxLength={5}
                        required
                        onChange={(e) => {
                          e.preventDefault();
                          setproductUpdatePrice(e.target.value);
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
                display: viewProduct,
              }}
            >
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleCloseUpdate();
                    handleShowAddStock();
                  }}
                >
                  Add Stock
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleCloseUpdate();
                    handleShowDecreaseStock();
                  }}
                >
                  Decrease Stock
                </Button>
                <Button variant="success" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </div>
          </Form>
        </Row>
      </Modal>

      {/* Confirmation Inserting */}
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
              insertProduct();
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
          <Modal.Title>Insert Product</Modal.Title>
        </Modal.Header>
        <Row>
          <Form
            noValidate
            validated={true}
            onSubmit={insertProductConfirmation}
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
                          height: 400,
                          width: 500,
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
                      // key='profile_petowner'
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
                    <Form.Control.Feedback type="valid">
                      You've input a valid image.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Image is required in this form.
                    </Form.Control.Feedback>
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
                      label="Product Name"
                    >
                      <Form.Control
                        type="text"
                        value={updateProductName}
                        placeholder="Sample Medicine"
                        required
                        onChange={(e) => {
                          e.preventDefault();
                          setUpdateProductName(e.target.value);
                        }}
                        minLength={5}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid name.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid product name.
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
                        value={updateProductDescription}
                        placeholder="Sample Product Description"
                        required
                        onChange={(e) => {
                          e.preventDefault();
                          setUpdateProductDescription(e.target.value);
                        }}
                        minLength={10}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid description.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid product description.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group
                        controlId="formBasicMedicineQ"
                        style={{
                          marginTop: 10,
                        }}
                      >
                        <FloatingLabel
                          controlId="floatingInputPrice"
                          label="Category"
                        >
                          <Form.Select
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setupdateProductCategory(e.target.value);
                            }}
                          >
                            <option value={null}></option>
                            <option value={"Accessories"}>Accessories</option>
                            <option value={"Food"}>Food</option>
                            <option value={"Merchandise"}>Merchandise</option>
                            <option value={"Toys"}>Toys</option>
                          </Form.Select>

                          <Form.Control.Feedback type="valid">
                            You've input a valid category.
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please input a valid product quantity.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group
                        controlId="formBasicMedicineQ"
                        style={{
                          marginTop: 10,
                        }}
                      >
                        <FloatingLabel
                          controlId="floatingInputPrice"
                          label="Type of pet"
                        >
                          <Form.Select
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setupdateProductPetType(e.target.value);
                            }}
                          >
                            <option value={null}></option>
                            <option value={"Cat"}>Cat</option>
                            <option value={"Dogs"}>Dogs</option>
                            <option value={"Home Pets"}>Home Pets</option>
                          </Form.Select>

                          <Form.Control.Feedback type="valid">
                            You've input a valid category.
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please input a valid product quantity.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group
                    controlId="formBasicMedicineQ"
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
                        value={updateProductQuantity}
                        pattern="\d*"
                        maxLength={5}
                        required
                        onChange={(e) => {
                          e.preventDefault();
                          setUpdateProductQuantity(e.target.value);
                        }}
                        minLength={1}
                      />

                      <Form.Control.Feedback type="valid">
                        You've input a valid quantity.
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please input a valid product quantity.
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
                        value={updateProductPrice}
                        pattern="\d*"
                        maxLength={5}
                        required
                        onChange={(e) => {
                          e.preventDefault();
                          setUpdateProductPrice(e.target.value);
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
                    This table shows the list of registered products in the vet
                    clinic.{" "}
                  </p>
                </Popover.Body>
              </Popover>
            </Overlay>

            <MaterialTable
              ref={ref}
              columns={columns}
              data={product}
              title={"Product Table"}
              cellEditable={false}
              options={{
                sorting: true,
              }}
              actions={[
                {
                  icon: "add",
                  tooltip: "Add Product",
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

      <div>
        <ProductTableTabController />
      </div>
    </div>
  );
}

export default ProductTable;
