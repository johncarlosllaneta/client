import React from "react";
import { Col, Row } from "react-bootstrap";

function DashboardInfo() {
  return (
    <div style={{ height: "auto", width: "auto", overflowY: "auto" }}>
      <Row>
        <Col>
          <div style={{ textAlign: "left", padding: 5 }}>
            <h2 style={{ fontWeight: "bold" }}>Rabies</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p style={{ fontWeight: "bold", marginTop: 5 }}>
              Recommended Rabies{" "}
            </p>
            <p style={{ fontWeight: "bold" }}>Vaccine Schedule for your Dog</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardInfo;
