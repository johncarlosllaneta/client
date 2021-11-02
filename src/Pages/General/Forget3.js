import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ForgetNew from "../../Components/ForgetNew";
import Images from "../../Components/Images";
import { IoChevronBack } from "react-icons/io5";
const Forget3 = () => {
  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }
  return (
    <>
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
          height: "90vh",
        }}
      >
        <ForgetNew />
      </div>
    </>
  );
};

export default Forget3;
