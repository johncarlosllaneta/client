import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { hostUrl } from "../../Components/Host";

function PetsDataUpdate(props) {
  const [updateIndicator, setupdateIndicator] = useState(true);
  const [pet_id, setpet_id] = useState();
  const [pet_name, setpet_name] = useState();
  const [type_of_pet, settype_of_pet] = useState();
  const [breed_of_pet, setbreed_of_pet] = useState();
  const [gender, setgender] = useState();
  const [birth_day, setbirth_day] = useState();

  useEffect(() => {
    setpet_id(props.data.pet_id);
    setpet_name(props.data.pet_name);
    settype_of_pet(props.data.type_of_pet);
    setbreed_of_pet(props.data.breed_of_pet);
    setgender(props.data.gender);
    setbirth_day(new String(props.data.birth_day).split("T")[0]);
  }, [props]);

  function UpdatePet(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      axios
        .put(`${hostUrl}/pets/update/${pet_id}`, {
          pet_name: pet_name,
          type_of_pet: type_of_pet,
          breed_of_pet: breed_of_pet,
          gender: gender,
          birth_day: birth_day,
        })
        .then((response) => {
          if (response.status === 200) {
            setupdateIndicator(!updateIndicator);
          }
          props.onUpdateList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <Row>
        <Form validated={true} onSubmit={UpdatePet} noValidate>
          <Row>
            <Col sm="3" className="ml-5 ">
              <Row
                className="mt-5"
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={props.data.pet_picture}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 100,
                    border: "7px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                    marginTop: "2vh",
                  }}
                ></img>
              </Row>

              <Row
                className="mt-3"
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    value={pet_name}
                    minLength={3}
                    maxLength={20}
                    pattern="^[a-zA-Z ]*$"
                    required
                    onChange={(e) => {
                      setpet_name(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
            </Col>

            <Col sm={9} className="ml-3 mt-3">
              <Row className="mt-3" style={{ fontSize: 25 }}>
                <strong>Pet Details</strong>
              </Row>

              <Row className="mt-4 mb-4">
                <Col>
                  <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                    <strong>Type of Pet </strong>
                  </Row>
                  <Row
                    className="ml-5"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        as="select"
                        value={type_of_pet}
                        defaultValue={type_of_pet}
                        onChange={(e) => {
                          settype_of_pet(e.target.value);
                        }}
                        custom
                      >
                        <option>Cat</option>
                        <option>Dog</option>
                      </Form.Control>
                      {/* <Form.Control
                                            type="text"
                                            minLength={3}
                                            maxLength={3}
                                            pattern="^[a-zA-Z ]*$"
                                            required
                                            value={type_of_pet}  /> */}
                    </Form.Group>
                  </Row>

                  <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                    <strong>Breed </strong>
                  </Row>
                  <Row
                    className="ml-5"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        type="text"
                        minLength={3}
                        maxLength={20}
                        pattern="^[a-zA-Z ]*$"
                        required
                        value={breed_of_pet}
                        onChange={(e) => {
                          setbreed_of_pet(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                    <strong>Gender </strong>
                  </Row>
                  <Row
                    className="ml-5"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <Form.Group controlId="exampleForm.ControlInput1">
                      {/* <Form.Control type="select" value={gender} onChange={(e) => { setgender(e.target.value) }} /> */}
                      <Form.Control
                        as="select"
                        value={gender}
                        defaultValue={gender}
                        onChange={(e) => {
                          setgender(e.target.value);
                        }}
                        custom
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Control>
                    </Form.Group>
                  </Row>
                </Col>

                <Col>
                  <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                    <strong>Owner </strong>
                  </Row>
                  <Row
                    className="ml-5"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <p>{props.data.pet_owner_name}</p>
                  </Row>

                  <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                    <strong>Birth Date </strong>
                  </Row>
                  <Row
                    className="ml-5"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        type="date"
                        value={birth_day}
                        onChange={(e) => {
                          setbirth_day(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Row>
                </Col>

                <Col>
                  <Row style={{ fontSize: 20 }}>
                    <strong>Actions</strong>
                  </Row>
                  <Row style={{ fontSize: 20 }}>
                    <Button className="mt-2 ml-5" variant="info" type="submit">
                      <FaRegEdit /> Update Changes
                    </Button>
                  </Row>

                  <Row style={{ fontSize: 20 }}>
                    <Button
                      className="mt-2 ml-5"
                      variant="danger"
                      onClick={props.dataOne}
                    >
                      <AiOutlineDelete /> Cancel Changes
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}

export default PetsDataUpdate;
