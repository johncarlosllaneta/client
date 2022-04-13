import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import DashboardVetAdmin from './Dashboard/DashboardVetAdmin';
import PetsVerified from './Pets/PetsVerified';
import profileContentVerified from './Profile/profileContentVerified';
import PetPanelTableController from './Pets/PetPanelTableController';
import ServicesVerified from './Vet Offers/Services/ServicesVerified';
import RegistrationVetStaff from './Profile/Registration/VetStaff/RegistrationVetStaff';
import PreControlStartHolder from './Vet Offers/Services/ServicePages/PreControlStartHolder';
import PetExamStartHolder from './Vet Offers/Services/ServicePages/PetExamStartHolder';
import PetGroomStartHolder from './Vet Offers/Services/ServicePages/PetGroomStartHolder';
import VaccineStartHolder from './Vet Offers/Services/ServicePages/VaccineStartHolder';
import PharmacyVerified from './Vet Offers/Pharmacy/PharmacyVerified';
import Products from './Vet Offers/Products/Product';
import ProductVerified from './Vet Offers/Products/ProductVerified';
import VisitorMonitoringVerified from './Visitor Monitoring/VisitorMonitoringVerified';
import QrCode from "./Visitor Monitoring/QrCode";
import appointmentVerified from './Appointments/appointmentVerified';
import VetSettings from './Settings/VetSettings';
import Thread from './Talk to Vet/Thread';
import VideoChat from '../../../Components/video-call/VideoChat';
import ConsultStartHolder from './Vet Offers/Services/ServicePages/ConsultStartHolder';
import NotFound from '../../../Components/NotFound';
import VerifyContent from "../Unverified Vet/VerifyContent"
import Dashboard from '../Unverified Vet/Dashboard';
import { Skeleton } from '@mui/material';
import Profile from '../Unverified Vet/Profile/Profile';
import VetOffers from '../Unverified Vet/Vet Offers/VetOffers';
import Subscription from '../Unverified Vet/Subscription/Subscription';


function VetAdminHome() {
    var userContent;
    let role = localStorage.getItem('vetStatus');

    if (role == "Verified") {
        userContent = (
            <Switch>
                <Route path="/" exact component={DashboardVetAdmin} />
                <Route path="/dashboard" exact component={DashboardVetAdmin} />
                <Route path="/profile" exact component={profileContentVerified} />
                <Route path="/registration/vet staff" exact component={RegistrationVetStaff} />
                <Route path="/pets/:vetid" exact component={PetsVerified} />
                <Route path="/pets/:vetid/:petid" exact component={PetPanelTableController} />
                <Route
                    path="/pharmacy/:vetid"
                    exact
                    component={PharmacyVerified}
                />

                <Route
                    path="/products/:vetid"
                    exact
                    component={ProductVerified}
                />
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
                <Route
                    path="/services/preventive&control/:vetid"
                    exact
                    component={PreControlStartHolder}
                />
                <Route
                    path="/services/pet&examination/:vetid"
                    exact
                    component={PetExamStartHolder}
                />

                <Route
                    path="/services/pet&grooming/:vetid"
                    exact
                    component={PetGroomStartHolder}
                />
                <Route
                    path="/services/vaccination/:vetid"
                    exact
                    component={VaccineStartHolder}
                />
                <Route
                    path="/appointments/:vetid"
                    exact
                    component={appointmentVerified}
                />
                <Route
                    path="/visitors"
                    exact
                    component={VisitorMonitoringVerified}
                />
                <Route
                    path="/qrCode"
                    exact
                    component={QrCode}
                />
                <Route path="/vet/settings"
                    exact
                    component={VetSettings} />

                <Route path="/talk to vet"
                    exact
                    component={Thread} />

                <Route path="/video conference/:code"
                    exact
                    component={VideoChat} />

                <Route path="*" component={NotFound} />

            </Switch>
        );

    } else {
        userContent = (
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/vetOffers" exact component={VetOffers} />
                <Route path="/verification" exact component={VerifyContent} />
                <Route path="/subscription" exact component={Subscription} />
                <Route path="*" component={NotFound} />
            </Switch>
        )
    }
    return (
        <div>
            <Router>
                <div>
                    {userContent}
                </div>
            </Router>

        </div>
    )
}

export default VetAdminHome
