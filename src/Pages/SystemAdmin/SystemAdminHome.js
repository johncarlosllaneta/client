import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardAdmin from "./DashboardAdmin";
import PetOwnerAdmin from "./PetOwnerAdmin";
import PetAdmin from "./PetAdmin";
import VerifiedAdmin from "./VerifiedAdmin";
import PendingAdmin from "./PendingAdmin";
import AuditLogsAdmin from "./AuditLogsAdmin";
import AdminSettings from "./AdminSettings";
import SystemAdminRegistration from "../../Components/SystemAdminRegistration";
import VetInformation from "./VetInformation";
function SystemAdminHome() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={DashboardAdmin} />
            <Route path="/dashboard" exact component={DashboardAdmin} />
            <Route path="/petowner" exact component={PetOwnerAdmin} />
            <Route path="/pets" exact component={PetAdmin} />
            <Route
              path="/vet&clinic/verified"
              exact
              component={VerifiedAdmin}
            />
            <Route path="/vet&clinic/pending" exact component={PendingAdmin} />
            <Route
              path="/visitor&monitoring"
              exact
              component={AuditLogsAdmin}
            />
            <Route
              path="/vetdetails/:email"
              exact
              component={VetInformation}
            />
            <Route path="/admin/settings" exact component={AdminSettings} />
            <Route path="/system admin/registration" exact component={SystemAdminRegistration} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default SystemAdminHome;
