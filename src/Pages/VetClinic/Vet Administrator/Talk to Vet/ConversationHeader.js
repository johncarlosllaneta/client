import { Avatar, Button } from '@mui/material'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { users } from '../../../../Components/User';
import axios from 'axios';
import { hostUrl } from '../../../../Components/Host';

function ConversationHeader(props) {
    const sendMessage = () => {
        var videoCode = Math.floor(Math.random() * 1000000000);
        var messageSent = `https://terravet-website.web.app/video%20conference/` + `${videoCode}`;

        axios.post(`${hostUrl}/talktovet/vetclinic/messages/sent`, {
            thread_id: props.petOwnerData.thread_id,
            pet_owner_id: props.petOwnerData.pet_owner_id,
            vetid: users[0].vetid,
            user: 2,
            message: messageSent,
        }).then((response) => {
            if (response.data.result == "Success") {
                props.getMessage(props.petOwnerData.thread_id);
            }
        });


    };

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: 'white',
                height: 'auto',
                padding: 10,
                borderBottom: '1px solid grey',
            }}
        >
            <Row

            >
                <Col
                    md={1}
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        margin: 0
                    }}
                >
                    <Avatar src={props.petOwnerData.profilePicture} />
                </Col>
                <Col
                    md={9}
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center'
                    }}
                >
                    <Row>
                        <h5
                            style={{
                                margin: 0,

                            }}
                        >{props.petOwnerData.name}</h5>
                    </Row>



                </Col>
                <Col
                    md={2}
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center'
                    }}
                >

                    <div>
                        <Button endIcon={<VideoCallIcon />}
                            variant="contained"
                            title='Generate Video Link'
                            onClick={() => {
                                sendMessage();
                            }}
                        >
                            Video Link
                        </Button>
                    </div>




                </Col>
            </Row>

        </div>
    )
}

export default ConversationHeader