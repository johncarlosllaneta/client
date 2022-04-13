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
function AppointmentGeneralTab() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Row>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
            <GeneralTable />
          </TabPanel>

          <TabPanel value="2">
            <PendingTable />
          </TabPanel>
          <TabPanel value="3">
            <HistoryTable />
          </TabPanel>
        </TabContext>
      </Row>
    </div>
  );
}

export default AppointmentGeneralTab;
