import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Image,
  Button,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import Axios from "axios";
import { BiPhone } from "react-icons/bi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { hostUrl } from "../../Components/Host";

const PetProfile = () => {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  const [user, setuser] = useState([]);
  const [imgProfile, setimgProfile] = useState("");
  // const [schedule, setschedule] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    var roles = localStorage.getItem("role");
    Axios.get(`${hostUrl}/home`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setuser(response.data.result[0]);
    });
    setimgProfile(user.profilePicture);
  }, [user]);

  var cardCssBio = {
    position: "relative",
    width: "16vw",
    height: "10vh",
    borderRadius: 30,
    margin: "2vh 0vh 1vh 5vh",
    backgroundColor: "white",
    boxShadow: "#cdc8c6 -15px 20px 15px -15px",
  };

  var cardCssOperation = {
    position: "relative",
    width: "100%",
    height: "36vh",
    borderRadius: 30,
    margin: "2vh 0vh 1vh 0vh",
    backgroundColor: "white",
    boxShadow: "#cdc8c6 -15px 20px 15px -15px",
  };

  var iconsCss = {
    fontSize: "300%",
    padding: 5,
    textAlign: "center",
    color: "#57D4FF",
    marginTop: "35%",
  };

  var descCssTitle = {
    fontSize: "70%",
    marginTop: "2vh",
  };

  var descCssLabel = {
    fontSize: "70%",
  };

  var descCssLabelDay = {
    fontSize: "70%",
    color: "#57D4FF",
    fontWeight: "bold",
    textAlign: "center",
  };

  var descCssLabelDayModal = {
    fontSize: "100%",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginRight: 50,
  };
  var descCssLabelTime = {
    fontSize: "70%",
    textAlign: "left",
  };

  const containerStyle = {
    width: "100%",
    height: "36vh",
    borderRadius: 30,
    display: "inline-flex",
    // border:
  };

  return (
    <div style={{ display: "flow" }}>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicProduct">
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group controlId="formBasicProductD">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formBasicProductQ">
              <Form.Control type="text" placeholder="Address" />
            </Form.Group>

            <Form.Group controlId="formBasicProductQ">
              <Form.Control type="number" placeholder="Contact Number" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose2}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col>
          <Container style={{ alignItems: "center" }}>
            {user.profilePicture !== undefined ? (
              <Image
                src={user.profilePicture}
                roundedCircle
                alt={user.vet_name}
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 50,
                  border: "7px",
                  borderStyle: "solid",
                  borderColor: "transparent",
                  marginTop: "2vh",
                }}
              />
            ) : (
              <div
                data-initials="GC"
                style={{
                  backgroundColor: "#099bdd",
                  color: "white",
                  opacity: 1,
                  content: "Data Initials",
                  display: "inline-block",
                  borderRadius: "50%",
                  verticalAlign: "middle",
                  width: 50,
                  height: 50,
                  lineHeight: 50,
                  textAlign: "center",
                }}
              ></div>
            )}

            <h4>{user.name}</h4>
          </Container>
          <Button
            variant="outline-info"
            className="float-right"
            onClick={handleShow2}
          >
            Edit profile
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="about" id="uncontrolled-tab-example">
        <Tab eventKey="about" title="About">
          {/* <PetAbout /> */}

          <Row>
            <Col sm="3">
              <Row>
                <Row className="ml-5"></Row>
                <Card style={cardCssBio}>
                  <Row>
                    <Col sm="3">
                      <HiOutlineMail style={iconsCss} />
                    </Col>
                    <Col sm="9">
                      <Row>
                        <h5 style={descCssTitle}>Email Address</h5>
                      </Row>
                      <Row>
                        <p style={descCssLabel}> {user.email}</p>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Row>
              <Row>
                <Card style={cardCssBio}>
                  <Row>
                    <Col sm="3">
                      <BiPhone style={iconsCss} />
                    </Col>
                    <Col sm="9">
                      <Row>
                        <h5 style={descCssTitle}>Contact Number</h5>
                      </Row>
                      <Row>
                        <p style={descCssLabel}>{user.contact_number}</p>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Row>
              <Row>
                <Card style={cardCssBio}>
                  <Row>
                    <Col sm="3">
                      <HiOutlineLocationMarker style={iconsCss} />
                    </Col>
                    <Col sm="9">
                      <Row>
                        <h5 style={descCssTitle}>Location</h5>
                      </Row>
                      <Row>
                        <p style={descCssLabel}>{user.address}</p>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Row>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="photo" title="Photo">
          <Container>
            {/* <PetPhoto /> */}

            <Row>
              <Col>
                <p>Nothing to show</p>
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PetProfile;
