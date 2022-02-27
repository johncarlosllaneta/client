import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Card,
  Tabs,
  Tab,
  Container,
  Navbar,
  Badge,
  Col,
  NavDropdown,
} from "react-bootstrap";
import GenReservation from "./GenReservation";
import ReqReservation from "./ReqReservation";
import "../../../../css/vetClinic.css";
import HistoryReservation from "./HistoryReservation";
import { IoNotificationsSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { useParams } from "react-router";
import { hostUrl } from "../../../../Components/Host";
import Axios from "axios";
import AppointmentHeader from "./AppointmentHeader";
import { users } from "../../../../Components/User";
const Reservation = () => {
  const [appointmentPending, setappointmentPending] = useState([]);
  const [appointmentConfirm, setappointmentConfirm] = useState([]);
  const [appointmentHistoryData, setappointmentHistoryData] = useState([]);
  const [appointmentReservation, setappointmentReservation] = useState(false);
  const [appointmentHistory, setappointmentHistory] = useState(true);

  useEffect(() => {

    Axios.get(`${hostUrl}/pending/appointment/${users[0].vetid}`).then((response) => {
      setappointmentPending(response.data);
    });
    Axios.get(`${hostUrl}/general/appointment/${users[0].vetid}`).then((response) => {
      setappointmentConfirm(response.data);
    });
    Axios.get(`${hostUrl}/history/appointment/${users[0].vetid}`).then((response) => {
      setappointmentHistoryData(response.data);
    });

  }, []);




  const refreshTables = () => {
    Axios.get(`${hostUrl}/pending/appointment/${users[0].vetid}`).then((response) => {
      setappointmentPending(response.data);
    });
    Axios.get(`${hostUrl}/general/appointment/${users[0].vetid}`).then((response) => {
      setappointmentConfirm(response.data);
    });
    Axios.get(`${hostUrl}/history/appointment/${users[0].vetid}`).then((response) => {
      setappointmentHistoryData(response.data);
    });
  }

  const changePane = () => {
    setappointmentReservation(!appointmentReservation);
    setappointmentHistory(!appointmentHistory);
    refreshTables();
  }



  return (
    <div
      style={{
        padding: 30,
      }}
    >
      <AppointmentHeader changePane={changePane} />

      <Card

        hidden={appointmentHistory}
        style={{
          marginBottom: 10,
          backgroundColor: "white",
        }}
      >
        <HistoryReservation appointmentHistoryData={appointmentHistoryData} />



      </Card>

      <Card
        hidden={appointmentReservation}
        style={{
          marginBottom: 10,
          backgroundColor: "white",
        }}
      >
        <ReqReservation pendingAppointment={appointmentPending} setappointmentPending={setappointmentPending} refreshTables={refreshTables} />



      </Card>

      <Card
        hidden={appointmentReservation}
        style={{
          // boxShadow:
          //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundColor: "white",
        }}
      >

        <GenReservation appointmentConfirm={appointmentConfirm} setappointmentConfirm={setappointmentConfirm} refreshTables={refreshTables} />


      </Card>
    </div>
  );
};

export default Reservation;
