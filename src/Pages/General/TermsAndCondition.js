import React from 'react'
import {
    Card,
    Row,
    Col,
    Image,
    Container
} from "react-bootstrap";
import { IoChevronBack } from "react-icons/io5";
import logo from "../../Images/assets/logo.png";
import imageTerms from "../../Images/terms.jpg"
function TermsAndCondition() {

    var screenh = window.screen.height - 320;
    return (
        <div className='ml-3'>
            <Row style={{ display: 'flex' }}>

                <Col style={{ marginTop: "5%", height: screenh }}>
                    <a href="/" className='mb-5 ml-5' style={{ textDecoration: 'none', float: 'left' }}><IoChevronBack />Back</a>
                    <br></br>
                    <br></br>
                    <Image src={logo} />
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: 50,
                            color: "#0A94A4",
                            fontWeight: "bold",
                            marginLeft: '9%'
                        }}
                    >
                        Terms and Condition
                    </h1>

                    <Card className='ml-4' style={{ overflow: 'auto', height: '75%' }}>
                        <Card.Text style={{ textAlign: 'justify', padding: '2%' }}>
                            At Terravet, accessible from www.terravet.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information collected and recorded by Terravet and how we use it.
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                            This Privacy Policy applies only to our online activities. It is valid for visitors to our mobile and web application regarding the information that the user shared or collect in Terravet. This policy does not apply to any information collected offline or via channels other than this website.
                           <br></br>
                            <h5> Consent </h5>
                            By using our website and mobile application, you hereby consent to our Privacy Policy and agree to its terms.
                            <br></br>
                            <h5>Information we collect</h5>
                            The personal information you are asked to provide and the reasons you are asked to provide it will be made clear to you when we ask you to provide your personal information.
                            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the content of the message or attachments you may send us, and any other information you may choose to provide.
                            When you register for an Account, we may ask for your contact information, including name, company name, address, email address, and contact number.
                            <br></br>
                            <h5> How we use your information</h5>
                            We use the information we collect in various ways, including to:

                          <ul style={{ textAlign: 'left' }}>
                                <li>Provide, operate, and maintain our website</li>
                                <li>Improve, personalize, and expand our website</li>
                                <li>Understand and analyze how you use our website</li>
                                <li>Develop new products, services, features, and functionality</li>
                                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website and for marketing and promotional purposes</li>
                                <li>Send you emails</li>
                                <li>Find and prevent fraud</li>
                            </ul>



                            <br></br>
                            <h5> Log Files</h5>
                            Terravet follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. Instead, the purpose of the data is to analyze trends, administer the site, track users' movement on the website, and gather demographic information.
                            <br></br>
                            <h5> Cookies and Web Beacons</h5>
                            Like any other website, Terravet uses 'cookies'. These cookies are used to store information including visitors' preferences and the pages on the website that the visitor accessed or visited. In addition, the information utilized to optimize the users' experience by customizing our web page content based on visitors' browser type and other information.
                            <br></br>
                            <h5> GDPR Data Protection Rights</h5>
                            We want to make sure you are fully aware of all of your data protection rights. Therefore, every user is entitled to the following:
                           <ul>
                                <li>
                                    The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.
                                    The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you think is incomplete.
                               </li>
                                <li>
                                    The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
                               </li>
                                <li>
                                    The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
                               </li>
                                <li>
                                    The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
                               </li>
                                <li>
                                    The right to data portability – You have the right to request that we transfer the data that we have collected to another organization or directly to you, under certain conditions.
                               </li>
                            </ul>





                            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                            <br></br>
                            <h5> Children's Information</h5>
                            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                            Terravet does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best to promptly remove such information from our records.



    </Card.Text>
                    </Card>
                </Col>
                <Col style={{ height: screenh }} >
                    <Container>

                        <Image
                            src={imageTerms}
                            alt="dog"
                            className="card-img"
                            style={{ width: "100%", backgroundPosition: 'center', height: screenh + 200 }}
                        />

                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default TermsAndCondition
