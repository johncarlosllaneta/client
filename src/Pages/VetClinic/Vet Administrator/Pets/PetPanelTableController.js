import React from 'react'
import SideNavBarVetAdmin from '../SideNavBarVetAdmin'
import NavBarVet from '../../Verified Vet/NavBarVet';
import PetRecord from './PetRecord';

function PetPanelTableController(props) {
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
                <SideNavBarVetAdmin active={"pets"} />
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
                    <NavBarVet />
                </div>
                <div style={{ height: "85%", border: "1px", padding: 5 }}>
                    <PetRecord />
                </div>
            </div>
        </div>
    )
}

export default PetPanelTableController
