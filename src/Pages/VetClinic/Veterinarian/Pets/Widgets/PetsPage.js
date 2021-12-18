import React from "react";
import PetsGeneralTable from "./PetsGeneralTable";
import PetsTable from "./PetsTable";
import { Row } from "react-bootstrap";
function PetsPage() {
  return (
    <div>
      <Row>
        <div style={{ margin: 10 }}>
          <PetsGeneralTable />
        </div>
      </Row>
      <Row>
        <div style={{ margin: 10 }}>
          <PetsTable />
        </div>
      </Row>
    </div>
  );
}

export default PetsPage;
