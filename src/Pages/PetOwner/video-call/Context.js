import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

// const SocketContext = createContext();

// const socket = io("http://localhost:5000");
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [audioController, setaudioController] = useState(true);
  const [videoController, setvideoController] = useState(true);

  const [perrs, setperrs] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();



  return (
    <></>
  );
};

export { ContextProvider };
