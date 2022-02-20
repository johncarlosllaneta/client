import React from 'react';
import { Card, Image } from 'react-bootstrap';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function ProductItem(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <div
        style={{
            width: 'auto'
        }}
    >
        <Card
            style={{
                height: '35vh',
                width: '15vw',
                boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: "white",
                display: 'block'
            }}
        >

            <div
                style={{
                    backgroundImage: `url('${props.product.product_image}')`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                    height: '20vh',
                }}
            >
                {/* <Image src={'https://www.petwarehouse.ph/12474-big_default/prama-delicacy-snack-sweet-melon-70g-dog-treats.jpg'} style={{
                    height: '20vh',
                    // width: '100%'
                }} /> */}

                <Tooltip title={"Options"}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                        onClick={handleClick}
                        style={{
                            float: 'right'
                        }}
                    >

                        <MoreVertIcon

                            style={{
                                color: '#354A5F',

                            }}
                        />

                    </IconButton>

                </Tooltip>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}


                >
                    <MenuItem

                        style={{
                            display: 'flex',
                            justifyContent: 'start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <ListItemIcon>

                            <VisibilityIcon fontSize="small" />
                        </ListItemIcon>
                        <strong>View</strong>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            props.handleShowUpdateProduct();

                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'start',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <ListItemIcon>

                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <strong>Update</strong>
                    </MenuItem>

                    <MenuItem
                        style={{
                            display: 'flex',
                            justifyContent: 'start',
                            backgroundColor: 'red',
                            color: 'white',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <ListItemIcon>

                            <DeleteIcon fontSize="small" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <strong>Delete</strong>
                    </MenuItem>

                </Menu>


            </div>
            <div
                style={{
                    width: '100%',
                    padding: '2vh',
                    textAlign: 'left'
                }}
            >
                <h6>{props.product.product_name}</h6>
                <strong>₱{props.product.price}.00</strong> <br />
                <strong>Quantity: {props.product.quantity} pcs</strong>

            </div>
        </Card>

    </div>;
}

export default ProductItem;
