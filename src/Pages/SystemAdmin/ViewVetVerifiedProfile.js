import React, { useEffect, useState } from 'react'
import { Col, Row, Button, Modal, Container, Image } from "react-bootstrap";
import { AiFillSchedule, AiOutlineSearch } from "react-icons/ai";
import { FaStore } from "react-icons/fa";
import { GrDocument, GrTransaction } from 'react-icons/gr';
import { CgFileDocument } from 'react-icons/cg';
import { ImHistory } from 'react-icons/im';
import { MdClear } from 'react-icons/md';



function ViewVetVerifiedProfile(props) {
    //modal for schedule viewer
    const [showViewer, setshowViewer] = useState(false);

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
    const [CheckerMonday, setCheckerMonday] = useState();
    const [CheckerTuesday, setCheckerTuesday] = useState();
    const [CheckerWednesday, setCheckerWednesday] = useState();
    const [CheckerThursday, setCheckerThursday] = useState();
    const [CheckerFriday, setCheckerFriday] = useState();
    const [CheckerSaturday, setCheckerSaturday] = useState();
    const [CheckerSunday, setCheckerSunday] = useState();


    function timeConvertion(time) {
        const timeString12hr = new Date('2021-01-01T' + time + 'Z')
            .toLocaleTimeString({},
                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );
        return timeString12hr;
    }


    useEffect(() => {
        var Monday = props.viewProfileVetData.scheduleMonday;
        if (props.viewProfileVetData.scheduleMonday != "" && props.viewProfileVetData.scheduleMonday != null) {
            setOpeningMonday(Monday.split(" - ")[0]);
            setClosingMonday(Monday.split(" - ")[1]);
            setCheckerMonday(false);

        } else {
            setCheckerMonday(true);

        }

        // alert(ClosingMonday);

        var Tuesday = props.viewProfileVetData.scheduleTuesday;
        if (props.viewProfileVetData.scheduleTuesday != "" && props.viewProfileVetData.scheduleTuesday != null) {
            setOpeningTuesday(Tuesday.split(" - ")[0]);
            setClosingTuesday(Tuesday.split(" - ")[1]);
            setCheckerTuesday(false);

        } else {
            setCheckerTuesday(true);

        }
        // alert(ClosingMonday);

        var Wednesday = props.viewProfileVetData.scheduleWednesday;
        if (props.viewProfileVetData.scheduleWednesday != "" && props.viewProfileVetData.scheduleWednesday != null) {
            setOpeningWednesday(Wednesday.split(" - ")[0]);
            setClosingWednesday(Wednesday.split(" - ")[1]);
            setCheckerWednesday(false);

        } else {
            setCheckerWednesday(true);

        }

        // alert(ClosingMonday);


        var Thursday = props.viewProfileVetData.scheduleThursday;
        if (props.viewProfileVetData.scheduleThursday != "" && props.viewProfileVetData.scheduleThursday != null) {
            setOpeningThursday(Thursday.split(" - ")[0]);
            setClosingThursday(Thursday.split(" - ")[1]);
            setCheckerThursday(false);

        } else {
            setCheckerThursday(true);

        }

        // alert(ClosingMonday);

        var Friday = props.viewProfileVetData.scheduleFriday;
        if (props.viewProfileVetData.scheduleFriday != "" && props.viewProfileVetData.scheduleFriday != null) {
            setOpeningFriday(Friday.split(" - ")[0]);
            setClosingFriday(Friday.split(" - ")[1]);
            setCheckerFriday(false);

        } else {
            setCheckerFriday(true);

        }

        // alert(ClosingMonday);

        var Saturday = props.viewProfileVetData.scheduleSaturday;
        if (props.viewProfileVetData.scheduleSaturday != "" && props.viewProfileVetData.scheduleSaturday != null) {
            setOpeningSaturday(Saturday.split(" - ")[0]);
            setClosingSaturday(Saturday.split(" - ")[1]);
            setCheckerSaturday(false);

        } else {
            setCheckerSaturday(true);

        }

        // alert(ClosingMonday);

        var Sunday = props.viewProfileVetData.scheduleSunday;
        if (props.viewProfileVetData.scheduleSunday != "" && props.viewProfileVetData.scheduleSunday != null) {
            setOpeningSunday(Sunday.split(" - ")[0]);
            setClosingSunday(Sunday.split(" - ")[1]);
            setCheckerSunday(false);

        } else {
            setCheckerSunday(true);

        }

    }, [])

    function closeScheduleViewer() {
        setshowViewer(false);
    }


    const [showPermit, setShowPermit] = useState(false);

    return (
        <div>



            <Modal
                show={showPermit}
                size="lg"
                onHide={() => setShowPermit(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Business Permit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: 660, height: 'auto' }}>
                    <Image className='ml-5 pl-5' src={props.viewProfileVetData.vet_permit} fluid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />


                </Modal.Body>
            </Modal>



            <Modal show={showViewer} onHide={closeScheduleViewer}>

                <Modal.Body style={{ paddingTop: 0 }}>
                    <Row>
                        <Container style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #74ebd5 , #ACB6E5)", color: 'white' }}>
                            <h4 className='mt-3 mb-3' style={{ display: 'flex', }}>Schedule Viewer</h4>
                            <strong> <MdClear className='mt-3 justify-content-end' style={{ fontSize: 30, cursor: 'pointer', marginLeft: 250, color: '#48b1bf' }} onClick={closeScheduleViewer} /></strong>
                        </Container>
                        <Container>
                            <Container className='mt-3' style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #06beb6 , #48b1bf)", color: 'white', fontSize: 30, }}>
                                <Row className='ml-3'>
                                    <strong className='mr-3'>Monday </strong>

                                    {OpeningMonday != undefined && ClosingMonday !== undefined ? timeConvertion(OpeningMonday) + " - " + timeConvertion(ClosingMonday) : "Close"}
                                </Row>
                            </Container>
                            <Container className='mt-3' style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #06beb6 , #48b1bf)", color: 'white', fontSize: 30, }}>
                                <Row className='ml-3'>
                                    <strong className='mr-3'>Tuesday </strong>

                                    {OpeningTuesday !== undefined && ClosingTuesday !== undefined ? timeConvertion(OpeningTuesday) + " - " + timeConvertion(ClosingTuesday) : "Close"}
                                </Row>
                            </Container>
                            <Container className='mt-3' style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #06beb6 , #48b1bf)", color: 'white', fontSize: 30, }}>
                                <Row className='ml-3'>
                                    <strong className='mr-3'>Wednesday </strong>
                                    {OpeningWednesday !== undefined && ClosingWednesday !== undefined ? timeConvertion(OpeningWednesday) + " - " + timeConvertion(ClosingWednesday) : "Close"}
                                </Row>
                            </Container>
                            <Container className='mt-3' style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #06beb6 , #48b1bf)", color: 'white', fontSize: 30, }}>
                                <Row className='ml-3'>
                                    <strong className='mr-3'>Thursday </strong>


                                    {OpeningThursday !== undefined && ClosingThursday !== undefined ? timeConvertion(OpeningThursday) + " - " + timeConvertion(ClosingThursday) : "Close"}
                                </Row>
                            </Container>
                            <Container className='mt-3' style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #06beb6 , #48b1bf)", color: 'white', fontSize: 30, }}>
                                <Row className='ml-3'>
                                    <strong className='mr-3'>Friday </strong>

                                    {OpeningFriday !== undefined && ClosingFriday !== undefined ? timeConvertion(OpeningFriday) + " - " + timeConvertion(ClosingFriday) : "Close"}
                                </Row>
                            </Container>
                            <Container className='mt-3' style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #06beb6 , #48b1bf)", color: 'white', fontSize: 30, }}>
                                <Row className='ml-3'>
                                    <strong className='mr-3'>Saturday </strong>

                                    {OpeningSaturday !== undefined && ClosingSaturday !== undefined ? timeConvertion(OpeningSaturday) + " - " + timeConvertion(ClosingSaturday) : "Close"}
                                </Row>
                            </Container>
                            <Container className='mt-3' style={{ display: 'flex', backgroundImage: "linear-gradient(to left, #06beb6 , #48b1bf)", color: 'white', fontSize: 30, }}>
                                <Row className='ml-3'>
                                    <strong className='mr-3'>Sunday </strong>

                                    {OpeningSunday !== undefined && ClosingSunday !== undefined ? timeConvertion(OpeningSunday) + " - " + timeConvertion(ClosingSunday) : "Close"}
                                </Row>
                            </Container>
                        </Container>
                    </Row>

                </Modal.Body>

            </Modal>


            <Row>
                <Col sm='2' className='ml-5'>
                    <Row className='' style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <img
                            src={props.viewProfileVetData.vet_picture}

                            style={{
                                height: 150,
                                width: 150,
                                borderRadius: 100,
                                border: "7px",
                                borderStyle: "solid",
                                borderColor: "transparent",
                                marginTop: '2vh'
                            }}></img>
                    </Row>

                    <Row className='mt-1' style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <strong style={{ fontSize: 15 }}>{props.viewProfileVetData.vet_name}</strong>
                    </Row>



                </Col>

                <Col sm={9} className='ml-3 mt-3'>
                    <Row>
                        <Col>
                            <Row className='mt-3' style={{ fontSize: 25 }}>
                                <strong>Vet Clinic Details</strong>
                            </Row>
                        </Col>
                        <Col>
                            <Row className='mt-3' style={{ fontSize: 25 }}>
                                <strong>Action</strong>
                            </Row>
                        </Col>

                    </Row>

                    <Row className='mt-4 mb-4'>
                        <Col>
                            <Row className='ml-5' style={{ fontSize: 12, color: 'grey' }}>
                                <strong>Email </strong>
                            </Row>
                            <Row className='ml-5' style={{ fontSize: 15, color: 'black' }}>
                                <p>{props.viewProfileVetData.email}</p>
                            </Row>


                            <Row className='ml-5' style={{ fontSize: 12, color: 'grey' }}>
                                <strong>Address </strong>
                            </Row>
                            <Row className='ml-5' style={{ fontSize: 15, color: 'black' }}>
                                <p>{props.viewProfileVetData.vet_address}</p>
                            </Row>

                            <Row className='ml-5' style={{ fontSize: 12, color: 'grey' }}>
                                <strong>Contact Number </strong>
                            </Row>
                            <Row className='ml-5' style={{ fontSize: 15, color: 'black' }}>
                                <p>{props.viewProfileVetData.vet_contact_number}</p>
                            </Row>
                        </Col>

                        <Col>
                            <Row style={{ fontSize: 20, }}>
                                <Button className='mt-2 ml-5' style={{ display: 'flex', width: 200, color: 'white' }} variant='info' onClick={() => {
                                    window.location.href = `/vetdetails/${props.viewProfileVetData.email}`;
                                }}><FaStore style={{ fontSize: 20, marginRight: 10, color: 'white' }} /> Visit Vet </Button>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default ViewVetVerifiedProfile
