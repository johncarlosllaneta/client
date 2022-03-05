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
            <ConversationHeader petOwnerData={props.petOwnerData} getMessage={props.getMessage} />
            <Feed messages={props.messages} />
            <Send petOwnerData={props.petOwnerData} getMessage={props.getMessage} />
        </div>
    )
}

export default Conversation