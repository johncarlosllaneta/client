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
import "../../css/PetChat.css"
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowBackIos, Send } from "@material-ui/icons";


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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
    }).then((response) => { });
    setValidated(true);
    setmessageSent("");
    refreshMessage();
  };

  // user Calling
  const [isBusy, setisBusy] = useState(false);

  const callChecker = () => {
    setisBusy(true);
  };


  const [mobileMessageController, setmobileMessageController] = useState(true);


  return (
    <div
      style={{
        backgroundColor: "#ECEFF2",
        height: "100vh",
        paddingTop: 110,
      }}
    >
      <NavBarAppointments />

      {/* Web */}
      <div id="rowWeb">
        <div style={{}}>
          <div
            style={{
              width: "20%",
              border: "1px",
              float: "left",
              margin: 0,
              padding: 0,
              height: "auto",
            }}
          >
            {/* Vet Clinic   */}
            <Container
              style={{
                textAlign: "left",
                backgroundColor: "white",
                // marginTop: 10,
                // paddingTop: 10,
                height: "87.5vh",
                // paddingLeft: 10,
                // paddingRight: 10,
              }}
            >
              <Row>
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
                        marginTop: 70,
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
                        marginTop: 50,
                        backgroundColor: "#19B9CC",
                        borderColor: "#19B9CC",
                      }}
                    >
                      Home
                    </Button>
                  </Container>
                </Container>
                {/* <hr
                  style={{
                    marginTop: 40,
                  }}
                ></hr> */}

                {/* List of Vet clinic */}
                <div style={{ padding: 0 }}>
                  {thread.length !== 0 &&
                    thread.map((val) => {
                      return (
                        <div style={{ padding: 0 }}>
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

                              <Col
                                md={9}
                                style={{
                                  alignItems: "center",
                                  paddingTop: 10,
                                }}
                              >
                                {/*Description */}

                                <div
                                  style={{
                                    width: "auto",
                                    display: "flex",
                                    alignItems: "center",
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
                                </div>
                                <h6>Vet Clinic</h6>
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

          <div
            style={{
              width: "80%",
              border: "1px",
              float: "left",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "stretch",
            }}
          >
            {/* Chat treads */}
            <div
              style={{
                textAlign: "left",
                backgroundColor: "white",
                // marginTop: 10,
                // paddingTop: 10,
                // width: '120vw',
                width: "100%",
                height: "87.5vh",
                padding: 20,
                borderLeft: "2px solid black",
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
              </Row>

              <Row>
                <Container
                  style={{
                    backgroundColor: "whitesmoke",
                    height: "65vh",
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
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        id='rowMobile'

      >
        <Container
          hidden={!mobileMessageController}
          // hidden={true}
          style={{
            textAlign: "left",
            backgroundColor: "white",
            marginTop: -40,
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
                overflowY: "auto",
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
                          padding: 10,
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
                          setmobileMessageController(!mobileMessageController);
                        }}
                      >
                        <Row
                        // style={{
                        //     display: 'flex'
                        // }}
                        >
                          <Col xs={3}>
                            {/* Avatar */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center ",
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
                          <Col
                            xs={9}
                            style={{
                              padding: 0,
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
                                  marginTop: 10,
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


        {/* ------------- Messages --------------- */}

        <div
          hidden={mobileMessageController}
          // hidden={false}
          style={{
            marginTop: -50
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'start'
            }}
          >
            <IconButton color="primary" aria-label="return to thread"
              onClick={() => {
                setmobileMessageController(!mobileMessageController);
              }}
            >
              <ArrowBackIos /> Return to thread
            </IconButton>
          </div>
          <div

            style={{
              width: "100%",
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'stretch'

            }}
          >
            {/* Chat treads */}
            <div
              style={{
                textAlign: "left",
                backgroundColor: "white",
                // marginTop: 10,
                // paddingTop: 10,
                // width: '120vw',
                width: "100%",
                height: '85vh',
                padding: 20,



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
                          xs={2}
                          style={{

                          }}
                        >
                          {/* Avatar */}

                          <Avatar
                            name={convoName}
                            src={convoImg}
                            round={true}
                            size={50}
                            style={{
                              marginTop: 10,
                            }}
                          />
                        </Col>

                        <Col xs={10}>
                          {/*Description */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Container
                              style={{


                              }}
                            >
                              <h4
                                style={{
                                  color: "grey",
                                  fontSize: 20
                                }}
                              >
                                {convoName}
                              </h4>
                              <h6>Vet Clinic</h6>
                            </Container>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Container>

              </Row>

              <Row>
                <Container
                  style={{
                    backgroundColor: "whitesmoke",
                    height: "65vh",
                    overflow: "hidden",
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
                            <div
                              style={{
                                marginBottom: 10,
                              }}
                            >
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
                                    marginBottom: 10
                                  }}
                                >
                                  <Col xs={3}>
                                    <div
                                      style={{
                                        paddingLeft: 30,
                                      }}
                                    >
                                      <Avatar
                                        src={messageImgs}
                                        name={val.vet_name}
                                        size={30}
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
                                          marginBottom: 10
                                        }}
                                      >
                                        <h4>{val.vet_name}</h4>
                                        <p>{val.message_content}</p>
                                        <p
                                          style={{
                                            fontSize: 12,

                                          }}
                                        >
                                          {timeConvertion(val.created_time_date)}
                                        </p>
                                      </Card>
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
                            <div
                              style={{
                                marginBottom: 10
                              }}
                            >
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
                                        marginBottom: 10
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
                                          marginBottom: 10
                                        }}
                                      >
                                        <h4>{val.name}</h4>
                                        <p>{val.message_content}</p>
                                        <p
                                          style={{
                                            fontSize: 12
                                          }}
                                        >
                                          {timeConvertion(
                                            val.created_time_date
                                          )}
                                        </p>
                                      </Card>

                                    </Row>
                                  </Col>

                                  <Col xs={3}>
                                    <div
                                      style={{
                                        paddingRight: 30,
                                      }}
                                    >
                                      <Avatar
                                        src={messageImgs}
                                        name={val.name}
                                        size={30}
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

              <div
                style={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: '100%',
                  backgroundColor: 'white',

                }}
              >
                <Form onSubmit={sendMessage}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    padding: 0,
                    width: '100%',
                  }}
                >


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
                      display: 'inline'
                    }}
                  />

                  <IconButton color="primary" type="submit" aria-label="send"
                    style={{
                      display: 'inline'
                    }}
                    disabled={messageActiveChecker}
                  >
                    <Send style={{
                      fontSize: 30,
                      color: "#19B9CC",
                      cursor: "pointer",
                    }} />
                  </IconButton>




                </Form>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default PetChat;
