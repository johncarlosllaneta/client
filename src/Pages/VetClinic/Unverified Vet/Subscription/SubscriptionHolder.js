import React, { useState, useEffect } from "react";
import { Card, Col, Container, Modal, Row } from "react-bootstrap";
import NavUnverifiedVet from "../../../../Components/navBarHome/NavUnverifiedVet";
import CheckIcon from "@mui/icons-material/Check";
import Basic from "./Basic";
import Essential from "./Essential";
import Pro from "./Pro";
import Account from "./Account";

import axios from "axios";
import getUser from "../../../../Components/userData";
import { Skeleton } from "@mui/material";
import ModalSubscription from "./ModalSubscription";
import { ToastContainer } from "react-toastify";

function SubscriptionHolder() {
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
  }, []);

  const [subscriptionType, setsubscriptionType] = useState();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div
      style={{
        width: "80%",
        border: "1px",
        float: "left",
        margin: 0,
        padding: 0,
      }}
    >
      <ToastContainer />

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        backdrop="static"
        keyboard={false}
      >
        <ModalSubscription
          handleCloseModal={handleCloseModal}
          subscriptionType={subscriptionType}
          user={user}
        />
      </Modal>

      <div style={{ height: "15%", border: "1px ", padding: 0 }}>
        <NavUnverifiedVet showLogo={true} showHome={true} />
      </div>
      <div style={{ height: "85%", border: "1px", padding: 5 }}>
        {user.length != 0 ? (
          <div>
            {user.subscriptionType == null ? (
              <div>
                <Container style={{ paddingTop: 50 }}>
                  <h1>Choose your subscription</h1>
                </Container>
                <Row
                  style={{
                    padding: 50,
                  }}
                >
                  <Col>
                    <Basic
                      handleShowModal={handleShowModal}
                      setsubscriptionType={setsubscriptionType}
                      buttonChecker={true}
                    />
                  </Col>

                  <Col>
                    <Essential
                      handleShowModal={handleShowModal}
                      setsubscriptionType={setsubscriptionType}
                      buttonChecker={true}
                    />
                  </Col>

                  <Col>
                    <Pro
                      handleShowModal={handleShowModal}
                      setsubscriptionType={setsubscriptionType}
                      buttonChecker={true}
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <Container>
                <Account user={user} buttonChecker={false} />
              </Container>
            )}
          </div>
        ) : (
          <Skeleton variant="rectangular" height={"50vh"} />
        )}
      </div>
    </div>
  );
}

export default SubscriptionHolder;
