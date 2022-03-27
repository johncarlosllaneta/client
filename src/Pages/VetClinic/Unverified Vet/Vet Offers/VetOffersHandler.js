import React, { useState } from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import Retail from "../../../../Images/PetOwner/Retail.png";
import Pharmacy from "../../../../Images/PetOwner/Pharmacy.png";
import Consultation from "../../../../Images/PetOwner/Consultation.png";

function VetOffersHandler() {

    const [products, setproducts] = useState('none');
    const [pharmacy, setpharmacy] = useState('none');
    const [services, setservices] = useState('none');

    const [productsController, setproductsController] = useState();
    const [pharmacyController, setpharmacyController] = useState();
    const [servicesController, setservicesController] = useState();

    const [productEnable, setproductEnable] = useState(true);
    const [pharmacyEnable, setpharmacyEnable] = useState(true);
    const [servicesEnable, setservicesEnable] = useState(true);

    const [servicesHolder, setservicesHolder] = useState(true);
    const [petExam, setpetExam] = useState(true);
    const [preventive, setpreventive] = useState(true);
    const [petGrooming, setpetGrooming] = useState(true);
    const [vaccination, setvaccination] = useState(true);
    const [virtualConsultation, setvirtualConsultation] = useState(true);
    const [physicalConsultation, setphysicalConsultation] = useState(true);


    return (
        <div>
            <Row>
                <Col>
                    <div
                        hidden={productEnable}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'

                        }}
                    >
                        <h6>Enable Products</h6>
                        <Form.Switch

                            type='switch'

                        />
                    </div>
                    <Container
                        onMouseOver={() => {
                            setproducts('3px solid #3BD2E3');
                        }}
                        onMouseLeave={() => {
                            setproducts('none');
                        }}

                        onClick={() => {
                            setproductEnable(!productEnable);
                        }}
                        style={{
                            boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            padding: 70,
                            cursor: 'pointer',
                            border: products

                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 30
                            }}
                        >
                            <Image src={Retail} height='100vh' />
                        </div>
                        <h3>Products</h3>
                    </Container>
                </Col>

                <Col>
                    <div
                        hidden={pharmacyEnable}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'

                        }}
                    >
                        <h6>Enable Pharmacy</h6>
                        <Form.Switch

                            type='switch'

                        />
                    </div>
                    <Container

                        onMouseOver={() => {
                            setpharmacy('3px solid #3BD2E3');
                        }}
                        onMouseLeave={() => {
                            setpharmacy('none');
                        }}
                        onClick={() => {
                            setpharmacyEnable(!pharmacyEnable);
                        }}

                        style={{
                            boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            padding: 70,
                            cursor: 'pointer',
                            border: pharmacy

                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 30
                            }}
                        >
                            <Image src={Pharmacy} height='100vh' />
                        </div>
                        <h3>Pharmacy</h3>
                    </Container>
                </Col>

                <Col>
                    <div
                        hidden={servicesEnable}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'

                        }}
                    >
                        <h6>Enable Services</h6>
                        <Form.Switch
                            onChange={(e) => {

                                setservicesController(e.target.checked);
                                if (e.target.checked == true) {
                                    setservicesHolder(false);
                                } else {
                                    setservicesHolder(true);
                                }

                            }}
                            type='switch'

                        />

                    </div>

                    <Container

                        onMouseOver={() => {
                            setservices('3px solid #3BD2E3');
                        }}
                        onMouseLeave={() => {
                            setservices('none');
                        }}
                        onClick={() => {
                            setservicesEnable(!servicesEnable);
                        }}
                        style={{
                            boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            padding: 70,
                            cursor: 'pointer',
                            border: services

                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: 30
                            }}
                        >
                            <Image src={Consultation} height='100vh' />
                        </div>
                        <h3>Services</h3>
                    </Container>
                    <div
                        hidden={servicesHolder}
                        style={{
                            boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            padding: 20
                        }}
                    >
                        <h5>Service Category</h5>
                        {/* Services category */}

                        <div
                            hidden={servicesHolder}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}
                        >
                            <h6>Enable Physical Consultation</h6>
                            <Form.Switch

                                type='switch'

                            />
                        </div>

                        <div
                            hidden={servicesHolder}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}
                        >
                            <h6>Enable Virtual Consultation</h6>
                            <Form.Switch

                                type='switch'

                            />
                        </div>

                        <div
                            hidden={servicesHolder}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}
                        >
                            <h6>Enable Vaccination</h6>
                            <Form.Switch

                                type='switch'

                            />
                        </div>

                        <div
                            hidden={servicesHolder}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}
                        >
                            <h6>Enable Preventive Controls</h6>
                            <Form.Switch

                                type='switch'

                            />
                        </div>

                        <div
                            hidden={servicesHolder}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}
                        >
                            <h6>Enable Pet Examination</h6>
                            <Form.Switch

                                type='switch'

                            />
                        </div>

                        <div
                            hidden={servicesHolder}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}
                        >
                            <h6>Enable Pet Grooming</h6>
                            <Form.Switch

                                type='switch'

                            />
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default VetOffersHandler