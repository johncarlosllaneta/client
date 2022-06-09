import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import Retail from "../../../../Images/PetOwner/Retail.png";
import Pharmacy from "../../../../Images/PetOwner/Pharmacy.png";
import Consultation from "../../../../Images/PetOwner/Consultation.png";
import { Button } from '@mui/material';
import axios from 'axios';
import { hostUrl } from '../../../../Components/Host';
import { ToastContainer } from "react-toastify";
import { ToastUpdate } from "../../../../Components/Toast";

function VetOffersHandler(props) {

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



    // Switch controller
    const [enableProduct, setenableProduct] = useState(false);
    const [enablePharmacy, setenablePharmacy] = useState(false);
    const [enableConsultation, setenableConsultation] = useState(false)
    const [enableService, setenableService] = useState(false);
    const [enableConsultationPhysical, setenableConsultationPhysical] = useState(false);
    const [enableConsultationVirtual, setenableConsultationVirtual] = useState(false);
    const [enableExamination, setenableExamination] = useState(false);
    const [enableGrooming, setenableGrooming] = useState(false);
    const [enableVaccination, setenableVaccination] = useState(false);
    const [enablePreventiveControls, setenablePreventiveControls] = useState(false);
    const [enableSurgery, setenableSurgery] = useState(false);


    const SaveVetOffers = (e) => {
        e.preventDefault();

        if (enableService == false) {
            setenableConsultation(false);
            setenableConsultationPhysical(false);
            setenableConsultationVirtual(false);
            setenableExamination(false);
            setenableGrooming(false);
            setenableVaccination(false);
            setenablePreventiveControls(false);
            setenableSurgery(false);
        }
        axios.put(`${hostUrl}/vetclinic/offers/update/${props.user.vet_admin_id}`, {
            enableProduct: enableProduct,
            enablePharmacy: enablePharmacy,
            enableServices: enableService,
            enableConsultation: enableConsultation,
            enableExamination: enableExamination,
            enableGrooming: enableGrooming,
            enableVaccination: enableVaccination,
            enablePreventiveControls: enablePreventiveControls,
            enableSurgery: enableSurgery
            // enableConsultationPhysical: enableConsultationPhysical,
            // enableOnlineConsultation: enableConsultationVirtual,

        }).then((response) => {
            if (response.data.message === "Update Successfully") {
                axios.get(`${hostUrl}/vet/uploads`, {
                    params: {
                        email: props.user.email,
                    },
                }).then((response) => {
                    if (response.data.message === "Correct") {
                        // alert("logging in");
                        localStorage.setItem("ajwt", response.data.accessToken);
                        localStorage.setItem("rjwt", response.data.refreshToken);
                        localStorage.setItem("isLogin", true);
                        localStorage.setItem("role", response.data.role);
                        if (response.data.role === 2) {
                            localStorage.setItem("vetStatus", response.data.vetStatus);
                            localStorage.setItem("id", response.data.id);
                        }


                        ToastUpdate();
                        // refreshUser();

                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);

                    }
                });
            }
        });
    }


    useEffect(() => {
        if (props.user.enableProduct != '0' && props.user.enableProduct != null) {
            setproductEnable(false);
            setenableProduct(true);
        }

        if (props.user.enablePharmacy != '0' && props.user.enablePharmacy != null) {
            setpharmacyEnable(false);
            setenablePharmacy(true);
        }

        if (props.user.enableConsultation != '0' && props.user.enableConsultation != null) {
            setenableConsultation(true);
        }

        if (props.user.enableServices != '0' && props.user.enableServices != null) {
            setservicesEnable(false);
            setenableService(true);
            setservicesHolder(false);

        }

        if (props.user.enablePhysicalConsultation != '0' && props.user.enablePhysicalConsultation != null) {
            setenableConsultationPhysical(true);
        }

        if (props.user.enableOnlineConsultation != '0' && props.user.enableOnlineConsultation != null) {
            setenableConsultationVirtual(true);
        }

        if (props.user.enableExamination != '0' && props.user.enableExamination != null) {
            setenableExamination(true);
        }

        if (props.user.enableGrooming != '0' && props.user.enableGrooming != null) {
            setenableGrooming(true);
        }

        if (props.user.enableVaccination != '0' && props.user.enableVaccination != null) {
            setenableVaccination(true);
        }

        if (props.user.enablePreventiveControls != '0' && props.user.enablePreventiveControls != null) {
            setenablePreventiveControls(true);
        }

        if (props.user.enableInHouseLab != '0' && props.user.enableInHouseLab != null) {
            setenableSurgery(true);
        }
    }, [])



    return (
        <div
            style={{
                backgroundColor: "white",
                width: "75vw",
                height: "auto",
            }}
        >
            <ToastContainer />

            <Row>
                <Form onSubmit={SaveVetOffers}>
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

                                <Button
                                    type='submit'
                                >
                                    Update Vet Offer
                                </Button>
                            </div>
                            <p
                                style={{
                                    color: 'grey'
                                }}
                            >create a service profile here.</p>
                        </Container>

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
                                            checked={enableProduct}
                                            onChange={(e) => setenableProduct(e.target.checked)}
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
                                            checked={enablePharmacy}
                                            onChange={(e) => setenablePharmacy(e.target.checked)}
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
                                            checked={enableService}

                                            onChange={(e) => {
                                                setenableService(e.target.checked)
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
                                            if (enableService == true) {
                                                setservicesHolder(false);
                                            }
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

                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'

                                            }}
                                        >
                                            <h6>Enable Consultation</h6>
                                            <Form.Switch
                                                checked={enableConsultation}
                                                onChange={(e) => setenableConsultation(e.target.checked)}
                                                type='switch'

                                            />
                                        </div>

                                        {/* <div

                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'

                                            }}
                                        >
                                            <h6>Enable Virtual Consultation</h6>
                                            <Form.Switch
                                                checked={enableConsultationVirtual}
                                                onChange={(e) => setenableConsultationVirtual(e.target.checked)}
                                                type='switch'

                                            />
                                        </div> */}

                                        <div

                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'

                                            }}
                                        >
                                            <h6>Enable Vaccination</h6>
                                            <Form.Switch
                                                checked={enableVaccination}
                                                onChange={(e) => setenableVaccination(e.target.checked)}
                                                type='switch'

                                            />
                                        </div>

                                        <div

                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'

                                            }}
                                        >
                                            <h6>Enable Preventive Controls</h6>
                                            <Form.Switch
                                                checked={enablePreventiveControls}
                                                onChange={(e) => setenablePreventiveControls(e.target.checked)}
                                                type='switch'

                                            />
                                        </div>

                                        <div

                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'

                                            }}
                                        >
                                            <h6>Enable Pet Examination</h6>
                                            <Form.Switch
                                                checked={enableExamination}
                                                onChange={(e) => setenableExamination(e.target.checked)}
                                                type='switch'

                                            />
                                        </div>

                                        <div

                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'

                                            }}
                                        >
                                            <h6>Enable Pet Grooming</h6>
                                            <Form.Switch
                                                checked={enableGrooming}
                                                onChange={(e) => setenableGrooming(e.target.checked)}
                                                type='switch'

                                            />
                                        </div>

                                        <div

                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'

                                            }}
                                        >
                                            <h6>Enable Surgery</h6>
                                            <Form.Switch
                                                checked={enableSurgery}
                                                onChange={(e) => setenableSurgery(e.target.checked)}
                                                type='switch'

                                            />
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>


                    </Row>
                </Form>
            </Row>



        </div>












    )
}

export default VetOffersHandler