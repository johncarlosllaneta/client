import React from 'react'
import { Col, Container, Row, Image } from "react-bootstrap";
import HomeTab from '../../Verified Vet/Dashboard/HomeTab';
import NavBarVet from '../../Verified Vet/NavBarVet';
import SideNavBarVetAdmin from '../SideNavBarVetAdmin';



function DashboardVetAdmin() {
    return (
        <div>
            <div
                style={{
                    width: "20%",
                    border: "1px solid transparent",
                    float: "left",
                    padding: 0,
                    margin: 0,
                }}
            >
                <SideNavBarVetAdmin active={"dashboard"} />
            </div>

            <div
                style={{
                    width: "80%",
                    border: "1px",
                    float: "left",
                    margin: 0,
                    padding: 0,
                }}
            >
                <div style={{ height: "15%", border: "1px ", padding: 0 }}>
                    {/* navbar */}
                    <NavBarVet showLogo={true} showHome={true} />
                </div>
                <div style={{ height: "85%", border: "1px", padding: 5 }}>

                    <HomeTab user={'Vet Admin'} />

                </div>
            </div>
        </div>
    )
}

export default DashboardVetAdmin
