import { Button, Skeleton } from '@mui/material';
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
                    {user.length != 0 ? <VetOffersHandler user={user} /> : <Skeleton variant='rectangular' height={'30vh'} />}
                </div>
            </div>
        </div>
    )
}

export default VetOffersContent