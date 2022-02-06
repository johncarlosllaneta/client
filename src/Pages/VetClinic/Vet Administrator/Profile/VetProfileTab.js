import React, { useState, useEffect, useRef, useCallback } from "react";
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
import Axios from "axios";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { BiPhone } from "react-icons/bi";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { hostUrl } from "../../../../Components/Host";
import Avatar from "react-avatar";
import { BsClock } from "react-icons/bs";
import ScheduleVet from "./ScheduleVet";
import VetInformation from "./VetInformation";
import TabPanelController from "./TabPanelController";
import { Badge, Tooltip, Typography } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { AiOutlineFileJpg } from "react-icons/ai";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { ToastUpdate } from "../../../../Components/Toast";
import { apps } from "../../../../Components/base";
import { ToastContainer } from "react-toastify";




function VetProfileTab() {
  const [user, setuser] = useState([]);
  const [imgProfile, setimgProfile] = useState("");

  const [OpeningMonday, setOpeningMonday] = useState("no set time");
  const [OpeningTuesday, setOpeningTuesday] = useState("no set time");
  const [OpeningWednesday, setOpeningWednesday] = useState("no set time");
  const [OpeningThursday, setOpeningThursday] = useState("no set time");
  const [OpeningFriday, setOpeningFriday] = useState("no set time");
  const [OpeningSaturday, setOpeningSaturday] = useState("no set time");
  const [OpeningSunday, setOpeningSunday] = useState("no set time");
  const [ClosingMonday, setClosingMonday] = useState("no set time");
  const [ClosingTuesday, setClosingTuesday] = useState("no set time");
  const [ClosingWednesday, setClosingWednesday] = useState("no set time");
  const [ClosingThursday, setClosingThursday] = useState("no set time");
  const [ClosingFriday, setClosingFriday] = useState("no set time");
  const [ClosingSaturday, setClosingSaturday] = useState("no set time");
  const [ClosingSunday, setClosingSunday] = useState("no set time");

  //get user
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 3) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);

        if (
          response.data.result[0].scheduleMonday !== "" ||
          response.data.result[0].scheduleTuesday !== "" ||
          response.data.result[0].scheduleWednesday !== "" ||
          response.data.result[0].scheduleThursday !== "" ||
          response.data.result[0].scheduleFriday !== "" ||
          response.data.result[0].scheduleSaturday !== "" ||
          response.data.result[0].scheduleSunday !== ""

          // user.scheduleMonday !== "" ||
          // user.scheduleTuesday !== "" ||
          // user.scheduleWednesday !== "" ||
          // user.scheduleThursday !== "" ||
          // user.scheduleFriday !== "" ||
          // user.scheduleSaturday !== "" ||
          // user.scheduleSunday !== ""
        ) {
          setOpeningMonday(
            timeConvertion(
              response.data.result[0].scheduleMonday.split(" - ")[0]
            )
          );
          setClosingMonday(
            timeConvertion(
              response.data.result[0].scheduleMonday.split(" - ")[1]
            )
          );
          setOpeningTuesday(
            timeConvertion(
              response.data.result[0].scheduleTuesday.split(" - ")[0]
            )
          );
          setClosingTuesday(
            timeConvertion(
              response.data.result[0].scheduleTuesday.split(" - ")[1]
            )
          );
          setOpeningWednesday(
            timeConvertion(
              response.data.result[0].scheduleWednesday.split(" - ")[0]
            )
          );
          setClosingWednesday(
            timeConvertion(
              response.data.result[0].scheduleWednesday.split(" - ")[1]
            )
          );
          setOpeningThursday(
            timeConvertion(
              response.data.result[0].scheduleThursday.split(" - ")[0]
            )
          );
          setClosingThursday(
            timeConvertion(
              response.data.result[0].scheduleThursday.split(" - ")[1]
            )
          );
          setOpeningFriday(
            timeConvertion(
              response.data.result[0].scheduleFriday.split(" - ")[0]
            )
          );
          setClosingFriday(
            timeConvertion(
              response.data.result[0].scheduleFriday.split(" - ")[1]
            )
          );
          setOpeningSaturday(
            timeConvertion(
              response.data.result[0].scheduleSaturday.split(" - ")[0]
            )
          );
          setClosingSaturday(
            timeConvertion(
              response.data.result[0].scheduleSaturday.split(" - ")[1]
            )
          );
          setOpeningSunday(
            timeConvertion(
              response.data.result[0].scheduleSunday.split(" - ")[0]
            )
          );
          setClosingSunday(
            timeConvertion(
              response.data.result[0].scheduleSunday.split(" - ")[1]
            )
          );
        }
      });

      setimgProfile(user.vet_picture);
      setcounter(counter + 1);


    }

  }, [user]);


  function refreshUser() {
    var token = localStorage.getItem("ajwt");
    Axios.get(`${hostUrl}/home`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setuser(response.data.result[0]);
    })
  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function timeConvertion(time) {
    // alert(time);
    if (time == "" || time == undefined) {
      return "Closed";
    }
    const timeString12hr = new Date(
      "2021-01-01T" + time + "Z"
    ).toLocaleTimeString(
      {},
      { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
    );
    return timeString12hr;
  }

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
      vetid: user.vetid,
      imageUrl: imageLink
    }).then((response) => {

      if (response.data.message == 'Update Successfully') {


        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
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
    <div
      style={{
        paddingRight: '5vw',
        paddingLeft: '5vw',
        marginTop: 10
      }}
    >
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


      <div
        style={{

          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Card >
          <div
            style={{
              padding: 30,
              borderRadius: 30,
              backgroundColor: 'white',

            }}
          >
            <Row>
              <Col xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >

                <Container
                  style={{
                    display: 'block',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: 'auto',
                    // width: '100%'
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
                        name={user.vet_name}
                        src={user.vet_picture}
                        size={'10vh'}
                        style={{ marginBottom: 15 }}
                      />
                    </Badge>
                  </Tooltip>

                  <p
                    style={{
                      fontWeight: 'bold',
                      fontSize: '1.25rem',
                      marginBottom: 0
                    }}
                  >
                    {user.vet_name}
                  </p>
                  <h6
                    style={{
                      color: '#3BD2E3'
                    }}
                  >
                    Veterinary Clinic
                  </h6>

                  {/* <Button>
                      Edit Profile
                    </Button> */}
                </Container>

              </Col>

              <Col xs={9}>
                <Row>
                  <div
                    style={{
                      display: 'block'

                    }}
                  >
                    <h4>Schedule</h4>
                    <ScheduleVet
                      OpeningMonday={OpeningMonday}
                      OpeningTuesday={OpeningTuesday}
                      OpeningWednesday={OpeningWednesday}
                      OpeningThursday={OpeningThursday}
                      OpeningFriday={OpeningFriday}
                      OpeningSaturday={OpeningSaturday}
                      OpeningSunday={OpeningSunday}
                      ClosingMonday={ClosingMonday}
                      ClosingTuesday={ClosingTuesday}
                      ClosingWednesday={ClosingWednesday}
                      ClosingThursday={ClosingThursday}
                      ClosingFriday={ClosingFriday}
                      ClosingSaturday={ClosingSaturday}
                      ClosingSunday={ClosingSunday}
                    />

                    <VetInformation
                      user={user}
                    />
                  </div>
                </Row>
              </Col>

            </Row>
          </div>
        </Card>
      </div>

      <div>
        <TabPanelController user={user} />
      </div>
    </div>
  );
}

export default VetProfileTab;
