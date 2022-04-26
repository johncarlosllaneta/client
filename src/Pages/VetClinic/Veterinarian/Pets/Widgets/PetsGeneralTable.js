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
import { Skeleton } from "@mui/material";

function PetsGeneralTable() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [consultation, setconsultation] = useState([]);
  const [examination, setexamination] = useState([]);
  const [vaccination, setvaccination] = useState([]);
  const [isLoading, setisLoading] = useState(false);
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
        setisLoading(true);
      }
    );
  };

  const examinationData = async (vetid) => {
    Axios.get(`${hostUrl}/doc/pets/examination/${vetid}`).then((response) => {
      setexamination(response.data);
      setisLoading(true);
    });
  };

  const vaccinationData = async (vetid) => {
    Axios.get(`${hostUrl}/doc/pets/vaccination/${vetid}`).then((response) => {
      setvaccination(response.data);
      setisLoading(true);
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
            {isLoading == true ? (
              vaccination.length != 0 ? (
                <Vaccination
                  vaccineData={vaccination}
                  refreshTable={vaccinationData}
                />
              ) : (
                <Vaccination
                  vaccineData={vaccination}
                  refreshTable={vaccinationData}
                />
              )
            ) : (
              <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
            )}
          </TabPanel>

          <TabPanel value="2">
            {isLoading == true ? (
              examination.length != 0 ? (
                <Examination
                  examineData={examination}
                  refreshTable={examinationData}
                />
              ) : (
                <Examination
                  examineData={examination}
                  refreshTable={examinationData}
                />
              )
            ) : (
              <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
            )}
          </TabPanel>

          <TabPanel value="3">
            {isLoading == true ? (
              consultation.length != 0 ? (
                <Appointment
                  consultData={consultation}
                  refreshTable={consultationData}
                />
              ) : (
                <Appointment
                  consultData={consultation}
                  refreshTable={consultationData}
                />
              )
            ) : (
              <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
            )}
          </TabPanel>
        </TabContext>
      </Row>
    </div>
  );
}

export default PetsGeneralTable;
