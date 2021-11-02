import React from "react";
import Join from "../../Components/Join";
import AboutUs from "./AboutUs";
import FindVet from "./FindVet";
import TalkVet from "./TalkVet";
import background from "../../Images/bg.png";
import KnowPet from "./KnowPet";
import GeneralNavBar from "./GeneralNavBar";
function Landing() {
  var bg = {
    backgroundImage: `url(${background})`,
    margin: 0,
    zoom: value,
  };

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div style={bg}>
      <GeneralNavBar />
      <Join />
      <FindVet />
      <TalkVet />
      <KnowPet />
      <AboutUs />
    </div>
  );
}

export default Landing;
