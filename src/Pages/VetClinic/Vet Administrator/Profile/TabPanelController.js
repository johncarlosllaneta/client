import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import VeterinarianTable from './VeterinarianTable';
import VetStaffTable from './VetStaffTable';
import getUser from '../../../../Components/userData';
import { Skeleton } from '@mui/material';

function TabPanelController(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [user, setuser] = useState([]);
    useEffect(async () => {
        const userData = await getUser();
        setuser(userData);

    }, []);

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
                    {user.length != 0 ?
                        <VeterinarianTable user={user} />
                        : <Skeleton variant='rectangular' height={'30vh'} />
                    }

                </TabPanel>
                <TabPanel value="2">
                    {user.length != 0 ?
                        <VetStaffTable user={user} />
                        : <Skeleton variant='rectangular' height={'30vh'} />
                    }

                </TabPanel>

            </TabContext>
        </div>
    )
}

export default TabPanelController
