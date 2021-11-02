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
import { ToastContainer } from "react-toastify";
import { ToastDelete, ToastUpdate } from "../../Components/Toast";
import { hostUrl, hostUrlWeb } from "../../Components/Host";

function PetOwnerSettings() {
  const [changePass, setChangePass] = useState("none");
  const [changeVetHours, setChangeVetHours] = useState("none");
  const [editCred, setEditCred] = useState("none");
  const [vetOffers, setVetOffers] = useState("none");
  const [handleChecker, sethandleChecker] = useState(true);

  const [password, setpassword] = useState();
  const [newPass, setnewPass] = useState();
  const [confirmPass, setconfirmPass] = useState();
  const [validated, setValidated] = useState(false);

  const [petOwnerId, setpetOwnerId] = useState("");
  const [name, setname] = useState();
  const [address, setaddress] = useState();
  const [email, setemail] = useState();
  const [contactNumber, setcontactNumber] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  // function handlePassword(e) {
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   setValidated(true);
  // }

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

  function UpdatePetOwner() {
    Axios.put(`${hostUrl}/petowner/update/${petOwnerId}`, {
      updatePetOwnerName: name,
      updatePetOwnerContactNumber: contactNumber,
      updatePetOwnerAddress: address,
      updatePetOwnerEmail: email,
      currentEmail: user.email,
    }).then((response) => {
      if (response.data.message === "Correct") {
        Axios.get(`${hostUrl}/petOwner/update/credentials`, {
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
          window.location.href = `${hostUrlWeb}/petOwner/settings`;
        });
      }
    });
  }

  const [passwordVerify, setpasswordVerify] = useState("none");
  const [resultVerify, setresultVerify] = useState();
  const currentComparePass = (password) => {
    // alert(resultVerify);
  };

  useEffect(() => {
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

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  function savePassword() {
    Axios.put(`${hostUrl}/web/petowner/password/${petOwnerId}`, {
      newPassword: newPass,
    }).then((response) => {
      if (response.data.message === "Successfully") {
        Axios.get(`${hostUrl}/petOwner/update/credentials`, {
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
            window.location.href = `${hostUrlWeb}/petOwner/settings`;
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
              setpetOwnerId(user.pet_owner_id);
              savePassword();
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
                      Pet Owner
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
                          setpetOwnerId(user.pet_owner_id);
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
                          setpetOwnerId(user.pet_owner_id);
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
                      <Form.Group as={Row} style={{ rowGap: 10 }}>
                        <Form.Label column sm="4">
                          Current Password
                        </Form.Label>
                        <Col sm="7">
                          <Form.Group
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <FloatingLabel
                              controlId="floatingInputPassword"
                              label="Current Password"
                              className="mb-3"
                            >
                              <Form.Control
                                style={{
                                  height: 50,
                                  backgroundColor: "white",
                                }}
                                type="password"
                                placeholder="Password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                                onChange={(e) => {
                                  setpassword(e.target.value);
                                  e.preventDefault();
                                  if (password !== undefined) {
                                    currentComparePass(password);
                                  }
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                              </Form.Control.Feedback>
                            </FloatingLabel>
                          </Form.Group>
                          <div style={{ display: passwordVerify }}>
                            <p style={{ color: "#FF0000" }}>
                              Password does'nt match
                            </p>
                          </div>
                        </Col>
                      </Form.Group>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={changePassword}
                      >
                        <Form.Group as={Row} style={{ rowGap: 10 }}>
                          <Form.Label column sm="4">
                            New Password
                          </Form.Label>
                          <Col sm="7">
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
                                  Your password must contain at least one number
                                  and one uppercase and lowercase letter, and at
                                  least 8 or more characters
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
                          <Col sm="7">
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
                                    backgroundColor: "white",
                                  }}
                                  type="password"
                                  placeholder="Password"
                                  pattern={newPass}
                                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                  required
                                  onChange={(e) => {
                                    setconfirmPass(e.target.value);
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Your confirm password must be the same as new
                                  password.
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
                          setaddress(user.address);
                          setcontactNumber(user.contact_number);
                          setemail(user.email);
                          setpetOwnerId(user.pet_owner_id);
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
                          setaddress(user.address);
                          setcontactNumber(user.contact_number);
                          setemail(user.email);
                          setpetOwnerId(user.pet_owner_id);
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
                      <Form>
                        <Form.Group as={Row} style={{ rowGap: 10 }}>
                          <Form.Label column sm="4">
                            Name
                          </Form.Label>
                          <Col sm="7">
                            <Form.Control
                              type="text"
                              value={name}
                              placeholder="Name"
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
                              placeholder="Email Address"
                              onChange={(e) => {
                                setemail(e.target.value);
                              }}
                            />
                          </Col>

                          <Form.Label column sm="4">
                            Address
                          </Form.Label>
                          <Col sm="7">
                            <Form.Control
                              type="text"
                              value={address}
                              placeholder="Address"
                              onChange={(e) => {
                                setaddress(e.target.value);
                              }}
                            />
                          </Col>

                          <Form.Label column sm="4">
                            Contact Number
                          </Form.Label>
                          <Col sm="7">
                            <Form.Control
                              type="text"
                              value={contactNumber}
                              placeholder="Contact Number"
                              onChange={(e) => {
                                setcontactNumber(e.target.value);
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
                              style={{
                                borderRadius: 30,
                                paddingLeft: 120,
                                paddingRight: 120,
                                backgroundColor: "#19B9CC",
                              }}
                              onClick={() => {
                                UpdatePetOwner();
                              }}
                            >
                              SAVE
                            </Button>
                          </div>
                        </Form.Group>
                      </Form>
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

export default PetOwnerSettings;
