import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Home } from '@material-ui/icons';
import { HiHome, HiShoppingCart } from "react-icons/hi";
import { MdPets } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
function HomePage(props) {
    const [value, setValue] = React.useState(0);




    return (
        <Box sx={{ pb: 7 }} >


            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={props.page}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Home" icon={< HiHome style={{ fontSize: 30 }} />}
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    />
                    <BottomNavigationAction label="Appointments" icon={<AiFillSchedule style={{ fontSize: 30 }} />}
                        onClick={() => {
                            window.location.href = '/appointment';
                        }}
                    />
                    <BottomNavigationAction label="Reservation" icon={<HiShoppingCart style={{ fontSize: 30 }} />}
                        onClick={() => {
                            window.location.href = '/my&cart';
                        }}
                    />
                    <BottomNavigationAction label="Pets" icon={<MdPets style={{ fontSize: 30 }} />}
                        onClick={() => {
                            window.location.href = '/pets';
                        }}
                    />
                    <BottomNavigationAction label="Contact Tracing" icon={<AiFillSchedule style={{ fontSize: 30 }} />}
                        onClick={() => {
                            window.location.href = '/contact&tracing';
                        }}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default HomePage
