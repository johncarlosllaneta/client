import React from "react";
import { Container, Image } from "react-bootstrap";
import { useParams, BrowserRouter as Router, Link } from "react-router-dom";
function CategoryContainer(props) {
  return (
    <Link
      to={props.link}
      style={{
        textDecoration: "none",
      }}
    >
      <Container
        style={{
          backgroundColor: "#3BD2E3",
          height: "15vh",
          width: "10vw",
          padding: 10,
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: 5,
          borderRadius: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div>
          <Image
            src={props.image}
            style={{
              height: "8vh",
              width: "5vw",
            }}
          />
        </div>
        <div>
          <p
            style={{
              color: "white",
              fontWeight: "bolder",
              margin: 0,
            }}
          >
            {props.title}
          </p>
        </div>
      </Container>
    </Link>
  );
}

export default CategoryContainer;
