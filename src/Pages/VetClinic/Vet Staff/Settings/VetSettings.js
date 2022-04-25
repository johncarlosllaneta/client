import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FloatingLabel,
  Modal,
} from "react-bootstrap";
import background from "../../../../Images/bg.png";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Avatar from "react-avatar";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import { ToastDelete, ToastUpdate } from "../../../../Components/Toast";
import { hostUrl, hostUrlWeb } from "../../../../Components/Host";
import { Badge, Skeleton, Tooltip, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AiOutlineFileJpg } from "react-icons/ai";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { apps } from "../../../../Components/base";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const VetSettings = (props) => {
  const [changePass, setChangePass] = useState("none");
  const [changeVetHours, setChangeVetHours] = useState("none");
  const [editCred, setEditCred] = useState("none");
  const [vetOffers, setVetOffers] = useState("none");
  const [handleChecker, sethandleChecker] = useState(true);

  const [password, setpassword] = useState();
  const [newPass, setnewPass] = useState();
  const [confirmPass, setconfirmPass] = useState();
  const [validated, setValidated] = useState(false);

  const [enableProduct, setenableProduct] = useState("0");
  const [enablePharmacy, setenablePharmacy] = useState("0");
  const [enableService, setenableService] = useState("0");
  const [enableConsultation, setenableConsultation] = useState("0");
  const [enableExamination, setenableExamination] = useState("0");
  const [enableGrooming, setenableGrooming] = useState("0");
  const [enableVaccination, setenableVaccination] = useState("0");
  const [enablePreventiveControls, setenablePreventiveControls] = useState("0");
  const [servicesEnable, setservicesEnable] = useState("none");

  const [OpeningMonday, setOpeningMonday] = useState();
  const [OpeningTuesday, setOpeningTuesday] = useState();
  const [OpeningWednesday, setOpeningWednesday] = useState();
  const [OpeningThursday, setOpeningThursday] = useState();
  const [OpeningFriday, setOpeningFriday] = useState();
  const [OpeningSaturday, setOpeningSaturday] = useState();
  const [OpeningSunday, setOpeningSunday] = useState();
  const [ClosingMonday, setClosingMonday] = useState();
  const [ClosingTuesday, setClosingTuesday] = useState();
  const [ClosingWednesday, setClosingWednesday] = useState();
  const [ClosingThursday, setClosingThursday] = useState();
  const [ClosingFriday, setClosingFriday] = useState();
  const [ClosingSaturday, setClosingSaturday] = useState();
  const [ClosingSunday, setClosingSunday] = useState();
  const [CheckerMonday, setCheckerMonday] = useState();
  const [CheckerTuesday, setCheckerTuesday] = useState();
  const [CheckerWednesday, setCheckerWednesday] = useState();
  const [CheckerThursday, setCheckerThursday] = useState();
  const [CheckerFriday, setCheckerFriday] = useState();
  const [CheckerSaturday, setCheckerSaturday] = useState();
  const [CheckerSunday, setCheckerSunday] = useState();
  const [CheckerSwitchMonday, setCheckerSwitchMonday] = useState();
  const [CheckerSwitchTuesday, setCheckerSwitchTuesday] = useState();
  const [CheckerSwitchWednesday, setCheckerSwitchWednesday] = useState();
  const [CheckerSwitchThursday, setCheckerSwitchThursday] = useState();
  const [CheckerSwitchFriday, setCheckerSwitchFriday] = useState();
  const [CheckerSwitchSaturday, setCheckerSwitchSaturday] = useState();
  const [CheckerSwitchSunday, setCheckerSwitchSunday] = useState();

  const [vetId, setvetId] = useState("");
  const [vetName, setvetName] = useState();
  const [fname, setfname] = useState();
  const [mname, setmname] = useState();
  const [lname, setlname] = useState();
  const [vetEmail, setvetEmail] = useState();
  const [vetAddress, setvetAddress] = useState();
  const [vetContactNumber, setvetContactNumber] = useState();

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const [showOffers, setshowOffers] = useState(false);
  const handleCloseOffers = () => setshowOffers(false);
  const handleShowOffer = () => setshowOffers(true);

  const [showHours, setshowHours] = useState(false);
  const handleCloseHours = () => setshowHours(false);
  const handleShowHours = () => setshowHours(true);

  const enableServiceChecker = (status) => {
    setservicesEnable(status);
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    if (isSwitchOn) {
      enableServiceChecker("block");
      setenableService("1");
    } else {
      enableServiceChecker("none");
      setenableService("0");
    }
  }, [isSwitchOn]);

  function ChangePassController(checker) {
    if (checker !== true) {
      setChangePass("block");
      setChangeVetHours("none");
      setEditCred("none");
      setVetOffers("none");
    } else {
      setChangePass("none");
    }
  }

  function ChangeVetHoursController(checker) {
    if (checker !== true) {
      setChangePass("none");
      setChangeVetHours("block");
      setEditCred("none");
      setVetOffers("none");
    } else {
      setChangeVetHours("none");
    }
  }

  function EditCredController(checker) {
    if (checker !== true) {
      setChangePass("none");
      setChangeVetHours("none");
      setEditCred("block");
      setVetOffers("none");
    } else {
      setEditCred("none");
    }
  }

  function VetOffersController(checker) {
    if (checker !== true) {
      setChangePass("none");
      setChangeVetHours("none");
      setEditCred("none");
      setVetOffers("block");
    } else {
      setVetOffers("none");
    }
  }

  function handlePassword(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  }

  const [counter, setcounter] = useState(0);
  const [user, setuser] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      var token = localStorage.getItem("ajwt");
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        console.log(user);
      });

      setcounter(counter + 1);
    }
  }, [counter, user]);

  function UpdateVetClinic(e) {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShowInfo();
    }
    setValidated(true);
  }

  function SaveVetInfo() {
    Axios.put(`${hostUrl}/staff/update/${vetId}`, {
      vetFname: fname,
      vetMname: mname,
      vetLname: lname,
      email: vetEmail,
      vet_contact_number: vetContactNumber,
      oldnumber: user.vet_staff_contactNumber,
    }).then((response) => {
      // alert(response.data.message);
      if (response.data.message === "Update Successfully") {
        // alert("logging in");
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.vet_staff_email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            // alert("logging in");
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 5) {
              // localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }

            handleCloseOffers();
            ToastUpdate();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        });
      }
    });
  }

  function editVetHours() {
    setvetId(user.vet_admin_id);
    setvetEmail(user.email);

    var Monday = user.scheduleMonday;
    if (Monday.length > 1) {
      setOpeningMonday(Monday.split(" - ")[0]);
      setClosingMonday(Monday.split(" - ")[1]);
      setCheckerMonday(false);
      setCheckerSwitchMonday(false);
    } else {
      setCheckerMonday(true);
      setCheckerSwitchMonday(true);
    }

    // alert(ClosingMonday);

    var Tuesday = user.scheduleTuesday;
    if (Tuesday.length > 1) {
      setOpeningTuesday(Tuesday.split(" - ")[0]);
      setClosingTuesday(Tuesday.split(" - ")[1]);
      setCheckerTuesday(false);
      setCheckerSwitchTuesday(false);
    } else {
      setCheckerTuesday(true);
      setCheckerSwitchTuesday(true);
    }
    // alert(ClosingMonday);

    var Wednesday = user.scheduleWednesday;
    if (Wednesday.length > 1) {
      setOpeningWednesday(Wednesday.split(" - ")[0]);
      setClosingWednesday(Wednesday.split(" - ")[1]);
      setCheckerWednesday(false);
      setCheckerSwitchWednesday(false);
    } else {
      setCheckerWednesday(true);
      setCheckerSwitchWednesday(true);
    }

    // alert(ClosingMonday);

    var Thursday = user.scheduleThursday;
    if (Thursday.length > 1) {
      setOpeningThursday(Thursday.split(" - ")[0]);
      setClosingThursday(Thursday.split(" - ")[1]);
      setCheckerThursday(false);
      setCheckerSwitchThursday(false);
    } else {
      setCheckerThursday(true);
      setCheckerSwitchThursday(true);
    }

    // alert(ClosingMonday);

    var Friday = user.scheduleFriday;
    if (Friday.length > 1) {
      setOpeningFriday(Friday.split(" - ")[0]);
      setClosingFriday(Friday.split(" - ")[1]);
      setCheckerFriday(false);
      setCheckerSwitchFriday(false);
    } else {
      setCheckerFriday(true);
      setCheckerSwitchFriday(true);
    }

    // alert(ClosingMonday);

    var Saturday = user.scheduleSaturday;
    if (Saturday.length > 1) {
      setOpeningSaturday(Saturday.split(" - ")[0]);
      setClosingSaturday(Saturday.split(" - ")[1]);
      setCheckerSaturday(false);
      setCheckerSwitchSaturday(false);
    } else {
      setCheckerSaturday(true);
      setCheckerSwitchSaturday(true);
    }

    // alert(ClosingMonday);

    var Sunday = user.scheduleSunday;
    if (Sunday.length > 1) {
      setOpeningSunday(Sunday.split(" - ")[0]);
      setClosingSunday(Sunday.split(" - ")[1]);
      setCheckerSunday(false);
      setCheckerSwitchSunday(false);
    } else {
      setCheckerSunday(true);
      setCheckerSwitchSunday(true);
    }
  }

  function UpdateVetHours() {
    handleShowHours();
  }
  function SaveVetHours() {
    var monday;
    var tuesday;
    var wednesday;
    var thursday;
    var friday;
    var saturday;
    var sunday;

    if (CheckerSwitchMonday) {
      monday = null;
    } else {
      monday = OpeningMonday + " - " + ClosingMonday;
    }

    if (CheckerSwitchTuesday) {
      tuesday = null;
    } else {
      tuesday = OpeningTuesday + " - " + ClosingTuesday;
    }

    if (CheckerSwitchWednesday) {
      wednesday = null;
    } else {
      wednesday = OpeningWednesday + " - " + ClosingWednesday;
    }

    if (CheckerThursday) {
      thursday = null;
    } else {
      thursday = OpeningThursday + " - " + ClosingThursday;
    }

    if (CheckerSwitchFriday) {
      friday = null;
    } else {
      friday = OpeningFriday + " - " + ClosingFriday;
    }

    if (CheckerSwitchSaturday) {
      saturday = null;
    } else {
      saturday = OpeningSaturday + " - " + ClosingSaturday;
    }

    if (CheckerSwitchSunday) {
      sunday = null;
    } else {
      sunday = OpeningSunday + " - " + ClosingSunday;
    }

    Axios.put(`${hostUrl}/vetclinic/schedule/update/${vetId}`, {
      scheduleMonday: monday,
      scheduleTuesday: tuesday,
      scheduleWednesday: wednesday,
      scheduleThursday: thursday,
      scheduleFriday: friday,
      scheduleSaturday: saturday,
      scheduleSunday: sunday,
    }).then((response) => {
      if (response.data.message === "Update Successfully") {
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }
            handleCloseOffers();
            ToastUpdate();
            setTimeout(() => {
              window.location.href = `/staff/settings`;
            }, 3000);
          }
        });
      }
    });
  }

  function editVetOffers() {
    if (user.enableProduct === 1) {
      setenableProduct(true);
    } else {
      setenableProduct(false);
    }

    if (user.enablePharmacy === 1) {
      setenablePharmacy(true);
    } else {
      setenablePharmacy(false);
    }

    if (user.enableServices === 1) {
      enableServiceChecker("block");
      setenableService("1");
      onSwitchAction();
    } else {
      enableServiceChecker("none");
      setenableService("0");
    }

    if (user.enableConsultation === 1) {
      setenableConsultation(true);
    } else {
      setenableConsultation(false);
    }

    if (user.enableExamination === 1) {
      setenableExamination(true);
    } else {
      setenableExamination(false);
    }

    if (user.enableGrooming === 1) {
      setenableGrooming(true);
    } else {
      setenableGrooming(false);
    }

    if (user.enableVaccination === 1) {
      setenableVaccination(true);
    } else {
      setenableVaccination(false);
    }

    if (user.enablePreventiveControls === 1) {
      setenablePreventiveControls(true);
    } else {
      setenablePreventiveControls(false);
    }
    setvetId(user.vet_admin_id);
    setvetEmail(user.email);
  }

  function UpdateVetOffers() {
    handleShowOffer();
  }
  function SaveVetOffers() {
    Axios.put(`${hostUrl}/vetclinic/offers/update/${vetId}`, {
      enableProduct: enableProduct,
      enablePharmacy: enablePharmacy,
      enableServices: enableService,
      enableConsultation: enableConsultation,
      enableExamination: enableExamination,
      enableGrooming: enableGrooming,
      enableVaccination: enableVaccination,
      enablePreventiveControls: enablePreventiveControls,
    }).then((response) => {
      if (response.data.message === "Update Successfully") {
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 2) {
              localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }
            handleClose();
            ToastUpdate();
            setTimeout(() => {
              window.location.href = `/vet/settings`;
            }, 3000);
          }
        });
      }
    });
  }

  const [passwordVerify, setpasswordVerify] = useState("none");
  const [resultVerify, setresultVerify] = useState();
  const currentComparePass = (password) => {
    // alert(resultVerify);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.post(`${hostUrl}/web/user/compare`, {
      currentHashPassword: user.vet_staff_password,
      currentPassword: password,
    }).then((response) => {
      setresultVerify(response.data);
      if (password != undefined) {
        if (resultVerify === true) {
          setpasswordVerify("none");
        } else {
          setpasswordVerify("block");
        }
      }
    });
  }, [password, resultVerify]);

  function changePassword(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false || password === null) {
      setpasswordVerify("block");
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleShow();
    }
    setValidated(true);
  }

  function savePassword() {
    Axios.put(`${hostUrl}/web/vetstaff/password/${vetId}`, {
      newPassword: newPass,
    }).then((response) => {
      if (response.data.message === "Successfully") {
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.vet_staff_email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            localStorage.setItem("ajwt", response.data.accessToken);
            localStorage.setItem("rjwt", response.data.refreshToken);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", response.data.role);
            if (response.data.role === 5) {
              // localStorage.setItem("vetStatus", response.data.vetStatus);
              localStorage.setItem("id", response.data.id);
            }
          }
          handleCloseHours();
          ToastUpdate();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
      }
    });
  }

  var aspectratioheight = window.screen.height;
  var aspectratiowidth = window.screen.width;
  var value;
  if (aspectratioheight > 1920 && aspectratiowidth > 1080) {
    value = "80%";
  } else {
    value = "100%";
  }

  // upload profile picture
  const [showUploadProfilePicture, setShowUploadProfilePicture] =
    useState(false);

  const handleCloseProfilePicture = () => {
    setimageFile("");
    setShowUploadProfilePicture(false);
    setselectImage(false);
    setdisplayImage(true);
    setprogressCounterUploadImage(0);
  };
  const handleShowProfilePicture = () => setShowUploadProfilePicture(true);

  const [progressCounterUploadImage, setprogressCounterUploadImage] =
    useState(0);
  const [progressUploadController, setprogressUploadController] =
    useState(true);

  function counters() {
    setInterval(() => {
      setprogressCounterUploadImage((progressCounterUploadImage) =>
        progressCounterUploadImage < 100 ? progressCounterUploadImage + 25 : 100
      );
    }, 1000);
  }

  // Upload image controller
  const [selectImage, setselectImage] = useState(false);
  const [displayImage, setdisplayImage] = useState(true);

  // Image Picker
  const inputFileRef = useRef(null);
  const [imageFile, setimageFile] = useState("");
  const onFilechange = (e) => {
    /*Selected files data can be collected here.*/
    console.log(e.target.files);
    setimageFile(URL.createObjectURL(e.target.files[0]));
    setselectImage(true);
    setdisplayImage(false);
  };
  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };

  // Crop
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
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
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

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
    Axios.post(`${hostUrl}/staff/update/profile`, {
      vetid: user.vet_staff_id,
      imageUrl: imageLink,
    }).then((response) => {
      if (response.data.message == "Update Successfully") {
        Axios.get(`${hostUrl}/vet/uploads`, {
          params: {
            email: user.vet_staff_email,
          },
        }).then((response) => {
          if (response.data.message === "Correct") {
            if (response.data.message === "Correct") {
              localStorage.setItem("ajwt", response.data.accessToken);
              localStorage.setItem("rjwt", response.data.refreshToken);
              localStorage.setItem("isLogin", true);
              localStorage.setItem("role", response.data.role);
              if (response.data.role === 5) {
                // localStorage.setItem("vetStatus", response.data.vetStatus);
                localStorage.setItem("id", response.data.id);
              }
            }
            handleCloseHours();
            ToastUpdate();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        });
      }
    });
  }

  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        var file = new File(
          [blob],
          Math.floor(Math.random() * 1000000000000000000),
          { lastModified: new Date().getTime(), type: blob.type }
        );

        uploadImage(file);
      },
      "image/png",
      1
    );
  }
  function updateProfilePicture() {
    generateDownload(previewCanvasRef.current, completedCrop);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
        padding: 20,
        height: "100vh",
        zoom: value,
      }}
    >
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to change your password?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setvetName(user.vet_staff_name);
              setvetEmail(user.vet_doc_email);
              savePassword();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showInfo}
        onHide={handleCloseInfo}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to change your information?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfo}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setfname(user.vet_staff_fname);
              setmname(user.vet_staff_mname);
              setlname(user.vet_staff_lname);
              setvetEmail(user.vet_staff_email);
              setvetContactNumber(user.vet_staff_contactNumber);
              setvetId(user.vet_staff_id);
              SaveVetInfo();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOffers}
        onHide={handleCloseOffers}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Vet Offers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to change your veterinary clinic offers?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOffers}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editVetOffers();
              SaveVetOffers();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showHours}
        onHide={handleCloseHours}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Vet Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to change your veterinary clinic working hours?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHours}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              editVetHours();
              SaveVetHours();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Upload Picture */}
      <Modal
        show={showUploadProfilePicture}
        backdrop="static"
        keyboard={false}
        centered
        onHide={handleCloseProfilePicture}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            hidden={selectImage}
            onClick={onBtnClick}
            style={{
              display: "block",
              // justifyContent: 'center',
              alignItems: "center",
              borderStyle: "dashed",
              borderColor: "grey",
              height: "auto",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10vh",
              }}
            >
              <Form.Control
                type="file"
                id="imagePicker"
                hidden={true}
                ref={inputFileRef}
                accept="image/png, image/gif, image/jpeg"
                onChange={onFilechange}
              />
              <UploadFileIcon sx={{ fontSize: 50 }} />
            </Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10vh",
              }}
            >
              <Typography>Upload Image File</Typography>
            </Container>
          </div>

          <div
            hidden={displayImage}
            style={{
              display: "block",
              // justifyContent: 'center',
              alignItems: "center",
              height: "auto",
              width: "100%",
            }}
          >
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                    height: 300,
                  }}
                />
              </div>
            </Container>
            <Container
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1vh",
              }}
            >
              <Row>
                <Col
                  sm={3}
                  style={{
                    display: "flex",
                  }}
                >
                  <AiOutlineFileJpg style={{ fontSize: 50 }} />
                </Col>
                <Col sm={9}>
                  <Typography>Upload Image File</Typography>
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1vh",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <LinearProgress
                  value={progressCounterUploadImage}
                  variant="determinate"
                />
              </Box>
            </Container>
          </div>
        </Modal.Body>
      </Modal>
      <div>
        <Container
          style={{
            height: 850,
            maxWidth: "100%",
            borderRadius: 30,
            backgroundColor: "#FFFFFF",
            padding: 20,
          }}
        >
          <Row>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <a style={{ textDecoration: "none", fontSize: 20 }} href="/">
                <IoChevronBack />
                Return to Home
              </a>
            </div>
          </Row>
          <Row>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "#696969",
                    margin: 20,
                  }}
                >
                  Your Profile
                </h2>
                <BsFillInfoCircleFill style={{ fontSize: 40, margin: 20 }} />
              </div>
              <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Container
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: 30,
                    height: 150,
                    maxWidth: "100%",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title={"Change Profile Picture"}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <IconButton
                          color="info"
                          aria-label="upload picture"
                          component="span"
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
                        name={
                          user.vet_staff_mname == null
                            ? user.vet_staff_fname + " " + user.vet_staff_lname
                            : user.vet_staff_fname +
                              " " +
                              user.vet_staff_mname +
                              " " +
                              user.vet_staff_lname
                        }
                        src={user.vet_staff_profilePic}
                        size={"10vh"}
                        style={{ marginBottom: 15 }}
                      />
                    </Badge>
                  </Tooltip>
                  <div style={{ textAlign: "left", marginLeft: 10 }}>
                    <h3 style={{ color: "#8A8A8A", fontWeight: "bold" }}>
                      {user.vet_staff_mname == null
                        ? user.vet_staff_fname + " " + user.vet_staff_lname
                        : user.vet_staff_fname +
                          " " +
                          user.vet_staff_mname +
                          " " +
                          user.vet_staff_lname}
                    </h3>
                    <h5 style={{ color: "#19B9CC", fontWeight: "bold" }}>
                      Vet Staff
                    </h5>
                  </div>
                </Container>
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: 40,
                    paddingRight: 40,
                    paddingTop: 30,
                    marginTop: 10,
                    overflowY: "auto",
                    flexWrap: "wrap",
                    height: 420,
                  }}
                >
                  <div style={{ color: "#8A8A8A" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5
                        style={{
                          fontWeight: "bolder",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          ChangePassController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setvetId(user.vet_staff_id);
                          setvetEmail(user.vet_staff_email);
                        }}
                      >
                        Change Password
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          ChangePassController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setvetId(user.vet_staff_id);
                          setvetEmail(user.vet_staff_email);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: 40,
                        paddingTop: 15,
                        display: changePass,
                      }}
                    >
                      <Form.Group as={Row} style={{ rowGap: 10 }}>
                        <Form.Label column sm="4">
                          Current Password
                        </Form.Label>
                        <Col sm="7">
                          <Form.Group
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <FloatingLabel
                              controlId="floatingInputPassword"
                              label="Current Password"
                              className="mb-3"
                            >
                              <Form.Control
                                style={{
                                  height: 50,
                                  width: "50vw",
                                  backgroundColor: "white",
                                }}
                                type="password"
                                placeholder="Password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                required
                                minLength={8}
                                onChange={(e) => {
                                  setpassword(e.target.value);
                                  e.preventDefault();
                                  if (password !== undefined) {
                                    currentComparePass(password);
                                  }
                                }}
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                              </Form.Control.Feedback>
                            </FloatingLabel>
                          </Form.Group>
                          <div style={{ display: passwordVerify }}>
                            <p style={{ color: "#FF0000" }}>
                              Password does'nt match
                            </p>
                          </div>
                        </Col>
                      </Form.Group>

                      <Row>
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={changePassword}
                          style={{
                            width: 1800,
                          }}
                        >
                          <Form.Group as={Row} style={{ rowGap: 10 }}>
                            <Form.Label column sm="4">
                              New Password
                            </Form.Label>
                            <Col sm="8" style={{ paddingLeft: 20 }}>
                              <Form.Group
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                <FloatingLabel
                                  controlId="floatingInputPassword"
                                  label="New Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    style={{
                                      height: 50,
                                      backgroundColor: "white",
                                      width: "50vw",
                                    }}
                                    type="password"
                                    placeholder="Password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required
                                    onChange={(e) => {
                                      setValidated(true);
                                      setnewPass(e.target.value);
                                    }}
                                  />
                                  <Form.Text id="passwordHelpBlock" muted>
                                    Your password must contain at least one
                                    number and one uppercase and lowercase
                                    letter, and at least 8 or more characters
                                  </Form.Text>
                                  <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                  </Form.Control.Feedback>
                                </FloatingLabel>
                              </Form.Group>
                            </Col>

                            <Form.Label column sm="4">
                              Confirm New Password
                            </Form.Label>
                            <Col sm="8" style={{ paddingLeft: 20 }}>
                              <Form.Group
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                <FloatingLabel
                                  controlId="floatingInputPassword"
                                  label="Confirm Password"
                                  className="mb-3"
                                >
                                  <Form.Control
                                    style={{
                                      height: 50,
                                      width: "50vw",
                                      backgroundColor: "white",
                                    }}
                                    type="password"
                                    placeholder="Password"
                                    pattern={newPass}
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    required
                                    onChange={(e) => {
                                      setValidated(true);
                                      setconfirmPass(e.target.value);
                                    }}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    Your confirm password must be the same as
                                    new password.
                                  </Form.Control.Feedback>
                                </FloatingLabel>
                              </Form.Group>
                            </Col>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                type="submit"
                                style={{
                                  borderRadius: 30,
                                  paddingLeft: 120,
                                  paddingRight: 120,
                                  backgroundColor: "#19B9CC",
                                }}
                              >
                                SAVE
                              </Button>
                            </div>
                          </Form.Group>
                        </Form>
                      </Row>
                    </div>
                  </div>
                  <div style={{ color: "#8A8A8A" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5
                        style={{
                          fontWeight: "bolder",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          EditCredController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setfname(user.vet_staff_fname);
                          setmname(user.vet_staff_mname);
                          setlname(user.vet_staff_lname);
                          setvetEmail(user.vet_staff_email);
                          setvetContactNumber(user.vet_staff_contactNumber);
                          setvetId(user.vet_staff_id);
                        }}
                      >
                        Edit Information
                      </h5>
                      <IoChevronForward
                        style={{ fontSize: 30, cursor: "pointer" }}
                        onClick={() => {
                          EditCredController(!handleChecker);
                          sethandleChecker(!handleChecker);
                          setfname(user.vet_staff_fname);
                          setmname(user.vet_staff_mname);
                          setlname(user.vet_staff_lname);
                          setvetEmail(user.vet_staff_email);
                          setvetContactNumber(user.vet_staff_contactNumber);
                          setvetId(user.vet_staff_id);
                        }}
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: 40,
                        paddingTop: 15,
                        display: editCred,
                      }}
                    >
                      <Row>
                        <Form validated={true} onSubmit={UpdateVetClinic}>
                          <Form.Group as={Row} style={{ rowGap: 10 }}>
                            <Form.Label column sm="4">
                              Name
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                value={fname}
                                placeholder="First name"
                                minLength={5}
                                required
                                onChange={(e) => {
                                  setfname(e.target.value);
                                }}
                              />
                              <div style={{ height: 10 }}></div>
                              <Form.Control
                                type="text"
                                value={lname}
                                placeholder="Last name"
                                minLength={5}
                                required
                                onChange={(e) => {
                                  setlname(e.target.value);
                                }}
                              />
                            </Col>

                            <Form.Label column sm="4">
                              Contact Number
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                required
                                pattern="\d{11}"
                                maxLength="11"
                                minLength="11"
                                placeholder="Contact Number"
                                value={vetContactNumber}
                                onChange={(e) => {
                                  setvetContactNumber(e.target.value);
                                }}
                              />
                            </Col>

                            <Form.Label column sm="4">
                              Email Address
                            </Form.Label>
                            <Col sm="7">
                              <Form.Control
                                type="text"
                                placeholder="Email Address"
                                value={vetEmail}
                                onChange={(e) => {
                                  setvetEmail(e.target.value);
                                }}
                              />
                            </Col>
                          </Form.Group>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              type="submit"
                              style={{
                                borderRadius: 30,
                                paddingLeft: 120,
                                paddingRight: 120,
                                backgroundColor: "#19B9CC",
                              }}
                            >
                              SAVE
                            </Button>
                          </div>
                        </Form>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default VetSettings;
