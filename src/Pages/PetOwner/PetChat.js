import React, { useState, useEffect, useRef } from "react";

import {
  Container,
  Row,
  Button,
  Col,
  Form,
  Image,
  Card,
} from "react-bootstrap";

import { hostUrl } from "../../Components/Host";
import NavBarAppointments from "../../Components/navBarHome/NavBarAppointments";
import Avatar from "react-avatar";
import { IoIosSend } from "react-icons/io";

import Axios from "axios";
import ScrollableFeed from "react-scrollable-feed";

function PetChat() {
  const [vetId, setvetId] = useState();
  const [activeChat, setactiveChat] = useState(false);
  const [threadId, setthreadId] = useState();

  // Pet Owner Detail
  const [convoImg, setconvoImg] = useState();
  const [convoName, setconvoName] = useState();
  const [convoCallerId, setconvoCallerId] = useState();
  const [callIdChecker, setcallIdChecker] = useState(false);
  useEffect(() => {
    if (convoCallerId === "" || convoCallerId === undefined) {
      setcallIdChecker(false);
    } else {
      setcallIdChecker(true);
    }
  }, [convoCallerId]);

  // Message Convo
  const [messageActiveChecker, setmessageActiveChecker] = useState(true);
  const [messageCounter, setmessageCounter] = useState(0);
  let messageConvo = [];

  // let activeThread = [];
  const [activeThread, setactiveThread] = useState();

  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (counter < 8) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        console.log(user);
      });
      setcounter(counter + 1);
    }
  }, [user]);

  const [threadList, setthreadList] = useState([]);
  useEffect(() => {
    if (counter < 8) {
      Axios.post(`${hostUrl}/talktovet/petOwner/thread/refresh`, {
        petOwnerId: user.pet_owner_id,
      }).then((response) => {
        setthreadList(response.data);
      });

      if (threadList !== null) {
        for (let i = 0; i < threadList.length; i++) {
          // console.log(threadList[i].thread_id);
          refreshMessageAll(threadList[i].thread_id);
        }
      }
    }
  }, [threadList]);

  const [thread, setthread] = useState([]);
  useEffect(() => {
    if (counter < 8) {
      Axios.post(`${hostUrl}/talktovet/petOwner/thread`, {
        petOwnerId: user.pet_owner_id,
      }).then((response) => {
        setthread(response.data);
      });
    }

    // console.log(thread);
  }, [thread, counter]);

  function refreshMessage() {
    Axios.post(`${hostUrl}/talktovet/vetclinic/messages`, {
      thread_id: threadId,
    }).then((response) => {
      setmessages(response.data);
    });
  }

  function refreshMessageAll() {
    Axios.post(`${hostUrl}/talktovet/vetclinic/messages`, {
      thread_id: threadId,
    }).then((response) => {
      setmessages(response.data);
    });
  }

  let temp = 0;

  const [messages, setmessages] = useState([]);

  var layoutMessage;

  function dateConvertion(time) {
    var date = new Date(time);
    return date.toDateString();
  }

  function timeConvertion(time) {
    var date = new Date(time);
    return date.toLocaleTimeString();
  }

  const [validated, setValidated] = useState(false);
  const [messageSent, setmessageSent] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    Axios.post(`${hostUrl}/talktovet/vetclinic/messages/sent`, {
      thread_id: threadId,
      pet_owner_id: user.pet_owner_id,
      vetid: vetId,
      user: 1,
      message: messageSent,
    }).then((response) => {});
    setValidated(true);
    setmessageSent("");
    refreshMessage();
  };

  // user Calling
  const [isBusy, setisBusy] = useState(false);

  const callChecker = () => {
    setisBusy(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#ECEFF2",
        height: "90vh",
        marginTop: 110,
      }}
    >
      <NavBarAppointments />

      <Row style={{}}>
        <Row
          style={{
            margin: 0,
          }}
        >
          <Col sm={3}>
            {/* Vet Clinic   */}
            <Container
              style={{
                textAlign: "left",
                backgroundColor: "white",
                marginTop: 10,
                paddingTop: 10,
                height: "80vh",
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

                            Axios.post(
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
                          <Row>
                            <Col md={3}>
                              {/* Avatar */}

                              <Avatar
                                name={val.vet_name}
                                src={val.vet_picture}
                                round={true}
                                size={80}
                                style={{
                                  marginTop: 10,
                                  cursor: "pointer",
                                }}
                              />
                            </Col>

                            <Col md={9}>
                              {/*Description */}

                              <Container
                                style={{
                                  marginLeft: -50,
                                  width: "20vw",
                                  paddingTop: 20,
                                  cursor: "pointer",
                                }}
                              >
                                <h4
                                  style={{
                                    color: "grey",
                                    cursor: "pointer",
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
              </Row>
            </Container>
          </Col>

          <Col
            sm={9}
            style={{
              width: "70vw",
              padding: 0,
            }}
          >
            {/* Chat treads */}
            <Container
              style={{
                textAlign: "left",
                backgroundColor: "white",
                marginTop: 10,
                paddingTop: 10,
                paddingLeft: -5,
                paddingRight: -5,

                height: "80vh",
                width: "140vw",
              }}
            >
              <Row>
                <Container
                  style={{
                    backgroundColor: "white",
                    height: 100,
                  }}
                >
                  {activeThread !== undefined ? (
                    <div>
                      {/* vet details */}
                      <Row>
                        <Col
                          md={1}
                          style={{
                            marginRight: 20,
                          }}
                        >
                          {/* Avatar */}

                          <Avatar
                            name={convoName}
                            src={convoImg}
                            round={true}
                            size={80}
                            style={{
                              marginTop: 10,
                            }}
                          />
                        </Col>

                        <Col md={10}>
                          {/*Description */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Container
                              style={{
                                marginLeft: -50,
                                width: "20vw",
                                paddingTop: 20,
                              }}
                            >
                              <h4
                                style={{
                                  color: "grey",
                                }}
                              >
                                {convoName}
                              </h4>
                              <h6>Vet Clinic</h6>
                            </Container>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                onClick={() => {
                                  window
                                    .open(
                                      `/video conference/${user.name}`,
                                      "_blank"
                                    )
                                    .focus();
                                }}
                                style={{
                                  backgroundColor: "#19B9CC",
                                  borderColor: "#19B9CC",
                                }}
                              >
                                Video Conference
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Container>
                <hr></hr>
              </Row>

              <Row>
                <Container
                  style={{
                    backgroundColor: "whitesmoke",
                    height: "60vh",
                    overflow: "hidden",
                    padding: 20,
                  }}
                >
                  <ScrollableFeed>
                    {messageCounter !== 0 ? (
                      messages.map((val) => {
                        let messagefloat = "";
                        let messageImgs = "";

                        if (val.user_message === 2) {
                          messagefloat = "left";
                          messageImgs = val.vet_picture;

                          layoutMessage = (
                            <div>
                              <Row>
                                <Container
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <p>{dateConvertion(val.created_time_date)}</p>
                                </Container>
                                <Row
                                  style={{
                                    float: messagefloat,
                                  }}
                                >
                                  <Col sm={1}>
                                    <div
                                      style={{
                                        paddingLeft: 30,
                                      }}
                                    >
                                      <Avatar
                                        src={messageImgs}
                                        name={val.vet_name}
                                        size={50}
                                        round
                                      />
                                    </div>
                                  </Col>

                                  <Col>
                                    <Row>
                                      <Card
                                        style={{
                                          backgroundColor: "white",
                                          textAlign: "left",
                                          maxWidth: 500,
                                          float: "left",
                                          padding: 15,
                                          borderTopRightRadius: 30,
                                          borderBottomLeftRadius: 30,
                                          borderBottomRightRadius: 30,
                                        }}
                                      >
                                        <h4>{val.vet_name}</h4>
                                        <p>{val.message_content}</p>
                                      </Card>
                                    </Row>
                                    <Row>
                                      <p>
                                        {timeConvertion(val.created_time_date)}
                                      </p>
                                    </Row>
                                  </Col>
                                </Row>
                              </Row>
                            </div>
                          );
                        } else {
                          messagefloat = "right";
                          messageImgs = val.profilePicture;
                          layoutMessage = (
                            <div>
                              <Row>
                                <Container
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <p>{dateConvertion(val.created_time_date)}</p>
                                </Container>

                                <Row
                                  style={{
                                    float: messagefloat,
                                  }}
                                >
                                  <Col>
                                    <Row
                                      style={{
                                        float: "right",
                                      }}
                                    >
                                      <Card
                                        style={{
                                          backgroundColor: "white",
                                          textAlign: "right",
                                          maxWidth: 500,
                                          float: "right",
                                          padding: 15,
                                          borderTopLeftRadius: 30,
                                          borderBottomLeftRadius: 30,
                                          borderBottomRightRadius: 30,
                                        }}
                                      >
                                        <h4>{val.name}</h4>
                                        <p>{val.message_content}</p>
                                      </Card>
                                      <Container
                                        style={{
                                          textAlign: "right",
                                        }}
                                      >
                                        <p>
                                          {timeConvertion(
                                            val.created_time_date
                                          )}
                                        </p>
                                      </Container>
                                    </Row>
                                  </Col>

                                  <Col sm={1}>
                                    <div
                                      style={{
                                        paddingRight: 30,
                                      }}
                                    >
                                      <Avatar
                                        src={messageImgs}
                                        name={val.name}
                                        size={50}
                                        round
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Row>
                            </div>
                          );
                        }

                        return <div>{layoutMessage}</div>;
                      })
                    ) : (
                      <div></div>
                    )}
                  </ScrollableFeed>
                </Container>
              </Row>

              <Row>
                <Form onSubmit={sendMessage}>
                  <Row>
                    <Col xl={11}>
                      <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Type a message here..."
                          onChange={(e) => {
                            setmessageSent(e.target.value);
                          }}
                          value={messageSent}
                          required
                          style={{
                            borderRadius: 20,
                            marginLeft: 30,
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Button
                        style={{
                          marginLeft: 20,
                          marginTop: 10,
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          borderRadius: 50,
                        }}
                        disabled={messageActiveChecker}
                        type="submit"
                      >
                        <IoIosSend
                          style={{
                            fontSize: 30,
                            color: "#19B9CC",
                            cursor: "pointer",
                          }}
                        />
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Container>
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default PetChat;
