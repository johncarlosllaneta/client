import React from "react";
import { Container } from "react-bootstrap";
import SideNavbarVerified from "./SideNavbarVerified";
import ProductTable from "./ProductTable";
import NavBarVet from "./NavBarVet";
function ProductVerified() {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div style={{ zoom: value }}>
      <div>
        <SideNavbarVerified active={"products"} />
      </div>

      <div
        style={{
          backgroundColor: "#F1F9FC",
          height: "auto",
        }}
      >
        <Container
          style={{
            padding: 0,
          }}
        >
          <NavBarVet />
        </Container>
        <Container>
          <ProductTable />
        </Container>
      </div>
    </div>
  );
}

export default ProductVerified;
