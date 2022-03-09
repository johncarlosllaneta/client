import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { FloatingLabel, Form, Row, Button, Col } from 'react-bootstrap'
import { ItemAssignmentPage } from 'twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment';
import { hostUrl } from '../../../../Components/Host';
import { users } from '../../../../Components/User';
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


    return (
        <div>
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
                        onClick={() => {
                            window.open("/registration/vet staff", "_blank").focus();

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
                    marginTop: 20
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
                        <Col>
                            <VetStaffProfile user={item} />
                        </Col>
                    )
                })}

            </Row>
        </div>
    )
}

export default VetStaffTable
