import React, { useState } from "react";
import { Container, Row, Image, Button, Modal } from "react-bootstrap";
const CartCard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        backgroundColor: "transparent",
        rowGap: 40,
        height: 545,
        width: 1400,
        padding: 5,
      }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>

      <Container
        fluid
        style={{
          backgroundColor: "transparent",
          height: 140,
          width: 1500,
          borderRadius: 30,
          padding: 10,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 60,
            width: 1370,
          }}
        >
          <Image
            src="https://www.pedigree.com/images/default-source/products/dry/front-adult-grilled-steak-vegtable.tmb-.png?sfvrsn=1f506549_0"
            style={{ height: 105, width: 140 }}
          />
          <h5>₱ 60.00</h5>
          <h5>10</h5>
          <h5>₱ 600.00</h5>
          <Button
            style={{ backgroundColor: "#3BD2E3", height: 40 }}
            onClick={() => {
              handleShow();
            }}
          >
            Show Details
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default CartCard;
