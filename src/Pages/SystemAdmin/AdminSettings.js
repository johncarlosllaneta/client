import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import background from "../../Images/bg.png";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Avatar from "react-avatar";
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../../Components/Host";
import { ToastContainer } from "react-toastify";
import { ToastDelete, ToastUpdate } from "../../Components/Toast";
function AdminSettings(props) {
  const [changePass, setChangePass] = useState("none");
  const [changeVetHours, setChangeVetHours] = useState("none");
  const [editCred, setEditCred] = useState("none");
  const [vetOffers, setVetOffers] = useState("none");
  const [handleChecker, sethandleChecker] = useState(true);

  const [password, setpassword] = useState();
  const [newPass, setnewPass] = useState();
  const [confirmPass, setconfirmPass] = useState();
  const [validated, setValidated] = useState(false);

  const [adminId, setadminId] = useState("");
  const [name, setname] = useState();
  const [email, setemail] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const [currentPasswordChecker, setcurrentPasswordChecker] = useState(false);
  function ChangePassController(checker) {
    if (checker !== true) {
      setChangePass("block");
      setChangeVetHours("none");
      setEditCred("none");
      setVetOffers("none");
    } else {
      setChangePass("none");
    }
  }

  function EditCredController(checker) {
    if (checker !== true) {
      setChangePass("none");
      setChangeVetHours("none");
      setEditCred("block");
      setVetOffers("none");
    } else {
      setEditCred("none");
    }
  }

  function handlePassword(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else setValidated(true);
  }

  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });

      setcounter(counter + 1);
    }
  }, [counter, user]);

  function UpdateSystemAdmin() {
    Axios.put(`${hostUrl}/admin/update/${adminId}`, {
      updateAdminEmail: email,
      updateAdminName: name,
    }).then((response) => {
      if (response.data.message === "Correct") {
        Axios.get(`${hostUrl}/admin/update/credentials`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
          }
          handleCloseInfo();
          ToastUpdate();
          setTimeout(() => {
            window.location.href = `${hostUrlWeb}/admin/settings`;
          }, 3000);
        });
      }
    });
  }

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  const [passwordVerify, setpasswordVerify] = useState("none");
  const [resultVerify, setresultVerify] = useState();
  const currentComparePass = (password) => {
    // alert(resultVerify);
  };

  useEffect(() => {
    if (counter < 6) {
      Axios.post(`${hostUrl}/web/user/compare`, {
        currentHashPassword: user.password,
        currentPassword: password,
      }).then((response) => {
        setresultVerify(response.data);
        if (password != undefined) {
          if (resultVerify === true) {
            setpasswordVerify("none");
            setcurrentPasswordChecker(true);
          } else {
            setpasswordVerify("block");
            setcurrentPasswordChecker(false);
          }
        }
      });
    }
  }, [password, resultVerify]);

  function changePassword(e) {
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      password === null ||
      currentPasswordChecker === false
    ) {
      setpasswordVerify("block");
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShow();
    }
    setValidated(true);
  }

  function changeInfo(e) {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowInfo();
    }
    setValidated(true);
  }

  function savePassword() {
    Axios.put(`${hostUrl}/web/admin/password/${adminId}`, {
      newPassword: newPass,
    }).then((response) => {
      if (response.data.message === "Successfully") {
        Axios.get(`${hostUrl}/admin/update/credentials`, {
          params: {
            email: email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
          }
          handleClose();
          ToastUpdate();
          setTimeout(() => {
            window.location.href = `${hostUrlWeb}/admin/settings`;
          }, 3000);
        });
      }
    });
  }
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
        padding: 20,
        height: "100vh",
        zoom: value,
      }}
    >
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to change your password?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setemail(user.email);
              setadminId(user.admin_id);
              savePassword();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showInfo}
        onHide={handleCloseInfo}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to change your information?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfo}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setname(user.name);
              setemail(user.email);
              setadminId(user.admin_id);
              UpdateSystemAdmin();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <Container
          style={{
            height: 850,
            maxWidth: "100%",
            borderRadius: 30,
            backgroundColor: "#FFFFFF",
            padding: 20,
          }}
        >
          <Row>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <a style={{ textDecoration: "none", fontSize: 20 }} href="/">
                <IoChevronBack />
                Return to Home
              </a>
            </div>
          </Row>
          <Row>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "#696969",
                    margin: 20,
                  }}
                >
                  Your Profile
                </h2>
                <BsFillInfoCircleFill style={{ fontSize: 40, margin: 20 }} />
              </div>
              <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Container
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: 30,
                    height: 150,
                    maxWidth: "100%",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={user.profilePicture}
                    name={user.name}
                    roundedCircle
                    style={{ height: 100, width: 100 }}
                  />
                  <div style={{ textAlign: "left", marginLeft: 10 }}>
                    <h3 style={{ color: "#8A8A8A", fontWeight: "bold" }}>
                      {user.name}
                    </h3>
                    <h5 style={{ color: "#19B9CC", fontWeight: "bold" }}>
                      System Admin
                    </h5>
                  </div>
                </Container>
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: 40,
                    paddingRight: 40,
                    paddingTop: 30,
                    marginTop: 10,
                    overflowY: "auto",
                    flexWrap: "wrap",
                    height: 420,
                  }}
                >
                  <div style={{ color: "#8A8A8A" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5
                        style={{
                          fontWeight: "bolder",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          ChangePassController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setemail(user.email);
                          setadminId(user.admin_id);
                        }}
                      >
                        Change Password
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          ChangePassController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setemail(user.email);
                          setadminId(user.admin_id);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: 40,
                        paddingTop: 15,
                        display: changePass,
                      }}
                    >
                      <Form.Group
                        as={Row}
                        style={{
                          rowGap: 10,
                        }}
                      >
                        <Form.Label column sm="4">
                          Current Password
                        </Form.Label>
                        <Col sm="7">
                          <FloatingLabel
                            controlId="floatingInputPassword"
                            label="Current Password"
                            className="mb-3"
                          >
                            <Form.Control
                              style={{
                                height: 50,
                                width: "50vw",
                                backgroundColor: "white",
                              }}
                              type="password"
                              placeholder="Password"
                              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                              required
                              minLength={8}
                              onChange={(e) => {
                                setpassword(e.target.value);
                                e.preventDefault();
                                if (password !== undefined) {
                                  currentComparePass(password);
                                }
                              }}
                            />
                            {/* <div hidden={currentPasswordChecker}>
                                  <p>error</p>
                                </div> */}
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid password.
                            </Form.Control.Feedback>
                          </FloatingLabel>
                          <div style={{ display: passwordVerify }}>
                            <p style={{ color: "#FF0000" }}>
                              Password does'nt match
                            </p>
                          </div>
                        </Col>
                      </Form.Group>

                      <Row>
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={changePassword}
                          style={{
                            width: 1800,
                          }}
                        >
                          <Form.Group as={Row} style={{ rowGap: 10 }}>
                            <Form.Label column sm="4">
                              New Password
                            </Form.Label>
                            <Col sm="7" style={{ paddingLeft: 20 }}>
                              <Form.Group
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                <FloatingLabel
                                  controlId="floatingInputPassword"
                                  label="New Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    style={{
                                      height: 50,
                                      width: "50vw",
                                      backgroundColor: "white",
                                    }}
                                    type="password"
                                    placeholder="Password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required
                                    onChange={(e) => {
                                      setnewPass(e.target.value);
                                    }}
                                  />
                                  <Form.Text id="passwordHelpBlock" muted>
                                    Your password must contain at least one
                                    number and one uppercase and lowercase
                                    letter, and at least 8 or more characters
                                  </Form.Text>
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                  </Form.Control.Feedback>
                                </FloatingLabel>
                              </Form.Group>
                            </Col>

                            <Form.Label column sm="4">
                              Confirm New Password
                            </Form.Label>
                            <Col sm="7" style={{ paddingLeft: 20 }}>
                              <Form.Group
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                <FloatingLabel
                                  controlId="floatingInputPassword"
                                  label="Confirm Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    style={{
                                      height: 50,
                                      width: "50vw",
                                      backgroundColor: "white",
                                    }}
                                    type="password"
                                    placeholder="Password"
                                    pattern={newPass}
                                    title="Confirm password should be the same with your new password"
                                    required
                                    value={confirmPass}
                                    onChange={(e) => {
                                      setconfirmPass(e.target.value);
                                    }}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Your confirm password must be the same as
                                    new password.
                                  </Form.Control.Feedback>
                                </FloatingLabel>
                              </Form.Group>
                            </Col>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                type="submit"
                                style={{
                                  borderRadius: 30,
                                  paddingLeft: 120,
                                  paddingRight: 120,
                                  backgroundColor: "#19B9CC",
                                }}
                              >
                                SAVE
                              </Button>
                            </div>
                          </Form.Group>
                        </Form>
                      </Row>
                    </div>
                  </div>

                  <div style={{ color: "#8A8A8A" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5
                        style={{
                          fontWeight: "bolder",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          EditCredController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setname(user.name);
                          setemail(user.email);
                          setadminId(user.admin_id);
                        }}
                      >
                        Edit Information
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          EditCredController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setname(user.name);
                          setemail(user.email);
                          setadminId(user.admin_id);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: 40,
                        paddingTop: 15,
                        display: editCred,
                      }}
                    >
                      <Row>
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={changeInfo}
                        >
                          <Form.Group as={Row} style={{ rowGap: 10 }}>
                            <Form.Label column sm="4">
                              Name
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                value={name}
                                placeholder="Name"
                                required
                                minLength={5}
                                maxLength={50}
                                pattern="^[a-zA-Z ]*$"
                                onChange={(e) => {
                                  setname(e.target.value);
                                }}
                              />
                            </Col>

                            <Form.Label column sm="4">
                              Email Address
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="email"
                                value={email}
                                required
                                placeholder="Email Address"
                                onChange={(e) => {
                                  setemail(e.target.value);
                                }}
                              />
                            </Col>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                type="submit"
                                style={{
                                  borderRadius: 30,
                                  paddingLeft: 120,
                                  paddingRight: 120,
                                  backgroundColor: "#19B9CC",
                                }}
                              >
                                SAVE
                              </Button>
                            </div>
                          </Form.Group>
                        </Form>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AdminSettings;
