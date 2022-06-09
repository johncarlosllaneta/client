

import ProductItem from './ProductItem';
import ProductSearchBar from './ProductSearchBar';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Offcanvas, FloatingLabel, Row, Col, Modal } from 'react-bootstrap';
import UpdateProduct from './UpdateProduct';
import ProductDescription from './ProductDescription';


function ProductTableHolder(props) {

    const [showUpdateProduct, setShowUpdateProduct] = useState(false);

    const handleCloseUpdateProduct = () => setShowUpdateProduct(false);
    const handleShowUpdateProduct = () => setShowUpdateProduct(true);

    const [search, setsearch] = useState("");

    // view details
    const [productInfo, setproductInfo] = useState([]);
    const [showProductDetails, setShowProductDetails] = useState(false);

    const handleCloseProductDetails = () => setShowProductDetails(false);
    const handleShowProductDetails = () => setShowProductDetails(true);
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


        {/* View Details */}
        <Modal show={showProductDetails} onHide={handleCloseProductDetails}>
            <ProductDescription productInfo={productInfo} />
        </Modal>


        {/* Update Products */}
        <Offcanvas show={showUpdateProduct} onHide={handleCloseUpdateProduct} placement='end' key={1}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Update Product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <UpdateProduct />

            </Offcanvas.Body>
        </Offcanvas>


        <ProductSearchBar setsearch={setsearch} changeShow={props.changeShow} refreshTable={props.refreshTable} products={props.products} />
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
            {props.products.filter((val) => {
                if (search == "") {
                    return val;
                } else if (
                    val.product_name.toLowerCase().includes(search.toLowerCase())
                ) {
                    return val;
                }
            }).map((item) => {
                return (
                    <Col sm={3}><ProductItem product={item} handleShowUpdateProduct={handleShowUpdateProduct} setproductInfo={setproductInfo} handleShowProductDetails={handleShowProductDetails} /></Col>
                )
            })}

        </Row>

    </div>;
}

export default ProductTableHolder;
