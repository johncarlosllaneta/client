import React from "react";
import { Row } from "react-bootstrap";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import ConsultationContainer from "./ConsultationContainer";
import HistoryTable from "./HistoryTable";
import PendingTable from "./PendingTable";
function ConsultationPage() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Row style={{ textAlign: "left" }}>
        <h4>Edit Consultation</h4>
      </Row>
      <Row>
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            display: "flex",
            padding: 20,
          }}
        >
          <ConsultationContainer
            title={"Physical Consultation"}
            info={
              <p style={{ textAlign: "left" }}>
                A trip to the veterinarian’s office with your pet, similar to a
                visit to the doctor’s office, often proves costly. It can be
                difficult to predict how much a vet visit will cost, and
                sometimes, it’s shocking when you see the bill.
              </p>
            }
            price={"200.00"}
          />
          <ConsultationContainer
            title={"Virtual Consultation"}
            info={
              <p style={{ textAlign: "left" }}>
                A trip to the veterinarian’s office with your pet, similar to a
                visit to the doctor’s office, often proves costly. It can be
                difficult to predict how much a vet visit will cost, and
                sometimes, it’s shocking when you see the bill.
              </p>
            }
            price={"00.00"}
          />
        </div>
      </Row>
      <Row>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Pending Consultation"
                value="1"
                style={{
                  marginRight: 15,
                }}
              />
              <Tab
                label="History"
                value="2"
                style={{
                  marginRight: 15,
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <PendingTable />
          </TabPanel>

          <TabPanel value="2">
            <HistoryTable />
          </TabPanel>
        </TabContext>
      </Row>
    </div>
  );
}

export default ConsultationPage;
