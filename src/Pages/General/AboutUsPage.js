import React from 'react'
import MainNavBar from '../../Components/MainNavBar'
import AboutUs from './AboutUs'
import { Card, Container, Row, Col } from 'react-bootstrap'
import Avatar from 'react-avatar'
import JCEL from '../../Images/JCEL.jpg'
import RLS from '../../Images/RLS.png'
import JSM from '../../Images/JSM.png'
function AboutUsPage() {
    return (
        <div>
            <MainNavBar />

            <div
                style={{
                    height: '50vh',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1508675801627-066ac4346a61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1465&q=80")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundPosition: 'center',
                    width: '100%',
                    paddingTop: 400

                }}
            >


            </div>
            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: -100,
                    marginBottom: 50,

                }}
            >
                <Card
                    style={{
                        height: 'auto',
                        backgroundColor: 'white',
                        width: '70vw',
                        padding: 50,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        marginBottom: 20
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >

                        <h1> About us </h1>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'justify'
                        }}
                    >
                        <p>
                            We are Terravet, we came up with this topic in past six months with dedication  to inform and acknowledge the inportance of safety and healthcare for pets and pet owners. We help pet owners  to monitor ,restore pet infomation for the future  uses. We promote the importance the effects of our pets to our everyday lives.
                        </p>

                    </div>

                </Card>
            </Container>

            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',

                    marginBottom: 100,

                }}
            >
                <div
                    style={{
                        width: '50%',
                        height: 'inherit',

                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            width: '70%',
                            height: 'auto',
                            fontSize: '1vw',
                        }}
                    >
                        <p>Please call us during business hours at any contact details, and a member of our staff would be pleased to assist you. Your time is valuable to us , and we only want the best for your pet. </p>


                    </div>

                </div>
            </Container>


            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: -100,

                }}
            >
                <Card
                    style={{
                        height: 'auto',
                        backgroundColor: 'white',
                        width: '30vw',
                        padding: 50,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        marginBottom: 20,
                        opacity: '0.80'
                    }}
                >


                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'justify',
                            fontSize: '1vw'
                        }}
                    >
                        <p>
                            Compassionate care for your companion. Where pet love and human compassion meet..
                        </p>

                    </div>

                </Card>
            </Container>

            <div
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    marginBottom: 100
                }}
            >
                <div
                    style={{
                        width: '50%',
                        height: '50vh',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        display: 'inline'
                    }}
                >


                </div>

                <div
                    style={{
                        width: '50%',
                        height: '50vh',
                        display: 'inline',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                    <Container
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'block',
                            alignItems: 'center',
                            paddingTop: "10vh"
                        }}
                    >
                        <Row
                            style={{
                                width: '100%',
                                textAlign: 'left'
                            }}
                        >
                            <h1>Mission</h1>
                        </Row>

                        <Row
                            style={{
                                width: '100%',
                                textAlign: 'left'
                            }}
                        >

                            <p>Enhance and boost pet companionship and improve quality of health service for pets by providing platform for everyone.</p>
                        </Row>
                    </Container>
                </div>
            </div >




            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: -100,

                }}
            >
                <Card
                    style={{
                        height: 'auto',
                        backgroundColor: 'white',
                        width: '30vw',
                        padding: 50,
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        marginBottom: 20,
                        opacity: '0.80'
                    }}
                >


                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'justify',
                            fontSize: '1vw'
                        }}
                    >
                        <p>
                            We care you pet like you do, Discover what our veterinarians can do for you and your pet.
                        </p>

                    </div>

                </Card>
            </Container>
            <div
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex'
                }}
            >

                <div
                    style={{
                        width: '50%',
                        height: '50vh',
                        display: 'inline',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                    <Container
                        style={{
                            width: '50%',
                            height: '100%',
                            display: 'block',
                            alignItems: 'center',
                            paddingTop: "10vh"
                        }}
                    >
                        <Row
                            style={{
                                width: '100%',
                                textAlign: 'left'
                            }}
                        >
                            <h1>Vision</h1>
                        </Row>

                        <Row
                            style={{
                                width: '100%',
                                textAlign: 'left'
                            }}
                        >

                            <p>Our team’s objective is to enhance the quality of health service by providing a platform that ensure our partners to meet the global standard  service for pet companionship.</p>
                        </Row>
                    </Container>
                </div>
                <div
                    style={{
                        width: '50%',
                        height: '50vh',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1621265845825-b261b2aa439f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%',
                        backgroundPosition: 'center',
                        display: 'inline'
                    }}
                >


                </div>
            </div >

            <Container
                style={{
                    marginTop: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 100,
                }}
            >
                <h1>Team Roster</h1>

            </Container>

            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'center',

                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '30vh'
                    }}
                >
                    <Row>

                        <Col>
                            <Card
                                style={{
                                    height: 'auto',
                                    paddingBottom: 25,
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                }}
                            >
                                <Container>
                                    <Avatar name='Carmella Joy D. Guelas' round={true} size={200} style={{ boder: '10px solid white', marginTop: -100, marginBottom: 25, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', }} />
                                </Container>
                                <h3>Carmella Joy D. Guelas</h3>
                                <p>Researcher</p>

                            </Card>
                        </Col>

                        <Col>
                            <Card
                                style={{
                                    height: 'auto',
                                    paddingBottom: 25,
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                }}
                            >
                                <Container>
                                    <Avatar name='John Carlos E. Llaneta' src={JCEL} round={true} size={200} style={{ boder: '10px solid white', marginTop: -100, marginBottom: 25, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', }} />
                                </Container>
                                <h3>John Carlos E. Llaneta</h3>
                                <p>Project Manager</p>

                            </Card>
                        </Col>

                        <Col>
                            <Card
                                style={{
                                    height: 'auto',
                                    paddingBottom: 25,
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                }}
                            >
                                <Container>
                                    <Avatar name='Jimuel S. Mercado' src={JSM} round={true} size={200} style={{ boder: '10px solid white', marginTop: -100, marginBottom: 25, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', }} />
                                </Container>
                                <h3>Jimuel S. Mercado</h3>
                                <p>Mobile Developer</p>

                            </Card>
                        </Col>

                        <Col>
                            <Card
                                style={{
                                    height: 'auto',
                                    paddingBottom: 25,
                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                }}
                            >
                                <Container>
                                    <Avatar name='Richard L. Sasis' src={RLS} round={true} size={200} style={{ boder: '10px solid white', marginTop: -100, marginBottom: 25, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', }} />
                                </Container>
                                <h3>Richard L. Sasis</h3>
                                <p>Web Developer</p>

                            </Card>
                        </Col>

                    </Row>



                </div>


            </Container>





            <AboutUs />
        </div >
    )
}

export default AboutUsPage
