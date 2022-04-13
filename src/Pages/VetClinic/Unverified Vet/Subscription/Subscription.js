import React from "react";
import SideNavBar from "../SideNavBar";
import SubscriptionHolder from "./SubscriptionHolder";

function Subscription() {
  return (
    <div>
      <div
        style={{
          width: "20%",
          border: "1px solid transparent",
          float: "left",
          padding: 0,
          margin: 0,
        }}
      >
        <SideNavBar active={"subscription"} />
      </div>

      <SubscriptionHolder />
    </div>
  );
}

export default Subscription;
