import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DashboardVetAdmin from './Dashboard/DashboardVetAdmin';
import PetsVerified from './Pets/PetsVerified';
import profileContentVerified from './Profile/profileContentVerified';
import PetPanelTableController from './Pets/PetPanelTableController';
import ServicesVerified from './Vet Offers/Services/ServicesVerified';
import ConsultStartHolder from '../Verified Vet/Vet Offers/Services/ServicePages/ConsultStartHolder';
import RegistrationVeterinarian from './Profile/Registration/Veterinarian/RegistrationVeterinarian';

function VetAdminHome() {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={DashboardVetAdmin} />
                        <Route path="/dashboard" exact component={DashboardVetAdmin} />
                        <Route path="/profile" exact component={profileContentVerified} />
                        <Route path="/registration/veterinarian" exact component={RegistrationVeterinarian} />
                        <Route path="/pets/:vetid" exact component={PetsVerified} />
                        <Route path="/pets/:vetid/:petid" exact component={PetPanelTableController} />
                        <Route
                            path="/services/:vetid"
                            exact
                            component={ServicesVerified}
                        />
                        <Route
                            path="/services/consultation/:vetid"
                            exact
                            component={ConsultStartHolder}
                        />
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
