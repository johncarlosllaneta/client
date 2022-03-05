import axios from 'axios';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { hostUrl } from '../../../Components/Host';

import NavBarAppointments from '../../../Components/navBarHome/NavBarAppointments';

import Conversation from './Conversation';
import ThreadList from './ThreadList'

function Thread() {

    const [conversationID, setconversationID] = useState();
    const [vetClinicData, setvetClinicData] = useState([]);
    const [messages, setmessages] = useState([]);

    const getMessage = (id) => {
        axios.get(`${hostUrl}/talktovet/vetclinic/messages/${id}`, {

        }).then((response) => {
            setmessages(response.data);
        });
    }

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh'
            }}
        >

            <NavBarAppointments />
            <div
                style={{
                    display: 'flex',
                    // height: '80%',
                    width: '100vw',
                }}
            >
                <ThreadList setconversationID={setconversationID} setvetClinicData={setvetClinicData} getMessage={getMessage} />
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
                    <Conversation vetClinicData={vetClinicData} messages={messages} getMessage={getMessage} />
                }

            </div>

        </div>
    )
}

export default Thread