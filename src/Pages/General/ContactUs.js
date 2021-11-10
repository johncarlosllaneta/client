import React from 'react'
import { AiFillGooglePlusSquare } from 'react-icons/ai'
import { MdCall, MdEmail } from 'react-icons/md'
import MainNavBar from '../../Components/MainNavBar'
import AboutUs from './AboutUs'
function ContactUs() {
    return (
        <div>
            <MainNavBar />

            <div
                style={{
                    height: '60vh',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1442291928580-fb5d0856a8f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundPosition: 'center',
                    width: '100%',

                }}
            >
                <div
                    style={{
                        width: '50%',
                        height: 'inherit',
                        paddingTop: 200,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            width: '70%',
                            height: 'auto',
                        }}
                    >
                        <p>Please call us during business hours at any contact details, and a member of our staff would be pleased to assist you. Your time is valuable to us , and we only want the best for your pet. </p>
                        <div
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <MdEmail style={{ fontSize: '2rem' }} />
                            </div>
                            <h6
                                style={{
                                    display: 'inline'
                                }}
                            >Terravet@gmail.com</h6>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        >
                            <div
                                style={{
                                    display: 'inline',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <MdCall style={{ fontSize: '2rem' }} />
                            </div>
                            <h6
                                style={{
                                    display: 'inline'
                                }}
                            >09569462077</h6>
                        </div>

                    </div>

                </div>

            </div>

            <AboutUs />
        </div>
    )
}

export default ContactUs
