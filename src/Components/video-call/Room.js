import React, { useEffect, useState } from "react";
import { Container, Image, Modal, Button } from "react-bootstrap";
import Participant from "./Participant";
import logo from "../../Images/logo.png";

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>

      <Modal show={show} onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <Container
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100
            }}
          >
            Thank you for choosing terravet. Good Day !
          </Container>
        </Modal.Body>
      </Modal>

      <Image
        src={logo}
        className="mt-5"
        style={{
          height: 50,
        }}
      />

      <Container
        style={{
          display: "flex",
          justifyContent: "center",

        }}
      >
        <h6
          style={{
            textAlign: "center",
            fontSize: 25,
            color: "#0A94A4",
            fontWeight: "bold",
          }}
        >
          TERRAVET
        </h6>
      </Container>

      <div className="room">
        {/* <h2>Room: {roomName}</h2> */}

        <Container
          style={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}
        >
          <div className="local-participant">
            {room ? (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
            ) : (
              ""
            )}
          </div>
          {/* <h3>Remote Participants</h3> */}
          <div

            className="remote-participants">{participants.length > 0 ? <div style={{ height: '30vh' }}> {remoteParticipants} </div> :
              <div
                style={{
                  width: '50vw',
                  minWidth: '30vw',
                  maxWidth: '90vh',
                  height: '68vh',
                  minHeight: '30vh',
                  maxHeight: '68vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto',
                  borderRadius: '6px',
                  backgroundColor: '#333e5a',
                  flexDirection: 'column'

                }}
              >
                <p
                  style={{
                    color: 'white'
                  }}
                >Waiting others to join this video conference.</p>
              </div>
            }</div>

        </Container>

      </div>
      <button style={{ backgroundColor: 'red' }} onClick={() => {
        handleShow();

        setTimeout(() => {
          handleClose();
          handleLogout();
          window.close();
        }, 3000);

      }}>Leave meeting</button>
    </div>
  );
};

export default Room;
