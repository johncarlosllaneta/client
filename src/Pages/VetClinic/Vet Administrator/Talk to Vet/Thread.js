import axios from 'axios';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { hostUrl } from '../../../../Components/Host';
import NavBarVet from '../NavBarVet'
import Conversation from './Conversation';
import ThreadList from './ThreadList'

function Thread() {

    const [conversationID, setconversationID] = useState();
    const [petOwnerData, setpetOwnerData] = useState([]);
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
                <ThreadList setconversationID={setconversationID} setpetOwnerData={setpetOwnerData} getMessage={getMessage} />
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
                    <Conversation petOwnerData={petOwnerData} messages={messages} getMessage={getMessage} />
                }

            </div>

        </div>
    )
}

export default Thread