import React from 'react'
import Avatar from 'react-avatar'
import { Card, Row } from 'react-bootstrap'
import Badge from '@mui/material/Badge';

function VetStaffProfile(props) {
    return (
        <div>
            <Card
                style={{
                    width: '15vw'
                }}
            >
                <div
                    style={{
                        paddingTop: 20
                    }}
                >


                    <div

                    >
                        <Badge color={props.user.isOnline == 0 ? 'error' : 'success'} badgeContent=" "
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            title={props.user.isOnline == 0 ? 'Offline' : 'Online'}


                        >
                            <Avatar size={100} name={props.user.vet_staff_fname} round={true}
                                src={props.user.vet_staff_profilePic}
                            />
                        </Badge>
                    </div>
                </div>
                <Card.Body>
                    <div>
                        <h6
                            style={{
                                marginBottom: 0
                            }}
                        > {props.user.vet_staff_fname + " " + String(props.user.vet_staff_mname).charAt(0) + ". " + props.user.vet_staff_fname} </h6>
                        <p
                            style={{
                                color: '#33C1D2'
                            }}
                        >Vet Staff</p>
                    </div>
                    <Card.Text>

                        <div
                            style={{
                                textAlign: 'left',

                                display: 'block'
                            }}
                        >
                            <strong>{props.user.vet_staff_contactNumber}</strong>



                        </div>
                        <div
                            style={{
                                textAlign: 'left',

                                display: 'block'
                            }}
                        >

                            <strong>{props.user.vet_staff_email}</strong>


                        </div>

                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default VetStaffProfile
