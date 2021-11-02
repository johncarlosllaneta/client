import React from "react";
import { Card, Image, Container, Row } from "react-bootstrap";
import { hostUrl } from "../../Components/Host";
const Thread = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        rowGap: 10,
        height: 350,
      }}
    >
      <Card
        style={{
          height: 90,
          width: 550,
          padding: 10,

          borderColor: "transparent"
        }}
      >
        <Container>
          <Row>
            <Image
              style={{ height: 60, width: 60, display: "inline" }}
              src={`${hostUrl}/profile/vet/profile_vet_1621716387728.jpg`}
              roundedCircle
            />
            <div style={{ display: "inline" }}>
              <p style={{ color: "#696969", fontSize: 20, fontWeight: "bold" }}>
                Tri-City Vet Clinic
              </p>
              <p style={{ color: "#696969", fontSize: 10, marginTop: -10 }}>
                Veterinary Clinic
              </p>
            </div>
          </Row>
        </Container>
      </Card>


    </div>
  );
};

export default Thread;
