import React from 'react';
import ProductReservation from './ProductReservation';
import ProductSearchBar from './ProductSearchBar';
import ReservationHeader from './ReservationHeader';

function ReservationHolder(props) {
    return <div
        style={{
            height: 'auto',
            width: '100%',
            boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            backgroundColor: "white",
        }}

    >

        <ReservationHeader changeShowProducts={props.changeShowProducts} />
        <hr style={{ marginBottom: 0, marginTop: 0 }} />
        <div
            style={{
                width: '100%',

            }}
        >
            <ProductReservation />
        </div>

    </div>;
}

export default ReservationHolder;
