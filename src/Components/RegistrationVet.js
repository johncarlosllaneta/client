import { Step, StepLabel, Stepper } from "@material-ui/core";

import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  FloatingLabel,
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { IoChevronBack } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { apps } from "../Components/base";
import Avatar from "react-avatar";
import logo from "../../src/Images/logo.png";
import "../css/RegistrationVet.css";
import Axios from "axios";
import { hostUrl, hostUrlWeb } from "../Components/Host";
import DataPrivacy from "./Registration/DataPrivacy";
import { Button } from "@mui/material";
import EmailPassword from "./Registration/EmailPassword";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function RegistrationVet() {


  const [dataPrivacyController, setdataPrivacyController] = useState("none");
  const [emailAndPasswordController, setemailAndPasswordController] =
    useState("none");
  const [activeStep, setactiveStep] = useState(0);

  useEffect(() => {
    if (activeStep === 0) {
      setdataPrivacyController("block");
      setemailAndPasswordController("none");

    } else if (activeStep === 1) {
      setdataPrivacyController("none");
      setemailAndPasswordController("block");

    }
  }, [activeStep]);

  const NextStep = () => {
    if (navigator.geolocation) {
      setactiveStep(activeStep + 1);
    } else {
      alert('Need to allow location')
    }

  }







  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  return (
    <div style={{ zoom: value }}>
      <Container className="mt-4"
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <p>Already have an account? </p>
        <p> <a
          href="/login"
          style={{
            textDecoration: 'none',
            color: '#0A94A4',
            cursor: 'pointer',
            marginLeft: 5
          }}>Sign In</a></p>


      </Container>

      {/* Data Privacy */}

      <Row
        style={{
          display: dataPrivacyController,
        }}
      >
        <DataPrivacy nextStep={NextStep} />
      </Row>

      {/* Form Email and Password */}
      <Row
        style={{
          display: emailAndPasswordController,
        }}
      >
        <EmailPassword />
      </Row>
    </div>
  );
}

export default RegistrationVet;
