import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Image, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import logo from "../../src/Images/assets/logo.png";
import RegisterFooter from "./RegisterFooter";
import { IoChevronBack } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { hostUrl, hostUrlWeb } from "../Components/Host";
import DataPrivacyNotice from "./DataPrivacyNotice";
import { apps } from "../Components/base";

function RegisterFormVet() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [imageUploadedUrl, setimageUploadedUrl] = useState();
  const [enableProduct, setenableProduct] = useState("0");
  const [enablePharmacy, setenablePharmacy] = useState("0");
  const [enableService, setenableService] = useState("0");
  const [enableConsultation, setenableConsultation] = useState("0");
  const [enableExamination, setenableExamination] = useState("0");
  const [enableGrooming, setenableGrooming] = useState("0");
  const [enableVaccination, setenableVaccination] = useState("0");
  const [enablePreventiveControls, setenablePreventiveControls] = useState("0");
  const [enableInHouseLab, setenableInHouseLab] = useState("0");

  const [firstPane, setfirstPane] = useState("block");
  const [secondPane, setsecondPane] = useState("none");
  const [thirdPane, setthirdPane] = useState("none");

  const [imageUrl, setimageUrl] = useState();
  // const [profile, setprofile] = useState();
  const [preview, setPreview] = useState();
  const inputFile = useRef(null);
  const onClickProfile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const [dataPrivacyPane, setdataPrivacyPane] = useState("block");
  const [FormPane, setFormPane] = useState("none");
  const [servicesEnable, setservicesEnable] = useState("none");

  const enableServices = (status) => {
    setservicesEnable(status);
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

  const submitRegister = (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      password === confirmPassword &&
      address !== "" &&
      contactNumber !== ""
    ) {
      Axios.post(`${hostUrl}/vetclinic/insert`, {
        email: email,
        password: password,
        name: name,
        address: address,
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
          Axios.get(`${hostUrl}/api/login`, {
            params: {
              email: email,
              password: password,
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
              window.location.href = `${hostUrlWeb}/`;
            }
          });
        }
      });
    }
  };

  const second = (e) => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      password === confirmPassword
    ) {
      setfirstPane("none");
      setsecondPane("block");
    }
    e.preventDefault();
  };

  const third = (e) => {
    setfirstPane("none");
    setsecondPane("none");
    setthirdPane("block");

    e.preventDefault();
  };

  const changePaneFunction = () => {
    setdataPrivacyPane("none");
    setFormPane("block");
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <a
        href="/"
        className="mb-5 ml-5"
        style={{ textDecoration: "none", float: "left", fontSize: 20 }}
      >
        <IoChevronBack />
        Return to Home
      </a>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Image src={logo} />

      <div style={{ display: dataPrivacyPane }}>
        <DataPrivacyNotice changePaneFunction={changePaneFunction} />
      </div>

      <div style={{ display: FormPane }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: 50,
            color: "#0A94A4",
            fontWeight: "bold",
            marginLeft: "10%",
          }}
        >
          Create an Account
        </h1>
        <Form style={{ width: "50%", marginLeft: "30%" }} onSubmit={second}>
          <div style={{ display: firstPane }}>
            <Form.Group style={{ textAlign: "left" }}>
              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="text"
                placeholder="Name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="email"
                placeholder="Email Address"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="password"
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must contain at least one number and one uppercase
                and lowercase letter, and at least 8 or more characters
              </Form.Text>
            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
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
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
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
            >
              REGISTER
            </Button>
          </div>
        </Form>

        <Form style={{ width: "50%", marginLeft: "30%" }} onSubmit={third}>
          <div style={{ display: secondPane }}>
            <h5>Personal Information</h5>

            <Col>
              <Form.Group onClick={onClickProfile}>
                {preview ? (
                  <Image
                    style={{
                      display: "inline-block",
                      border: 2,
                      backgroundColor: "lightblue",
                      height: 150,
                      width: 150,
                      borderRadius: 75,
                      objectFit: "cover",
                    }}
                    src={preview}
                    alt={"preview"}
                  />
                ) : (
                  <div
                    style={{
                      border: 3,
                      borderStyle: "solid",
                      borderColor: "black",
                      display: "inline-block",
                      backgroundColor: "lightblue",
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
              </Form.Group>
              <p>Profile Picture</p>
            </Col>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="text"
                placeholder="Address"
                required
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.Control
                style={{
                  height: 50,
                  backgroundColor: "white",
                  appearance: "none",
                  MozAppearance: "textfield",
                }}
                type="number"
                placeholder="Contact Number"
                pattern="\d*"
                maxLength={11}
                max={11}
                required
                onChange={(e) => {
                  setcontactNumber(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
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
            >
              DONE
            </Button>
          </div>

          <Form style={{ width: "100%" }} onSubmit={submitRegister}>
            <div style={{ display: thirdPane }}>
              <h1
                style={{
                  textAlign: "left",
                  fontSize: 40,
                  color: "#0A94A4",
                  fontWeight: "bold",
                }}
              >
                Vet Offers
              </h1>

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
                        htmlFor="inhouseLab"
                      >
                        In House Laboratory
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        style={{ display: "flex", justifyContent: "start" }}
                        type="switch"
                        id="inhouseLab"
                        onChange={(e) => {
                          setenableInHouseLab(e.target.checked);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </div>

              <Button
                variant="primary"
                type="submit"
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
              >
                Finish
              </Button>
            </div>
          </Form>

          <hr></hr>
          <p>
            Login Already? <a href="/login">Login</a>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default RegisterFormVet;
