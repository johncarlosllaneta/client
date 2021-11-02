import React from "react";
import { Container } from "react-bootstrap";
import TracingCard from "./TracingCard";
// import { ListView, ListViewItem } from "react-scrollable-list-view";
const PetTracing = (props) => {
  return (
    <div
      style={{
        width: "77vw",
        marginLeft: 40,
        marginTop: 70,
      }}
    >
      <Container
        fluid
        style={{
          backgroundColor: "#FFFFFF",
          height: 730,
          margin: 15,
          borderRadius: 30,
          textAlign: "left",
        }}
      >
        <h1 style={{ fontWeight: "bold", color: "#696969", paddingTop: 20 }}>
          Contact Tracing
        </h1>
        <div
          style={{
            backgroundColor: "#EFF1F7",
            height: 600,
            borderRadius: 30,
            marginTop: 20,
            padding: 10,
          }}
        >
          <TracingCard data={props.data.pet_owner_id} />
        </div>
      </Container>
    </div>
  );
};

export default PetTracing;
