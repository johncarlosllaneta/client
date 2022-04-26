import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import HealthPetCard from "./HealthPetCard";
import VaccinePetCard from "./VaccinePetCard";
import { Row } from "react-bootstrap";
import { IoChevronBack } from "react-icons/io5";
import PetProfile from "./PetProfile";
import ConsultationPetCard from "./ConsultationPetCard";
import AppointmentPetCard from "./AppointmentPetCard";
import getUser from "../../../../../Components/userData";
import { Skeleton } from "@mui/material";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";

function PetRecord(props) {
  let { petid } = useParams();
  const [value, setValue] = React.useState("1");
  const [isLoading, setisLoading] = useState(false);
  const [user, setuser] = useState([]);
  const [healthCard, sethealthCard] = useState([]);
  const [vaccine, setvaccine] = useState([]);
  const [consult, setconsult] = useState([]);
  const [grooming, setgrooming] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    healthData(userData.vetid);
    vaccineData(userData.vetid);
    consultData(userData.vetid);
    groomingData(userData.vetid);
  }, []);

  const healthData = async (vetid) => {
    Axios.get(`${hostUrl}/pet/medical/history/record/${vetid}/${petid}`).then(
      (response) => {
        sethealthCard(response.data);
        setisLoading(true);
      }
    );
  };

  const vaccineData = async (vetid) => {
    Axios.get(`${hostUrl}/pet/vaccine/record/${vetid}/${petid}`).then(
      (response) => {
        setvaccine(response.data);
        setisLoading(true);
      }
    );
  };

  const consultData = async (vetid) => {
    Axios.get(`${hostUrl}/pet/consultation/record/${vetid}/${petid}`).then(
      (response) => {
        setconsult(response.data);
        setisLoading(true);
      }
    );
  };
  const groomingData = async (vetid) => {
    Axios.get(`${hostUrl}/pet/grooming/record/${vetid}/${petid}`).then(
      (response) => {
        setgrooming(response.data);
        setisLoading(true);
      }
    );
  };
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Row
        style={{
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <p
            onClick={() => {
              window.location.href = `/pets`;
            }}
            style={{
              marginBottom: 0,
              color: "#3BD2E3",
              cursor: "pointer",
            }}
          >
            {" "}
            <IoChevronBack style={{ fontSize: 18 }} />{" "}
            <strong style={{ fontSize: 18 }}>Back</strong>
          </p>
        </div>
      </Row>

      <Row
        style={{
          marginBottom: 20,
        }}
      >
        <PetProfile petid={petid} />
      </Row>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            onClick={() => {
              healthData(user.vetid);
              vaccineData(user.vetid);
              consultData(user.vetid);
              groomingData(user.vetid);
            }}
          >
            <Tab
              label="Health Record"
              value="1"
              style={{
                marginRight: 15,
              }}
            />
            <Tab
              label="Vaccine Record"
              value="2"
              style={{
                marginRight: 15,
              }}
            />

            <Tab
              label="Consultation"
              value="3"
              style={{
                marginRight: 15,
              }}
            />

            <Tab
              label="Appointments"
              value="4"
              style={{
                marginRight: 15,
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {isLoading == true ? (
            healthCard.length != 0 ? (
              <HealthPetCard healthData={healthCard} />
            ) : (
              <HealthPetCard healthData={healthCard} />
            )
          ) : (
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          )}
        </TabPanel>

        <TabPanel value="2">
          {isLoading == true ? (
            vaccine.length != 0 ? (
              <VaccinePetCard vaccineData={vaccine} />
            ) : (
              <VaccinePetCard vaccineData={vaccine} />
            )
          ) : (
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          )}
        </TabPanel>

        <TabPanel value="3">
          {isLoading == true ? (
            consult.length != 0 ? (
              <ConsultationPetCard consultData={consult} />
            ) : (
              <ConsultationPetCard consultData={consult} />
            )
          ) : (
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          )}
        </TabPanel>

        <TabPanel value="4">
          {isLoading == true ? (
            grooming.length != 0 ? (
              <AppointmentPetCard groomingData={grooming} />
            ) : (
              <AppointmentPetCard groomingData={grooming} />
            )
          ) : (
            <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
          )}
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default PetRecord;
