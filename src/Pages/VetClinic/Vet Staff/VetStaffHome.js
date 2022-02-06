import React, { useEffect, useState } from "react";
import Axios from "axios";
import { hostUrl } from "../../../Components/Host";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardMain from "./Dashboard/DashboardMain";
import ProfileMain from "./Profile/ProfileMain";
import PharmacyMain from "./VetOffers/Pharmacy/PharmacyMain";
import ProductMain from "./VetOffers/Products/ProductMain";
import VisitorMonitoringVerified from "./VisitorMonitoring/VisitorMonitoringVerified";
function VetStaffHome() {
  const [user, setuser] = useState([]);

  const [counter, setcounter] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 6) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });
      setcounter(counter + 1);
    }
  }, [user]);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={DashboardMain} />
          <Route path="/dashboard" exact component={DashboardMain} />
          <Route path="/profile" exact component={ProfileMain} />
          <Route path="/product/:staffId" exact component={ProductMain} />
          <Route path="/pharmacy/:staffId" exact component={PharmacyMain} />
          <Route
            path="/visitormonitoring/:staffId"
            exact
            component={VisitorMonitoringVerified}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default VetStaffHome;
