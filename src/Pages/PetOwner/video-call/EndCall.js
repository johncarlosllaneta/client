import React, { useState, useContext, useEffect } from 'react';
import { TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


import { Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { hostUrl } from '../../../Components/Host';
import { MdCallEnd, MdVideocamOff } from 'react-icons/md';
import { BsFillMicMuteFill } from 'react-icons/bs';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
}));

const EndCall = (props, { children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();

    // useEffect(() => {
    //     alert(callEnded);
    // }, [callEnded])

    return (
        <>
            {callAccepted && !callEnded ? (
                <div style={{ display: 'inline-block' }}>
                    <Button

                        onClick={leaveCall}
                        className={classes.margin}
                        style={{ borderRadius: '100%', borderColor: 'gray', backgroundColor: 'gray', margin: 10, padding: 10 }}
                    >
                        <MdVideocamOff style={{ fontSize: 35 }} />
                    </Button>

                    <Button

                        onClick={leaveCall}
                        className={classes.margin}
                        style={{ borderRadius: '100%', borderColor: 'gray', backgroundColor: 'gray', margin: 10, padding: 10 }}
                    >
                        <BsFillMicMuteFill style={{ fontSize: 35 }} />
                    </Button>
                    <Button

                        onClick={leaveCall}
                        className={classes.margin}
                        style={{ borderRadius: '100%', borderColor: 'red', backgroundColor: 'red', margin: 10, padding: 10 }}
                    >
                        <MdCallEnd style={{ fontSize: 35 }} />
                    </Button>
                </div>

            ) : (
                <></>
            )}
            {children}
        </>
    );
};

export default EndCall;