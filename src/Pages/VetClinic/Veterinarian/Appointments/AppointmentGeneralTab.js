import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Row } from "react-bootstrap";
import GeneralTable from "./Tables/GeneralTable";
import HistoryTable from "./Tables/HistoryTable";
import PendingTable from "./Tables/PendingTable";
import getUser from "../../../../Components/userData";
import Axios from "axios";
import { hostUrl } from "../../../../Components/Host";
function AppointmentGeneralTab() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [appointmentPending, setappointmentPending] = useState([]);
  const [appointmentConfirm, setappointmentConfirm] = useState([]);
  const [appointmentHistoryData, setappointmentHistoryData] = useState([]);

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);
    refreshTables(userData.vetid);
  }, []);

  const refreshTables = async (vetid) => {
    Axios.get(`${hostUrl}/pending/appointment/${vetid}`).then((response) => {
      setappointmentPending(response.data);
    });
    Axios.get(`${hostUrl}/general/appointment/${vetid}`).then((response) => {
      setappointmentConfirm(response.data);
    });
    Axios.get(`${hostUrl}/history/appointment/${vetid}`).then((response) => {
      setappointmentHistoryData(response.data);
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
                refreshTables(user.vetid);
              }}
            >
              <Tab
                label="General"
                value="1"
                style={{
                  marginRight: 15,
                }}
              />
              <Tab
                label="Pending"
                value="2"
                style={{
                  marginRight: 15,
                }}
              />
              <Tab
                label="History"
                value="3"
                style={{
                  marginRight: 15,
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <GeneralTable generalTable={appointmentConfirm} />
          </TabPanel>

          <TabPanel value="2">
            <PendingTable pendingTableData={appointmentPending} />
          </TabPanel>

          <TabPanel value="3">
            <HistoryTable appointmentHistoryData={appointmentHistoryData} />
          </TabPanel>
        </TabContext>
      </Row>
    </div>
  );
}

export default AppointmentGeneralTab;
