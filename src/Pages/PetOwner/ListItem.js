import React, { useState } from "react";
import {
  Card,
  Modal,
  Button,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const ListItem = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function increase() {
    setCount(count + 1);
  }
  function decrease() {
    setCount(count - 1);
  }
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        rowGap: 40,
        columnGap: 50,
        height: 510,
        width: 900,
      }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Row>
            <Col>
              <Container style={{ backgroundColor: "#EFF1F7", width: 220 }}>
                <Image
                  style={{ height: 260, width: 160, margin: 10 }}
                  src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
                />
              </Container>
            </Col>
            <Col>
              <Container style={{ width: 200 }}>
                <h5 style={{ color: "#3BD2E3" }}>
                  BEAUTY PRO LARGE BREED 2.5KG DOG DRY FOOD (AF-15)
                </h5>
                <p style={{ fontSize: 10 }}>
                  MADE IN JAPAN For dogs 1 year old and above Large grain type
                  with firm and chewy texture. Promotes growth of healthy
                  bacteria in the intestine with higher dietary fiber
                </p>
                <h6>Price: ₱60.00</h6>
                <br />
                <h6>
                  Quantity:{" "}
                  <AiFillMinusCircle
                    style={{ fontSize: 20 }}
                    onClick={decrease}
                  />
                  {count}
                  <AiFillPlusCircle
                    style={{ fontSize: 20 }}
                    onClick={increase}
                  />
                </h6>
              </Container>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-around" }}>
          <Button
            style={{
              backgroundColor: "#3BD2E3",
              borderRadius: 30,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onClick={handleClose}
          >
            Add To Cart
          </Button>
          <Button
            style={{
              backgroundColor: "#3BD2E3",
              borderRadius: 30,
              paddingLeft: 40,
              paddingRight: 40,
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>

      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: 30,
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <Card.Img
          variant="top"
          src="https://www.dogfoodadvisor.com/wp-content/uploads/2019/06/Instinct-Original-with-Real-Beef-Dry-Dog-Food-300x510.jpg"
          style={{ height: 120, width: 80, margin: 5 }}
        />
        <Card.Body>
          <Card.Text>This Instinct example derives</Card.Text>
        </Card.Body>
        <h5>₱60.00</h5>
      </Card>
    </div>
  );
};

export default ListItem;
