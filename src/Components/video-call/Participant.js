import { IconButton } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

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


  return (
    <div>
      <div className="participant">

        <h3 className={'bottom-right'}>{participant.identity}</h3>


        <video ref={videoRef} autoPlay={true} style={{ height: '50vh' }} />
        <audio ref={audioRef} autoPlay={true} muted={true} />

        {
          isMe == true
            ? <div style={{ borderRadius: 15, backgroundColor: 'blue', color: 'white' }}><IconButton color="primary" title={mic != true ? "Mute" : "Unmute"} onClick={() => {


              const audioTrack = audioTracks[0];
              if (audioTrack.isEnabled) {
                audioTrack.disable()
              } else {
                audioTrack.enable()
              }

              console.log(audioTrack);
              setmic(!mic)
            }} >{mic == true ? <MicOffIcon /> : <MicIcon />}</IconButton> </div>
            : <></>
        }

      </div>

    </div>
  );
};

export default Participant;
