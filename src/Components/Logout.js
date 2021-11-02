import React from 'react'
import { Button, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { hostUrl } from './Host';

function Logout() {

    const logoutUser = () => {
        axios.delete(`${hostUrl}/logout`,
            {
                token: sessionStorage.getItem('rjwt')
            })

        sessionStorage.clear()
        window.location.reload()
    }

    return (
        <div>
            <Button onClick={logoutUser}>Logout </Button>
        </div>
    )
}

export default Logout
