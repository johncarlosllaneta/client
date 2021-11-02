import React from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgetNumber from "../../Components/ForgetNumber";
import Images from "../../Components/Images";
import LoginPng from "../../Components/LoginPng";
import { IoChevronBack } from "react-icons/io5";

const Forget1 = () => {
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
          href="/login"
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
        <ForgetNumber />
      </div>
    </div>
  );
};

export default Forget1;
