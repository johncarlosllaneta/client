import Avatar from "react-avatar";
import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Button,
  Container,
  Form,
  Modal,
  Overlay,
  Popover,
  Row,
  Card,
  FloatingLabel,
  Spinner,
  Carousel,
  Image,
  Tab,
  Tabs,
} from "react-bootstrap";
import "../VetClinic/vetClinic.css";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ReqReservation from "../VetClinic/ReqReservation";
import HealthCard from "./HealthCard";
import VaccineCard from "./VaccineCard";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import { FormatDate } from "../../Components/FormatDateTime";
import { apps } from "../../Components/base";
import { BiWindows } from "react-icons/bi";

import DogVaccineChart from "../../Images/DogVaccineChart.png";
import CatVaccineChart from "../../Images/CatVaccineChart.png";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 900, min: 700 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 500, min: 300 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 200, min: 100 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 200, min: 0 },
    items: 1,
  },
};

function PetDetailsInformation(props) {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  const [pet, setPet] = useState([]);
  const [counter, setcounter] = useState(0);
  const [birthday, setbirthday] = useState();

  const [updateIndicator, setupdateIndicator] = useState(true);
  const [updatePetId, setUpdatePetId] = useState("");
  const [updatePetName, setUpdatePetName] = useState();
  const [updateTypeOfPet, setUpdateTypeOfPet] = useState();
  const [updateBreed, setUpdateBreed] = useState();
  const [updateGender, setUpdateGender] = useState();
  const [updateBirthday, setUpdateBirthday] = useState();
  const [updatePetPicture, setUpdatePetPicture] = useState();

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    if (counter < 2) {
      Axios.get(`${hostUrl}/pets/information/${props.data}`).then(
        (response) => {
          setPet(response.data[0]);
          console.log(pet);
        }
      );

      setbirthday(formatDate(pet.birth_day));
      setUpdatePetName(pet.pet_name);
      setUpdateTypeOfPet(pet.type_of_pet);
      setUpdatePetPicture(pet.pet_picture);
      setUpdateGender(pet.gender);
      setUpdateBirthday(new String(pet.birth_day).split("T")[0]);
      setUpdateBreed(pet.breed_of_pet);
      setUpdatePetId(pet.pet_id);
    }
    setcounter(counter + 1);
  }, [pet]);

  const [key, setKey] = useState("health-card");

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  var optionsGender = [
    { id: 100, gender: "" },
    { id: 101, gender: "Male" },
    { id: 102, gender: "Female" },
  ];

  const [showToolTip, setShowToolTip] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowToolTip(!showToolTip);
    setTarget(event.target);
  };
  const inputFile = useRef(null);
  const onClickProfile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const [imageUrl, setimageUrl] = useState();
  const [imageUploadedUrl, setimageUploadedUrl] = useState();
  const uploadImage = async (e) => {
    const storageRef = apps.storage().ref();
    const filRef = storageRef.child(e.name);
    await filRef.put(e);
    setimageUploadedUrl(await filRef.getDownloadURL());
  };

  // const [imageUrl, setimageUrl] = useState();
  const [preview, setPreview] = useState();
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

  const [validated, setValidated] = useState(false);
  const UpdatePet = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      Axios.put(`${hostUrl}/pets/update/${updatePetId}`, {
        pet_name: updatePetName,
        type_of_pet: updateTypeOfPet,
        breed_of_pet: updateBreed,
        gender: updateGender,
        birth_day: updateBirthday,
      });
      handleClose2();
    }
    setValidated(true);
    // window.location.reload();
  };

  const deletePet = () => {
    Axios.put(`${hostUrl}/pets/archived/${updatePetId}`);
    handleClose2();
    window.location.href = "/pets";
  };

  // delete modal
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  // loading modal

  const [showLoading, setShowLoading] = useState(false);

  const handleCloseLoading = () => setShowLoading(false);
  const handleShowLoading = () => setShowLoading(true);

  //Vaccination guide modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      style={{
        width: "100vw",
        height: 'auto',
        marginTop: 70,
        backgroundColor: "#F1F9FC",
      }}
    >
      {/* Vaccination Guide */}
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        size="xl"
        style={{ height: 800 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Vaccination Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Carousel responsive={responsive}> */}
          <div
            style={{ overflowX: "auto", display: "flex", flexDirection: "row" }}
          >
            <div style={{ margin: 15 }}>
              <Image
                src={DogVaccineChart}
                style={{ height: 600, width: 1100 }}
              />
            </div>
            <div style={{ margin: 15 }}>
              <Image
                src={CatVaccineChart}
                style={{ height: 600, width: 1100 }}
              />
            </div>
          </div>
          {/* </Carousel> */}
        </Modal.Body>
      </Modal>

      {/* Loading */}
      <Modal
        show={showLoading}
        onHide={handleCloseLoading}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p
              style={{
                marginTop: 10,
                marginLeft: 10,
                fontWeight: "bold",
              }}
            >
              {" "}
              Please wait{" "}
            </p>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Delete Pet */}

      <Modal
        show={showDelete}
        onHide={handleCloseDelete}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this pet ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={deletePet}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Form noValidate validated={validated} onSubmit={UpdatePet}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Pet Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicProduct">
              <FloatingLabel
                controlId="floatingInput"
                label="Pet Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z ]*$"
                  required
                  value={updatePetName}
                  placeholder="Sample Pet Name"
                  onChange={(e) => {
                    setUpdatePetName(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProductD">
              <FloatingLabel
                controlId="floatingInput"
                label="Type of Pet"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={updateTypeOfPet}
                  placeholder="Ex.Dog"
                  onChange={(e) => {
                    setUpdateTypeOfPet(e.target.value);
                  }}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formBasicProductQ">
              <FloatingLabel
                controlId="floatingInput"
                label="Breed"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  minLength={3}
                  maxLength={20}
                  pattern="[a-zA-Z ]*$"
                  required
                  value={updateBreed}
                  placeholder="Ex.Aspin"
                  onChange={(e) => {
                    setUpdateBreed(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formGridStateGender">
              <FloatingLabel
                controlId="floatingInput"
                label="Gender"
                className="mb-3"
              >
                <Form.Control
                  as="select"
                  value={updateGender}
                  onChange={(e) => {
                    setUpdateGender(e.target.value);
                  }}
                >
                  {optionsGender.map((val) => {
                    return <option key={val.id}>{val.gender}</option>;
                  })}
                </Form.Control>
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formGridState">
              <FloatingLabel
                controlId="floatingInput"
                label="Birth date"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  value={updateBirthday}
                  required
                  max={new Date().toJSON().slice(0, 10)}
                  required
                  onChange={(e) => {
                    setUpdateBirthday(e.target.value);
                  }}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                handleClose2();
                handleShowDelete();
              }}
            >
              Delete
            </Button>
            <Button variant="secondary" onClick={handleClose2}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 50,
          marginBottom: 20,
        }}
      >
        <Button
          href="/pets"
          style={{
            backgroundColor: "#3BD2E3",
            width: "5vw",
            borderRadius: 50,
            borderStyle: "none",
            marginLeft: 30,
            marginTop: 30,
            borderColor: "#FFFFFF",
          }}
        >
          Back
        </Button>

        <Button
          style={{
            backgroundColor: "#3BD2E3",
            width: "10vw",
            borderRadius: 50,
            borderStyle: "none",
            marginRight: 80,
            marginTop: 30,
          }}
          onClick={() => {
            handleShow();
          }}
        >
          Vaccination Guide
        </Button>
      </div>
      <Container
        style={{
          backgroundColor: "white",
          width: "100vw",

          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Row>
          <Col>
            {/* Pet Picture */}
            <Avatar
              src={updatePetPicture}
              name={updatePetName}
              size={200}
              style={{
                marginLeft: -70,
              }}
            />
          </Col>

          <Col>
            {/* name and breed */}
            <h3
              style={{
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontSize: 50,
                  marginTop: 50,
                  color: "black",
                }}
              >
                {" "}
                {updatePetName}
              </p>

              <br />
              <p
                style={{
                  marginTop: -50,
                  color: "#19B9CC",
                }}
              >
                {updateBreed}
              </p>
            </h3>
          </Col>

          <Col>
            {/* type of pet */}
            <h3
              style={{
                textAlign: "left",
                marginLeft: 30,
              }}
            >
              <p
                style={{
                  fontSize: 30,
                  marginTop: 70,
                  color: "black",
                }}
              >
                {" "}
                Type of Pet:
              </p>

              <br />
              <p
                style={{
                  fontSize: 20,
                  marginTop: -50,
                  color: "#19B9CC",
                }}
              >
                {updateTypeOfPet}
              </p>
            </h3>
          </Col>

          <Col>
            {/* birthday */}
            <h3
              style={{
                textAlign: "left",
                marginLeft: 30,
              }}
            >
              <p
                style={{
                  fontSize: 30,
                  marginTop: 70,
                  color: "black",
                }}
              >
                {" "}
                Birth Date:
              </p>

              <br />
              <p
                style={{
                  fontSize: 20,
                  marginTop: -50,
                  color: "#19B9CC",
                }}
              >{`${birthday}`}</p>
            </h3>
          </Col>

          <Col>
            {/* action button */}
            <Row>
              <BsFillInfoCircleFill
                onClick={handleClick}
                style={{
                  color: "#0A94A4",
                  fontSize: 30,
                  cursor: "pointer",
                  marginLeft: 100,
                  marginTop: 20,
                }}
              />
              <Overlay
                show={showToolTip}
                target={target}
                placement="bottom-start"
                container={ref.current}
                containerPadding={20}
              >
                <Popover id="popover-contained">
                  <Popover.Header as="h3">
                    <strong>Helper</strong>
                  </Popover.Header>
                  <Popover.Body>
                    <h5
                      style={{
                        color: "#3BD2E3",
                      }}
                    >
                      Pet Details
                    </h5>
                    <p> This page is for viewing your pet's details.</p>
                    <h5
                      style={{
                        color: "#3BD2E3",
                      }}
                    >
                      Health Card
                    </h5>
                    <p>
                      Health Card contains information about the past
                      appointments of the pet.
                    </p>
                    <h5
                      style={{
                        color: "#3BD2E3",
                      }}
                    >
                      Vaccine Card
                    </h5>
                    <p>
                      Vaccine Card contains information about the vaccine
                      history of the pet.
                    </p>
                  </Popover.Body>
                </Popover>
              </Overlay>
            </Row>
            <Row>
              <Button
                style={{
                  backgroundColor: "#19B9CC",
                  width: "10vw",
                  borderRadius: 50,
                  borderStyle: "none",
                  marginLeft: 30,
                  marginTop: 30,
                }}
                onClick={() => {
                  handleShow2();
                }}
              >
                Edit Profile
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container
        style={{
          width: "100vw",
          height: "50vh",
          marginTop: 50,
        }}
      >
        <Card
          style={{
            padding: 20,
            backgroundColor: "white",
            marginLeft: -10,
            marginRight: -10,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Tabs defaultActiveKey="health">
            <Tab eventKey="health" title="Health Card">
              <HealthCard />
            </Tab>
            <Tab eventKey="vaccine" title="Vaccine Card">
              <VaccineCard />
            </Tab>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
}

export default PetDetailsInformation;
