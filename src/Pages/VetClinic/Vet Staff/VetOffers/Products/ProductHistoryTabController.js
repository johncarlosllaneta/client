import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import SideNavBarVetStaff from "../../SideNavBarVetStaff";
import NavBarStaff from "../../NavBarStaff";
import ProductReservationHistory from "./ProductReservationHistory";
import { useParams } from "react-router";

function ProductHistoryTabController() {
  let { vetid } = useParams();
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
        <SideNavBarVetStaff active={"products"} />
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
          <NavBarStaff showLogo={true} showHome={true} />
        </div>
        <div style={{ height: "85%", border: "1px", padding: 5 }}>
          <ProductReservationHistory user={vetid} />
        </div>
      </div>
    </div>
  );
}

export default ProductHistoryTabController;
