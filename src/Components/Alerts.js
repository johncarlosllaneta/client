import React from 'react'
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Alerts = (props) => {
    return (
        <Alert key={props.idx}
            variant={props.variant} show={props.show} >
            {props.message}
        </Alert>
    )
}


export default Alerts
