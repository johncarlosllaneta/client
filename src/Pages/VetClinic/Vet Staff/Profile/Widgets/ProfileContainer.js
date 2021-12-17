import React from "react";
import { Row, Col } from "react-bootstrap";
function ProfileContainer(props) {
  return (
    <div style={{ height: 151, width: 318, borderRadius: 30, padding: 10 }}>
      <Row style={{ height: "100%", width: "100%" }}>
        <Col sm={5}>
          <div>{props.icon}</div>
        </Col>
        <Col sm={7}>
          <div style={{ paddingTop: 25 }}>
            <Row
              style={{
                fontSize: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.title}
            </Row>
            <Row
              style={{
                fontSize: 13,
                color: "#33C1D2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {props.subtext}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileContainer;
