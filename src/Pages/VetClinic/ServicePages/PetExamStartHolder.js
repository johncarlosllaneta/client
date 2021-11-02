import React from "react";
import { Container } from "react-bootstrap";

import NavBarVet from "../NavBarVet";
import SideNavbarVerified from "./../SideNavbarVerified";

import PetExamStart from "./PetExamStart";
function PetExamStartHolder() {
    var aspectratioheight = window.screen.height;
    var aspectratiowidth = window.screen.width;
    var value;
    if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
        value = "80%";
    } else {
        value = "100%";
    }


    return (
        <div style={{ zoom: value, height: '100vh' }}>
            <div>
                <SideNavbarVerified active={"services"} />
            </div>

            <div
                style={{
                    backgroundColor: "#F1F9FC",
                    height: 'auto'
                }}
            >
                <Container
                    style={{
                        padding: 0,
                    }}
                >
                    <NavBarVet />
                </Container>
                <Container>
                    <PetExamStart />
                </Container>
            </div>
        </div>
    )
}

export default PetExamStartHolder
