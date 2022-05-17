import { Button } from '@mui/material';
import React from 'react';
import { messages, users } from '../../../../../Components/User';

function ProductHeader() {
    return <div
        style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            width: '100%'
        }}
    >
        <div>

            <h1>Products</h1>
        </div>


    </div>;
}

export default ProductHeader;
