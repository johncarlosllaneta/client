import ProductItem from "./ProductItem";
import ProductSearchBar from "./ProductSearchBar";
import React, { useState, useEffect, useRef } from "react";
import { Form, Offcanvas, FloatingLabel, Row, Col } from "react-bootstrap";
import UpdateProduct from "./UpdateProduct";
import { ToastAdd } from "../../../../../Components/Toast";
import { ToastContainer } from "react-toastify";

function ProductTableHolder(props) {
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);

  const handleCloseUpdateProduct = () => setShowUpdateProduct(false);
  const handleShowUpdateProduct = () => setShowUpdateProduct(true);
  const [search, setsearch] = useState("");
  const [productSelected, setproductSelected] = useState([]);

  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "white",
        paddingBottom: "2vh",
      }}
    >
      <ToastContainer />
      {/* Update Products */}
      <Offcanvas
        show={showUpdateProduct}
        onHide={handleCloseUpdateProduct}
        placement="end"
        key={1}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update Product</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UpdateProduct
            productSelected={productSelected}
            handleCloseUpdateProduct={handleCloseUpdateProduct}
            refreshTable={props.refreshTable}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <ProductSearchBar
        changeShow={props.changeShow}
        refreshTable={props.refreshTable}
        products={props.products}
        setsearch={setsearch}
      />
      <hr />
      <Row
        style={{
          width: "100%",
          paddingLeft: "2vh",

          paddingBottom: "2vh",
          overflowY: "auto",
          height: "60vh",
          rowGap: "5vh",
          display: "flex",
          justifyContent: "start",
        }}
      >
        {props.products
          .filter((val) => {
            if (search == "") {
              return val;
            } else if (
              val.product_name.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => {
            return (
              <Col sm={3}>
                <ProductItem
                  product={item}
                  handleShowUpdateProduct={handleShowUpdateProduct}
                  setproductSelected={setproductSelected}
                  refreshTable={props.refreshTable}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default ProductTableHolder;
