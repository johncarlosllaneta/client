import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Button,
  Container,
  Form,
  Modal,
  Alert,
  FloatingLabel,
} from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import PetCarousel from "./PetCarousel";
import Axios from "axios";
import { MdAddAPhoto } from "react-icons/md";
import { hostUrl } from "../../Components/Host";
import Avatar from "react-avatar";
import { apps } from "../../Components/base";
import { useParams } from "react-router";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PetOwnerPets = () => {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
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

  const [idx, setidx] = useState("");
  const [variant, setvariant] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [petname, setPetName] = useState("");
  const [typeOfPet, setTypeOfPet] = useState("");
  const [breedOfPet, setBreedOfPet] = useState("");
  const [genderOfPet, setGenderOfPet] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [user, setuser] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 5) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
      });
      setcounter(counter + 1);
    }
  }, [user]);

  const [validated, setValidated] = useState(false);
  const submitRegister = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      Axios.post(`${hostUrl}/pets/insert`, {
        petOwnerId: user.pet_owner_id,
        petOwnerName: user.name,
        petname: petname,
        typeOfPet: typeOfPet,
        breedOfPet: breedOfPet,
        genderOfPet: genderOfPet,
        birthDate: birthDate,
        imageUrl: imageUploadedUrl,
      });
      handleClose2();
    }

    setValidated(true);
    // setidx(1);
    // setvariant("danger");
    // setAlertMessage("Something went wrong, failed to register pet");
    // setShowAlert(true);
  };

  var optionsGender = [
    { id: 100, gender: "" },
    { id: 101, gender: "Male" },
    { id: 102, gender: "Female" },
  ];

  return (
    <div
      style={{
        width: "100vw",
        marginTop: 70,
      }}
    >
      <Modal show={show2} onHide={handleClose2}>
        <Form onSubmit={submitRegister} noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title>Pet Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Alert key={idx} variant={variant} show={showAlert}>
              {alertMessage}
            </Alert> */}

            <Form.Group onClick={onClickProfile}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {preview ? (
                  <Avatar
                    round={true}
                    src={preview}
                    name={petname}
                    size={120}
                  />
                ) : (
                  <div
                    style={{
                      border: 3,
                      borderStyle: "solid",
                      borderColor: "gray",
                      display: "flex",
                      backgroundColor: "white",
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MdAddAPhoto style={{ fontSize: 40 }} />
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
              </div>

              <Form.Control.Feedback type="invalid">
                Please provide a valid display photo.
              </Form.Control.Feedback>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Pet Profile{" "}
                </p>
              </div>
            </Form.Group>

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
                  onChange={(e) => {
                    setPetName(e.target.value);
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
                {/* <Form.Control
                 as="select"
                 required
                
                  required
                  onChange={(e) => {
                    setTypeOfPet(e.target.value);
                  }}

                /> */}

                <Form.Select
                  aria-label="Floating label select example"
                  required
                  onChange={(e) => {
                    setTypeOfPet(e.target.value);
                  }}
                >
                  <option></option>
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
                  onChange={(e) => {
                    setBreedOfPet(e.target.value);
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
                  required
                  onChange={(e) => {
                    setGenderOfPet(e.target.value);
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
                  required
                  max={new Date().toJSON().slice(0, 10)}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Container >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",

          }}
        >
          <div>
            <h2>My Pets</h2>
          </div>
          <div>
            <Button
              style={{
                borderRadius: 30,
                borderColor: "white",
                borderWidth: 5,
                backgroundColor: "#3BD2E3",
                width: '10vw',
                minWidth: 100,
                height: 'auto',

                fontSize: '2vh'
              }}
              onClick={() => {
                handleShow2();
              }}
            >
              Add Pet
            </Button>
          </div>
        </div>
        <PetCarousel petOwnerId={user.pet_owner_id} />
      </Container>
    </div>
  );
};

export default PetOwnerPets;
