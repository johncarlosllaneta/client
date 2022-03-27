import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Card, Col, Row } from "react-bootstrap";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { dateConvertion } from "../../../../../Components/FormatDateTime";

function PetProfile(props) {
  const [pet, setpet] = useState([]);
  const [counter, setcounter] = useState(0);

  useEffect(async () => {
    Axios.get(`${hostUrl}/doc/pets/${props.petid}`).then((response) => {
      setpet(response.data[0]);
    });
  }, []);
  // alert(pet.pet_name);
  return (
    <div
      style={{
        paddingLeft: "15vw",
        paddingRight: "15vw",
      }}
    >
      <Card
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

          display: "flex",
        }}
      >
        <div
          style={{
            display: "inline-flex",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
              margin: 0,
            }}
          >
            <Avatar
              name={pet.pet_name}
              round
              size={200}
              src={pet.pet_picture}
            />
          </div>

          <div
            style={{
              display: "block",
              justifyContent: "start",
              alignItems: "center",
              paddingTop: "10vh",
            }}
          >
            <h3
              style={{
                marginBottom: 0,
              }}
            >
              {pet.pet_name}
            </h3>
            <p
              style={{
                textAlign: "left",
              }}
            >
              {pet.breed_of_pet}
            </p>
          </div>

          <Row
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3>Pet Details</h3>
            </div>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "block",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Type of Pet
                  </h5>
                  <p>{pet.type_of_pet}</p>
                </div>
                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Gender
                  </h5>
                  <p>{pet.gender}</p>
                </div>
              </div>

              <div
                style={{
                  display: "block",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Birthday
                  </h5>
                  <p>{dateConvertion(String(pet.birth_day).split("T")[0])}</p>
                </div>

                <div>
                  <h5
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    Pet Owner
                  </h5>
                  <p>{pet.pet_owner_name}</p>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default PetProfile;
