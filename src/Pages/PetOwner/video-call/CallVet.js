import React, { useState, useContext, useEffect } from 'react';
import { TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


import { Button } from 'react-bootstrap';
import axios from 'axios';
import { hostUrl } from '../../../Components/Host';

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

const CallVet = (props, { children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();

    useEffect(() => {

        // alert(props.callerID);
        // alert(props.vetid)
        // setName(props.user);
        // alert(props.user);
        setName(`${props.user}`);
        // axios.put(`${hostUrl}/vetclinic/isOnline/${props.vetid}`, {
        //     callerId: me,
        // })
    }, [])
    return (
        <>
            <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => { callUser(props.callerID); }} >
                Call
            </Button>
            {children}
        </>
    );
};

export default CallVet;