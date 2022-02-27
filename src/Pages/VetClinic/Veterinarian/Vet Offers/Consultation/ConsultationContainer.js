import React from "react";
import { Form, Row, Button } from "react-bootstrap";

function ConsultationContainer(props) {
  return (
    <div
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        height: "20vh",
        padding: 20,
      }}
    >
      <Row>
        <Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div> {props.title}</div>
            <div>
              <Form>
                <Form.Check
                  type="switch"
                  //  id="custom-switch"
                  //  label="Check this switch"
                />
              </Form>
            </div>
          </div>
        </Row>
        <Row>{props.info}</Row>
        <Row>
          <h5 style={{ textAlign: "left" }}>Price: {props.price}</h5>
        </Row>
        <Row style={{ display: "flex", justifyContent: "end" }}>
          <Button variant="primary" style={{ width: 153 }}>
            Edit
          </Button>
        </Row>
      </Row>
    </div>
  );
}

export default ConsultationContainer;
