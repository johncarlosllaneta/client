import { IconButton } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const Participant = ({ participant, isMe }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);
  const [mic, setmic] = useState(false)
  const [video, setvideo] = useState(false)


  return (
    <div>
      <div className="participant">

        <h3 className={'bottom-right'}>{participant.identity}</h3>


        <video ref={videoRef} autoPlay={true} style={{ height: '50vh' }} />
        <audio ref={audioRef} autoPlay={true} muted={false} />

        <div style={{ display: 'inline', width: 100 }}>
          {
            isMe == true
              ? <div ><IconButton color="primary" title={mic != true ? "Mute" : "Unmute"} style={{ borderRadius: 15, backgroundColor: 'blue', color: 'white', marginRight: 75 }} onClick={() => {
                const audioTrack = audioTracks[0];
                if (audioTrack.isEnabled) {

                  audioTrack.disable()
                } else {
                  audioTrack.enable()
                }
                setmic(!mic)
              }} >{mic == true ? <MicOffIcon /> : <MicIcon />}</IconButton> </div>
              : <></>
          }


          {
            isMe == true
              ? <div ><IconButton style={{ borderRadius: 15, backgroundColor: 'blue', color: 'white' }} color="primary" title={mic != true ? "Mute" : "Unmute"} onClick={() => {
                const videoTrack = videoTracks[0];
                if (videoTrack.isEnabled) {

                  videoTrack.disable()
                } else {
                  videoTrack.enable()
                }
                setvideo(!video)
              }} >{video == true ? <VideocamOffIcon /> : <VideocamIcon />}</IconButton> </div>
              : <></>
          }
        </div>
      </div>

    </div>
  );
};

export default Participant;
