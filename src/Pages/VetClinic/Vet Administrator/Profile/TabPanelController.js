import React from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import VeterinarianTable from './VeterinarianTable';
import VetStaffTable from './VetStaffTable';

function TabPanelController(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div
            style={{
                marginTop: 20
            }}
        >
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Veterinarian" value="1" />
                        <Tab label="Vet Staff" value="2" />

                    </TabList>
                </Box>
                <TabPanel value="1">
                    <VeterinarianTable user={props.user} />
                </TabPanel>
                <TabPanel value="2">
                    <VetStaffTable user={props.user} />
                </TabPanel>

            </TabContext>
        </div>
    )
}

export default TabPanelController
