import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';


import { hostUrl } from '../../../Components/Host';
import { users } from '../../../Components/User';

function Send(props) {
    const [messageSent, setmessageSent] = useState();

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageSent != '') {
            axios.post(`${hostUrl}/talktovet/vetclinic/messages/sent`, {
                thread_id: props.vetClinicData.thread_id,
                pet_owner_id: users[0].pet_owner_id,
                vetid: props.vetClinicData.vetid,
                user: 1,
                message: messageSent,
            }).then((response) => {
                if (response.data.result == "Success") {
                    setmessageSent('');
                    props.getMessage(props.vetClinicData.thread_id);
                }
            });
        }

    };

    return (
        <div
            style={{
                height: '17%',
                width: '100%',

            }}
        >

            <Row>
                <Col
                    md={11}
                    style={{
                        paddingTop: 5,
                        paddingLeft: 50
                    }}
                >
                    <Form.Control
                        style={{
                            borderRadius: 35,
                            borderColor: 'transparent',
                            backgroundColor: '#F5F5F5',
                        }}
                        value={messageSent}
                        placeholder='Aa'
                        onChange={(e) => {
                            setmessageSent(e.target.value);

                        }}

                    >

                    </Form.Control>
                </Col>
                <Col
                    md={1}
                    style={{
                        paddingTop: 5,
                        paddingRight: 30
                    }}
                >
                    <IconButton color="primary" aria-label="video call" component="span"
                        onClick={(e) => {
                            sendMessage(e);
                            setmessageSent();
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Col>
            </Row>
        </div>
    )
}

export default Send