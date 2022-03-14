import { Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { hostUrl } from '../../../../Components/Host';
import getUser from '../../../../Components/userData';
import NavBarVet from '../NavBarVet'
import Conversation from './Conversation';
import ThreadList from './ThreadList'

function Thread() {

    const [conversationID, setconversationID] = useState();
    const [petOwnerData, setpetOwnerData] = useState([]);
    const [messages, setmessages] = useState([]);
    const [user, setuser] = useState([]);
    useEffect(async () => {
        const userData = await getUser();
        setuser(userData);
        getMessage(userData.vetid);
    }, []);


    const getMessage = (id) => {
        axios.get(`${hostUrl}/talktovet/vetclinic/messages/${id}`, {

        }).then((response) => {
            setmessages(response.data);
        });
    }

    return (
        <div
            style={{
                backgroundColor: '#F5F6FA',
                height: '100vh'
            }}
        >

            <NavBarVet showMessage={true} />
            <div
                style={{
                    display: 'flex',
                    height: '100%'

                }}
            >
                {user.length != 0 ?
                    <ThreadList setconversationID={setconversationID} setpetOwnerData={setpetOwnerData} getMessage={getMessage} user={user} />
                    :
                    <div
                        style={{
                            backgroundColor: 'white',
                            width: '20%',
                            height: '100vh',
                            borderRight: '1px solid grey',

                        }}
                    >
                        <Skeleton variant='rectangular' height={'100%'} width={'100%'} />
                    </div>

                }

                {conversationID == undefined ?
                    <div
                        style={{
                            backgroundColor: 'white',
                            width: '80%',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <p>No Coversation Selected</p>
                    </div>
                    :
                    <Conversation petOwnerData={petOwnerData} messages={messages} getMessage={getMessage} user={user} />
                }

            </div>

        </div>
    )
}

export default Thread