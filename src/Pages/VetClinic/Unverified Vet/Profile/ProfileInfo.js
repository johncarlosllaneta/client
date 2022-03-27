import React, { useState, useEffect, useRef, useCallback } from 'react'
import Avatar from '@mui/material/Avatar';
import Info from './InfoFields';
import InfoFields from './InfoFields';

import Axios from "axios";
import { hostUrl } from "../../../../Components/Host";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { AiOutlineFileJpg } from "react-icons/ai";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
    Col,
    Container,
    Row,
    Tab,
    Tabs,
    Card,
    Modal,
    Alert,
    Form,
    Image,
} from "react-bootstrap";
import { Badge, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import Button from '@mui/material/Button';


import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { ToastUpdate } from "../../../../Components/Toast";
import { apps } from "../../../../Components/base";
import { ToastContainer } from "react-toastify";

function ProfileInfo(props) {


    // upload profile picture
    const [showUploadProfilePicture, setShowUploadProfilePicture] = useState(false);

    const handleCloseProfilePicture = () => {
        setimageFile('');
        setShowUploadProfilePicture(false);
        setselectImage(false);
        setdisplayImage(true);
        setprogressCounterUploadImage(0);

    };
    const handleShowProfilePicture = () => setShowUploadProfilePicture(true);


    const [progressCounterUploadImage, setprogressCounterUploadImage] = useState(0);
    const [progressUploadController, setprogressUploadController] = useState(true);

    function counters() {
        setInterval(() => {
            setprogressCounterUploadImage((progressCounterUploadImage) => (progressCounterUploadImage < 100 ? progressCounterUploadImage + 25 : 100));
        }, 1000);
    }


    // Upload image controller
    const [selectImage, setselectImage] = useState(false);
    const [displayImage, setdisplayImage] = useState(true);

    // Image Picker
    const inputFileRef = useRef(null);
    const [imageFile, setimageFile] = useState('');
    const onFilechange = (e) => {
        /*Selected files data can be collected here.*/
        console.log(e.target.files);
        setimageFile(URL.createObjectURL(e.target.files[0]));
        setselectImage(true);
        setdisplayImage(false);


    }
    const onBtnClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    }

    // Crop
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 9 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const onLoad = useCallback((img) => {
        inputFileRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !inputFileRef.current) {
            return;
        }

        const image = inputFileRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );
    }, [completedCrop]);



    const uploadImage = async (e) => {
        const storageRef = apps.storage().ref();
        const filRef = storageRef.child(e.name);
        await filRef.put(e);
        // setimageUploadedUrl(await filRef.getDownloadURL());
        console.log(await filRef.getDownloadURL());
        updateImage(await filRef.getDownloadURL());
    };

    function updateImage(imageLink) {
        Axios.post(`${hostUrl}/vetclinic/update/profile`, {
            vetid: props.user.vetid,
            imageUrl: imageLink
        }).then((response) => {

            if (response.data.message == 'Update Successfully') {


                Axios.get(`${hostUrl}/vet/uploads`, {
                    params: {
                        email: props.user.email,
                    },
                }).then((response) => {
                    if (response.data.message === "Correct") {
                        // alert("logging in");
                        localStorage.setItem("ajwt", response.data.accessToken);
                        localStorage.setItem("rjwt", response.data.refreshToken);
                        localStorage.setItem("isLogin", true);
                        localStorage.setItem("role", response.data.role);
                        if (response.data.role === 2) {
                            localStorage.setItem("vetStatus", response.data.vetStatus);
                            localStorage.setItem("id", response.data.id);
                        }

                        handleCloseProfilePicture();
                        ToastUpdate();
                        // refreshUser();

                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);


                    }
                });
            }
        })
    }


    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
                var file = new File([blob], Math.floor(Math.random() * 1000000000000000000), { lastModified: new Date().getTime(), type: blob.type });


                uploadImage(file);
            },
            'image/png',
            1
        );


    }
    function updateProfilePicture() {
        generateDownload(previewCanvasRef.current, completedCrop);
    }

    return (
        <div>
            <ToastContainer />

            {/* Upload Picture */}
            <Modal show={showUploadProfilePicture}
                backdrop="static"
                keyboard={false}
                centered
                onHide={handleCloseProfilePicture}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div

                        hidden={selectImage}
                        onClick={onBtnClick}
                        style={{
                            display: 'block',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            borderStyle: 'dashed',
                            borderColor: 'grey',
                            height: 'auto',
                            width: '100%',
                            cursor: 'pointer'
                        }}
                    >
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '10vh',
                            }}
                        >
                            <Form.Control type="file"
                                id="imagePicker" hidden={true}
                                ref={inputFileRef}
                                accept="image/png, image/gif, image/jpeg"
                                onChange={onFilechange}
                            />
                            <UploadFileIcon

                                sx={{ fontSize: 50 }}
                            />
                        </Container>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '10vh',
                            }}
                        >
                            <Typography  >
                                Upload Image File
                            </Typography>
                        </Container>


                    </div>



                    <div
                        hidden={displayImage}

                        style={{
                            display: 'block',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            height: 'auto',
                            width: '100%',

                        }}
                    >
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                        >

                            <ReactCrop
                                src={imageFile}
                                onImageLoaded={onLoad}
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                            />
                            <div>
                                <canvas
                                    ref={previewCanvasRef}
                                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                    style={{
                                        width: 300,
                                        height: 300
                                    }}
                                />
                            </div>

                        </Container>
                        <Container
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '1vh',
                            }}
                        >
                            <Row>
                                <Col sm={3}
                                    style={{
                                        display: 'flex'
                                    }}
                                >
                                    <AiOutlineFileJpg
                                        style={{ fontSize: 50 }}
                                    />
                                </Col>
                                <Col sm={9}>
                                    <Typography  >
                                        Upload Image File
                                    </Typography>
                                </Col>
                            </Row>

                            <Button
                                onClick={() => {
                                    setprogressUploadController(false);
                                    counters();
                                    updateProfilePicture();
                                }}
                            >
                                Upload
                            </Button>


                        </Container>
                        <Container
                            hidden={progressUploadController}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '1vh',
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress value={progressCounterUploadImage} variant="determinate" />
                            </Box>
                        </Container>
                    </div>

                </Modal.Body>
            </Modal>

            <Row>
                <Col

                    sm={4}
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        height: '70vh'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Tooltip title={"Change Profile Picture"}>
                            <Badge
                                overlap="circular"

                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <IconButton color="info" aria-label="upload picture" component="span"
                                        onClick={() => {
                                            handleShowProfilePicture();
                                        }}
                                    >
                                        <PhotoCamera color="#314051" />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    round={true}
                                    name={props.user.vet_name}
                                    src={props.user.vet_picture != null ? props.user.vet_picture : "data:image/jpeg;base64,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"}
                                    sx={{ width: '30vh', height: '30vh' }}
                                    style={{ marginBottom: 15 }}
                                />
                            </Badge>
                        </Tooltip>


                    </div>

                    <p>Select Profile Picture</p>

                </Col>
                <Col
                    sm={8}
                >
                    <InfoFields user={props.user} />

                </Col>
            </Row>
        </div>
    )
}

export default ProfileInfo