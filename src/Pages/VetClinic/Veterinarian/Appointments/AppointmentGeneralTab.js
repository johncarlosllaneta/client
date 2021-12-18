import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Row } from "react-bootstrap";
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
            <h5>General</h5>
          </TabPanel>

          <TabPanel value="2">
            <h5>Pending</h5>
          </TabPanel>
          <TabPanel value="3">
            <h5>History</h5>
          </TabPanel>
        </TabContext>
      </Row>
    </div>
  );
}

export default AppointmentGeneralTab;
