import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { FaUserAlt, FaPaw, FaClinicMedical } from "react-icons/fa";
import PetPopulationGraph from "./PetPopulationGraph";
import RatingsAndFeedback from "./RatingsAndFeedback";
import { hostUrl } from "../../../../Components/Host";
import { isEmptyObject } from "jquery";
import ReactApexChart from "react-apexcharts";
import PanelTableController from "../../Vet Administrator/Dashboard/PanelTableController";
import DashboardContainer from "../../Vet Administrator/Dashboard/DashboardContainer";
import DashboardTable from "../../Veterinarian/Dashboard/Widgets/DashboardTable";
import DashboardInfo from "../../Veterinarian/Dashboard/Widgets/DashboardInfo";
import DashboardReservationTab from "../../Vet Staff/Dashboard/Widgets/DashboardReservationTab";
import { Skeleton } from "@mui/material";
import getUser from "../../../../Components/userData";

function HomeTab(props) {
  const [user, setuser] = useState([]);

  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getPet(userData.vetid);
    getReserveProducts(userData.vetid);
    getPendingAppointment(userData.vetid);
    getRatings(userData.vetid);
  }, []);

  const [numberOfPets, setNumberOfPets] = useState();
  const [numberOfPendingReserved, setnumberOfPendingReserved] = useState();
  const [numberOfPendingRequest, setNumberOfPendingRequest] = useState();
  const [averageRating, setaverageRating] = useState();

  function getPet(id) {
    axios.get(`${hostUrl}/pets/vetclinic/length/${id}`).then((response) => {
      setNumberOfPets(response.data.pets);
    });
  }

  function getReserveProducts(id) {
    axios.get(`${hostUrl}/reserved/vetclinic/length/${id}`).then((response) => {
      setnumberOfPendingReserved(response.data.reserved);
    });
  }

  function getPendingAppointment(id) {
    axios.get(`${hostUrl}/pending/vetclinic/length/${id}`).then((response) => {
      setNumberOfPendingRequest(response.data.pending);
    });
  }

  function getRatings(id) {
    axios
      .get(`${hostUrl}/vetRatings/vetclinic/length/:${id}`)
      .then((response) => {
        setaverageRating(response.data.averageRatings);
      });
  }

  function oneDecimal(ratess) {
    return Math.round(ratess * 10) / 10;
  }

  var userPanel;
  var userSidePanel;
  // Vet clinic dashboard
  if (props.user == "Veterinarian") {
    userPanel = <DashboardTable data={user.vetid} />;
    userSidePanel = <DashboardInfo />;
  } else if (props.user == "Vet Staff") {
    userPanel = <DashboardReservationTab data={user.vetid} />;
    userSidePanel = <RatingsAndFeedback data={user} />;
  } else if (props.user == "Vet Admin") {
    userPanel = <PanelTableController vetid={user.vetid} />;
    userSidePanel = <RatingsAndFeedback data={user} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Row className=" ml-5 " style={{ paddingBottom: 30 }}>
        <Col>
          {props.userData.length == 0 ? (
            <Skeleton variant="rectangular" height={"100%"} />
          ) : (
            <DashboardContainer
              icon={<FaPaw style={{ fontSize: 100 }} />}
              category={"Pet Population"}
              quantity={numberOfPets}
            />
          )}
        </Col>
        <Col>
          {props.userData.length == 0 ? (
            <Skeleton variant="rectangular" height={"100%"} />
          ) : (
            <DashboardContainer
              icon={<FaUserAlt style={{ fontSize: 100 }} />}
              category={"Pending Reserved Products"}
              quantity={numberOfPendingReserved}
            />
          )}
        </Col>
        <Col>
          {props.userData.length == 0 ? (
            <Skeleton variant="rectangular" height={"100%"} />
          ) : (
            <DashboardContainer
              icon={<FaClinicMedical style={{ fontSize: 100 }} />}
              category={"Pending Request Appointment"}
              quantity={numberOfPendingRequest}
            />
          )}
        </Col>
        <Col>
          {props.userData.length == 0 ? (
            <Skeleton variant="rectangular" height={"15vh"} />
          ) : (
            <DashboardContainer
              icon={<BsFillStarFill style={{ fontSize: 100 }} />}
              category={"Average Ratings"}
              quantity={oneDecimal(averageRating)}
            />
          )}
        </Col>
      </Row>

      <Row>
        <div
          // sm={8}
          style={{
            width: "80%",
          }}
        >
          <div style={{ height: "auto" }}>
            {props.userData.length == 0 ? (
              <Skeleton variant="rectangular" height={"50vh"} />
            ) : (
              userPanel
            )}
          </div>
        </div>

        <div
          // sm={4}
          style={{ display: "flex", width: "20%" }}
        >
          {props.userData.length == 0 ? (
            <Skeleton variant="rectangular" height={"50vh"} width={"100%"} />
          ) : (
            <Card
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "100%",
                height: "100%",
              }}
            >
              <Card.Body>
                {props.user == "Veterinarian" ? (
                  <h5
                    style={{ color: "#19B9CC", textAlign: "left" }}
                    className="mt-2"
                  >
                    Vaccine Information
                  </h5>
                ) : (
                  <p
                    style={{
                      color: "#19B9CC",
                      textAlign: "left",
                      fontSize: "100%",
                    }}
                    className="mt-2"
                  >
                    Ratings and Feedback
                  </p>
                )}

                <Card style={{ height: "auto", padding: 10 }}>
                  {userSidePanel}
                  {/* <h5>Hello</h5> */}
                </Card>
              </Card.Body>
            </Card>
          )}
        </div>
      </Row>
    </div>
  );
}

export default HomeTab;
