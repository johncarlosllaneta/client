import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, FloatingLabel } from 'react-bootstrap'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import axios from 'axios';
import { hostUrl } from '../../../../Components/Host';
import { ToastContainer } from "react-toastify";
import { ToastUpdate } from "../../../../Components/Toast";


function OperatingHours(props) {




    const [OpeningMonday, setOpeningMonday] = useState();
    const [OpeningTuesday, setOpeningTuesday] = useState();
    const [OpeningWednesday, setOpeningWednesday] = useState();
    const [OpeningThursday, setOpeningThursday] = useState();
    const [OpeningFriday, setOpeningFriday] = useState();
    const [OpeningSaturday, setOpeningSaturday] = useState();
    const [OpeningSunday, setOpeningSunday] = useState();
    const [ClosingMonday, setClosingMonday] = useState();
    const [ClosingTuesday, setClosingTuesday] = useState();
    const [ClosingWednesday, setClosingWednesday] = useState();
    const [ClosingThursday, setClosingThursday] = useState();
    const [ClosingFriday, setClosingFriday] = useState();
    const [ClosingSaturday, setClosingSaturday] = useState();
    const [ClosingSunday, setClosingSunday] = useState();
    const [CheckerSwitchMonday, setCheckerSwitchMonday] = useState(false);
    const [CheckerSwitchTuesday, setCheckerSwitchTuesday] = useState(false);
    const [CheckerSwitchWednesday, setCheckerSwitchWednesday] = useState(false);
    const [CheckerSwitchThursday, setCheckerSwitchThursday] = useState(false);
    const [CheckerSwitchFriday, setCheckerSwitchFriday] = useState(false);
    const [CheckerSwitchSaturday, setCheckerSwitchSaturday] = useState(false);
    const [CheckerSwitchSunday, setCheckerSwitchSunday] = useState(false);

    useEffect(() => {
        var monday = props.user.scheduleMonday;
        var Tuesday = props.user.scheduleTuesday;
        var Wednesday = props.user.scheduleWednesday;
        var Thursday = props.user.scheduleThursday;
        var Friday = props.user.scheduleFriday;
        var Saturday = props.user.scheduleSaturday;
        var Sunday = props.user.scheduleSunday;

        if (monday != null) {
            setCheckerSwitchMonday(true);
            setOpeningMonday(String(monday).split(" - ")[0]);
            setClosingMonday(String(monday).split(" - ")[1]);
        }

        if (Tuesday != null) {
            setCheckerSwitchTuesday(true);
            setOpeningTuesday(String(Tuesday).split(" - ")[0]);
            setClosingTuesday(String(Tuesday).split(" - ")[1]);
        }

        if (Wednesday != null) {
            setCheckerSwitchWednesday(true);
            setOpeningWednesday(String(Wednesday).split(" - ")[0]);
            setClosingWednesday(String(Wednesday).split(" - ")[1]);
        }

        if (Thursday != null) {
            setCheckerSwitchThursday(true);
            setOpeningThursday(String(Thursday).split(" - ")[0]);
            setClosingThursday(String(Thursday).split(" - ")[1]);
        }

        if (Friday != null) {
            setCheckerSwitchFriday(true);
            setOpeningFriday(String(Friday).split(" - ")[0]);
            setClosingFriday(String(Friday).split(" - ")[1]);
        }

        if (Saturday != null) {
            setCheckerSwitchSaturday(true);
            setOpeningSaturday(String(Saturday).split(" - ")[0]);
            setClosingSaturday(String(Saturday).split(" - ")[1]);
        }

        if (Sunday != null) {
            setCheckerSwitchSunday(true);
            setOpeningSunday(String(Sunday).split(" - ")[0]);
            setClosingSunday(String(Sunday).split(" - ")[1]);
        }



    }, [])


    const [validated, setvalidated] = useState(false);

    const submitHours = (e) => {
        var monday;
        var tuesday;
        var wednesday;
        var thursday;
        var friday;
        var saturday;
        var sunday;
        e.preventDefault();


        if (CheckerSwitchMonday == false) {
            monday = null;
        } else {
            monday = OpeningMonday + " - " + ClosingMonday;
        }

        if (CheckerSwitchTuesday == false) {
            tuesday = null;
        } else {
            tuesday = OpeningTuesday + " - " + ClosingTuesday;
        }

        if (CheckerSwitchWednesday == false) {
            wednesday = null;
        } else {
            wednesday = OpeningWednesday + " - " + ClosingWednesday;
        }

        if (CheckerSwitchThursday == false) {
            thursday = null;
        } else {
            thursday = OpeningThursday + " - " + ClosingThursday;
        }

        if (CheckerSwitchFriday == false) {
            friday = null;
        } else {
            friday = OpeningFriday + " - " + ClosingFriday;
        }

        if (CheckerSwitchSaturday == false) {
            saturday = null;
        } else {
            saturday = OpeningSaturday + " - " + ClosingSaturday;
        }

        if (CheckerSwitchSunday == false) {
            sunday = null;
        } else {
            sunday = OpeningSunday + " - " + ClosingSunday;
        }

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            axios.put(`${hostUrl}/vetclinic/schedule/update/${props.user.vet_admin_id}`, {
                scheduleMonday: monday,
                scheduleTuesday: tuesday,
                scheduleWednesday: wednesday,
                scheduleThursday: thursday,
                scheduleFriday: friday,
                scheduleSaturday: saturday,
                scheduleSunday: sunday,
            }).then((response) => {
                if (response.data.message === "Update Successfully") {
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


                            ToastUpdate();
                            // refreshUser();

                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);


                        }
                    });
                }
            });
        }
        setvalidated(true);
    }

    return (
        <div>
            <ToastContainer />
            <Row>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={submitHours}
                >
                    <Container
                        style={{
                            padding: 15
                        }}
                    >
                        <div
                            style={{
                                textAlign: 'left',
                                padding: 20,
                                color: 'grey'
                            }}
                        >
                            <h5>Specify the operating hours:</h5>
                        </div>
                        <Row>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    Monday
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <Form.Switch type='switch' checked={CheckerSwitchMonday} label={CheckerSwitchMonday == true ? "Open" : "Close"} defaultChecked={false} onChange={(e) => {
                                        setCheckerSwitchMonday(e.target.checked);
                                    }} />
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchMonday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Opening"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={OpeningMonday} required={CheckerSwitchMonday == true ? true : false} onChange={(e) => {
                                            setOpeningMonday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchMonday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Closing"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={ClosingMonday} required={CheckerSwitchMonday == true ? true : false} onChange={(e) => {
                                            setClosingMonday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    Tuesday
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <Form.Switch type='switch' checked={CheckerSwitchTuesday} value={OpeningMonday} label={CheckerSwitchTuesday == true ? "Open" : "Close"} defaultChecked={false} onChange={(e) => {
                                        setCheckerSwitchTuesday
                                            (e.target.checked);
                                    }} />
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchTuesday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Opening"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={OpeningTuesday} required={CheckerSwitchTuesday == true ? true : false} onChange={(e) => {
                                            setOpeningTuesday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchTuesday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Closing"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={ClosingTuesday} required={CheckerSwitchTuesday == true ? true : false} onChange={(e) => {
                                            setClosingTuesday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    Wednesday
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <Form.Switch type='switch' checked={CheckerSwitchWednesday} label={CheckerSwitchWednesday == true ? "Open" : "Close"} defaultChecked={false} onChange={(e) => {
                                        setCheckerSwitchWednesday(e.target.checked);
                                    }} />
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchWednesday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Opening"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={OpeningWednesday} required={CheckerSwitchWednesday == true ? true : false} onChange={(e) => {
                                            setOpeningWednesday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchWednesday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Closing"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={ClosingWednesday} required={CheckerSwitchWednesday == true ? true : false} onChange={(e) => {
                                            setClosingWednesday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    Thursday
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <Form.Switch type='switch' checked={CheckerSwitchThursday} label={CheckerSwitchThursday == true ? "Open" : "Close"} defaultChecked={false} onChange={(e) => {
                                        setCheckerSwitchThursday(e.target.checked);
                                    }} />
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchThursday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Opening"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={OpeningThursday} required={CheckerSwitchThursday == true ? true : false} onChange={(e) => {
                                            setOpeningThursday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchThursday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Closing"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={ClosingThursday} required={CheckerSwitchThursday == true ? true : false} onChange={(e) => {
                                            setClosingThursday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    Friday
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <Form.Switch type='switch' checked={CheckerSwitchFriday} label={CheckerSwitchFriday == true ? "Open" : "Close"} defaultChecked={false} onChange={(e) => {
                                        setCheckerSwitchFriday(e.target.checked);
                                    }} />
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchFriday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Opening"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={OpeningFriday} required={CheckerSwitchFriday == true ? true : false} onChange={(e) => {
                                            setOpeningFriday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchFriday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Closing"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={ClosingFriday} required={CheckerSwitchFriday == true ? true : false} onChange={(e) => {
                                            setClosingFriday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    Saturday
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <Form.Switch type='switch' checked={CheckerSwitchSaturday} label={CheckerSwitchSaturday == true ? "Open" : "Close"} defaultChecked={false} onChange={(e) => {
                                        setCheckerSwitchSaturday(e.target.checked);
                                    }} />
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchSaturday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Opening"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={OpeningSaturday} required={CheckerSwitchSaturday == true ? true : false} onChange={(e) => {
                                            setOpeningSaturday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchSaturday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Closing"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="mon" value={ClosingSaturday} required={CheckerSwitchSaturday == true ? true : false} onChange={(e) => {
                                            setClosingSaturday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    Sunday
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <Form.Switch type='switch' checked={CheckerSwitchSunday} label={CheckerSwitchSunday == true ? "Open" : "Close"} defaultChecked={false} onChange={(e) => {
                                        setCheckerSwitchSunday(e.target.checked);
                                    }} />
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchSunday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Opening"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="Sun" value={OpeningSunday} required={CheckerSwitchSunday == true ? true : false} onChange={(e) => {
                                            setOpeningSunday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                            <Col>
                                <Container
                                    hidden={CheckerSwitchSunday != true ? true : false}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start'
                                    }}
                                >
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Closing"
                                        className="mb-3"
                                    >
                                        <Form.Control type="time" placeholder="Sun" value={ClosingSunday} required={CheckerSwitchSunday == true ? true : false} onChange={(e) => {
                                            setClosingSunday(e.target.value);

                                        }} />
                                    </FloatingLabel>
                                </Container>
                            </Col>
                        </Row>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}
                        >
                            <Button
                                type="submit"
                                variant='contained'
                            >
                                Launch
                            </Button>
                        </div>
                    </Container>
                </Form>
            </Row>
        </div >
    )
}

export default OperatingHours