import React from "react";
import { Form, Row, Button } from "react-bootstrap";

function ConsultationContainer(props) {
  return (
    <div
      style={{
        width: 550,
        height: 235,
        padding: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Row>
        <Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {props.title}
            <Form style={{ float: "left" }}>
              <Form.Check
                type="switch"
                //  id="custom-switch"
                //  label="Check this switch"
              />
            </Form>
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
