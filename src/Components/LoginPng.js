import React from "react";
import { Image, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import loginPng from "../Images/login.jpg";

const LoginPng = () => {
  var screenh = window.screen.height;
  return (
    <Image
      src={loginPng}
      alt="dog"
      className="card-img"
      style={{ width: "100%", height: screenh }}
    />
  );
};

export default LoginPng;
