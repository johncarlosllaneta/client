import React, { useEffect, useState } from "react";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProfileContent from "./ProfileContent";
import VerifyContent from "./VerifyContent";
import HomeTabContent from "./HomeTabContent";
import profileContentVerified from "./profileContentVerified";
import PetsVerified from "./PetsVerified";
import appointmentVerified from "./appointmentVerified";
import VisitorMonitoringVerified from "./VisitorMonitoringVerified";
import PharmacyVerified from "./PharmacyVerified";
import ProductVerified from "./ProductVerified";
import ServicesVerified from "./ServicesVerified";
import ConsultStartHolder from "./ServicePages/ConsultStartHolder";
import TalkToPetOwner from "./TalkToPetOwner";
import VetSettings from "./VetSettings";
import VideoChat from "../PetOwner/VideoChat";
import PetExamStartHolder from "./ServicePages/PetExamStartHolder";
import PetGroomStartHolder from "./ServicePages/PetGroomStartHolder";
import PreControlStartHolder from "./ServicePages/PreControlStartHolder";
import VaccineStartHolder from "./ServicePages/VaccineStartHolder";
import Calling from "../../Components/video-call/Calling";
// import VideoCall from "../../Components/videoChat/VideoCall";

const VetHome = () => {
  var vetContent;
  const [vetStatus, setVetStatus] = useState("");
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

  useEffect(() => {
    const vetClinicStatus = localStorage.getItem("vetStatus");
    setVetStatus(vetClinicStatus);
  }, [vetStatus]);

  if (vetStatus !== "Verified") {
    // Not Verified
    vetContent = (
      <div>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/profile" exact component={ProfileContent} />
              <Route path="/verification" exact component={VerifyContent} />
              <Route path="/vet/settings" exact component={VetSettings} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  } else {
    // Verified
    vetContent = (
      <div>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={HomeTabContent} />
              <Route path="/dashboard" exact component={HomeTabContent} />
              <Route path="/profile" exact component={profileContentVerified} />
              <Route path="/pets/:vetid" exact component={PetsVerified} />
              <Route
                path="/appointments/:vetid"
                exact
                component={appointmentVerified}
              />
              <Route
                path="/visitor&monitoring/:vetid"
                exact
                component={VisitorMonitoringVerified}
              />
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
                path="/services/preventive&control/:vetid"
                exact
                component={PreControlStartHolder}
              />
              <Route
                path="/services/vaccination/:vetid"
                exact
                component={VaccineStartHolder}
              />
              <Route
                path="/services/in&house&laboratory/:vetid"
                exact
                component={ServicesVerified}
              />
              <Route path="/talk to vet" exact component={TalkToPetOwner} />
              <Route path="/vet/settings" exact component={VetSettings} />
              <Route path="/video conference/:name" exact component={Calling} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
  return (
    // <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'repeat' }}>
    <div
      style={{
        height: "auto",
      }}
    >
      {/* <NavBarHome /> */}
      <div>
        {vetContent}

        {/* <SideNavBar /> */}
      </div>
    </div>
  );
};

export default VetHome;
