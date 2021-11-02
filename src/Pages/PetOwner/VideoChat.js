import React from 'react'
import VideoPlayer from '../PetOwner/video-call/VideoPlayer';
import Sidebar from '../PetOwner/video-call/Sidebar';
import Notifications from '../PetOwner/video-call/Notifications';
import { ContextProvider } from '../PetOwner/video-call/Context';


function VideoChat() {
    return (
        <div>
            <ContextProvider>
                <VideoPlayer />
                <Sidebar >
                    <Notifications />
                </Sidebar>
            </ContextProvider>
        </div>
    )
}

export default VideoChat
