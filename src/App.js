import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Forget1 from "./Pages/General/Forget1";
import Forget2 from "./Pages/General/Forget2";
import Forget3 from "./Pages/General/Forget3";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Pages/General/Landing";
import TermsAndCondition from "./Pages/General/TermsAndCondition";
import axios from "axios";
import SystemAdminHome from "./Pages/SystemAdmin/SystemAdminHome";
import VetHome from "./Pages/VetClinic/VetHome";
import PetVetDetails from "./Pages/PetOwner/PetVetDetails";
import PetProdServ from "./Pages/PetOwner/PetProdServ";
import PetServDetail from "./Pages/PetOwner/PetServDetail";
import PetChat from "./Pages/PetOwner/PetChat";
import { hostUrl } from "./Components/Host";
import RegistrationVet from "./Components/RegistrationVet";
import RegistrationPetOwner from "./Components/RegistrationPetOwner";
import LoginUpdated from "./Components/LoginUpdated";
import HomeMain from "./Pages/PetOwner/HomeMain";
import PetsMain from "./Pages/PetOwner/PetsMain";
import AppointmentMain from "./Pages/PetOwner/AppointmentMain";
import MyCartMain from "./Pages/PetOwner/MyCartMain";
import ContactTracingMain from "./Pages/PetOwner/ContactTracingMain";
import FindVetMain from "./Pages/PetOwner/FindVetMain";
import PetDetailsInformationMain from "./Pages/PetOwner/PetDetailsInformationMain";
import VetCategory from "./Pages/PetOwner/VetCategory";
import ShopNow from "./Pages/PetOwner/ShopNow";
import ProductShop from "./Pages/VetClinic/Verified Vet/Vet Offers/Products/ProductShop";
import Pharmacy from "./Pages/PetOwner/Pharmacy";
import PetOwnerSettings from "./Pages/PetOwner/PetOwnerSettings";
import VideoChat from "./Pages/PetOwner/VideoChat";
import AppointmentHistoryMain from "./Pages/PetOwner/AppointmentHistoryMain";
import CartHistoryMain from "./Pages/PetOwner/CartHistoryMain";
import Calling from "./Components/video-call/Calling";
import HomePage from "./Pages/PetOwner/HomePage";
import PetChatMobile from "./Pages/PetOwner/PetChatMobile";
import PetChatMessagesMobile from "./Pages/PetOwner/PetChatMessagesMobile";

import PrivacyPolicy from "./Pages/General/PrivacyPolicy";
import ContactUs from "./Pages/General/ContactUs";
import AboutUsPage from "./Pages/General/AboutUsPage";
import VetAdminHome from "./Pages/VetClinic/Vet Administrator/VetAdminHome";

function App() {
  const [isLogin, setisLogin] = useState("");
  const [role, setRole] = useState([]);
  const [token, settoken] = useState("");
  var loginContent;

  const [counter, setcounter] = useState(0);
  useEffect(() => {
    const loginState = localStorage.getItem("isLogin");
    setisLogin(loginState);
    const roleuser = parseInt(localStorage.getItem("role"));
    setRole(roleuser);
    settoken(sessionStorage.getItem("ajwt"));
    if (counter < 5) {
      axios
        .get(`${hostUrl}/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setRole(res.data.result[0].password);
        })
        .catch((error) => { });
      setcounter(counter + 1);
    }
  }, []);

  //islogin
  if (role === 1) {
    loginContent = (
      <Switch>
        {/* <Route path="/" exact component={HomeMain} />
        <Route path="/home" exact component={HomeMain} /> */}
        <Route path="/" exact component={HomeMain} />

        <Route path="/pets" exact component={PetsMain} />
        <Route
          path="/pets/:pet_id"
          exact
          component={PetDetailsInformationMain}
        />
        <Route path="/appointment" exact component={AppointmentMain} />
        <Route path="/my&cart" exact component={MyCartMain} />
        <Route path="/my&cart/history" exact component={CartHistoryMain} />
        <Route path="/contact&tracing" exact component={ContactTracingMain} />

        <Route path="/petOwner/Appointment" exact component={FindVetMain} />

        <Route
          path="/petOwner/Appointment/History"
          exact
          component={AppointmentHistoryMain}
        />

        <Route path="/pet owner/Show Now" exact component={FindVetMain} />
        <Route
          path="/petOwner/Appointment/vetdetails/:vetid"
          exact
          children={<PetVetDetails />}
        />

        <Route
          path="/petOwner/Appointment/vetdetails/category/:vetid"
          exact
          children={<VetCategory />}
        />
        <Route
          path="/pet owner/reservation/products/:vetid"
          exact
          children={<ProductShop />}
        />

        <Route
          path="/pet owner/pharmacy/:vetid"
          exact
          children={<Pharmacy />}
        />

        <Route
          path="/petOwner/Appointment/vetdetails/service/:vetid"
          exact
          children={<PetProdServ />}
        />

        <Route
          path="/petOwner/Appointment/vetdetails/service/servicedetail/:serviceid"
          exact
          children={<PetServDetail />}
        />
        <Route path="/petOwner/talkVet" exact children={<PetChat />} />
        <Route path="/petOwner/talkVet/threads" exact children={<PetChatMobile />} />
        <Route path="/petOwner/talkVet/threads/messages" exact children={<PetChatMessagesMobile />} />

        <Route path="/video conference/:name" exact children={<Calling />} />
        <Route path="/petOwner/talkVet" exact children={<PetChat />} />

        <Route
          path="/petOwner/settings"
          exact
          children={<PetOwnerSettings />}
        />
      </Switch>
    );
  } else if (role === 2) {
    // loginContent = <VetHome />;
    loginContent = <VetAdminHome />;

  } else if (role === 3) {
    loginContent = <SystemAdminHome />;
  }

  return (
    <div className="App"
      style={{
        height: '100%',
        width: '100%',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <Router>
        {!isLogin ? (
          <div>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" component={LoginUpdated} />
              <Route path="/register" component={RegistrationPetOwner} />
              <Route path="/forget password" component={Forget1} />
              <Route path="/forgetCode/:phoneNumber" component={Forget2} />
              <Route path="/forgetNew/:phoneNumber" component={Forget3} />
              <Route path="/vetReg" component={RegistrationVet} />
              <Route path="/terms&condition" component={TermsAndCondition} />
              <Route
                path="/privacy policy"
                exact
                children={<PrivacyPolicy />}
              />

              <Route
                path="/about us"
                exact
                children={<AboutUsPage />}
              />
              <Route
                path="/contact us"
                exact
                children={<ContactUs />}
              />
            </Switch>
          </div>
        ) : (
          <div>{loginContent}</div>
        )}
      </Router>
    </div>
  );
}
export default App;
