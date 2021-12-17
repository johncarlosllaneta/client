import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardMain from "./Dashboard/DashboardMain";
import ProfileMain from "./Profile/ProfileMain";
import PharmacyMain from "./VetOffers/Pharmacy/PharmacyMain";
import ProductMain from "./VetOffers/Products/ProductMain";
import VisitorMonitoringVerified from "./VisitorMonitoring/VisitorMonitoringVerified";
function VetStaffHome() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={DashboardMain} />
          <Route path="/dashboard" exact component={DashboardMain} />
          <Route path="/profile" exact component={ProfileMain} />
          <Route path="/pharmacy" exact component={PharmacyMain} />
          <Route
            path="/visitormonitoring"
            exact
            component={VisitorMonitoringVerified}
          />
          <Route path="/product" exact component={ProductMain} />
        </Switch>
      </div>
    </Router>
  );
}

export default VetStaffHome;
