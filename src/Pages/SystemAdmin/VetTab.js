import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Tab, Tabs, Modal, Form, Button, Row } from "react-bootstrap";
import VetClinicVerifiedTable from "./VetClinicVerifiedTable";
import VetClinicPendintTable from "./VetClinicPendintTable";
import Axios from 'axios';
import { hostUrl } from "../../Components/Host";

const VetTab = () => {

  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setaddress] = useState("")
  const [street, setstreet] = useState("")
  const [city, setcity] = useState("")
  const [contactNumber, setcontactNumber] = useState("")
  const [fileImage, setFileImage] = useState("")


  const submitRegister = () => {

    setaddress(street + " " + city);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      password === confirmPassword &&
      address !== "" &&
      street !== "" &&
      city !== "" &&
      contactNumber !== "" &&
      fileImage !== ""
    ) {
      Axios.post(`${hostUrl}/vetclinic/insert`, {
        email: email,
        password: password,
        name: name,
        address: address,
        contactNumber: contactNumber,
        // fileImage: fileImage
      });


      console.log(name + " " + email + " " + password + " " + address + " " + contactNumber);
      handleCloseAdd();
    }
  };

  var swidth = window.screen.width;
  return (
    <div style={{ paddingRight: '5%' }}>
      <div style={{ marginLeft: (swidth - (swidth * 0.3)) }}>
        <Button className="mb-3 mt-5" variant="outline-primary" onClick={handleShowAdd}
          style={{ width: '80%' }}
        >Add</Button>
      </div>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form style={{ width: "90%" }}>
            <Form.Group style={{ textAlign: "left" }}>
              <Form.Label>Vet Name</Form.Label>


              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="text"
                placeholder="Sample Vet Name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.Label>Email address</Form.Label>


              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="email"
                placeholder="sample@email.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.Label>Password</Form.Label>

              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="password"
                placeholder="********"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Form.Text id="passwordHelpInline" muted>
                Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
              </Form.Text>
            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.Label>Confirm Password</Form.Label>

              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="password"
                placeholder="********"
                pattern={password}
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />

            </Form.Group>

            <Row>


              <Col>
                <Form.Group style={{ textAlign: "left" }}>
                  <Form.Label>Street</Form.Label>


                  <Form.Control
                    style={{ height: 50, backgroundColor: "white" }}
                    type="text"
                    placeholder="Street No."
                    required
                    onChange={(e) => {
                      setstreet(e.target.value);
                    }}
                  />

                </Form.Group>
              </Col>

              <Col>
                <Form.Group style={{ textAlign: "left" }}>
                  <Form.Label>City</Form.Label>


                  <Form.Control
                    style={{ height: 50, backgroundColor: "white" }}
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                  />

                </Form.Group>
              </Col>
            </Row>


            <Form.Group style={{ textAlign: "left" }}>
              <Form.Label>Contact Number</Form.Label>


              <Form.Control
                style={{ height: 50, backgroundColor: "white" }}
                type="text"
                placeholder="09123456789"
                required
                pattern="\d*"
                title="Must contain numbers only"
                onChange={(e) => {
                  setcontactNumber(e.target.value);
                  // console.log(e.target.value);
                }}
              />

            </Form.Group>

            <Form.Group style={{ textAlign: "left" }}>
              <Form.File
                id="custom-file"
                label={fileImage}
                name={fileImage}
                accept="image/*"
                data-browse="Upload"
                onChange={(e) => {
                  setFileImage(e.target.value);
                  console.log(e.target.value);
                }}
                custom
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={submitRegister}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Tabs defaultActiveKey="pending" id="uncontrolled-tab-example">

        <Tab eventKey="pending" title="Pending">
          <VetClinicPendintTable />
        </Tab>
        <Tab eventKey="verified" title="Verified">
          <VetClinicVerifiedTable />
        </Tab>
      </Tabs>
    </div >
  );
};

export default VetTab;
