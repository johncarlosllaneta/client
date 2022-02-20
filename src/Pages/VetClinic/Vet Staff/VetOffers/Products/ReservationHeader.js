import { Button } from '@mui/material';
import React from 'react';

function ReservationHeader(props) {
    return <div
        style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '2vh'
        }}
    >
        <div>

            <h3>Reservations</h3>
        </div>
        <div
            style={{
                display: 'flex',

                alignItems: 'center'
            }}
        >
            <Button
                onClick={props.changeShowProducts}
                style={{
                    padding: 10
                }}
            >
                Return to products
            </Button>

        </div>


    </div>;
}

export default ReservationHeader;
