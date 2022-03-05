import React, { useEffect, useState } from 'react'
import { Form, Row } from 'react-bootstrap';
import { threadList } from '../../../Components/Functions/GetThreadPetOwner';

import ThreadUser from './ThreadUser'

function ThreadList(props) {

    const [threads, setthreads] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setthreads(threadList);
            console.log(threadList)
        }, 1000);


    }, [])


    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '20%',
                height: 'auto',
                borderRight: '1px solid grey',

            }}
        >

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    height: 'auto',
                    width: '100%',
                    padding: 10,
                    // borderBottom: '1px solid grey',
                }}
            >
                <h3
                    style={{
                        margin: 0
                    }}
                >Inbox</h3>


            </div>
            <Row
                style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    margin: 0
                }}
            >
                <Form.Control
                    style={{
                        borderRadius: 35,
                        borderColor: 'transparent',
                        backgroundColor: '#F5F5F5',
                    }}
                    placeholder='Search Vet Clinic'
                >

                </Form.Control>
            </Row>

            <div
                style={{
                    height: '80vh',
                    overflowY: 'auto',
                    padding: 5
                }}
            >
                {threadList.length >= 1 ?
                    threadList[0].map((item) => {
                        return <ThreadUser convoUser={item} setconversationID={props.setconversationID} setvetClinicData={props.setvetClinicData} getMessage={props.getMessage} />
                    }
                    )
                    : <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90%'
                        }}
                    >
                        <p>No Thread Available</p>
                    </div>
                }
            </div>

        </div>
    )
}

export default ThreadList