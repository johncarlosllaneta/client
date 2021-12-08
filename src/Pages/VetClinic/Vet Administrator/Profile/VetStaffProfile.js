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
                        <Badge color="success" badgeContent=" "
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            title={'Active'}

                        >
                            <Avatar size={100} name={'abs'} round={true} />
                        </Badge>
                    </div>
                </div>
                <Card.Body>
                    <div>
                        <h6
                            style={{
                                marginBottom: 0
                            }}
                        >Rebecka D. Monkey</h6>
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
                            <strong>09558465788</strong>



                        </div>
                        <div
                            style={{
                                textAlign: 'left',

                                display: 'block'
                            }}
                        >

                            <strong>monkey@gmail.com</strong>


                        </div>

                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default VetStaffProfile
