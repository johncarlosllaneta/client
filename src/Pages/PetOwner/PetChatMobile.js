import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { hostUrl } from '../../Components/Host';
import {
    Container,
    Row,
    Button,
    Col,
    Form,
    Image,
    Card,
} from "react-bootstrap";
import Avatar from "react-avatar";
import { IoIosSend } from "react-icons/io";

function PetChatMobile() {
    // let activeThread = [];

    let temp = 0;

    // Message Convo
    const [messageActiveChecker, setmessageActiveChecker] = useState(true);
    const [messageCounter, setmessageCounter] = useState(0);
    let messageConvo = [];

    const [messages, setmessages] = useState([]);
    const [vetId, setvetId] = useState();
    const [activeChat, setactiveChat] = useState(false);
    const [threadId, setthreadId] = useState();

    // Pet Owner Detail
    const [convoImg, setconvoImg] = useState();
    const [convoName, setconvoName] = useState();
    const [convoCallerId, setconvoCallerId] = useState();
    const [callIdChecker, setcallIdChecker] = useState(false);
    const [activeThread, setactiveThread] = useState();
    const [thread, setthread] = useState([]);
    const [counter, setcounter] = useState(0)
    const [user, setuser] = useState([]);
    useEffect(() => {
        if (counter < 10) {
            var token = localStorage.getItem("ajwt");
            axios.get(`${hostUrl}/home`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                setuser(response.data.result[0]);

            });
            console.log(user);
            setcounter(counter + 1);
        }
    }, [user]);
    useEffect(() => {
        if (counter < 8) {

            axios.post(`${hostUrl}/talktovet/petOwner/thread`, {
                petOwnerId: user.pet_owner_id,
            }).then((response) => {
                setthread(response.data);

            });
            setcounter(counter + 1);
        }

        // console.log(thread);
    }, [user]);
    return (
        <div
            id='rowMobile'
        >
            <Container
                style={{
                    textAlign: "left",
                    backgroundColor: "white",
                    marginTop: 10,
                    paddingTop: 10,
                    height: "100vh",
                    paddingLeft: 10,
                    paddingRight: 10,
                }}
            >
                <Row style={{}}>
                    <Container
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: 0,
                        }}
                    >
                        <Container>
                            <h4
                                style={{
                                    fontSize: 30,
                                    color: "#19B9CC",
                                    marginTop: 30,
                                }}
                            >
                                Chats
                            </h4>
                        </Container>
                        <Container
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                href={"/"}
                                style={{
                                    height: 40,
                                    marginTop: 15,
                                    backgroundColor: "#19B9CC",
                                    borderColor: "#19B9CC",
                                }}
                            >
                                Home
                            </Button>
                        </Container>
                    </Container>
                    <hr
                        style={{
                            marginBottom: 0,
                        }}
                    ></hr>
                    <div
                        style={{
                            overflowY: 'auto'
                        }}
                    >
                        {/* List of Vet clinic */}

                        {thread.length !== 0 &&
                            thread.map((val) => {
                                return (
                                    <div>
                                        <Card
                                            style={{
                                                height: 100,
                                                backgroundColor: "white",
                                                cursor: "pointer",
                                                padding: 10
                                            }}
                                            onClick={(event) => {
                                                // event.preventDefault();
                                                // setthreadId(val.thread_id);

                                                // alert(threadId)

                                                setactiveThread(val.thread_id);
                                                console.log(activeThread);
                                                // activeThread = val;
                                                // console.log(activeThread);
                                                setconvoImg(val.vet_picture);
                                                setconvoName(val.vet_name);
                                                setconvoCallerId(val.callerId);
                                                // alert(convoCallerId);

                                                setmessageActiveChecker(false);

                                                temp = val.thread_id;
                                                setactiveChat(true);
                                                setthreadId(val.thread_id);

                                                setvetId(val.vetid);
                                                // alert(temp);

                                                axios.post(
                                                    `${hostUrl}/talktovet/vetclinic/messages`,
                                                    {
                                                        thread_id: temp,
                                                    }
                                                ).then((response) => {
                                                    setmessages(response.data);
                                                    messageConvo = response.data;
                                                    setmessageCounter(response.data.length);
                                                });
                                                // alert(messageCounter);
                                                console.log(messages);
                                            }}
                                        >
                                            <Row
                                            // style={{
                                            //     display: 'flex'
                                            // }}
                                            >

                                                <Col xs={3}

                                                >
                                                    {/* Avatar */}
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center '
                                                        }}
                                                    >
                                                        <Avatar
                                                            name={val.vet_name}
                                                            src={val.vet_picture}
                                                            round={true}
                                                            size={80}
                                                            style={{

                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                                {/*Description */}
                                                <Col xs={9}
                                                    style={{
                                                        padding: 0
                                                    }}
                                                >


                                                    <Container
                                                        style={{


                                                            padding: 0,
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <h4
                                                            style={{
                                                                color: "grey",
                                                                cursor: "pointer",
                                                                marginTop: 10
                                                            }}
                                                        >
                                                            {val.vet_name}
                                                        </h4>
                                                        <h6>Vet Clinic</h6>
                                                    </Container>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                );
                            })}
                    </div>
                </Row>
            </Container>

        </div>
    )
}

export default PetChatMobile
