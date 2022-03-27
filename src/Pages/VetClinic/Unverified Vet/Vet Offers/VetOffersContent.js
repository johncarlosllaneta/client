import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import NavUnverifiedVet from '../../../../Components/navBarHome/NavUnverifiedVet';
import getUser from '../../../../Components/userData';
import VetOffersHandler from './VetOffersHandler';

function VetOffersContent() {
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
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <h3
                                        style={{
                                            marginBottom: 0
                                        }}
                                    >Vet Offers Page</h3>

                                    <Button>
                                        Update Vet Offer
                                    </Button>
                                </div>
                                <p
                                    style={{
                                        color: 'grey'
                                    }}
                                >create a service profile here.</p>
                            </Container>

                            <VetOffersHandler />


                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VetOffersContent