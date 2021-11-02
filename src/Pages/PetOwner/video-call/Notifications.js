import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';


import { Modal } from 'react-bootstrap';


const Notifications = () => {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>

    </>
  );
};

export default Notifications;
