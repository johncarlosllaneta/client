import React, { useEffect, useState } from "react";
import Axios from "axios";
import { hostUrl } from "../../../Components/Host";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardMain from "./Dashboard/DashboardMain";
import ProfileMain from "./Profile/ProfileMain";
import PharmacyMain from "./VetOffers/Pharmacy/PharmacyMain";
// import ProductMain from "./VetOffers/Products/ProductMain";
import VisitorMonitoringVerified from "./VisitorMonitoring/VisitorMonitoringVerified";
import ProductVerified from "./VetOffers/Products/ProductVerified";
import ProductTableTabController from "./VetOffers/Products/ProductTableTabController";
import ProductHistoryTabController from "./VetOffers/Products/ProductHistoryTabController";

function VetStaffHome() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={DashboardMain} />
          <Route path="/dashboard" exact component={DashboardMain} />
          <Route path="/profile" exact component={ProfileMain} />
          <Route path="/products/:vetid" exact component={ProductVerified} />
          <Route
            path="/history/:vetid"
            exact
            component={ProductHistoryTabController}
          />
          <Route path="/pharmacy/:vetid" exact component={PharmacyMain} />
          <Route
            path="/visitormonitoring"
            exact
            component={VisitorMonitoringVerified}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default VetStaffHome;
