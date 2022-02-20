import React, { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import ProductTable from "./ProductTable";
import Logout from "../../../../../Components/Logout";
import { hostUrl } from "../../../../../Components/Host";

function Products() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [idx, setIdx] = useState("");
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  const submitProduct = () => {
    Axios.post(`${hostUrl}/product/insert`, {
      productName: productName,
      productDescription: productDescription,
      productQuantity: productQuantity,
    });

    setMessage("Success Product Insertion");
    setVariant("success");
    setIdx("3");
  };

  return (
    <div>
      <h1>Products</h1>
      <Logout />
      <Alert key={idx} variant={variant}>
        {message}
      </Alert>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicProduct">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sample Product"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicProductD">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sample Product Description"
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicProductQ">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Sample Product Quantity"
                onChange={(e) => {
                  setProductQuantity(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={submitProduct}>
              Submit
            </Button>
          </Form>

          {/* {products.map((val) => {
                        return <h1> {val.product_name} </h1>
                    })} */}
        </Card.Body>
      </Card>

      <ProductTable />
    </div>
  );
}

export default Products;
