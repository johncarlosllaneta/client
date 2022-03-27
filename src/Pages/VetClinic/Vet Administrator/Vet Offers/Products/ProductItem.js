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
            onClick={() => {
                props.setproductInfo(props.product)
                props.handleShowProductDetails();
                handleClose()
            }}
            style={{
                height: '35vh',
                width: '15vw',
                boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundColor: "white",
                display: 'block',
                cursor: 'pointer'
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
