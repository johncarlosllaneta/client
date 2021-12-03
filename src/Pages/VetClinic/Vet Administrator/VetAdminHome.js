import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardVetAdmin from './Dashboard/DashboardVetAdmin';
import profileContentVerified from './Profile/profileContentVerified';

function VetAdminHome() {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={DashboardVetAdmin} />
                        <Route path="/dashboard" exact component={DashboardVetAdmin} />
                        <Route path="/profile" exact component={profileContentVerified} />
                        {/* <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/profile" exact component={ProfileContent} />
                        <Route path="/verification" exact component={VerifyContent} />
                        <Route path="/vet/settings" exact component={VetSettings} /> */}
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default VetAdminHome
