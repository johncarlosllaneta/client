import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import logo from "../../../Images/logo.png";
import "../../../css/SideNavBar.css";
import { HiHome } from "react-icons/hi";
import { MdPets } from "react-icons/md";
import { FaClinicMedical, FaStethoscope } from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";
import { AiFillSchedule, AiFillSecurityScan } from "react-icons/ai";
import { RiServiceFill } from "react-icons/ri";
import { GiDogBowl } from "react-icons/gi";
import Axios from "axios";
import { hostUrl } from "../../../Components/Host";
import { MdFiberNew } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import getUser from "../../../Components/userData";

function SideNavBarVetAdmin(props) {
    const [consultationChecker, setconsultationChecker] = useState();
    const [pharmacyChecker, setpharmacyChecker] = useState();
    const [productChecker, setproductChecker] = useState();
    const [servicesChecker, setservicesChecker] = useState();
    const [consultationCheckerEnabler, setconsultationCheckerEnabler] = useState("none");
    const [pharmacyCheckerEnabler, setpharmacyCheckerEnabler] = useState("none");
    const [productCheckerEnabler, setproductCheckerEnabler] = useState("none");
    const [servicesCheckerEnabler, setservicesCheckerEnabler] = useState("none");

    const [numberOfUnviewedReserved, setnumberOfUnviewedReserved] = useState(0);
    const [numberOfUnviewedAppointment, setnumberOfUnviewedAppointment] =
        useState(0);

    const [user, setuser] = useState([]);

    useEffect(async () => {
        const userData = await getUser();
        setuser(userData);



        setconsultationChecker(userData.enableConsultation);
        setpharmacyChecker(userData.enablePharmacy);
        setproductChecker(userData.enableProduct);
        setservicesChecker(userData.enableServices);




        Axios.get(
            `${hostUrl}/vetclinic/notification/isNew/length/${userData.vetid}`
        ).then((response) => {
            setnumberOfUnviewedAppointment(response.data.view);
            // alert(response.data.view);
        });

        Axios.get(
            `${hostUrl}/vetclinic/notification/reservation/isNew/length/${userData.vetid}`
        ).then((response) => {
            setnumberOfUnviewedReserved(response.data.view);
            // alert(response.data.view);
        });


    }, []);

    useEffect(() => {
        if (consultationChecker === 1) {
            setconsultationCheckerEnabler("block");
        }
        if (pharmacyChecker === 1) {
            setpharmacyCheckerEnabler("block");
        }
        if (productChecker === 1) {
            setproductCheckerEnabler("block");
        }
        if (servicesChecker === 1) {
            setservicesCheckerEnabler("block");
        }
    }, [pharmacyChecker, productChecker, servicesChecker, consultationChecker]);

    const [dashboard, setdashboard] = useState();

    const [pets, setpets] = useState();
    const [vetoffer, setvetoffer] = useState();
    const [visitormonitoring, setvisitormonitoring] = useState();
    const [dropdownVetOffer, setdropdownVetOffer] = useState(true);
    const [consultation, setconsultation] = useState("#181c21");
    const [pharmacy, setpharmacy] = useState("#181c21");
    const [products, setproducts] = useState("#181c21");
    const [services, setservices] = useState("#181c21");
    const [appointment, setappointment] = useState();
    useEffect(() => {
        if (props.active === "dashboard") {
            setdashboard("#19B9CC");
        } else if (props.active === "pets") {
            setpets("#19B9CC");
        } else if (props.active === "vetoffer") {
            setvetoffer("#19B9CC");
        } else if (props.active === "visitormonitoring") {
            setvisitormonitoring("#19B9CC");
        } else if (props.active === "appointment") {
            setappointment("#19B9CC");
        } else if (props.active === "consultation") {
            handleDropdown();
            setconsultation("#19B9CC");
        } else if (props.active === "pharmacy") {
            handleDropdown();
            setpharmacy("#19B9CC");
        } else if (props.active === "products") {
            handleDropdown();
            setproducts("#19B9CC");
        } else if (props.active === "services") {
            handleDropdown();
            setservices("#19B9CC");
        }
    }, []);

    function handleDropdown() {
        setdropdownVetOffer(!dropdownVetOffer);
    }

    function viewingReserved() {
        Axios.put(
            `${hostUrl}/vetclinic/notification/reservation/isNew/${user.vetid}`
        );
    }

    function viewingAppointment() {
        Axios.put(`${hostUrl}/vetclinic/notification/isNew/${user.vetid}`);
    }

    return (
        <div id="sideNavBar">
            <Container
                style={{
                    padding: 30,
                }}
            >
                <Image
                    src={logo}
                    style={{
                        height: 40,
                    }}
                />
                <a
                    href="/dashboard"
                    style={{
                        fontWeight: "bold",
                        marginLeft: 10,
                        marginTop: 10,
                        fontSize: 30,
                        textDecoration: "none",
                        color: "white",
                    }}
                >
                    TERRAVET
                </a>
            </Container>
            <hr />

            <Container
                id="ContainerNavItem"
                style={{
                    backgroundColor: dashboard,
                }}
            >
                <a id="anchorTag" href="/dashboard">
                    <HiHome id="icons" />
                    Dashboard
                </a>
            </Container>


            {/* <Container
                id="ContainerNavItem"
                style={{
                    backgroundColor: pets,
                }}
            >
                <MdPets id="icons" />
                <a id="anchorTag" href={`/pets/${user.vetid}`}>
                    Pets
                </a>
            </Container> */}

            {/* --- drop down */}
            <Container
                id="ContainerNavItem"
                style={{
                    backgroundColor: vetoffer,
                }}
            >
                {numberOfUnviewedReserved !== 0 ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <FaClinicMedical id="icons" />
                        <p
                            id="anchorTag"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={handleDropdown}
                        >
                            Vet Offers
                        </p>
                        <GoPrimitiveDot
                            style={{
                                color: "#f8d210",
                                marginLeft: 25,
                                fontSize: 28,
                            }}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <FaClinicMedical id="icons" />
                        <p
                            id="anchorTag"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={handleDropdown}
                        >
                            Vet Offers
                        </p>
                    </div>
                )}
            </Container>

            <div hidden={dropdownVetOffer}>
                {/* <div
                    style={{
                        display: consultationCheckerEnabler,
                    }}
                > */}
                {/* Consultation */}
                {/* <Container
                        id="ContainerNavItemDropDown"
                        style={{
                            backgroundColor: consultation,
                        }}
                    >
                        <FaStethoscope id="icons" />
                        <a id="anchorTag" href={`/services/consultation/${user.vetid}`}>
                            Consultation
                        </a>
                    </Container> */}
                {/* </div> */}

                <div
                    style={{
                        display: pharmacyCheckerEnabler,
                    }}
                >
                    {/* Pharmacy */}
                    <Container
                        id="ContainerNavItemDropDown"
                        style={{
                            backgroundColor: pharmacy,
                        }}
                    >
                        <MdLocalPharmacy id="icons" />
                        <a id="anchorTag" href={`/pharmacy/${user.vetid}`}>
                            Pharmacy
                        </a>
                    </Container>
                </div>

                <div
                    style={{
                        display: productCheckerEnabler,
                    }}
                >
                    {/* Products */}
                    <Container
                        id="ContainerNavItemDropDown"
                        style={{
                            backgroundColor: products,
                        }}
                        onClick={viewingReserved}
                    >
                        {numberOfUnviewedReserved !== 0 ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                }}
                            >
                                <GiDogBowl id="icons" />
                                <a id="anchorTag" href={`/products/${user.vetid}`}>
                                    Products
                                </a>
                                <MdFiberNew
                                    style={{
                                        color: "#f8d210",
                                        marginLeft: 25,
                                        fontSize: 28,
                                    }}
                                />
                            </div>
                        ) : (
                            <div>
                                <GiDogBowl id="icons" />
                                <a id="anchorTag" href={`/products/${user.vetid}`}>
                                    Products
                                </a>
                            </div>
                        )}
                    </Container>
                </div>

                <div
                    style={{
                        display: servicesCheckerEnabler,
                    }}
                >
                    {/* Services */}
                    <Container
                        id="ContainerNavItemDropDown"
                        style={{
                            backgroundColor: services,
                        }}
                    >
                        <RiServiceFill id="icons" />
                        <a id="anchorTag" href={`/services/${user.vetid}`}>
                            Services
                        </a>
                    </Container>
                </div>
            </div>

            {/* --- drop down */}

            <Container
                id="ContainerNavItem"
                style={{
                    backgroundColor: appointment,
                }}
                onClick={viewingAppointment}
            >
                {numberOfUnviewedAppointment !== 0 ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <AiFillSchedule id="icons" />
                        <a id="anchorTag" href={`/appointments/${user.vetid}`}>
                            Appointments
                        </a>
                        <MdFiberNew
                            style={{
                                color: "white",
                                marginLeft: 25,
                                fontSize: 28,
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <AiFillSchedule id="icons" />
                        <a id="anchorTag" href={`/appointments/${user.vetid}`}>
                            Appointments
                        </a>
                    </div>
                )}
            </Container>

            <Container
                id="ContainerNavItem"
                style={{
                    backgroundColor: visitormonitoring,
                }}
            >
                <AiFillSecurityScan id="icons" />
                <a id="anchorTag" href={`/visitors`}>
                    Visitor Monitoring
                </a>
            </Container>

            <hr />
        </div>
    );
}

export default SideNavBarVetAdmin

