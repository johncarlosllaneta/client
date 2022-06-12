import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Row } from 'react-bootstrap';
import { threadList } from '../../../../Components/Functions/GetThreadVetAdmin'
import { hostUrl } from '../../../../Components/Host';
import ThreadUser from './ThreadUser'

function ThreadList(props) {

    const [threads, setthreads] = useState([]);
    useEffect(() => {
        axios.get(`${hostUrl}/talktovet/vetclinic/thread/${props.user.vetid}`, {

        }).then((response) => {
            console.log(response.data);
            setthreads(response.data);
        });



    }, [])

    //   Search User
    const [search, setsearch] = useState("");
    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '20%',
                height: '100vh',
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
                    onChange={(e) => {
                        setsearch(e.target.value);
                    }}
                    placeholder='Search Pet Owner'
                >

                </Form.Control>
            </Row>

            <div
                style={{
                    height: '90vh',
                    overflowY: 'auto',
                    padding: 5
                }}
            >
                {threads != 0 ?
                    threads.filter((val) => {
                        if (search === "") {
                            return val;
                        } else if (
                            val.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return val;
                        }
                    }).reverse().map((item) => {
                        return <ThreadUser convoUser={item} setconversationID={props.setconversationID} setpetOwnerData={props.setpetOwnerData} getMessage={props.getMessage} />
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