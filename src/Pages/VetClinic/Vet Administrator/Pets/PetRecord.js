import React from 'react'
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import HealthPetCard from './HealthPetCard';
import VaccinePetCard from './VaccinePetCard';
import { Row } from 'react-bootstrap';
import { IoChevronBack } from 'react-icons/io5';
import PetProfile from './PetProfile';
import ConsultationPetCard from './ConsultationPetCard';
import AppointmentPetCard from './AppointmentPetCard';


function PetRecord(props) {
    let { petid } = useParams();

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

            <Row
                style={{
                    marginBottom: 20
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start'
                    }}
                >
                    <p
                        onClick={() => {
                            window.location.href = `/pets/${props.user.vetid}`
                        }}
                        style={{
                            marginBottom: 0,
                            color: '#3BD2E3',
                            cursor: 'pointer'
                        }}
                    > <IoChevronBack style={{ fontSize: 18 }} /> <strong style={{ fontSize: 18, }}>Back</strong></p>
                </div>
            </Row>

            <Row
                style={{
                    marginBottom: 20
                }}
            >
                <PetProfile petid={petid} />
            </Row>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab
                            label="Health Record"
                            value="1"
                            style={{
                                marginRight: 15
                            }} />
                        <Tab
                            label="Vaccine Record"
                            value="2"
                            style={{
                                marginRight: 15
                            }}
                        />

                        <Tab
                            label="Consultation"
                            value="3"
                            style={{
                                marginRight: 15
                            }}
                        />

                        <Tab
                            label="Appointments"
                            value="4"
                            style={{
                                marginRight: 15
                            }}
                        />

                    </TabList>
                </Box>
                <TabPanel value="1">
                    <HealthPetCard pets={petid} vetid={props.user.vetid} />
                </TabPanel>

                <TabPanel value="2">
                    <VaccinePetCard pet={petid} vetid={props.user.vetid} />
                </TabPanel>

                <TabPanel value="3">
                    <ConsultationPetCard pet={petid} vetid={props.user.vetid} />
                </TabPanel>

                <TabPanel value="4">
                    <AppointmentPetCard pet={petid} vetid={props.user.vetid} />
                </TabPanel>

            </TabContext>
        </div>
    )
}

export default PetRecord
