import React from "react";
import { Row, Col } from "react-bootstrap";
import { FormatDate } from "../../Components/FormatDateTime";

function PetsData(props) {
  // console.log(props.data);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div>
      <Row>
        <Col sm="2" className="ml-5 ">
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
            <strong style={{ fontSize: 20 }}>{props.data.pet_name}</strong>
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
              <Row className="ml-5" style={{ fontSize: 20, color: "black" }}>
                <p>{props.data.type_of_pet}</p>
              </Row>

              <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                <strong>Breed </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 20, color: "black" }}>
                <p>{props.data.breed_of_pet}</p>
              </Row>

              <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                <strong>Gender </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 20, color: "black" }}>
                <p>{props.data.gender}</p>
              </Row>
            </Col>

            <Col>
              <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                <strong>Owner </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 20, color: "black" }}>
                <p>{props.data.pet_owner_name}</p>
              </Row>

              <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                <strong>Birth Date </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 20, color: "black" }}>
                <p>{FormatDate({ datetime: props.data.birth_day })}</p>
              </Row>

              <Row className="ml-5" style={{ fontSize: 15, color: "grey" }}>
                <strong>Age </strong>
              </Row>
              <Row className="ml-5" style={{ fontSize: 20, color: "black" }}>
                <p>
                  {getAge(props.data.birth_day) <= 1
                    ? getAge(props.data.birth_day) + "yr old"
                    : getAge(props.data.birth_day) + "yrs old"}
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="ml-5"></Col>
      </Row>
    </div>
  );
}

export default PetsData;
