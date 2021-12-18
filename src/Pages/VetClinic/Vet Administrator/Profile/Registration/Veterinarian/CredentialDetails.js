import React, { useState, useEffect } from 'react'
import { Button, Card, Container, Image, Row, Col, FloatingLabel, Form, Alert, Modal, Spinner } from 'react-bootstrap'
import logo from "../../../../../../Images/logo.png";
import "../../../../../../css/RegistrationVet.css";
import { RiDownload2Fill } from 'react-icons/ri';
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../../../../../Components/Host";
import { apps } from "../../../../../../Components/base";

function CredentialDetails(props) {

    const [users, setusers] = useState([]);
    let user = [];
    useEffect(() => {

        var token = localStorage.getItem("ajwt");
        Axios.get(`${hostUrl}/home`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                user = response.data.result[0];
                setusers(response.data.result[0])
            });


    }, []);

    const [fname, setfname] = useState();
    const [mname, setmname] = useState();
    const [lname, setlname] = useState();
    const [gender, setgender] = useState();
    const [contactNumber, setcontactNumber] = useState();
    const [digitalSignature, setdigitalSignature] = useState();
    const [validphoneNumber, setvalidphoneNumber] = useState([]);
    const [counterphoneNumber, setcounterphoneNumber] = useState(0);
    const [phoneNumberControllerNessage, setphoneNumberControllerNessage] = useState(true);
    const [eSignatureControllerNessage, seteSignatureControllerNessage] = useState(true);
    const [validated, setValidated] = useState(false);
    let phoneNumber = '';
    let eSignature = '';
    let eSignatureLink = '';

    useEffect(() => {
        if (counterphoneNumber < 5) {
            Axios.get(`${hostUrl}/phone_number`).then((response) => {
                setvalidphoneNumber(response.data);
            });
        }

        setcounterphoneNumber(counterphoneNumber + 1);
        console.log(validphoneNumber);
    }, [validphoneNumber]);

    function phoneNumberExists() {
        return validphoneNumber.some(function (el) {
            return el.phone_number === phoneNumber;
        });
    }

    function handleFinishRegistration(e) {

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            handleShowOnLoading();
            uploadImage(digitalSignature);
            setTimeout(() => {
                Axios.post(`${hostUrl}/register/veterinarian`, {
                    vetid: users.vetid,
                    email: props.email,
                    password: props.password,
                    fName: fname,
                    lName: lname,
                    mName: mname,
                    gender: gender,
                    contactNumber: contactNumber,
                    eSignature: eSignatureLink
                }).then((response) => {
                    if (response.data == 'Successfully Registered') {
                        handleCloseOnLoading();
                        handleShow();
                        setTimeout(() => {
                            handleClose();
                        }, 5000);
                        window.close();
                    } else {

                    }
                })

            }, 10000);




        }

        setValidated(true);
    }


    const [imageUploadedUrl, setimageUploadedUrl] = useState();
    const uploadImage = async (e) => {
        const storageRef = apps.storage().ref();
        const filRef = storageRef.child(e.name);
        await filRef.put(e);
        eSignatureLink = await filRef.getDownloadURL();
        // alert(eSignatureLink)
    };

    //Modal Finish Registration
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //Modal On loading Registration
    const [showOnLoading, setShowOnLoading] = useState(false);

    const handleCloseOnLoading = () => setShowOnLoading(false);
    const handleShowOnLoading = () => setShowOnLoading(true);

    return (
        <div>

            {/* //Modal Finish Registration */}
            <Modal show={show} onHide={handleClose} centered>

                <Modal.Body>
                    <Row>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Spinner animation="border" role="status" variant='primary'>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Container>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <h6> Successfully Register !</h6>
                        </Container>
                    </Row>
                </Modal.Body>

            </Modal>


            {/* //Modal On Loading Registration */}
            <Modal show={showOnLoading} onHide={handleCloseOnLoading} centered>

                <Modal.Body>
                    <Row>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Spinner animation="border" role="status" variant='primary'>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Container>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <h6> Registering Please Wait ! </h6>
                        </Container>
                    </Row>
                </Modal.Body>

            </Modal>

            <Image
                src={logo}
                style={{
                    height: 50,
                }}
            />

            <h6
                style={{
                    textAlign: "center",
                    fontSize: 25,
                    color: "#0A94A4",
                    fontWeight: "bold",
                }}
            >
                TERRAVET
            </h6>

            <Container
                style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    minWidth: 350,
                    maxWidth: "60%",
                    width: 600,
                    height: 'auto',
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: 30,
                    padding: 10,
                    marginBottom: 10
                }}
            >
                <Row>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleFinishRegistration}
                    >
                        <div
                            style={
                                {
                                    width: '100%'
                                }
                            }
                        >
                            <Container
                                style={{
                                    display: "block",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >

                                <h1
                                    style={{
                                        textAlign: "center",
                                        fontSizeAdjust: 50,
                                        color: "#0A94A4",
                                        fontWeight: "bold",
                                        fontOpticalSizing: "auto",
                                    }}
                                >
                                    Veterinarian's Credentials
                                </h1>


                                <Row>
                                    <Form.Group
                                        style={{
                                            textAlign: "left",
                                        }}
                                    >
                                        <FloatingLabel
                                            controlId="floatingInputPassword"
                                            label="First Name"
                                            className="mb-3"

                                        >
                                            <Form.Control
                                                style={{ height: 50, backgroundColor: "white" }}
                                                type="text"
                                                placeholder="firstName"
                                                pattern="[a-zA-Z ]*$"
                                                title="Must contain alphabets only"
                                                required
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setfname(e.target.value);
                                                    setValidated(true);


                                                }}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid first name.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group
                                        style={{
                                            textAlign: "left",
                                        }}
                                    >
                                        <FloatingLabel
                                            controlId="floatingInputPassword"
                                            label="Middle Name"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                style={{ height: 50, backgroundColor: "white" }}
                                                type="text"
                                                placeholder="middleName"
                                                pattern="[a-zA-Z ]*$"
                                                title="Must contain alphabets only"
                                                required
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setmname(e.target.value);

                                                }}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid middle name.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group
                                        style={{
                                            textAlign: "left",
                                        }}
                                    >
                                        <FloatingLabel
                                            controlId="floatingInputPassword"
                                            label="Last Name"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                style={{ height: 50, backgroundColor: "white" }}
                                                type="text"
                                                placeholder="lastName"
                                                pattern="[a-zA-Z ]*$"
                                                title="Must contain alphabets only"
                                                required
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setlname(e.target.value);

                                                }}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid last name.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>



                                    <Form.Group
                                        style={{
                                            textAlign: "left",
                                        }}
                                    >
                                        <FloatingLabel controlId="floatingSelect" label="Gender" className="mb-3">
                                            <Form.Select
                                                required
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setgender(e.target.value);
                                                }}
                                                aria-label="Floating label select example">
                                                <option></option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>




                                    <Form.Group
                                        style={{
                                            textAlign: "left",
                                        }}
                                    >
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
                                    </Form.Group>



                                    <Form.Group
                                        style={{
                                            textAlign: "left",
                                        }}
                                    >
                                        <Form.Label>Digital Signature</Form.Label>
                                        <Form.Control type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                            datatype="image/png, image/gif, image/jpeg"
                                            title='This field only accepts image file format such as jpeg, jpg, and png file format.'
                                            size='sm'
                                            onChange={(e) => {
                                                setdigitalSignature(e.target.files[0]);


                                                // console.log(e.target.value.slice((Math.max(0, e.target.value.lastIndexOf(".")) || Infinity) + 1));
                                                eSignature = e.target.value.slice((Math.max(0, e.target.value.lastIndexOf(".")) || Infinity) + 1).toString();

                                                if (eSignature.toString() == 'jpg' || eSignature.toString() == 'jpeg' || eSignature.toString() == 'png' || eSignature.toString() == 'gif') {
                                                    // alert(eSignature + ' valid');
                                                    seteSignatureControllerNessage(true);
                                                } else {
                                                    // alert(eSignature + ' Invalid');
                                                    seteSignatureControllerNessage(false);
                                                }
                                            }}
                                        />
                                        <Form.Text id="signatureHelpBlock" muted>
                                            This field only accepts image file format such as jpeg, jpg, and png file format.
                                        </Form.Text>

                                        <Form.Text
                                            id="passwordHelpBlock"
                                            hidden={eSignatureControllerNessage}
                                            style={{
                                                color: "red",
                                            }}
                                        >
                                            Invalid file format.
                                        </Form.Text>
                                    </Form.Group>


                                </Row>


                            </Container>
                            <Row
                                style={{
                                    padding: 20,
                                }}
                            >



                                <Col>
                                    <Button
                                        style={
                                            {
                                                width: '100%'
                                            }
                                        }
                                        type='submit'
                                    >
                                        Finish
                                    </Button>
                                </Col>



                            </Row>
                        </div>

                    </Form>
                </Row>
            </Container>
        </div>
    )
}

export default CredentialDetails
