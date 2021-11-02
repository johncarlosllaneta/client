import React from "react";

import PetOwnerVertical from "./PetOwnerVertical";

const PetOwnerHome = () => {
  const screenh = window.screen.height - 200;
  return (
    <div>
      <div style={{ marginTop: 100 }}>
        <PetOwnerVertical />
      </div>
    </div>
  );
};

export default PetOwnerHome;
