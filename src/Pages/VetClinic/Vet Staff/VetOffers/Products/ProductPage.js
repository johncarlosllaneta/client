import React from "react";
import { Row } from "react-bootstrap";
import ProductsGeneralTable from "./ProductGeneralTable";
import ProductTable from "./Table/ProductTable";
function ProductPage() {
  return (
    <div>
      <Row>
        <div style={{ margin: 10 }}>
          <ProductTable />
        </div>
      </Row>
      <Row>
        <div style={{ margin: 10 }}>
          <ProductsGeneralTable />
        </div>
      </Row>
    </div>
  );
}

export default ProductPage;
