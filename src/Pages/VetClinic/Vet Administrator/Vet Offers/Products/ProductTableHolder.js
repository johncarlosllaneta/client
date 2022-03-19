

import ProductItem from './ProductItem';
import ProductSearchBar from './ProductSearchBar';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Offcanvas, FloatingLabel, Row, Col } from 'react-bootstrap';
import UpdateProduct from './UpdateProduct';


function ProductTableHolder(props) {

    const [showUpdateProduct, setShowUpdateProduct] = useState(false);

    const handleCloseUpdateProduct = () => setShowUpdateProduct(false);
    const handleShowUpdateProduct = () => setShowUpdateProduct(true);

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
        {/* Update Products */}
        <Offcanvas show={showUpdateProduct} onHide={handleCloseUpdateProduct} placement='end' key={1}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Update Product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <UpdateProduct />

            </Offcanvas.Body>
        </Offcanvas>


        <ProductSearchBar changeShow={props.changeShow} refreshTable={props.refreshTable} products={props.products} />
        <hr />
        <Row
            style={{
                width: '100%',
                height: '60vh',
                paddingLeft: '2vh',

                paddingBottom: '2vh',
                overflowY: 'auto',

                rowGap: '5vh',
                display: 'flex',
                justifyContent: 'start',


            }}
        >
            {props.products.map((item) => {
                return (
                    <Col sm={3}><ProductItem product={item} handleShowUpdateProduct={handleShowUpdateProduct} /></Col>
                )
            })}

        </Row>

    </div>;
}

export default ProductTableHolder;
