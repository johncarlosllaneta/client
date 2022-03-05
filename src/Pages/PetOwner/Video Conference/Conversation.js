import React from 'react'
import ConversationHeader from './ConversationHeader'
import Feed from './Feed'
import Send from './Send'

function Conversation(props) {
    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '80%',
                position: 'relative',


            }}
        >
            <ConversationHeader vetClinicData={props.vetClinicData} getMessage={props.getMessage} />
            <Feed messages={props.messages} />
            <Send vetClinicData={props.vetClinicData} getMessage={props.getMessage} />
        </div>
    )
}

export default Conversation