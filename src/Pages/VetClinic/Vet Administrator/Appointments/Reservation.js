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
import getUser from "../../../../Components/userData";
import { Skeleton } from "@mui/material";
const Reservation = () => {
  const [appointmentPending, setappointmentPending] = useState([]);
  const [appointmentConfirm, setappointmentConfirm] = useState([]);
  const [appointmentHistoryData, setappointmentHistoryData] = useState([]);
  const [appointmentReservation, setappointmentReservation] = useState(false);
  const [appointmentHistory, setappointmentHistory] = useState(true);


  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    refreshTables(userData.vetid);
  }, []);






  const refreshTables = (vetid) => {
    Axios.get(`${hostUrl}/pending/appointment/${vetid}`).then((response) => {
      setappointmentPending(response.data);
    });
    Axios.get(`${hostUrl}/general/appointment/${vetid}`).then((response) => {
      setappointmentConfirm(response.data);
    });
    Axios.get(`${hostUrl}/history/appointment/${vetid}`).then((response) => {
      setappointmentHistoryData(response.data);
    });
  }

  const changePane = () => {
    setappointmentReservation(!appointmentReservation);
    setappointmentHistory(!appointmentHistory);
    refreshTables(user.vetid);
  }



  return (
    <div
      style={{
        padding: 30,
      }}
    >
      <AppointmentHeader changePane={changePane} user={user} />
      {user.length != 0 ?
        <Card

          hidden={appointmentHistory}
          style={{
            marginBottom: 10,
            backgroundColor: "white",
          }}
        >
          <HistoryReservation appointmentHistoryData={appointmentHistoryData} />



        </Card>
        :
        <Skeleton variant="rectangular" height={'30vh'} width={'100%'} />
      }

      {user.length != 0 ?
        <Card
          hidden={appointmentReservation}
          style={{
            marginBottom: 10,
            backgroundColor: "white",
          }}
        >
          <ReqReservation pendingAppointment={appointmentPending} setappointmentPending={setappointmentPending} refreshTables={refreshTables} vetid={user.vetid} />



        </Card>
        :
        <Skeleton variant="rectangular" height={'30vh'} width={'100%'} />
      }

      {user.length != 0 ?
        <Card
          hidden={appointmentReservation}
          style={{
            // boxShadow:
            //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            backgroundColor: "white",
          }}
        >

          <GenReservation appointmentConfirm={appointmentConfirm} setappointmentConfirm={setappointmentConfirm} refreshTables={refreshTables} vetid={user.vetid} />


        </Card>
        :
        <Skeleton variant="rectangular" height={'30vh'} width={'100%'} />
      }


    </div>
  );
};

export default Reservation;
