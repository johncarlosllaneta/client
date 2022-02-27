import React, { useState, useEffect } from 'react'
import { Button, Badge } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    Row,
    Card,
    Tabs,
    Tab,
    Container,
    Navbar,
    Col,
    NavDropdown,
} from "react-bootstrap";
import Avatar from "react-avatar";
import { IoNotificationsSharp } from "react-icons/io5";
import { hostUrl } from "../../../../Components/Host";
import Axios from "axios";
import { users } from '../../../../Components/User';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { numberOfNotification, refreshNotification } from '../../../../Components/Functions/AppointmentNotification';

function AppointmentHeader(props) {


    const [numberOfUnviewedNotif, setnumberOfUnviewedNotif] = useState(0);
    const [appointmentHistory, setappointmentHistory] = useState(true);

    const [counter, setcounter] = useState(0);
    const [notif, setnotif] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

        viewing();

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

        setTimeout(() => {
            setnumberOfUnviewedNotif(numberOfNotification);
        }, 2000);

        Axios.get(`${hostUrl}/vetclinic/notification/${users[0].vetid}`).then(
            (response) => {
                setnotif(response.data);
            }
        );


    }, []);

    function dateConvertion(date) {
        var str = date.split("-");
        var year = str[0];
        var month;
        var day = str[2];

        if (str[1] === "01") {
            month = "January";
        } else if (str[1] === "02") {
            month = "February";
        } else if (str[1] === "03") {
            month = "March";
        } else if (str[1] === "04") {
            month = "April";
        } else if (str[1] === "05") {
            month = "May";
        } else if (str[1] === "06") {
            month = "June";
        } else if (str[1] === "07") {
            month = "July";
        } else if (str[1] === "08") {
            month = "August";
        } else if (str[1] === "09") {
            month = "September";
        } else if (str[1] === "10") {
            month = "October";
        } else if (str[1] === "11") {
            month = "November";
        } else if (str[1] === "12") {
            month = "December";
        }

        return month + " " + day + ", " + year;
    }

    function timeFormatter(time) {
        var timeCurrent = time.split(":");

        if (timeCurrent[0] === "16") {
            return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "17") {
            return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "18") {
            return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "19") {
            return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "20") {
            return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "21") {
            return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "22") {
            return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "23") {
            return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "24") {
            return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "01") {
            return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "02") {
            return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "03") {
            return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
        } else if (timeCurrent[0] === "04") {
            return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "05") {
            return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "06") {
            return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "07") {
            return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "08") {
            return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "09") {
            return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "10") {
            return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "11") {
            return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "12") {
            return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "13") {
            return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "14") {
            return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        } else if (timeCurrent[0] === "15") {
            return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
        }
    }

    const notifTitle = (
        <div>
            {String(numberOfUnviewedNotif) === "0" ? (
                <Badge bg="primary" pill style={{ fontSize: 25, color: "whitesmoke" }}>
                    <IoNotificationsSharp style={{ fontSize: 30, color: "whitesmoke" }} />
                </Badge>
            ) : (
                <Badge bg="primary" pill style={{ fontSize: 25, color: "whitesmoke" }}>
                    <IoNotificationsSharp style={{ fontSize: 30, color: "whitesmoke" }} />
                    {String(numberOfUnviewedNotif)}
                </Badge>
            )}
        </div>
    );

    function viewing() {
        Axios.put(`${hostUrl}/vetclinic/notification/viewed/${users[0].vetid}`)
            .then((response) => {
                if (response.data.message == 'Correct') {
                    refreshNotification();
                }
            });

    }
    return (
        <div
            style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <div
                style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}
            >

                <h1>Appointments</h1>
                <div>
                    <Tooltip title={'Notification'}>
                        <IconButton onClick={handleClick} >
                            <Badge color="error" badgeContent={numberOfNotification} >
                                <NotificationsIcon color='#333e5a' />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </div>
                <Menu

                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

                >
                    <div style={{ height: 300, overflowY: "auto", width: 400 }}>
                        <div
                            style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            <h6

                            >
                                Notification
                            </h6>
                            <hr color='grey'
                                style={{

                                    margin: 0
                                }}
                            />
                        </div>
                        {notif.length > 0 ? (
                            notif.map((val) => {
                                return (
                                    <MenuItem style={{
                                        width: 400,
                                        //  padding: 10,
                                        // borderBottom: '0.10px solid grey'
                                    }}>
                                        <div
                                            style={{
                                                display: 'block',
                                                justifyContent: 'flex-start',
                                                width: '90%',


                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                    alignItems: 'center',
                                                    paddingTop: 10,
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    margin: 0

                                                }}
                                            >

                                                <p>
                                                    {dateConvertion(
                                                        val.date_time_created
                                                            .toString()
                                                            .split("T")[0]
                                                    )}
                                                </p>


                                                <p style={{ float: "right" }}>
                                                    {timeFormatter(
                                                        val.date_time_created
                                                            .toString()
                                                            .split("T")[1]
                                                            .substring(
                                                                0,
                                                                val.date_time_created
                                                                    .toString()
                                                                    .split("T")[1].length - 5
                                                            )
                                                    )}
                                                </p>


                                            </div>
                                            <Row>
                                                <Col
                                                    sm={2}
                                                    style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {" "}
                                                    <Avatar
                                                        round={true}
                                                        size={50}
                                                        src={val.profilePicture}
                                                        name={val.name}
                                                    />
                                                </Col>
                                                <Col sm={7}

                                                >
                                                    <div
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    >{val.name}</div>
                                                    <div
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    >{val.service_name}</div>

                                                </Col>
                                                <Col sm={3}>
                                                    <div
                                                        style={{
                                                            padding: 5,
                                                            color: 'white',
                                                            backgroundColor: 'green',
                                                            borderRadius: 20,
                                                            fontSize: 12,
                                                            textAlign: 'center',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >{val.status}</div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                    </MenuItem>

                                );
                            })
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 300
                                }}
                            >
                                <h5>No notification</h5>
                            </div>

                        )}
                    </div>
                </Menu>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '50%'
                }}
            >
                <Button
                    onClick={() => {
                        props.changePane();
                        setappointmentHistory(!appointmentHistory);
                    }}
                    style={{
                        height: '50%',
                        width: '25%'
                    }}
                >
                    {appointmentHistory ? 'Appointment History' : 'Appointment List'}
                </Button>

            </div>


        </div>
    )
}

export default AppointmentHeader