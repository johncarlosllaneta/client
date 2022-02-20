import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductItem from './ProductItem';
import ProductSearchBar from './ProductSearchBar';

function ProductTableHolder(props) {
    return <div
        style={{
            height: 'auto',
            width: '100%',
            boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            backgroundColor: "white",
            paddingBottom: '2vh'
        }}

    >

        <ProductSearchBar changeShow={props.changeShow} refreshTable={props.refreshTable} products={props.products} />
        <hr />
        <Row
            style={{
                width: '100%',
                paddingLeft: '2vh',

                paddingBottom: '2vh',
                overflowY: 'auto',
                height: '60vh',
                rowGap: '5vh',
                display: 'flex',
                justifyContent: 'start',


            }}
        >
            {props.products.map((item) => {
                return (
                    <Col><ProductItem product={item} /></Col>
                )
            })}

        </Row>

    </div>;
}

export default ProductTableHolder;
