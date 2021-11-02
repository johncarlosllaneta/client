import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Images from "../../Components/Images";
import ForgetCode from "../../Components/ForgetCode";
import LoginPng from "../../Components/LoginPng";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router";
const Forget2 = () => {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  return (
    <div>
      <div style={{ paddingTop: 30 }}>
        <a
          href="/forget password"
          style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            fontSize: 20,
          }}
        >
          <IoChevronBack style={{ marginTop: 5 }} />
          Back
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <ForgetCode />
      </div>
      {/* <Col>
        <LoginPng />
      </Col> */}
    </div>
  );
};

export default Forget2;
