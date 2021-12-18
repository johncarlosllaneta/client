import React from "react";
import NavBarVet from "../../../Verified Vet/NavBarVet";
import SideNavBarVetStaff from "../../SideNavBarVetStaff";
import ProductPage from "./ProductPage";

function ProductMain() {
  return (
    <div>
      <div
        style={{
          width: "20%",
          border: "1px solid transparent",
          float: "left",
          padding: 0,
          margin: 0,
        }}
      >
        <SideNavBarVetStaff active={"product"} />
      </div>

      <div
        style={{
          width: "80%",
          border: "1px",
          float: "left",
          margin: 0,
          padding: 0,
        }}
      >
        <div style={{ height: "15%", border: "1px ", padding: 0 }}>
          {/* navbar */}
          <NavBarVet />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <ProductPage />
        </div>
      </div>
    </div>
  );
}

export default ProductMain;
