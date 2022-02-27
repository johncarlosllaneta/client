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
import ConsultStartHolder from "./Vet Offers/Services/ServicePages/ConsultStartHolder";
import PetExamStartHolder from "./Vet Offers/Services/ServicePages/PetExamStartHolder";
import PetGroomStartHolder from "./Vet Offers/Services/ServicePages/PetGroomStartHolder";
import PreControlStartHolder from "./Vet Offers/Services/ServicePages/PreControlStartHolder";
import VaccineStartHolder from "./Vet Offers/Services/ServicePages/VaccineStartHolder";
import ServicesVerified from "./Vet Offers/Services/ServicesVerified";

function VetDoctorHome() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={DashboardMain} />
          <Route path="/dashboard" exact component={DashboardMain} />
          <Route path="/profile" exact component={ProfileMain} />
          <Route path="/pets/:vetid" exact component={PetsMain} />
          <Route
            path="/consultation/:vetid"
            exact
            component={ConsultationMain}
          />
          <Route path="/services/:vetid" exact component={ServicesVerified} />
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
          <Route path="/pharmacy/:vetid" exact component={PharmacyMain} />
          <Route path="/appointments" exact component={AppointmentMain} />
        </Switch>
      </div>
    </Router>
  );
}

export default VetDoctorHome;
