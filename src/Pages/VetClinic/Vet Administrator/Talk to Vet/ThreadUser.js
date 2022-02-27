import { Avatar } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap'

function ThreadUser(props) {

    const greyColor = {

        backgroundColor: "#F5F5F5",
        color: '#354A5F',
        height: 'auto',
        display: 'flex',
        justifyContent: 'start',
        cursor: 'pointer'

    };
    const whiteColor = {
        backgroundColor: "white",
        height: 'auto',
        display: 'flex',
        justifyContent: 'start',
        cursor: 'pointer'
    };


    const [threadTheme, setthreadTheme] = useState({
        backgroundColor: "white",
        height: 'auto',
        display: 'flex',
        justifyContent: 'start',
        cursor: 'pointer'
    })

    return (
        <div

            onClick={() => {
                alert(props.convoUser.thread_id)
            }}
            style={threadTheme}
            onMouseOver={() => {
                setthreadTheme({
                    backgroundColor: "#F5F5F5",
                    color: '#354A5F',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'start',
                    cursor: 'pointer'
                });
            }}
            onMouseLeave={() => {
                setthreadTheme({
                    backgroundColor: "white",
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'start',
                    cursor: 'pointer'
                });
            }}
        >
            <Row
                style={{
                    display: 'flex',
                    // width: '100%',
                    padding: 10,
                    height: 'auto'
                }}
            >
                <Col
                    sm={3}
                    style={{

                    }}
                >
                    <Avatar
                        src={props.convoUser.profilePicture}
                    />
                </Col>

                <Col
                    sm={9}
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center'
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            textOverflow: 'ellipsis'
                        }}
                    >{props.convoUser.name}</p>
                </Col>



            </Row>

        </div>
    )
}

export default ThreadUser