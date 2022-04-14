import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Form,
  Offcanvas,
  FloatingLabel,
  Row,
  Col,
  Container,
  Modal,
  Image,
} from "react-bootstrap";
import Axios from "axios";

import { Badge, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AiOutlineFileJpg } from "react-icons/ai";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { ToastUpdate } from "../../../../../Components/Toast";
import { apps } from "../../../../../Components/base";
import { ToastContainer } from "react-toastify";
import { hostUrl } from "../../../../../Components/Host";
import { users } from "../../../../../Components/User";

function UpdateProduct(props) {
  // Product Attributes
  const [ProductName, setProductName] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [ProductQuantity, setProductQuantity] = useState("");
  const [ProductPrice, setProductPrice] = useState();
  const [ProductCategory, setProductCategory] = useState();
  const [ProductPetType, setProductPetType] = useState();
  const [ProductImage, setProductImage] = useState();
  const [ProductId, setProductId] = useState();

  useEffect(() => {
    setProductName(props.productSelected.product_name);
    setProductDescription(props.productSelected.product_desc);
    setProductImage(props.productSelected.product_image);
    setProductPrice(props.productSelected.price);
    setProductCategory(props.productSelected.category);
    setProductQuantity(props.productSelected.quantity);
    setProductPetType(props.productSelected.pet_type);
    setProductId(props.productSelected.product_id);
  }, []);

  // Upload image controller
  const [selectImage, setselectImage] = useState(false);
  const [displayImage, setdisplayImage] = useState(true);
  const [imageChecker, setimageChecker] = useState(true);

  // Form Validation
  const [validated, setValidated] = useState(false);

  const [progressCounterUploadImage, setprogressCounterUploadImage] =
    useState(0);
  const [progressUploadController, setprogressUploadController] =
    useState(true);

  function counters() {
    setInterval(() => {
      setprogressCounterUploadImage((progressCounterUploadImage) =>
        progressCounterUploadImage < 100 ? progressCounterUploadImage + 25 : 100
      );
    }, 1000);
  }
  // Image Picker
  const inputFileRef = useRef(null);
  const [imageFile, setimageFile] = useState("");
  const onFilechange = (e) => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files);
    setimageFile(URL.createObjectURL(e.target.files[0]));
    setselectImage(true);
    setdisplayImage(false);
  };
  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };

  // Crop
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    inputFileRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !inputFileRef.current) {
      return;
    }

    const image = inputFileRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        var file = new File(
          [blob],
          Math.floor(Math.random() * 1000000000000000000),
          { lastModified: new Date().getTime(), type: blob.type }
        );

        uploadImage(file);
      },
      "image/png",
      1
    );
  }
  function updateProfilePicture() {
    generateDownload(previewCanvasRef.current, completedCrop);
  }

  const uploadImage = async (e) => {
    const storageRef = apps.storage().ref();
    const filRef = storageRef.child(e.name);
    await filRef.put(e);
    // setimageUploadedUrl(await filRef.getDownloadURL());
    console.log(await filRef.getDownloadURL());
    insertProduct(await filRef.getDownloadURL());
  };

  // Modal Confirmation Insert
  const [showConfirmationInsert, setshowConfirmationInsert] = useState(false);
  const handleCloseConfirmationInsert = () => setshowConfirmationInsert(false);
  const handleShowConfirmationInsert = () => setshowConfirmationInsert(true);

  const insertProduct = (imageLink) => {
    if (imageFile == "") {
      Axios.put(`${hostUrl}/product/update/${ProductId}`, {
        updateProductName: ProductName,
        updateProductDescription: ProductDescription,
        updateProductQuantity: ProductQuantity,
        updateProductPrice: ProductPrice,
        updateProductImage: ProductImage,
        updateProductCategory: ProductCategory,
        updateProductType: ProductPetType,
      }).then((response) => {
        if (response.data.message == "Success") {
          setProductName("");
          setProductDescription("");
          setProductQuantity("");
          setProductPrice("");
          setProductCategory("");
          setProductPetType("");
          setimageFile("");
          setimageChecker(true);
          setValidated(false);
          props.handleCloseUpdateProduct();
          props.refreshTable();
        }
      });
    } else {
      Axios.put(`${hostUrl}/product/update/${ProductId}`, {
        updateProductName: ProductName,
        updateProductDescription: ProductDescription,
        updateProductQuantity: ProductQuantity,
        updateProductPrice: ProductPrice,
        updateProductImage: imageLink,
        updateProductCategory: ProductCategory,
        updateProductType: ProductPetType,
      }).then((response) => {
        if (response.data.message == "Success") {
          setProductName("");
          setProductDescription("");
          setProductQuantity("");
          setProductPrice("");
          setProductCategory("");
          setProductPetType("");
          setimageFile("");
          setimageChecker(true);
          setValidated(false);
          props.handleCloseUpdateProduct();
          props.refreshTable();
        }
      });
    }
  };

  const insertProductConfirmation = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      if (imageFile == "") {
        insertProduct("");
      } else {
        handleShowConfirmationInsert();
      }
    }

    setValidated(true);
  };

  return (
    <div>
      <Row>
        {/* Confirmation Inserting */}
        <Modal
          show={showConfirmationInsert}
          onHide={handleCloseConfirmationInsert}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to save the update on this product?{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmationInsert}>
              No
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // insertProduct();
                // handleCloseConfirmationInsert();
                // refreshTable();
                handleCloseConfirmationInsert();
                setprogressUploadController(false);
                counters();
                updateProfilePicture();
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
        <Form noValidate validated={true} onSubmit={insertProductConfirmation}>
          <FloatingLabel
            controlId="floatingInput"
            label="Product Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="product name"
              value={ProductName}
              required
              minLength={5}
              onChange={(e) => {
                e.preventDefault();
                setProductName(e.target.value);
              }}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInputPrice" label="Description">
            <Form.Control
              type="text"
              as="textarea"
              style={{ height: 200 }}
              placeholder="Sample Product Description"
              value={ProductDescription}
              required
              onChange={(e) => {
                e.preventDefault();
                setProductDescription(e.target.value);
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

          <FloatingLabel controlId="floatingInputPrice" label="Category">
            <Form.Select
              required
              value={ProductCategory}
              onChange={(e) => {
                e.preventDefault();
                setProductCategory(e.target.value);
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

          <FloatingLabel controlId="floatingInputPrice" label="Type of pet">
            <Form.Select
              required
              value={ProductPetType}
              onChange={(e) => {
                e.preventDefault();
                setProductPetType(e.target.value);
              }}
            >
              <option value={null}></option>
              <option value={"Cat"}>Cat</option>
              <option value={"Dogs"}>Dogs</option>
            </Form.Select>

            <Form.Control.Feedback type="valid">
              You've input a valid category.
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please input a valid product quantity.
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInputPrice" label="Quantity">
            <Form.Control
              type="number"
              pattern="\d*"
              max={10000}
              value={ProductQuantity}
              required
              onChange={(e) => {
                e.preventDefault();
                setProductQuantity(e.target.value);
              }}
              min={1}
              title={"Product Quantity"}
            />

            <Form.Control.Feedback type="valid">
              You've input a valid quantity.
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please input a valid product quantity.
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInputPrice" label="Price">
            <Form.Control
              type="number"
              pattern="\d*"
              // maxLength={5}
              value={ProductPrice}
              max={10000}
              min={1}
              required
              onChange={(e) => {
                e.preventDefault();
                setProductPrice(e.target.value);
              }}
              minLength={1}
              title={"Product Price"}
            />

            <Form.Control.Feedback type="valid">
              You've input a valid price .
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please input a valid product price.
            </Form.Control.Feedback>
            <Form.Text id="passwordHelpBlock" muted>
              Price should be exact. ex. ₱ 100
            </Form.Text>
          </FloatingLabel>

          <p
            hidden={imageChecker}
            style={{
              color: "red",
            }}
          >
            Product image is required.
          </p>
          <div
            hidden={selectImage}
            onClick={onBtnClick}
            style={{
              display: "block",
              // justifyContent: 'center',
              alignItems: "center",
              borderStyle: "dashed",
              borderColor: "grey",
              height: "auto",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <Container
            //   style={{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     marginTop: "10vh",
            //   }}
            >
              <Form.Control
                type="file"
                id="imagePicker"
                hidden={true}
                ref={inputFileRef}
                accept="image/png, image/gif, image/jpeg"
                onChange={onFilechange}
              />
              <Image
                style={{
                  border: "1px solid grey",
                  backgroundColor: "lightblue",
                  height: 300,
                  width: 300,
                  objectFit: "fill",
                }}
                src={ProductImage}
                alt={ProductName}
              />
            </Container>
          </div>
          <div
            hidden={displayImage}
            style={{
              display: "block",
              // justifyContent: 'center',
              alignItems: "center",
              height: "auto",
              width: "100%",
            }}
          >
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ReactCrop
                src={imageFile}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                style={{
                  marginRight: 10,
                }}
              />
              <div>
                <canvas
                  ref={previewCanvasRef}
                  // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                  style={{
                    width: 150,
                    height: 150,
                  }}
                />
              </div>
            </Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1vh",
              }}
            >
              <Row>
                <Col
                  sm={3}
                  style={{
                    display: "flex",
                  }}
                >
                  <AiOutlineFileJpg style={{ fontSize: 50 }} />
                </Col>
                <Col sm={9}>
                  <Typography>Upload Image File</Typography>
                </Col>
              </Row>

              <Button
                onClick={() => {
                  // setprogressUploadController(false);
                  // counters();
                  // updateProfilePicture();
                }}
              >
                Upload
              </Button>
            </Container>
            <Container
              hidden={progressUploadController}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1vh",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <LinearProgress
                  value={progressCounterUploadImage}
                  variant="determinate"
                />
              </Box>
            </Container>
          </div>

          <Button variant="secondary">Close</Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Row>
    </div>
  );
}

export default UpdateProduct;
