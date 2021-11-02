import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';


import { Button, Col, Container, Row } from 'react-bootstrap';

import { MdCallEnd, MdVideocam, MdVideocamOff } from 'react-icons/md';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import Avatar from 'react-avatar';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },

  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = (props) => {

  const classes = useStyles();

  const [videoChecker, setvideoChecker] = useState(true);


  // console.log(callEnded);
  // console.log(connectionRef.current);
  return (
    <>

    </>
  );
};

export default VideoPlayer;
