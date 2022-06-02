import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "../../../Components/NotFound";
import VideoChat from "../../../Components/video-call/VideoChat";
import PharmacyVerified from "../Verified Vet/Vet Offers/Pharmacy/PharmacyVerified";
import Thread from "../Vet Administrator/Talk to Vet/Thread";
import AppointmentMain from "./Appointments/AppointmentMain";
import AppointmentPage from "./Appointments/AppointmentPage";
import DashboardMain from "./Dashboard/DashboardMain";
import PetsMain from "./Pets/PetsMain";
import PetPanelTableController from "./Pets/Widgets/PetPanelTableController";
import ProfileMain from "./Profile/ProfileMain";
import VetSettings from "./Settings/VetSettings";
import ConsultationMain from "./Vet Offers/Consultation/ConsultationMain";
import PharmacyMain from "./Vet Offers/Pharmacy/PharmacyMain";
import ConsultStartHolder from "./Vet Offers/Services/ServicePages/ConsultStartHolder";
import PetExamStartHolder from "./Vet Offers/Services/ServicePages/PetExamStartHolder";
import PetGroomStartHolder from "./Vet Offers/Services/ServicePages/PetGroomStartHolder";
import PreControlStartHolder from "./Vet Offers/Services/ServicePages/PreControlStartHolder";
import SurgeryStartHolder from "./Vet Offers/Services/ServicePages/SurgeryStartHolder";
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
          <Route path="/pets" exact component={PetsMain} />
          <Route
            path="/pets/:vetid/:petid"
            exact
            component={PetPanelTableController}
          />
          <Route path="/consultation" exact component={ConsultationMain} />
          <Route path="/services" exact component={ServicesVerified} />
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
            path="/services/surgery/:vetid"
            exact
            component={SurgeryStartHolder}
          />
          <Route path="/pharmacy" exact component={PharmacyMain} />
          <Route path="/appointments" exact component={AppointmentMain} />
          <Route path="/veterinarian/settings" exact component={VetSettings} />
          <Route path="/talk to vet" exact component={Thread} />

          <Route path="/video conference/:code" exact component={VideoChat} />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default VetDoctorHome;
