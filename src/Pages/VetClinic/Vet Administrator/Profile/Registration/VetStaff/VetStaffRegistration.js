import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container, FloatingLabel, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { hostUrl } from '../../../../../../Components/Host';

function VetStaffRegistration(props) {
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [contactNumber, setcontactNumber] = useState();
    const [validated, setValidated] = useState(false);
    const [emailMessage, setemailMessage] = useState(true);



    let phoneNumber = '';
    const [validphoneNumber, setvalidphoneNumber] = useState([]);
    const [phoneNumberControllerNessage, setphoneNumberControllerNessage] = useState(true);

    const [showLoading, setShowLoading] = useState(false);

    const handleCloseLoading = () => setShowLoading(false);
    const handleShowLoading = () => setShowLoading(true);



    useEffect(() => {

        axios.get(`${hostUrl}/phone_number`).then((response) => {
            setvalidphoneNumber(response.data);
        });



    }, []);

    function phoneNumberExists() {
        return validphoneNumber.some(function (el) {
            return el.phone_number === phoneNumber;
        });
    }


    const submitRegistration = (e) => {
        axios.post(`${hostUrl}/register/vetStaff`, {
            vetid: props.vetid,
            fName: firstName,
            lName: lastName,
            email: email,
            password: password,
            contactNumber: contactNumber,


        }).then((response) => {
            if (response.data == 'Successfully Registered') {
                axios.post(`${hostUrl}/verifyEmail/vetStaff`, {
                    email: email,
                    hostUrl: hostUrl
                }).then((response) => {
                    if (response.data == 'Success') {
                        handleCloseLoading();
                        props.handleClose();
                        window.location.reload();
                    }
                })
            }
        })
    }

    const emailCheckerExist = (e) => {


        axios.post(`${hostUrl}/emailChecker`, {
            email: email
        }).then((response) => {
            if (response.data == false) {
                submitRegistration(e);
            } else {
                setemailMessage(false);
                handleCloseLoading();
                e.preventDefault();
                e.stopPropagation();
            }
        })
    }

    const registerVeterinarian = (e) => {
        handleShowLoading();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            handleCloseLoading();
        } else {
            e.preventDefault();
            emailCheckerExist(e);
        }
        setValidated(true);
    }

    return (
        <div>
            <Modal
                show={showLoading}
                onHide={handleCloseLoading}
                backdrop="static"
                keyboard={false}
                centered
            >

                <Modal.Body>
                    <Container
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p
                            style={{
                                marginBottom: 0,
                                marginLeft: 10
                            }}
                        >Registering Vet Staff, Please wait!</p>
                    </Container>

                </Modal.Body>

            </Modal>

            <Row>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={registerVeterinarian}
                >

                    <FloatingLabel controlId="floatingEmail" label="First Name">
                        <Form.Control type="text" placeholder="firstname"

                            pattern="[a-zA-Z ]*$"
                            title="Must contain alphabets only"
                            minLength={3}
                            required
                            onChange={(e) => {
                                setfirstName(e.target.value);
                                setValidated(true);
                            }}
                        />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingEmail" label="Last Name">
                        <Form.Control type="text" placeholder="lastname"

                            pattern="[a-zA-Z ]*$"
                            title="Must contain alphabets only"
                            minLength={2}
                            required
                            onChange={(e) => {
                                setlastName(e.target.value);
                                setValidated(true);
                            }}
                        />
                    </FloatingLabel>


                    <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control type="email" placeholder="email"

                            pattern=".+@gmail\.com|.+@yahoo\.com|.+@hotmail\.com|.+@aol\.com|.+@hotmail\.co\.uk"
                            required
                            minLength={8}
                            onChange={(e) => {
                                setemail(e.target.value);
                                setValidated(true);
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback style={{
                            color: 'red'
                        }} hidden={emailMessage}>
                            Invalid email, use other email.
                        </Form.Control.Feedback>
                    </FloatingLabel>


                    <FloatingLabel
                        controlId="floatingInputPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            style={{ height: 50, backgroundColor: "white" }}
                            type="password"
                            placeholder="Password"
                            pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$"
                            title="Must contain at least one number, special
                                                character, uppercase and lowercase letter, and at least 8 or
                                                more characters."
                            required
                            onChange={(e) => {

                                setpassword(e.target.value);
                                setValidated(true);
                            }}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must contain at least one number, special
                            character, uppercase and lowercase letter, and at least 8 or
                            more characters.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInputPassword"
                        label="Phone Number"
                        className="mb-3"
                    >

                        <Form.Control
                            style={{
                                height: 50,
                                backgroundColor: "white",
                            }}
                            type="text  "
                            placeholder="09** *** ****"
                            required
                            pattern="\d{11}"
                            maxLength="11"
                            onChange={(e) => {

                                setcontactNumber(e.target.value);
                                setValidated(true);
                                phoneNumber = e.target.value;

                                if (phoneNumberExists()) {
                                    e.preventDefault();
                                    setphoneNumberControllerNessage(false);
                                } else {
                                    e.preventDefault();

                                    setphoneNumberControllerNessage(true);
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid phone number.
                        </Form.Control.Feedback>
                        <Form.Text
                            id="passwordHelpBlock"
                            hidden={phoneNumberControllerNessage}
                            style={{
                                color: "red",
                            }}
                        >
                            Invalid phone number. Please use other phone number. ex.09** *** ****
                        </Form.Text>
                    </FloatingLabel>



                    <Button
                        variant='contained'
                        onClick={
                            (e) => {
                                props.handleClose();
                            }
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </Row>
        </div>
    )
}

export default VetStaffRegistration