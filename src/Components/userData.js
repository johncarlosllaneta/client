import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { hostUrl } from './Host';

const getUser = async () => {
    var token = localStorage.getItem("ajwt");
    const data = await Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    // alert(data.data.result[0].vetid)
    return data.data.result[0];
}

export default getUser