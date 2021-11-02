import React from "react";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import PetOwnerVertical from "./PetOwnerVertical";
import background from "../../Images/bg.png";
import PetProdInfo from "./PetProdInfo";
import { Row, Container, Button, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
const PetProdPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: window.screen.height,
      }}
    >
      <NavBarHome />
      <div style={{ paddingTop: 10, marginTop: 110 }}>
        <Container>
          <Row style={{ float: "right" }}>
            <FaShoppingCart style={{ fontSize: 30, marginRight: 50 }} />
            <Button
              style={{
                backgroundColor: "#3BD2E3",
                borderRadius: 30,
                paddingLeft: 40,
                paddingRight: 40,
                borderColor: "#FFFFFF",
                marginRight: -150,
              }}
            >
              Back
            </Button>
          </Row>
        </Container>
      </div>
      <Container style={{ marginTop: 50 }}>
        <PetProdInfo />
      </Container>
    </div>
  );
};

export default PetProdPage;
