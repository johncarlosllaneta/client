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
import { hostUrl } from "../../../../../Components/Host";
import { useParams } from "react-router-dom";
import { apps } from "../../../../../Components/base";
import ProductTableTabController from "./ProductTableTabController";
import { users } from "../../../../../Components/User";
import ProductTableHolder from "./ProductTableHolder";
import ProductHeader from "./ProductHeader";
import ProductReservation from "./ProductReservation";
import ReservationHolder from "./ReservationHolder";
import getUser from "../../../../../Components/userData";

function ProductTable(props) {
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

  //Insert
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    Axios.get(`${hostUrl}/products/${userData.vetid}`).then((response) => {
      setProduct(response.data);
    });
  }, []);

  const refreshTable = () => {
    Axios.get(`${hostUrl}/products/${users[0].vetid}`).then((response) => {
      setProduct(response.data);
    });
  };

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
    Axios.post(`${hostUrl}/product/insert/${users[0].vetid}`, {
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
    Axios.post(`${hostUrl}/product/delete/${product_id}`, {
      vetid: users[0].vetid,
    }).then((reponse) => {
      if (reponse.data.message == "Success") {
        refreshTable();
      }
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
      vetid: users[0].vetd,
    }).then((response) => {
      if (response.data.message == "Success") {
        refreshTable();
        handleCloseUpdate();
      }
    });
  };

  const [stockIn, setstockIn] = useState(0);
  const addStockProduct = () => {
    Axios.post(`${hostUrl}/product/update/stockin/${productUpdateId}`, {
      quantity: stockIn,
      vetid: users[0].vetid,
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
      vetid: users[0].vetid,
    });

    refreshTable();

    handleCloseAddStock();
  };

  const [stockUsed, setstockUsed] = useState(0);
  const decreaseStockProduct = (e) => {
    Axios.post(`${hostUrl}/product/update/stockused/${productUpdateId}`, {
      quantity: stockUsed,
      vetid: users[0].vetid,
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
      vetid: users[0].vetid,
    });

    refreshTable();

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

  const [productController, setproductController] = useState(false);
  const [reservationController, setreservationController] = useState(true);
  const changeShowReservation = () => {
    setproductController(true);
    setreservationController(false);
  };

  const changeShowProducts = () => {
    setproductController(false);
    setreservationController(true);
  };
  return (
    <div
      style={{
        padding: "5vh",
      }}
    >
      <ProductHeader />
      <div hidden={productController}>
        <ProductTableHolder
          changeShow={changeShowReservation}
          products={product}
          refreshTable={refreshTable}
        />
      </div>
      <div hidden={reservationController}>
        <ReservationHolder changeShowProducts={changeShowProducts} />
      </div>
    </div>
  );
}

export default ProductTable;
