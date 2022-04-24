import React from "react";
import { Col, Row } from "react-bootstrap";

function DashboardInfo() {
  return (
    <div style={{ height: "auto", width: "auto", overflowY: "auto" }}>
      <Row>
        <Col>
          <div style={{ textAlign: "left", padding: 5 }}>
            <h2 style={{ fontWeight: "bold" }}>Rabies vaccine</h2>
            <p>
              For pre-exposure protection, 3 doses of rabies vaccine are
              recommended. People who may be repeatedly exposed to rabies virus
              should receive periodic testing for immunity, and booster doses
              might be necessary. Your health care provider can give you more
              details.
            </p>
            <p style={{ fontWeight: "bold", marginTop: 5 }}>
              Recommended Rabies{" "}
            </p>
            <p style={{ fontWeight: "bold" }}>Vaccine Schedule for your Dog</p>
            <p>
              Rabies vaccine can prevent rabies if given to a person after they
              have had an exposure. Anyone who has been bitten by an animal
              suspected to have rabies, or who otherwise may have been exposed
              to rabies, should clean the wound and see a health care provider
              immediately regardless of vaccination status. The health care
              provider can help determine if the person should receive
              post-exposure rabies vaccination.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardInfo;
