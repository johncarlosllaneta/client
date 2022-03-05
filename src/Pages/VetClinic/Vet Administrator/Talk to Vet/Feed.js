import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { Container, Row, Card, Col } from 'react-bootstrap';
import ScrollableFeed from 'react-scrollable-feed'
import { users } from '../../../../Components/User';

function Feed(props) {

    var layoutMessage;

    function dateConvertion(time) {
        var date = new Date(time);
        return date.toDateString();
    }

    function timeConvertion(time) {
        var date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div
            style={{
                height: '83vh',
                width: '100%',
                overflow: 'hidden',
                margin: 0
                // padding: 40

            }}
        >
            {props.messages != [] ?



                <ScrollableFeed

                >
                    {props.messages.map((val) => {
                        let messagefloat = "";
                        let messageImgs = "";

                        if (val.user_message === 1) {
                            messagefloat = "left";
                            messageImgs = val.profilePicture;

                            layoutMessage = (
                                <div>

                                    <div
                                        style={{

                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0
                                            }}
                                        >
                                            {dateConvertion(val.created_time_date)}
                                        </p>
                                    </div>
                                    <Row
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        <Col sm={1}>
                                            <div
                                                style={{
                                                    paddingLeft: 10,
                                                }}
                                            >
                                                <Avatar
                                                    src={messageImgs}
                                                    name={val.name}
                                                    size={30}
                                                    round
                                                />
                                            </div>
                                        </Col>

                                        <Col>
                                            <Row
                                                style={{
                                                    textAlign: 'left'
                                                }}
                                            >
                                                <Card
                                                    style={{
                                                        backgroundColor: "white",
                                                        textAlign: "left",
                                                        width: 'auto',
                                                        maxWidth: 500,
                                                        float: "left",
                                                        padding: 10,
                                                        borderTopRightRadius: 30,
                                                        borderBottomLeftRadius: 30,
                                                        borderBottomRightRadius: 30,
                                                        display: 'flex',
                                                        justifyContent: 'start',
                                                        alignItems: 'center'
                                                    }}
                                                >

                                                    <p
                                                        style={{
                                                            margin: 0
                                                        }}
                                                    >{val.message_content}</p>

                                                </Card>
                                                <p
                                                    style={{
                                                        fontSize: 12
                                                    }}
                                                >
                                                    {timeConvertion(val.created_time_date)}
                                                </p>
                                            </Row>
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>

                                </div>
                            );
                        } else {
                            messagefloat = "right";
                            messageImgs = val.vet_picture;
                            layoutMessage = (
                                <div>

                                    <div
                                        style={{

                                            width: '100%',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0
                                            }}
                                        >
                                            {dateConvertion(val.created_time_date)}
                                        </p>
                                    </div>

                                    <Row
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        <Col>
                                            <Row
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'end',

                                                    textAlign: 'right'



                                                }}
                                            >
                                                <Card
                                                    style={{
                                                        backgroundColor: "white",
                                                        textAlign: "right",
                                                        width: 'auto',
                                                        maxWidth: 500,
                                                        padding: 10,
                                                        borderTopLeftRadius: 30,
                                                        borderBottomLeftRadius: 30,
                                                        borderBottomRightRadius: 30,
                                                        display: 'flex',
                                                        justifyContent: 'end',
                                                        alignItems: 'center'
                                                    }}
                                                >

                                                    {String(val.message_content).includes('http')
                                                        ? <p>Virtual Consultation with {users[0].vet_name} <br />   <a href={val.message_content} target="_blank" title={val.message_content}> Click to enter video call</a> </p>
                                                        :
                                                        <p
                                                            style={{
                                                                margin: 0
                                                            }}
                                                        >{val.message_content}</p>
                                                    }


                                                </Card>
                                                <p
                                                    style={{
                                                        fontSize: 12
                                                    }}
                                                >
                                                    {timeConvertion(
                                                        val.created_time_date
                                                    )}
                                                </p>
                                            </Row>
                                        </Col>

                                        <Col sm={1}>
                                            <div
                                                style={{
                                                    paddingRight: 30,
                                                }}
                                            >
                                                <Avatar
                                                    src={messageImgs}
                                                    name={val.vet_name}
                                                    size={30}
                                                    round
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                            );
                        }

                        return <div>{layoutMessage}</div>;

                    }
                    )}
                </ScrollableFeed>





                :
                <p>Send message to other pet owner.</p>}

        </div >
    )
}

export default Feed