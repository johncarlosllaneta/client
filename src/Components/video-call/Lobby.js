import React, { useEffect } from "react";
import { FloatingLabel, Form, Image, Container, Button } from "react-bootstrap";
import { useParams } from "react-router";
import logo from "../../Images/logo.png";
import { users } from "../User";
import getUser from "../userData";

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  connecting,
  handleRoomDefault,
  handleUsernameDefault,
}) => {
  let { code } = useParams();

  useEffect(async () => {

    const userData = await getUser();

    handleRoomDefault(code);
    var role = localStorage.getItem('role');
    if (role == 1) {
      handleUsernameDefault(userData.name);
    } else if (role == 2) {
      handleUsernameDefault(userData.vet_name);
    } else {
      handleUsernameDefault('');
    }
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={
          {
            backgroundColor: "white",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            width: '30vw',
            height: 'auto',
            paddingBottom: 50
          }
        }
      >
        <form onSubmit={handleSubmit}>
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
          <div>
            <Form.Text className="text-muted">Video conference</Form.Text>
            <FloatingLabel label="Participant Name" className="mb-3">
              <Form.Control
                type="text"
                id="field"
                // disabled
                value={username}
                // onMouseOver={(e) => { alert(e.target.value) }}
                // onSubmit={(e) => {
                //   e.target.value = name;
                //   handleUsername(e);
                // }}
                onChange={handleUsernameChange}
                readOnly={connecting}

              />
            </FloatingLabel>
          </div>

          <div>
            <FloatingLabel label="Room Name" className="mb-3">
              <Form.Control
                type="text"
                id="room"
                value={roomName}
                onChange={handleRoomNameChange}
                readOnly={connecting}
                disabled
                required
              />
            </FloatingLabel>
          </div>

          <Button
            style={{
              backgroundColor: "#0A94A4",
              width: "100%",
              height: "100%",
              borderRadius: 5,
              borderColor: "white",
              fontWeight: "bold",
              fontSize: 15,
              textAlign: "center",
            }}
            type="submit"
            disabled={connecting}
          >
            {connecting ? "Connecting" : "Join"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;
