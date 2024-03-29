import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import NavUnverifiedVet from '../../../../Components/navBarHome/NavUnverifiedVet';
import getUser from '../../../../Components/userData';
import ProfileInfo from './ProfileInfo';

function ProfileContent() {

    const [user, setuser] = useState([]);
    useEffect(async () => {
        const userData = await getUser();
        setuser(userData);

    }, []);

    return (
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
                <NavUnverifiedVet showLogo={true} showHome={true} />
            </div>
            <div style={{ height: "85%", border: "1px", padding: 5 }}>
                <div
                    style={{
                        padding: 30,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            width: "75vw",
                            height: "auto",
                        }}
                    >
                        <Row>
                            <Container
                                style={{
                                    textAlign: 'left'
                                }}
                            >
                                <h3
                                    style={{
                                        marginBottom: 0
                                    }}
                                >Profile Page</h3>
                                <p
                                    style={{
                                        color: 'grey'
                                    }}
                                >create a profile here.</p>
                            </Container>

                            {user.length != 0 ? <ProfileInfo user={user} /> : <Skeleton variant='rectangular' height={'30vh'} />}


                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileContent