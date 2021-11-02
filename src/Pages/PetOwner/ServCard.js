import React from "react";
import { Card } from "react-bootstrap";

const ServCard = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        height: 150,

        rowGap: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: 'red'
      }}
    >
      <Card style={{ height: 90, width: 400, justifyContent: "center" }} onClick={() => { }}>
        <Card.Title
          style={{
            fontSize: 35,
            marginLeft: 10,
            color: "#3BD2E3",
            fontWeight: "bold",
          }}
        >
          {props.data.service_name}
        </Card.Title>
      </Card>

    </div>
  );
};

export default ServCard;
