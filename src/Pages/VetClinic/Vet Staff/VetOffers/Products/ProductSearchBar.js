import { Badge, Button, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Form, Offcanvas, FloatingLabel, Row } from "react-bootstrap";
import { IoMdCart } from "react-icons/io";
import FilterListIcon from "@mui/icons-material/FilterList";
import { apps } from "../../../../../Components/base";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { users } from "../../../../../Components/User";
import { BsFillImageFill } from "react-icons/bs";
import AddProduct from "./AddProduct";

function ProductSearchBar(props) {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleCloseAddProduct = () => setShowAddProduct(false);
  const handleShowAddProduct = () => setShowAddProduct(true);

  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: "2vh",
        paddingRight: "2vh",
        paddingLeft: "2vh",
      }}
    >
      <Offcanvas
        show={showAddProduct}
        onHide={handleCloseAddProduct}
        placement="end"
        key={1}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Product</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AddProduct
            handleCloseAddProduct={handleCloseAddProduct}
            refreshTable={props.refreshTable}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <div
        style={{
          height: "50%",
        }}
      >
        <Form.Control
          type="text"
          placeholder="search"
          style={{
            width: "20vw",
          }}
          onChange={(e) => {
            props.setsearch(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",

          alignItems: "center",
          height: "50%",
        }}
      >
        <Typography
          style={{
            marginRight: "5vh",
          }}
        >
          Product Total Count: {props.products.length}
        </Typography>

        <Button onClick={handleShowAddProduct}>Add Product</Button>

        <Tooltip title={"Order Reservation"}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={props.changeShow}
          >
            <Badge badgeContent={4} color="error">
              <IoMdCart
                style={{
                  color: "#354A5F",
                }}
              />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title={"Filter"}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {}}
          >
            <FilterListIcon
              style={{
                color: "#354A5F",
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default ProductSearchBar;
