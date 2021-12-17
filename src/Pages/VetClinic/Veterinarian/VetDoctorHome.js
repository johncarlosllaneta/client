import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PharmacyVerified from "../Verified Vet/Vet Offers/Pharmacy/PharmacyVerified";
import AppointmentMain from "./Appointments/AppointmentMain";
import AppointmentPage from "./Appointments/AppointmentPage";
import DashboardMain from "./Dashboard/DashboardMain";
import PetsMain from "./Pets/PetsMain";
import ProfileMain from "./Profile/ProfileMain";
import ConsultationMain from "./Vet Offers/Consultation/ConsultationMain";
import PharmacyMain from "./Vet Offers/Pharmacy/PharmacyMain";
import ServicesMain from "./Vet Offers/Services/ServicesMain";
import VetOffersMain from "./Vet Offers/VetOffersMain";

function VetDoctorHome() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={DashboardMain} />
          <Route path="/dashboard" exact component={DashboardMain} />
          <Route path="/profile" exact component={ProfileMain} />
          <Route path="/pets" exact component={PetsMain} />
          <Route path="/vetOffers" exact component={VetOffersMain} />
          <Route path="/consultation" exact component={ConsultationMain} />
          <Route path="/services" exact component={ServicesMain} />
          <Route path="/pharmacy" exact component={PharmacyMain} />
          <Route path="/appointments" exact component={AppointmentMain} />
        </Switch>
      </div>
    </Router>
  );
}

export default VetDoctorHome;
