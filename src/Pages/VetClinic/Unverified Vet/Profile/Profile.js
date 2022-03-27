import React from 'react'
import SideNavBar from '../SideNavBar'
import ProfileContent from './ProfileContent'

function Profile() {
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
                <SideNavBar active={"profile"} />
            </div>

            <ProfileContent />
        </div>
    )
}

export default Profile