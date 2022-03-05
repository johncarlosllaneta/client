import { Avatar, Button } from '@mui/material'
import React from 'react'
import { Row, Col } from 'react-bootstrap'



function ConversationHeader(props) {


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
                    <Avatar src={props.vetClinicData.vet_picture} />
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
                        >{props.vetClinicData.vet_name}</h5>
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

                    {/* <div>
                        <Button endIcon={<VideoCallIcon />}
                            variant="contained"
                            title='Generate Video Link'
                            onClick={() => {
                                sendMessage();
                            }}
                        >
                            Video Link
                        </Button>
                    </div> */}




                </Col>
            </Row>

        </div>
    )
}

export default ConversationHeader