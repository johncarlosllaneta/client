import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavBarHome from "../../Components/navBarHome/NavBarHome";
import PetOwnerHome from "./PetOwnerHome";
import SideNavBar from "./SideNavBar";
import TabHome from "./TabHome";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import PetOwnerPets from "./PetOwnerPets";
import PetAppointment from "./PetAppointment";
import PetFindVetMain from "./PetFindVetMain";
import PetDetailsInformation from "./PetDetailsInformation";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
import HomePage from "./HomePage";
function PetDetailsInformationMain() {
  let { pet_id } = useParams();
  // alert(pet_id)
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  return (
    <div style={{

    }}>
      {/* <div>
        <SideNavBar active={"pets"} />
      </div> */}
      <NavBarHome />
      <div
        style={{
          backgroundColor: "#F1F9FC",
          height: "auto",
        }}
      >





        <Row

        >
          <Container
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: "#F1F9FC",
              height: "auto",
              marginTop: 100
            }}
          >
            <PetDetailsInformation data={pet_id} />
          </Container>
        </Row>

        <HomePage page={3} />


      </div>
    </div>
  );
}

export default PetDetailsInformationMain;
