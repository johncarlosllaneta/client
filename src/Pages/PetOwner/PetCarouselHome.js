import React from "react";
import { Card } from "react-bootstrap";
function PetCarouselHome(props) {
  return (
    <div>
      <Card
        onClick={() => {
          window.location.href = `/pets/${props.data.pet_id}`
        }}
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

          backgroundColor: 'white',
          borderColor: 'white',

          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          width: 200,
          marginRight: 15,
          marginLeft: 15,
          marginBottom: 10,
          padding: 0,
          cursor: 'pointer'
        }}
      >
        <Card.Img
          variant="top"
          src={props.data.pet_picture}
          style={{
            height: 200, borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        <Card.Body>
          <Card.Title style={{ textAlign: 'left' }}>

            {
              props.data.type_of_pet == 'Dog' ?
                <h6
                  style={{
                    color: "white", backgroundColor: '#19B9CC', borderRadius: 15, width: 50, padding: 3, display: 'flex', justifyContent: 'center'
                  }}
                > {props.data.type_of_pet}</h6>
                :
                <h6
                  style={{
                    color: "white", backgroundColor: 'green', borderRadius: 15, width: 50, padding: 3, display: 'flex', justifyContent: 'center'
                  }}
                > {props.data.type_of_pet}</h6>
            }

            <h4
              style={{ color: "black" }}
            >{props.data.pet_name}</h4>
            <h6
              style={{ color: "gray" }}
            >{props.data.breed_of_pet}</h6>
          </Card.Title>

        </Card.Body>
      </Card>
    </div >
  );
}

export default PetCarouselHome;
