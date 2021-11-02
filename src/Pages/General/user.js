import React, { useState, useEffect } from 'react'
import Axios from 'axios';
function user() {
    const [user, setuser] = useState([]);

    useEffect(() => {
        var token = localStorage.getItem('ajwt');
        Axios.get('http://localhost:3001/home',
            { headers: { Authorization: `Bearer ${token}` } }
        ).then((response) => {
            setuser(response.data.result[0]);
            // console.log(user);
        });


    }, [user]);
    return (user);
}

export default user
