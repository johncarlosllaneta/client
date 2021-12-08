import React from 'react'
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import HealthPetCard from './HealthPetCard';
import VaccinePetCard from './VaccinePetCard';


function PetRecord() {
    let { vetid, petid } = useParams();

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div
            style={{
                padding: 20
            }}
        >
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Health Record" value="1"
                            style={{
                                marginRight: 15
                            }} />
                        <Tab label="Vaccine Record" value="2" />

                    </TabList>
                </Box>
                <TabPanel value="1">
                    <HealthPetCard pets={petid} />
                </TabPanel>
                <TabPanel value="2">
                    <VaccinePetCard pet={petid} vetid={vetid} />
                </TabPanel>

            </TabContext>
        </div>
    )
}

export default PetRecord
