import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { hostUrl } from '../../../../Components/Host'
import { ToastSuccessSubscribe } from '../../../../Components/Toast'

function ModalSubscription(props) {

    const updateSubscription = () => {
        axios.put(`${hostUrl}/vetclinic/subscribe/${props.user.vetid}/${props.subscriptionType}`)
            .then((response) => {
                if (response.data == 'Success') {
                    axios.get(`${hostUrl}/vet/uploads`, {
                        params: {
                            email: props.user.email,
                        },
                    }).then((response) => {
                        if (response.data.message === "Correct") {
                            // alert("logging in");
                            localStorage.setItem("ajwt", response.data.accessToken);
                            localStorage.setItem("rjwt", response.data.refreshToken);
                            localStorage.setItem("isLogin", true);
                            localStorage.setItem("role", response.data.role);
                            if (response.data.role === 2) {
                                localStorage.setItem("vetStatus", response.data.vetStatus);
                                localStorage.setItem("id", response.data.id);
                            }

                            props.handleCloseModal();
                            ToastSuccessSubscribe();
                            // refreshUser();

                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);


                        }
                    });


                }
            })
    }


    return (
        <div>



            <Modal.Header closeButton>
                <Modal.Title>Subscription Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to proceed ? </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateSubscription}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default ModalSubscription