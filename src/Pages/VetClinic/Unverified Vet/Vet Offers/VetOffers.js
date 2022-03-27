import React from 'react'
import SideNavBar from '../SideNavBar'
import VetOffersContent from './VetOffersContent'

function VetOffers() {
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
                <SideNavBar active={"vet offers"} />
            </div>

            <VetOffersContent />
        </div>
    )
}

export default VetOffers