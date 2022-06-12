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
import background from "../../../../Images/bg.png";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Avatar from "react-avatar";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import { ToastDelete, ToastUpdate } from "../../../../Components/Toast";
import { hostUrl, hostUrlWeb } from "../../../../Components/Host";

const VetSettings = (props) => {
  const [changePass, setChangePass] = useState("none");
  const [changeVetHours, setChangeVetHours] = useState("none");
  const [editCred, setEditCred] = useState("none");
  const [vetOffers, setVetOffers] = useState("none");
  const [handleChecker, sethandleChecker] = useState(true);

  const [password, setpassword] = useState();
  const [newPass, setnewPass] = useState();
  const [confirmPass, setconfirmPass] = useState();
  const [validated, setValidated] = useState(false);

  const [enableProduct, setenableProduct] = useState("0");
  const [enablePharmacy, setenablePharmacy] = useState("0");
  const [enableService, setenableService] = useState("0");
  const [enableConsultation, setenableConsultation] = useState("0");
  const [enableExamination, setenableExamination] = useState("0");
  const [enableGrooming, setenableGrooming] = useState("0");
  const [enableVaccination, setenableVaccination] = useState("0");
  const [enablePreventiveControls, setenablePreventiveControls] = useState("0");
  const [servicesEnable, setservicesEnable] = useState("none");

  const [OpeningMonday, setOpeningMonday] = useState();
  const [OpeningTuesday, setOpeningTuesday] = useState();
  const [OpeningWednesday, setOpeningWednesday] = useState();
  const [OpeningThursday, setOpeningThursday] = useState();
  const [OpeningFriday, setOpeningFriday] = useState();
  const [OpeningSaturday, setOpeningSaturday] = useState();
  const [OpeningSunday, setOpeningSunday] = useState();
  const [ClosingMonday, setClosingMonday] = useState();
  const [ClosingTuesday, setClosingTuesday] = useState();
  const [ClosingWednesday, setClosingWednesday] = useState();
  const [ClosingThursday, setClosingThursday] = useState();
  const [ClosingFriday, setClosingFriday] = useState();
  const [ClosingSaturday, setClosingSaturday] = useState();
  const [ClosingSunday, setClosingSunday] = useState();
  const [CheckerMonday, setCheckerMonday] = useState();
  const [CheckerTuesday, setCheckerTuesday] = useState();
  const [CheckerWednesday, setCheckerWednesday] = useState();
  const [CheckerThursday, setCheckerThursday] = useState();
  const [CheckerFriday, setCheckerFriday] = useState();
  const [CheckerSaturday, setCheckerSaturday] = useState();
  const [CheckerSunday, setCheckerSunday] = useState();
  const [CheckerSwitchMonday, setCheckerSwitchMonday] = useState();
  const [CheckerSwitchTuesday, setCheckerSwitchTuesday] = useState();
  const [CheckerSwitchWednesday, setCheckerSwitchWednesday] = useState();
  const [CheckerSwitchThursday, setCheckerSwitchThursday] = useState();
  const [CheckerSwitchFriday, setCheckerSwitchFriday] = useState();
  const [CheckerSwitchSaturday, setCheckerSwitchSaturday] = useState();
  const [CheckerSwitchSunday, setCheckerSwitchSunday] = useState();

  const [vetId, setvetId] = useState("");
  const [vetName, setvetName] = useState();
  const [vetEmail, setvetEmail] = useState();
  const [vetAddress, setvetAddress] = useState();
  const [vetContactNumber, setvetContactNumber] = useState();

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const [showOffers, setshowOffers] = useState(false);
  const handleCloseOffers = () => setshowOffers(false);
  const handleShowOffer = () => setshowOffers(true);

  const [showHours, setshowHours] = useState(false);
  const handleCloseHours = () => setshowHours(false);
  const handleShowHours = () => setshowHours(true);

  const enableServiceChecker = (status) => {
    setservicesEnable(status);
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    if (isSwitchOn) {
      enableServiceChecker("block");
      setenableService("1");
    } else {
      enableServiceChecker("none");
      setenableService("0");
    }
  }, [isSwitchOn]);

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

  function ChangeVetHoursController(checker) {
    if (checker !== true) {
      setChangePass("none");
      setChangeVetHours("block");
      setEditCred("none");
      setVetOffers("none");
    } else {
      setChangeVetHours("none");
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

  function VetOffersController(checker) {
    if (checker !== true) {
      setChangePass("none");
      setChangeVetHours("none");
      setEditCred("none");
      setVetOffers("block");
    } else {
      setVetOffers("none");
    }
  }

  function handlePassword(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
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
        console.log(user);
      });

      setcounter(counter + 1);
    }
  }, [counter, user]);

  function UpdateVetClinic(e) {
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

  function SaveVetInfo() {
    Axios.put(`${hostUrl}/vetclinic/update/${vetId}`, {
      vet_name: vetName,
      email: vetEmail,
      vet_address: vetAddress,
      vet_contact_number: vetContactNumber,
      oldnumber: user.vet_contact_number,
    }).then((response) => {
      // alert(response.data.message);
      if (response.data.message === "Update Successfully") {
        // alert("logging in");
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            // alert("logging in");
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }

            handleCloseOffers();
            ToastUpdate();
            setTimeout(() => {
              window.location.href = `/vet/settings`;
            }, 3000);
          }
        });
      }
    });
  }

  function editVetHours() {
    setvetId(user.vet_admin_id);
    setvetEmail(user.email);

    var Monday = user.scheduleMonday;
    if (Monday.length > 1) {
      setOpeningMonday(Monday.split(" - ")[0]);
      setClosingMonday(Monday.split(" - ")[1]);
      setCheckerMonday(false);
      setCheckerSwitchMonday(false);
    } else {
      setCheckerMonday(true);
      setCheckerSwitchMonday(true);
    }

    // alert(ClosingMonday);

    var Tuesday = user.scheduleTuesday;
    if (Tuesday.length > 1) {
      setOpeningTuesday(Tuesday.split(" - ")[0]);
      setClosingTuesday(Tuesday.split(" - ")[1]);
      setCheckerTuesday(false);
      setCheckerSwitchTuesday(false);
    } else {
      setCheckerTuesday(true);
      setCheckerSwitchTuesday(true);
    }
    // alert(ClosingMonday);

    var Wednesday = user.scheduleWednesday;
    if (Wednesday.length > 1) {
      setOpeningWednesday(Wednesday.split(" - ")[0]);
      setClosingWednesday(Wednesday.split(" - ")[1]);
      setCheckerWednesday(false);
      setCheckerSwitchWednesday(false);
    } else {
      setCheckerWednesday(true);
      setCheckerSwitchWednesday(true);
    }

    // alert(ClosingMonday);

    var Thursday = user.scheduleThursday;
    if (Thursday.length > 1) {
      setOpeningThursday(Thursday.split(" - ")[0]);
      setClosingThursday(Thursday.split(" - ")[1]);
      setCheckerThursday(false);
      setCheckerSwitchThursday(false);
    } else {
      setCheckerThursday(true);
      setCheckerSwitchThursday(true);
    }

    // alert(ClosingMonday);

    var Friday = user.scheduleFriday;
    if (Friday.length > 1) {
      setOpeningFriday(Friday.split(" - ")[0]);
      setClosingFriday(Friday.split(" - ")[1]);
      setCheckerFriday(false);
      setCheckerSwitchFriday(false);
    } else {
      setCheckerFriday(true);
      setCheckerSwitchFriday(true);
    }

    // alert(ClosingMonday);

    var Saturday = user.scheduleSaturday;
    if (Saturday.length > 1) {
      setOpeningSaturday(Saturday.split(" - ")[0]);
      setClosingSaturday(Saturday.split(" - ")[1]);
      setCheckerSaturday(false);
      setCheckerSwitchSaturday(false);
    } else {
      setCheckerSaturday(true);
      setCheckerSwitchSaturday(true);
    }

    // alert(ClosingMonday);

    var Sunday = user.scheduleSunday;
    if (Sunday.length > 1) {
      setOpeningSunday(Sunday.split(" - ")[0]);
      setClosingSunday(Sunday.split(" - ")[1]);
      setCheckerSunday(false);
      setCheckerSwitchSunday(false);
    } else {
      setCheckerSunday(true);
      setCheckerSwitchSunday(true);
    }
  }

  function UpdateVetHours() {
    handleShowHours();
  }
  function SaveVetHours() {
    var monday;
    var tuesday;
    var wednesday;
    var thursday;
    var friday;
    var saturday;
    var sunday;

    if (CheckerSwitchMonday) {
      monday = null;
    } else {
      monday = OpeningMonday + " - " + ClosingMonday;
    }

    if (CheckerSwitchTuesday) {
      tuesday = null;
    } else {
      tuesday = OpeningTuesday + " - " + ClosingTuesday;
    }

    if (CheckerSwitchWednesday) {
      wednesday = null;
    } else {
      wednesday = OpeningWednesday + " - " + ClosingWednesday;
    }

    if (CheckerThursday) {
      thursday = null;
    } else {
      thursday = OpeningThursday + " - " + ClosingThursday;
    }

    if (CheckerSwitchFriday) {
      friday = null;
    } else {
      friday = OpeningFriday + " - " + ClosingFriday;
    }

    if (CheckerSwitchSaturday) {
      saturday = null;
    } else {
      saturday = OpeningSaturday + " - " + ClosingSaturday;
    }

    if (CheckerSwitchSunday) {
      sunday = null;
    } else {
      sunday = OpeningSunday + " - " + ClosingSunday;
    }

    Axios.put(`${hostUrl}/vetclinic/schedule/update/${vetId}`, {
      scheduleMonday: monday,
      scheduleTuesday: tuesday,
      scheduleWednesday: wednesday,
      scheduleThursday: thursday,
      scheduleFriday: friday,
      scheduleSaturday: saturday,
      scheduleSunday: sunday,
    }).then((response) => {
      if (response.data.message === "Update Successfully") {
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }
            handleCloseOffers();
            ToastUpdate();
            setTimeout(() => {
              window.location.href = `/vet/settings`;
            }, 3000);
          }
        });
      }
    });
  }

  function editVetOffers() {
    if (user.enableProduct === 1) {
      setenableProduct(true);
    } else {
      setenableProduct(false);
    }

    if (user.enablePharmacy === 1) {
      setenablePharmacy(true);
    } else {
      setenablePharmacy(false);
    }

    if (user.enableServices === 1) {
      enableServiceChecker("block");
      setenableService("1");
      onSwitchAction();
    } else {
      enableServiceChecker("none");
      setenableService("0");
    }

    if (user.enableConsultation === 1) {
      setenableConsultation(true);
    } else {
      setenableConsultation(false);
    }

    if (user.enableExamination === 1) {
      setenableExamination(true);
    } else {
      setenableExamination(false);
    }

    if (user.enableGrooming === 1) {
      setenableGrooming(true);
    } else {
      setenableGrooming(false);
    }

    if (user.enableVaccination === 1) {
      setenableVaccination(true);
    } else {
      setenableVaccination(false);
    }

    if (user.enablePreventiveControls === 1) {
      setenablePreventiveControls(true);
    } else {
      setenablePreventiveControls(false);
    }
    setvetId(user.vet_admin_id);
    setvetEmail(user.email);
  }

  function UpdateVetOffers() {
    handleShowOffer();
  }
  function SaveVetOffers() {
    Axios.put(`${hostUrl}/vetclinic/offers/update/${vetId}`, {
      enableProduct: enableProduct,
      enablePharmacy: enablePharmacy,
      enableServices: enableService,
      enableConsultation: enableConsultation,
      enableExamination: enableExamination,
      enableGrooming: enableGrooming,
      enableVaccination: enableVaccination,
      enablePreventiveControls: enablePreventiveControls,
    }).then((response) => {
      if (response.data.message === "Update Successfully") {
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }
            handleClose();
            ToastUpdate();
            setTimeout(() => {
              window.location.href = `/vet/settings`;
            }, 3000);
          }
        });
      }
    });
  }

  const [passwordVerify, setpasswordVerify] = useState("none");
  const [resultVerify, setresultVerify] = useState();
  const currentComparePass = (password) => {
    // alert(resultVerify);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.post(`${hostUrl}/web/user/compare`, {
      currentHashPassword: user.password,
      currentPassword: password,
    }).then((response) => {
      setresultVerify(response.data);
      if (password != undefined) {
        if (resultVerify === true) {
          setpasswordVerify("none");
        } else {
          setpasswordVerify("block");
        }
      }
    });
  }, [password, resultVerify]);

  function changePassword(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false || password === null) {
      setpasswordVerify("block");
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShow();
    }
    setValidated(true);
  }

  function savePassword() {
    Axios.put(`${hostUrl}/web/vetclinic/password/${vetId}`, {
      newPassword: newPass,
    }).then((response) => {
      if (response.data.message === "Successfully") {
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }
          }
          handleCloseHours();
          ToastUpdate();
          setTimeout(() => {
            window.location.href = `/vet/settings`;
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
              setvetId(user.vetid);
              setvetEmail(user.email);
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
              setvetName(user.vet_name);
              setvetEmail(user.email);
              setvetAddress(user.vet_address);
              setvetContactNumber(user.vet_contact_number);
              setvetId(user.vet_admin_id);
              SaveVetInfo();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOffers}
        onHide={handleCloseOffers}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Vet Offers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to change your veterinary clinic offers?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOffers}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editVetOffers();
              SaveVetOffers();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showHours}
        onHide={handleCloseHours}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Vet Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to change your veterinary clinic working hours?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHours}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editVetHours();
              SaveVetHours();
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
                    src={user.vet_picture}
                    name={user.vet_name}
                    roundedCircle
                    style={{ height: 100, width: 100 }}
                  />
                  <div style={{ textAlign: "left", marginLeft: 10 }}>
                    <h3 style={{ color: "#8A8A8A", fontWeight: "bold" }}>
                      {user.vet_name}
                    </h3>
                    <h5 style={{ color: "#19B9CC", fontWeight: "bold" }}>
                      Vet Clinic
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
                          setvetId(user.vetid);
                          setvetEmail(user.email);
                        }}
                      >
                        Change Password
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          ChangePassController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setvetId(user.vetid);
                          setvetEmail(user.email);
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
                                  width: "50vw",
                                  backgroundColor: "white",
                                }}
                                type="password"
                                placeholder="Password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
                            <Col sm="8" style={{ paddingLeft: 20 }}>
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
                                      width: "50vw",
                                    }}
                                    type="password"
                                    placeholder="Password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required
                                    onChange={(e) => {
                                      setValidated(true);
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
                            <Col sm="8" style={{ paddingLeft: 20 }}>
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
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required
                                    onChange={(e) => {
                                      setValidated(true);
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
                          ChangeVetHoursController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          editVetHours();
                        }}
                      >
                        Change Veterinary Clinic Hours
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          ChangeVetHoursController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          editVetHours();
                        }}
                      />
                    </div>
                    <div
                      style={{
                        paddingTop: 10,
                        display: changeVetHours,
                      }}
                    >
                      <Form onSubmit={UpdateVetHours}>
                        <Form.Group style={{ width: 700 }}>
                          {/* Sunday */}
                          <Row>
                            <Col sm="2">
                              <Form.Label>Sunday</Form.Label>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={OpeningSunday}
                                disabled={CheckerSunday}
                                onChange={(e) => {
                                  setOpeningSunday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={ClosingSunday}
                                disabled={CheckerSunday}
                                onChange={(e) => {
                                  setClosingSunday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Form.Check
                                type="switch"
                                label="Close"
                                checked={CheckerSwitchSunday}
                                onChange={(e) => {
                                  // alert(e.target.checked);
                                  if (e.target.checked !== true) {
                                    setCheckerSwitchSunday(false);
                                    setCheckerSunday(false);
                                  } else {
                                    setCheckerSwitchSunday(true);
                                    setCheckerSunday(true);
                                    setOpeningSunday("");
                                    setClosingSunday("");
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          {/* Monday */}
                          <Row>
                            <Col sm="2">
                              <Form.Label>Monday</Form.Label>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={OpeningMonday}
                                disabled={CheckerMonday}
                                onChange={(e) => {
                                  setOpeningMonday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={ClosingMonday}
                                disabled={CheckerMonday}
                                onChange={(e) => {
                                  setClosingMonday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Form.Check
                                type="switch"
                                label="Close"
                                checked={CheckerSwitchMonday}
                                onChange={(e) => {
                                  if (e.target.checked !== true) {
                                    setCheckerSwitchMonday(false);
                                    setCheckerMonday(false);
                                  } else {
                                    setCheckerSwitchMonday(true);
                                    setCheckerMonday(true);
                                    setOpeningMonday("");
                                    setClosingMonday("");
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          {/* Tuesday */}
                          <Row>
                            <Col sm="2">
                              <Form.Label>Tuesday</Form.Label>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={OpeningTuesday}
                                disabled={CheckerTuesday}
                                onChange={(e) => {
                                  setOpeningTuesday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={ClosingTuesday}
                                disabled={CheckerTuesday}
                                onChange={(e) => {
                                  setClosingTuesday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Form.Check
                                type="switch"
                                label="Close"
                                checked={CheckerSwitchTuesday}
                                onChange={(e) => {
                                  if (e.target.checked !== true) {
                                    setCheckerSwitchTuesday(false);
                                    setCheckerTuesday(false);
                                  } else {
                                    setCheckerSwitchTuesday(true);
                                    setCheckerTuesday(true);
                                    setOpeningTuesday("");
                                    setClosingTuesday("");
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          {/* Wednesday */}
                          <Row>
                            <Col sm="2">
                              <Form.Label>Wednesday</Form.Label>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={OpeningWednesday}
                                disabled={CheckerWednesday}
                                onChange={(e) => {
                                  setOpeningWednesday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={ClosingWednesday}
                                disabled={CheckerWednesday}
                                onChange={(e) => {
                                  setClosingWednesday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Form.Check
                                type="switch"
                                label="Close"
                                checked={CheckerSwitchWednesday}
                                onChange={(e) => {
                                  // alert(e.target.checked);
                                  if (e.target.checked !== true) {
                                    setCheckerSwitchWednesday(false);
                                    setCheckerWednesday(false);
                                  } else {
                                    setCheckerSwitchWednesday(true);
                                    setCheckerWednesday(true);
                                    setOpeningWednesday("");
                                    setClosingWednesday("");
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          {/* Thursday */}
                          <Row>
                            <Col sm="2">
                              <Form.Label>Thursday</Form.Label>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={OpeningThursday}
                                disabled={CheckerThursday}
                                onChange={(e) => {
                                  setOpeningThursday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={ClosingThursday}
                                disabled={CheckerThursday}
                                onChange={(e) => {
                                  setClosingThursday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Form.Check
                                type="switch"
                                label="Close"
                                checked={CheckerSwitchThursday}
                                onChange={(e) => {
                                  // alert(e.target.checked);
                                  if (e.target.checked !== true) {
                                    setCheckerSwitchThursday(false);
                                    setCheckerThursday(false);
                                  } else {
                                    setCheckerSwitchThursday(true);
                                    setCheckerThursday(true);
                                    setOpeningThursday("");
                                    setClosingThursday("");
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          {/* Friday */}
                          <Row>
                            <Col sm="2">
                              <Form.Label>Friday</Form.Label>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={OpeningFriday}
                                disabled={CheckerFriday}
                                onChange={(e) => {
                                  setOpeningFriday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={ClosingFriday}
                                disabled={CheckerFriday}
                                onChange={(e) => {
                                  setClosingFriday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Form.Check
                                type="switch"
                                label="Close"
                                checked={CheckerSwitchFriday}
                                onChange={(e) => {
                                  // alert(e.target.checked);
                                  if (e.target.checked !== true) {
                                    setCheckerSwitchFriday(false);
                                    setCheckerFriday(false);
                                  } else {
                                    setCheckerSwitchFriday(true);
                                    setCheckerFriday(true);
                                    setOpeningFriday("");
                                    setClosingFriday("");
                                  }
                                }}
                              />
                            </Col>
                          </Row>

                          {/* Saturday */}
                          <Row>
                            <Col sm="2">
                              <Form.Label>Saturday</Form.Label>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={OpeningSaturday}
                                disabled={CheckerSaturday}
                                onChange={(e) => {
                                  setOpeningSaturday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                type="time"
                                value={ClosingSaturday}
                                disabled={CheckerSaturday}
                                onChange={(e) => {
                                  setClosingSaturday(e.target.value);
                                }}
                              />
                            </Col>
                            <Col sm="2">
                              <Form.Check
                                type="switch"
                                label="Close"
                                checked={CheckerSwitchSaturday}
                                onChange={(e) => {
                                  // alert(e.target.checked);
                                  if (e.target.checked !== true) {
                                    setCheckerSwitchSaturday(false);
                                    setCheckerSaturday(false);
                                  } else {
                                    setCheckerSwitchSaturday(true);
                                    setCheckerSaturday(true);
                                    setOpeningSaturday("");
                                    setClosingSaturday("");
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                          <div
                            style={{
                              margin: 10,
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
                                UpdateVetHours();
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
                          setvetName(user.vet_name);
                          setvetEmail(user.email);
                          setvetAddress(user.vet_address);
                          setvetContactNumber(user.vet_contact_number);
                          setvetId(user.vet_admin_id);
                        }}
                      >
                        Edit Information
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          EditCredController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setvetName(user.vet_name);
                          setvetEmail(user.email);
                          setvetAddress(user.vet_address);
                          setvetContactNumber(user.vet_contact_number);
                          setvetId(user.vet_admin_id);
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
                        <Form validated={true} onSubmit={UpdateVetClinic}>
                          <Form.Group as={Row} style={{ rowGap: 10 }}>
                            <Form.Label column sm="4">
                              Veterinary Name
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                value={vetName}
                                placeholder="Vet Name"
                                pattern="^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _\\-]*$"
                                minLength={5}
                                required
                                onChange={(e) => {
                                  setvetName(e.target.value);
                                }}
                              />
                            </Col>

                            <Form.Label column sm="4">
                              Address
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                value={vetAddress}
                                placeholder="Address"
                                required
                                minLength={10}
                                onChange={(e) => {
                                  setvetAddress(e.target.value);
                                }}
                              />
                            </Col>

                            <Form.Label column sm="4">
                              Contact Number
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                required
                                pattern="\d{11}"
                                maxLength="11"
                                minLength="11"
                                placeholder="Contact Number"
                                value={vetContactNumber}
                                onChange={(e) => {
                                  setvetContactNumber(e.target.value);
                                }}
                              />
                            </Col>

                            <Form.Label column sm="4">
                              Email Address
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                placeholder="Email Address"
                                value={vetEmail}
                                onChange={(e) => {
                                  setvetEmail(e.target.value);
                                }}
                              />
                            </Col>
                          </Form.Group>
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
                          VetOffersController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          editVetOffers();
                        }}
                      >
                        Vet Offers
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          VetOffersController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          editVetOffers();
                        }}
                      />
                    </div>
                    <div style={{ display: vetOffers }}>
                      <Form>
                        <Form.Group as={Row} style={{ rowGap: 7 }}>
                          <Form.Label column sm="4">
                            Pharmacy
                          </Form.Label>
                          <Col sm="7">
                            <Form.Check
                              type="switch"
                              checked={enablePharmacy}
                              onChange={(e) => {
                                setenablePharmacy(e.target.checked);
                              }}
                            />
                          </Col>

                          <Form.Label column sm="4">
                            Products
                          </Form.Label>
                          <Col sm="7">
                            <Form.Check
                              type="switch"
                              checked={enableProduct}
                              onChange={(e) => {
                                setenableProduct(e.target.checked);
                              }}
                            />
                          </Col>

                          <Form.Label column sm="4" htmlFor="services">
                            Services
                          </Form.Label>
                          <Col sm="7">
                            <Form.Check
                              type="switch"
                              id="services"
                              value={enableService}
                              onChange={onSwitchAction}
                              checked={isSwitchOn}
                            />
                          </Col>

                          <div
                            style={{
                              display: servicesEnable,
                              marginLeft: 20,
                              marginTop: -10,
                            }}
                          >
                            <Form.Group as={Row}>
                              <Form.Label column sm="4" htmlFor="consultation">
                                Consultation
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  style={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                  type="switch"
                                  id="consultation"
                                  checked={enableConsultation}
                                  onChange={(e) => {
                                    setenableConsultation(e.target.checked);
                                  }}
                                />
                              </Col>

                              <Form.Label
                                column
                                sm="4"
                                htmlFor="petExamination"
                              >
                                Pet Examination
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  style={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                  type="switch"
                                  id="petExamination"
                                  checked={enableExamination}
                                  onChange={(e) => {
                                    setenableExamination(e.target.checked);
                                  }}
                                />
                              </Col>

                              <Form.Label column sm="4" htmlFor="petGrooming">
                                Pet Grooming
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  style={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                  type="switch"
                                  id="petGrooming"
                                  checked={enableGrooming}
                                  onChange={(e) => {
                                    setenableGrooming(e.target.checked);
                                  }}
                                />
                              </Col>

                              <Form.Label
                                column
                                sm="4"
                                htmlFor="petVaccination"
                              >
                                Pet Vaccination
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  style={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                  type="switch"
                                  id="petVaccination"
                                  checked={enableVaccination}
                                  onChange={(e) => {
                                    setenableVaccination(e.target.checked);
                                  }}
                                />
                              </Col>

                              <Form.Label
                                column
                                sm="4"
                                htmlFor="preventiveControls"
                              >
                                Preventive Controls
                              </Form.Label>
                              <Col sm="7">
                                <Form.Check
                                  style={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}
                                  type="switch"
                                  id="preventiveControls"
                                  checked={enablePreventiveControls}
                                  onChange={(e) => {
                                    setenablePreventiveControls(
                                      e.target.checked
                                    );
                                  }}
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div
                            style={{
                              margin: 10,
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
                                UpdateVetOffers();
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
};

export default VetSettings;
