import { Step, StepLabel, Stepper } from "@material-ui/core";

import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  FloatingLabel,
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import DataPrivacyNotice from "./DataPrivacyNotice";
import { IoChevronBack } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { apps } from "../Components/base";
import Avatar from "react-avatar";
import logo from "../../src/Images/logo.png";
import "../css/RegistrationVet.css";
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../Components/Host";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function RegistrationVet() {
  const [validEmails, setvalidEmails] = useState([]);
  const [counterEmails, setcounterEmails] = useState(0);
  const [emailControllerNessage, setemailControllerNessage] = useState(true);
  useEffect(() => {
    if (counterEmails < 5) {
      Axios.get(`${hostUrl}/users`).then((response) => {
        setvalidEmails(response.data);
      });
    }

    setcounterEmails(counterEmails + 1);
    console.log(validEmails);
  }, [validEmails]);

  function userExists(username) {
    return validEmails.some(function (el) {
      return el.email === email;
    });
  }

  const [validphoneNumber, setvalidphoneNumber] = useState([]);
  const [counterphoneNumber, setcounterphoneNumber] = useState(0);
  const [phoneNumberControllerNessage, setphoneNumberControllerNessage] =
    useState(true);
  useEffect(() => {
    if (counterphoneNumber < 5) {
      Axios.get(`${hostUrl}/phone_number`).then((response) => {
        setvalidphoneNumber(response.data);
      });
    }

    setcounterphoneNumber(counterphoneNumber + 1);
    console.log(validphoneNumber);
  }, [validphoneNumber]);

  function phoneNumberExists(username) {
    return validphoneNumber.some(function (el) {
      return el.phone_number === contactNumber;
    });
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agree, setagree] = useState("");
  const [address, setaddress] = useState("");
  const [houseNumber, sethouseNumber] = useState();
  const [street, setstreet] = useState();
  const [city, setcity] = useState();
  const [contactNumber, setcontactNumber] = useState("");
  const [imageUrl, setimageUrl] = useState();
  const [imageUploadedUrl, setimageUploadedUrl] = useState();
  const [preview, setPreview] = useState();

  const [enableProduct, setenableProduct] = useState("0");
  const [enablePharmacy, setenablePharmacy] = useState("0");
  const [enableService, setenableService] = useState("0");
  const [enableConsultation, setenableConsultation] = useState("0");
  const [enableExamination, setenableExamination] = useState("0");
  const [enableGrooming, setenableGrooming] = useState("0");
  const [enableVaccination, setenableVaccination] = useState("0");
  const [enablePreventiveControls, setenablePreventiveControls] = useState("0");
  const [enableInHouseLab, setenableInHouseLab] = useState("0");
  const [servicesEnable, setservicesEnable] = useState("none");

  const enableServices = (status) => {
    setservicesEnable(status);
  };

  const [dataPrivacyController, setdataPrivacyController] = useState("none");
  const [emailAndPasswordController, setemailAndPasswordController] =
    useState("none");
  const [profile, setprofile] = useState("none");
  const [vetOffers, setvetOffers] = useState("none");

  const classes = useStyles();
  const [activeStep, setactiveStep] = useState(0);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    if (activeStep === 0) {
      setdataPrivacyController("block");
      setemailAndPasswordController("none");
      setprofile("none");
      setvetOffers("none");
    } else if (activeStep === 1) {
      setdataPrivacyController("none");
      setemailAndPasswordController("block");
      setprofile("none");
      setvetOffers("none");
    } else if (activeStep === 2) {
      setdataPrivacyController("none");
      setemailAndPasswordController("none");
      setprofile("block");
      setvetOffers("none");
    } else if (activeStep === 3) {
      setdataPrivacyController("none");
      setemailAndPasswordController("none");
      setprofile("none");
      setvetOffers("block");
    }
  }, [activeStep]);

  function NextStep() {
    setactiveStep(activeStep + 1);
  }

  function handleEmailPassword(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (userExists(email)) {
        e.preventDefault();
        e.stopPropagation();
        setemailControllerNessage(false);
        console.log(userExists(email));
      } else {
        e.preventDefault();
        setactiveStep(activeStep + 1);
      }
    }

    setValidated(true);
  }

  function handleProfile(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setphoneNumberControllerNessage(true);
    } else {
      if (phoneNumberExists(contactNumber)) {
        e.preventDefault();
        e.stopPropagation();
        setphoneNumberControllerNessage(false);
      } else {
        e.preventDefault();
        setactiveStep(activeStep + 1);
      }
    }

    setValidated(true);
  }

  const uploadImage = async (e) => {
    const storageRef = apps.storage().ref();
    const filRef = storageRef.child(e.name);
    await filRef.put(e);
    setimageUploadedUrl(await filRef.getDownloadURL());
  };

  useEffect(() => {
    if (imageUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imageUrl);
      console.log(imageUrl);
    } else {
      setPreview(null);
    }
  }, [imageUrl]);

  const inputFile = useRef(null);
  const onClickProfile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    if (isSwitchOn) {
      enableServices("block");
      setenableService("1");
    } else {
      enableServices("none");
      setenableService("0");
    }
  }, [isSwitchOn]);

  const submitRegister = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setphoneNumberControllerNessage(true);
    } else {
      if (phoneNumberExists(contactNumber)) {
        e.preventDefault();
        e.stopPropagation();
        setphoneNumberControllerNessage(false);
      } else {
        e.preventDefault();
        Axios.post(`${hostUrl}/vetclinic/insert`, {
          email: email,
          password: password,
          name: name,
          address: houseNumber + " " + street + "," + city,
          contactNumber: contactNumber,
          vetPicture: imageUploadedUrl,
          enableProduct: enableProduct,
          enablePharmacy: enablePharmacy,
          enableService: enableService,
          enableConsultation: enableConsultation,
          enableExamination: enableExamination,
          enableGrooming: enableGrooming,
          enableVaccination: enableVaccination,
          enablePreventiveControls: enablePreventiveControls,
          enableInHouseLab: enableInHouseLab,
        }).then((response) => {
          if (response.data.message === "Registered") {
            Axios.post(`${hostUrl}/api/login`, {
              email: email,
              password: password,
            }).then((response) => {
              if (response.data.message == "Correct") {
                localStorage.setItem("ajwt", response.data.accessToken);
                localStorage.setItem("rjwt", response.data.refreshToken);
                localStorage.setItem("isLogin", true);
                localStorage.setItem("role", response.data.role);
                if (response.data.role == 2) {
                  localStorage.setItem("vetStatus", response.data.vetStatus);
                  localStorage.setItem("id", response.data.id);
                  Axios.post(`${hostUrl}/vetclinic/register/system/logs`, {
                    name: name,
                  });
                }
                window.location.href = `${hostUrlWeb}/`;
              }
            });
          }
        });
      }
    }

    setValidated(true);
  };

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div style={{ zoom: value }}>
      <Row className="mt-4">
        <a
          href="/"
          className="ml-5"
          style={{
            textDecoration: "none",
            float: "left",
            fontSize: 20,
            display: "flex",
            justifyContent: "start",
          }}
        >
          <IoChevronBack className="mt-1 " />
          Return to Home
        </a>
      </Row>

      {/* Data Privacy */}

      <Row
        style={{
          display: dataPrivacyController,
        }}
      >
        <Col>
          <Image
            src={logo}
            style={{
              height: 50,
            }}
          />

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
          <h1
            style={{
              textAlign: "center",
              fontSizeAdjust: 50,
              color: "#0A94A4",
              fontWeight: "bold",
              fontOpticalSizing: "auto",
            }}
          >
            Data Privacy Notice
          </h1>

          <Container
            id="dataPrivacy"
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              minWidth: 350,
              maxWidth: "60%",
              width: 600,
              height: 550,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              borderRadius: 30,
              padding: 10,
            }}
          >
            <DataPrivacyNotice />
          </Container>
          <Button className="mt-3" onClick={NextStep}>
            I Accept Privacy Policy
          </Button>
        </Col>
      </Row>

      {/* Form Email and Password */}
      <Row
        style={{
          display: emailAndPasswordController,
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            minWidth: 350,
            maxWidth: "60%",
            width: 500,
            height: 750,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: 30,
          }}
        >
          <Image
            src={logo}
            className="mt-5"
            style={{
              height: 50,
            }}
          />

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

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSizeAdjust: 50,
                color: "#0A94A4",
                fontWeight: "bold",
                fontOpticalSizing: "auto",
              }}
            >
              Create an Account
            </h1>
          </Row>

          <Container>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleEmailPassword}
            >
              <Form.Group
                style={{
                  textAlign: "left",
                }}
              >
                <FloatingLabel
                  controlId="floatingInputName"
                  label="Vet Full Name"
                  className="mb-3"
                >
                  <Form.Control
                    style={{
                      height: 50,
                      backgroundColor: "white",
                    }}
                    type="text"
                    placeholder="Name"
                    pattern="[a-zA-Z ]*$"
                    minLength={5}
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                style={{
                  textAlign: "left",
                }}
              >
                <FloatingLabel
                  controlId="floatingInputEmail"
                  label="Email Address"
                  className="mb-3"
                >
                  <Form.Control
                    style={{ height: 50, backgroundColor: "white" }}
                    type="email"
                    placeholder="Email Address"
                    pattern=".+@gmail\.com|.+@yahoo\.com|.+@hotmail\.com|.+@aol\.com|.+@hotmail\.co\.uk"
                    required
                    minLength={8}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>

                  <Form.Text
                    id="passwordHelpBlock"
                    hidden={emailControllerNessage}
                    style={{
                      color: "red",
                    }}
                  >
                    Invalid email. Please use other email address.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                style={{
                  textAlign: "left",
                }}
              >
                <FloatingLabel
                  controlId="floatingInputPassword"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    style={{ height: 50, backgroundColor: "white" }}
                    type="password"
                    placeholder="Password"
                    pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must contain at least one number, special
                    character, uppercase and lowercase letter, and at least 8 or
                    more characters
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

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
                    style={{ height: 50, backgroundColor: "white" }}
                    type="password"
                    placeholder="Confirm Password"
                    pattern={password}
                    required
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password should be the same with the first password
                    you've enter.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>

              <Button
                type="submit"
                className="mt-2 mb-3"
                style={{
                  backgroundColor: "#0A94A4",
                  width: "100%",
                  borderRadius: 5,
                  borderColor: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Next
              </Button>
            </Form>
          </Container>
        </Container>
      </Row>

      {/* Profile */}

      <Row
        style={{
          display: profile,
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            minWidth: 350,
            maxWidth: "60%",
            width: 700,
            height: 800,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: 30,
          }}
        >
          <Image
            src={logo}
            className="mt-5"
            style={{
              height: 50,
            }}
          />

          <h6
            style={{
              textAlign: "center",
              fontSizeAdjust: 25,
              color: "#0A94A4",
              fontWeight: "bold",
              fontOpticalSizing: "auto",
            }}
          >
            TERRAVET
          </h6>

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSizeAdjust: 50,
                color: "#0A94A4",
                fontWeight: "bold",
                fontOpticalSizing: "auto",
              }}
            >
              Set Profile
            </h1>
          </Row>

          <Container>
            <Form noValidate validated={validated} onSubmit={handleProfile}>
              <Form.Group onClick={onClickProfile}>
                {preview ? (
                  <Avatar round={true} src={preview} name={name} size={120} />
                ) : (
                  <div
                    style={{
                      border: 3,
                      borderStyle: "solid",
                      borderColor: "gray",
                      display: "inline-block",
                      backgroundColor: "white",
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      cursor: "pointer",
                    }}
                  >
                    <MdAddAPhoto className="mt-4" style={{ fontSize: 40 }} />
                  </div>
                )}

                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                  accept="image/*"
                  required
                  name="profile_pet"
                  onChange={(event) => {
                    event.preventDefault();
                    const file = event.target.files[0];
                    if (file && file.type.substr(0, 5) === "image") {
                      // console.log(event.target.value);
                      setimageUrl(file);
                      uploadImage(file);
                    } else {
                      setimageUrl(null);
                    }
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid display photo.
                </Form.Control.Feedback>
              </Form.Group>
              <p>Profile Picture</p>

              <Form.Group
                style={{
                  textAlign: "left",
                }}
              >
                <Form.Label>Phone Number</Form.Label>

                <Form.Control
                  style={{
                    height: 50,
                    backgroundColor: "white",
                  }}
                  type="text  "
                  placeholder="09** *** ****"
                  required
                  pattern="\d{11}"
                  maxLength="11"
                  onChange={(e) => {
                    setcontactNumber(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
                <Form.Text
                  id="passwordHelpBlock"
                  hidden={phoneNumberControllerNessage}
                  style={{
                    color: "red",
                  }}
                >
                  Invalid phone number. Please use other phone number.
                </Form.Text>
              </Form.Group>

              <Row>
                <h6
                  className="mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  Vet Address
                </h6>
                <Col>
                  <Form.Group
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <Form.Control
                      style={{
                        height: 50,
                        backgroundColor: "white",
                      }}
                      type="text"
                      placeholder="House Number"
                      required
                      onChange={(e) => {
                        sethouseNumber(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid house number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <Form.Control
                      style={{
                        height: 50,
                        backgroundColor: "white",
                      }}
                      type="text"
                      placeholder="Street"
                      required
                      onChange={(e) => {
                        setstreet(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid street.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <Form.Control
                      style={{
                        height: 50,
                        backgroundColor: "white",
                      }}
                      type="text"
                      placeholder="City/Municipality"
                      required
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                type="submit"
                className="mt-2 mb-3"
                style={{
                  backgroundColor: "#0A94A4",
                  width: "100%",
                  borderRadius: 5,
                  borderColor: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Next
              </Button>
            </Form>
          </Container>
        </Container>
      </Row>

      {/* Vet Offers */}

      <Row
        style={{
          display: vetOffers,
        }}
      >
        <Container
          style={{
            backgroundColor: "white",
            minWidth: 350,
            maxWidth: "60%",
            width: 600,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: 30,
          }}
        >
          <Image
            src={logo}
            className="mt-5"
            style={{
              height: 50,
            }}
          />

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

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSizeAdjust: 50,
                color: "#0A94A4",
                fontWeight: "bold",
                fontOpticalSizing: "auto",
              }}
            >
              Vet Offers
            </h1>
          </Row>

          <Container>
            <Form style={{ width: "100%" }} onSubmit={submitRegister}>
              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label
                      style={{ display: "flex", justifyContent: "start" }}
                      htmlFor="product"
                    >
                      Product
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Check
                      style={{ display: "flex", justifyContent: "start" }}
                      type="switch"
                      id="product"
                      onChange={(e) => {
                        setenableProduct(e.target.checked);
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label
                      style={{ display: "flex", justifyContent: "start" }}
                      htmlFor="pharmacy"
                    >
                      Pharmacy
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Check
                      style={{ display: "flex", justifyContent: "start" }}
                      type="switch"
                      id="pharmacy"
                      onChange={(e) => {
                        setenablePharmacy(e.target.checked);
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label
                      style={{ display: "flex", justifyContent: "start" }}
                      htmlFor="services"
                    >
                      Services
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Check
                      style={{ display: "flex", justifyContent: "start" }}
                      type="switch"
                      id="services"
                      onChange={onSwitchAction}
                      checked={isSwitchOn}
                    />
                  </Col>
                </Row>
              </Form.Group>

              {/* Services */}
              <div style={{ display: servicesEnable }}>
                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label
                        style={{ display: "flex", justifyContent: "center" }}
                        htmlFor="consultation"
                      >
                        Consulatation
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        style={{ display: "flex", justifyContent: "start" }}
                        type="switch"
                        id="consultation"
                        onChange={(e) => {
                          setenableConsultation(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: 17,
                        }}
                        htmlFor="petExamination"
                      >
                        Pet Examination
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        style={{ display: "flex", justifyContent: "start" }}
                        type="switch"
                        id="petExamination"
                        onChange={(e) => {
                          setenableExamination(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label
                        style={{ display: "flex", justifyContent: "center" }}
                        htmlFor="petGrooming"
                      >
                        Pet Grooming
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        style={{ display: "flex", justifyContent: "start" }}
                        type="switch"
                        id="petGrooming"
                        onChange={(e) => {
                          setenableGrooming(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: 17,
                        }}
                        htmlFor="petVaccination"
                      >
                        Pet Vaccination
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        style={{ display: "flex", justifyContent: "start" }}
                        type="switch"
                        id="petVaccination"
                        onChange={(e) => {
                          setenableVaccination(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: 17,
                        }}
                        htmlFor="preventiveControls"
                      >
                        Preventive Controls
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        style={{ display: "flex", justifyContent: "start" }}
                        type="switch"
                        id="preventiveControls"
                        onChange={(e) => {
                          setenablePreventiveControls(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginLeft: 17,
                        }}
                        htmlFor="inHouseLab"
                      >
                        In House Laboratory
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        style={{ display: "flex", justifyContent: "start" }}
                        type="switch"
                        id="inHouseLab"
                        onChange={(e) => {
                          setenableInHouseLab(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </div>

              <Button
                type="submit"
                className="mt-2 mb-3"
                style={{
                  backgroundColor: "#0A94A4",
                  width: "100%",
                  borderRadius: 5,
                  borderColor: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Finish
              </Button>
            </Form>
          </Container>
        </Container>
      </Row>

      {/* Stepper */}
      <Row style={{ marginTop: 20 }}>
        <Col>
          <Container style={{ padding: 0 }}>
            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>Data Privacy</StepLabel>
              </Step>

              <Step>
                <StepLabel>Email & Password</StepLabel>
              </Step>

              <Step>
                <StepLabel>Profile</StepLabel>
              </Step>

              <Step>
                <StepLabel>Vet Offers</StepLabel>
              </Step>
            </Stepper>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default RegistrationVet;
