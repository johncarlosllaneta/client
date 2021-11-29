import React, { useState, useEffect } from "react";
// import NavBarHome from "../../Components/navBarHome/NavBarHome";
// import background from "../../Images/bg.png";
import {
  Container,
  Row,
  Button,
  Col,
  Form,
  Image,
  Card,
} from "react-bootstrap";
// import { FaPhoneAlt } from "react-icons/fa";
// import { MdSettings, MdSend } from "react-icons/md";
// import { IoCall, IoVideocam } from "react-icons/io5";
import { hostUrl } from "../../../../Components/Host";
import NavBarAppointments from "../../../../Components/navBarHome/NavBarAppointments";
import Avatar from "react-avatar";
import { IoIosSend } from "react-icons/io";
// import { BsFillCameraVideoFill } from "react-icons/bs";
// import { AiFillDelete } from "react-icons/ai";
import Axios from "axios";
import ScrollableFeed from "react-scrollable-feed";

const TalkToPetOwner = () => {
  const [petOwnerId, setpetOwnerId] = useState();
  const [activeChat, setactiveChat] = useState(false);
  const [threadId, setthreadId] = useState();

  // Pet Owner Detail
  const [convoImg, setconvoImg] = useState();
  const [convoName, setconvoName] = useState();

  // Message Convo
  const [messageActiveChecker, setmessageActiveChecker] = useState(true);
  const [messageCounter, setmessageCounter] = useState(0);
  let messageConvo = [];

  // let activeThread = [];
  const [activeThread, setactiveThread] = useState();

  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (counter < 15) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
      });
      setcounter(counter + 1);
    }
  }, [user]);

  const [threadList, setthreadList] = useState([]);
  useEffect(() => {
    if (counter < 3) {
      Axios.post(`${hostUrl}/talktovet/vetclinic/thread/refresh`, {
        vetid: user.vetid,
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
  }, [user]);

  const [thread, setthread] = useState([]);
  useEffect(() => {
    if (counter < 15) {
      Axios.post(`${hostUrl}/talktovet/vetclinic/thread`, {
        vetid: user.vetid,
      }).then((response) => {
        setthread(response.data);
      });
      setcounter(counter + 1);
    }
    refreshMessage();

    // console.log(thread);
  }, [user]);

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
  const [messageSent, setmessageSent] = useState();

  const sendMessage = (e) => {
    Axios.post(`${hostUrl}/talktovet/vetclinic/messages/sent`, {
      thread_id: threadId,
      pet_owner_id: petOwnerId,
      vetid: user.vetid,
      user: 2,
      message: messageSent,
    }).then((response) => { });
    setValidated(true);
    setmessageSent("");
    Axios.post(`${hostUrl}/talktovet/vetclinic/messages`, {
      thread_id: threadId,
    }).then((response) => {
      setmessages(response.data);
    });
    e.preventDefault();
  };

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
    // const [addID, setaddID] = useState('');
  }

  var addID;

  // Controller for on call
  const [onCall, setonCall] = useState(true);

  // user Calling
  const [isBusy, setisBusy] = useState(false);

  const callChecker = () => {
    setisBusy(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#ECEFF2",
        height: "100vh",
        paddingTop: 110,
      }}
    >
      <NavBarAppointments />
      <div hidden={isBusy}>
        <div>
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
                        marginBottom: 0,
                      }}
                    ></hr> */}

                {/* List of Vet clinic */}
                <div style={{ padding: 0 }}>
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
                              setconvoImg(val.profilePicture);
                              setconvoName(val.name);
                              setmessageActiveChecker(false);

                              temp = val.thread_id;
                              setactiveChat(true);
                              setthreadId(val.thread_id);

                              setpetOwnerId(val.pet_owner_id);
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
                                  name={val.name}
                                  src={val.profilePicture}
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
                                    {val.name}
                                  </h4>
                                </div>
                                <h6>Pet Owner</h6>
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
                      <Row style={{ display: "flow" }}>
                        <Col
                          sm={1}
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

                        <Col sm={10}>
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
                                cursor: "pointer",
                              }}
                            >
                              <h4
                                style={{
                                  color: "grey",
                                }}
                              >
                                {convoName}
                              </h4>
                              <h6>Pet Owner</h6>
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
                                      `/video conference/${user.vet_name}`,
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

                              <Button
                                onClick={() => {
                                  const id = Math.floor(
                                    Math.random() * 100000000
                                  );
                                  var message = `Video call room number is ${id}. \n Instruction: Click the video conference button located in the upper right corner of your screen, enter the room number to start video call. Thankyou!`;
                                  Axios.post(
                                    `${hostUrl}/talktovet/vetclinic/messages/sent`,
                                    {
                                      thread_id: threadId,
                                      pet_owner_id: petOwnerId,
                                      vetid: user.vetid,
                                      user: 2,
                                      message: message,
                                    }
                                  ).then((response) => {
                                    refreshMessage();
                                  });
                                }}
                                style={{
                                  backgroundColor: "#19B9CC",
                                  borderColor: "#19B9CC",
                                  marginLeft: 10,
                                }}
                              >
                                Generate Room Call
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div>No Available thread</div>
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
                  {messageCounter !== 0 ? (
                    <ScrollableFeed>
                      {messageCounter !== 0 && messageCounter > 0 ? (
                        messages.map((val) => {
                          let messagefloat = "";
                          let messageImgs = "";

                          if (val.user_message === 1) {
                            messagefloat = "left";
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
                                    <p>
                                      {dateConvertion(val.created_time_date)}
                                    </p>
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
                                          name={val.name}
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
                                          <h4>{val.name}</h4>
                                          <p>{val.message_content}</p>
                                        </Card>
                                      </Row>
                                      <Row>
                                        <p>
                                          {timeConvertion(
                                            val.created_time_date
                                          )}
                                        </p>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Row>
                              </div>
                            );
                          } else {
                            messagefloat = "right";
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
                                    <p>
                                      {dateConvertion(val.created_time_date)}
                                    </p>
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
                                          <h4>{val.vet_name}</h4>
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
                                          name={val.vet_name}
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
                        <div>None</div>
                      )}
                    </ScrollableFeed>
                  ) : (
                    <div>None</div>
                  )}
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
                          value={messageSent}
                          onChange={(e) => {
                            setmessageSent(e.target.value);
                          }}
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
      :
    </div>
  );
};

export default TalkToPetOwner;
