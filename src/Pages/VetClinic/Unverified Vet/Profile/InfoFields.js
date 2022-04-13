import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import OperatingHours from './OperatingHours';
import axios from 'axios';
import { hostUrl } from '../../../../Components/Host';
import { ToastContainer } from "react-toastify";
import { ToastUpdate } from "../../../../Components/Toast";
import ProfileVetInfo from './ProfileVetInfo';

function InfoFields(props) {

    const [arrowHoursController, setarrowHoursController] = useState(true);
    const [contactNumber, setcontactNumber] = useState();
    const [addressNumber, setaddressNumber] = useState();
    const [city, setcity] = useState();
    const [validated, setvalidated] = useState(false);

    const submitCredentials = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            axios.post(`${hostUrl}/vetclinic/credentials/insert`, {
                contactNumber: contactNumber,
                address: addressNumber + " " + city,
                vetid: props.user.vetid,
                email: props.user.email
            }).then((response) => {
                if (response.data === "Success") {
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
        setvalidated(true);
    }



    return (
        <div>
            <ToastContainer />
            <div
                style={{
                    textAlign: 'left',
                    marginBottom: '3%'
                }}
            >
                <h3

                >Vet Clinic Information</h3>

            </div>

            {
                props.user.vet_contact_number != null
                    ?
                    <div>
                        <ProfileVetInfo user={props.user} />
                    </div>
                    :
                    <Row>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={submitCredentials}
                        >

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Contact Number"
                                className="mb-3"
                            >
                                <Form.Control type="text"
                                    placeholder="09** *** ****"
                                    required
                                    pattern="\d{11}"
                                    maxLength="11"
                                    style={{
                                        width: '50%'
                                    }}
                                    onChange={(e) => {
                                        setcontactNumber(e.target.value);
                                    }}
                                />
                            </FloatingLabel>

                            <Row>
                                <Col
                                    sm={8}
                                >

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Address Information"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text"
                                            placeholder='address'
                                            minLength={5}
                                            required
                                            onChange={(e) => {
                                                setaddressNumber(e.target.value);
                                            }}

                                        />
                                    </FloatingLabel>

                                </Col>

                                <Col
                                    sm={4}
                                >

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="City"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text"
                                            placeholder='address'
                                            minLength={5}
                                            required
                                            onChange={(e) => {
                                                setcity(e.target.value);
                                            }}

                                        />
                                    </FloatingLabel>

                                </Col>
                            </Row>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'start'
                                }}
                            >
                                <Button
                                    type='submit'
                                    variant='contained'
                                >
                                    Create profile
                                </Button>
                            </div>
                        </Form>
                    </Row>
            }




            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    marginTop: 10,
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    padding: 20,
                    cursor: 'pointer'
                }}

                onClick={() => {
                    setarrowHoursController(!arrowHoursController);
                }}
            >
                <h5
                    style={{
                        marginBottom: 0
                    }}
                >Operating Hours</h5>

                {arrowHoursController ? <ArrowRightIcon /> : <ArrowDropDownIcon />}


            </div>
            <div
                hidden={arrowHoursController}
                style={{
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    height: '70vh'
                }}
            >


                {/* Operating Hours insert */}

                <OperatingHours user={props.user} />
            </div>

        </div>
    )
}

export default InfoFields