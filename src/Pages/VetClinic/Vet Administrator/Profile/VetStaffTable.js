import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { FloatingLabel, Form, Row, Col, Offcanvas } from 'react-bootstrap'
import { ItemAssignmentPage } from 'twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment';
import { hostUrl } from '../../../../Components/Host';
import { users } from '../../../../Components/User';
import VetStaffRegistration from './Registration/VetStaff/VetStaffRegistration';
import VetStaffProfile from './VetStaffProfile'

function VetStaffTable(props) {

    const [searchItem, setsearchItem] = useState('');
    const [vetStaff, setvetStaff] = useState([]);
    useEffect(() => {

        axios.get(
            `${hostUrl}/vetclinic/get/vetStaff/${props.user.vetid}`
        ).then((response) => {
            setvetStaff(response.data);

        });
        setTimeout(() => {
            console.log(vetStaff);
        }, 2000);

    }, []);

    const [showVetStaffRegistration, setShowVetStaffRegistration] = useState(false);

    const handleClose = () => setShowVetStaffRegistration(false);
    const handleShow = () => setShowVetStaffRegistration(true);

    return (
        <div>

            <Offcanvas show={showVetStaffRegistration} onHide={handleClose} placement={'end'} key={1} backdrop={false}>
                <Offcanvas.Header >
                    <Offcanvas.Title>Register Vet Staff</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <VetStaffRegistration handleClose={handleClose} vetid={props.user.vetid} />
                </Offcanvas.Body>
            </Offcanvas>
            <Row

            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                        height: '5vh'
                    }}
                >
                    <div>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Search"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="search"
                                onChange={(e) => {
                                    setsearchItem(e.target.value);
                                }}
                            />
                        </FloatingLabel>
                    </div>
                    <Button
                        variant='contained'
                        onClick={() => {
                            handleShow();

                        }}
                        style={{
                            marginLeft: 10
                        }}
                    >
                        Register Vet Staff
                    </Button>
                </div>

            </Row>

            <Row
                style={{
                    marginTop: 20,
                    display: 'flex',
                    justifyContent: 'start',
                }}
            >
                {vetStaff.filter((val) => {
                    if (searchItem == "") {
                        return val;
                    } else if (val.vet_staff_fname.toLowerCase().includes(searchItem.toLowerCase()) || val.vet_staff_lname.toLowerCase().includes(searchItem.toLowerCase())) {
                        return val;
                    }
                }).map((item) => {
                    return (
                        <Col sm={3}>
                            <VetStaffProfile user={item} />
                        </Col>
                    )
                })}

            </Row>
        </div>
    )
}

export default VetStaffTable
