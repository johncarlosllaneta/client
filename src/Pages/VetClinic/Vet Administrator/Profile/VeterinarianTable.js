import { Skeleton, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FloatingLabel, Form, Row, Col, Offcanvas } from 'react-bootstrap'
import { getVeterinarian, veterinarians } from '../../../../Components/Functions/GetVetDoctors';
import { hostUrl } from '../../../../Components/Host';
import { users } from '../../../../Components/User';
import VeterinarianRegistration from './Registration/Veterinarian/VeterinarianRegistration';
import VeterinarianProfile from './VeterinarianProfile'

function VeterinarianTable(props) {

    const [searchItem, setsearchItem] = useState('');
    const [veterinarian, setveterinarian] = useState([]);

    useEffect(() => {
        axios.get(
            `${hostUrl}/vetclinic/get/veterinarian/${props.user.vetid}`
        ).then((response) => {
            setveterinarian(response.data);

        });

    }, []);


    const [showVeterinarianRegistration, setShowVeterinarianRegistration] = useState(false);

    const handleClose = () => setShowVeterinarianRegistration(false);
    const handleShow = () => setShowVeterinarianRegistration(true);

    return (
        <div>

            <Offcanvas show={showVeterinarianRegistration} onHide={handleClose} placement={'end'} key={1} backdrop={false}>
                <Offcanvas.Header >
                    <Offcanvas.Title>Register Veterinarian</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <VeterinarianRegistration handleClose={handleClose} vetid={props.user.vetid} />
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
                        variant="contained"
                        onClick={() => {
                            // window.open("/registration/veterinarian", "_blank").focus();
                            handleShow();

                        }}
                        style={{
                            marginLeft: 10
                        }}
                    >
                        Register Veterinarian
                    </Button>
                </div>

            </Row>

            <Row
                style={{
                    marginTop: 20,
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto auto',
                    gridGap: 10,
                    padding: 10

                    // justifyContent: 'start'

                }}
            >


                {
                    veterinarian.filter((val) => {
                        if (searchItem == "") {
                            return val;
                        } else if (val.vet_doc_fname.toLowerCase().includes(searchItem.toLowerCase()) || val.vet_doc_lname.toLowerCase().includes(searchItem.toLowerCase())) {
                            return val;
                        }
                    }).map((item) => {
                        return (
                            <div
                                style={{
                                    gridRow: '1/1'
                                }}
                            >
                                <VeterinarianProfile user={item} />
                            </div>
                        )
                    })

                }

            </Row>
        </div>
    )
}

export default VeterinarianTable
