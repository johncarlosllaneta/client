import React from "react";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Row } from "react-bootstrap";
import Vaccination from "./Tables/Vaccination";
import Examination from "./Tables/Examination";
import Appointment from "./Tables/Appointment";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import getUser from "../../../../../Components/userData";

function PetsGeneralTable() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [consultation, setconsultation] = useState([]);
  const [examination, setexamination] = useState([]);
  const [vaccination, setvaccination] = useState([]);

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    consultationData(userData.vetid);
    examinationData(userData.vetid);
    vaccinationData(userData.vetid);
  }, []);

  const consultationData = async (vetid) => {
    Axios.get(`${hostUrl}/doc/pending/appointment/${vetid}`).then(
      (response) => {
        setconsultation(response.data);
      }
    );
  };

  const examinationData = async (vetid) => {
    Axios.get(`${hostUrl}/doc/pets/examination/${vetid}`).then((response) => {
      setexamination(response.data);
    });
  };

  const vaccinationData = async (vetid) => {
    Axios.get(`${hostUrl}/doc/pets/vaccination/${vetid}`).then((response) => {
      setvaccination(response.data);
    });
  };
  return (
    <div>
      <Row>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              onClick={() => {
                consultationData(user.vetid);
                examinationData(user.vetid);
                vaccinationData(user.vetid);
              }}
            >
              <Tab
                label="Vaccination"
                value="1"
                style={{
                  marginRight: 15,
                }}
              />
              <Tab
                label="Examination"
                value="2"
                style={{
                  marginRight: 15,
                }}
              />
              <Tab
                label="Appointment"
                value="3"
                style={{
                  marginRight: 15,
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Vaccination
              vaccineData={vaccination}
              refreshTable={vaccinationData}
            />
          </TabPanel>

          <TabPanel value="2">
            <Examination
              examineData={examination}
              refreshTable={examinationData}
            />
          </TabPanel>

          <TabPanel value="3">
            <Appointment
              consultData={consultation}
              refreshTable={consultationData}
            />
          </TabPanel>
        </TabContext>
      </Row>
    </div>
  );
}

export default PetsGeneralTable;
