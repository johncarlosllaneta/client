import React from "react";
import MainNavBar from "../../Components/MainNavBar";
import SubNavBar from "../../Components/SubNavBar";

const GeneralNavBar = () => {
  return (
    <div className="navbar fixed-top" style={{ padding: 0 }}>
      <MainNavBar />
      <SubNavBar />
    </div>
  );
};

export default GeneralNavBar;
