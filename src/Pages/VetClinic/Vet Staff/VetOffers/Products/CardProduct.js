import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";

const Cardproduct = (props) => {
  return (
    <div
      style={{
        height: 140,
        width: 370,
        borderRadius: 30,
        padding: 12,
        backgroundColor: "whitesmoke",
        margin: 10,
      }}
    >
      <Row style={{ height: "100%", width: "100%" }}>
        <Col sm={4} style={{ paddingTop: 20 }}>
          <Image
            src={props.image}
            rounded
            style={{
              width: 90,
              height: 70,
            }}
          />
        </Col>
        <Col sm={4}>
          <div style={{ padding: 10, paddingTop: 35 }}>
            <Row
              style={{
                fontSize: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.prodName}
            </Row>
            <Row
              style={{
                fontSize: 13,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.category}
            </Row>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{ padding: 10, paddingTop: 35 }}>
            <Row
              style={{
                fontSize: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Quantity:{props.quantity}
            </Row>
            <Row
              style={{
                fontSize: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              ₱{props.price}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cardproduct;
