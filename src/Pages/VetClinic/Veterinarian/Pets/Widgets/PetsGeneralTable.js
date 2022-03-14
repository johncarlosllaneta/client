import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { Row } from "react-bootstrap";
import Consultation from "./Tables/Consultation";
import Vaccination from "./Tables/Vaccination";
import Examination from "./Tables/Examination";
import Appointment from "./Tables/Appointment";

function PetsGeneralTable() {
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
            <Vaccination />
          </TabPanel>

          <TabPanel value="2">
            <Examination />
          </TabPanel>

          <TabPanel value="3">
            <Appointment />
          </TabPanel>
        </TabContext>
      </Row>
    </div>
  );
}

export default PetsGeneralTable;
