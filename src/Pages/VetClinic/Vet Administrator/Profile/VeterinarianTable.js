import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FloatingLabel, Form, Row, Button, Col } from 'react-bootstrap'
import { getVeterinarian, veterinarians } from '../../../../Components/Functions/GetVetDoctors';
import { hostUrl } from '../../../../Components/Host';
import { users } from '../../../../Components/User';
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
                            window.open("/registration/veterinarian", "_blank").focus();

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
