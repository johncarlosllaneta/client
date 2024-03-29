import React from 'react'
import { Card, Container } from 'react-bootstrap'
import MainNavBar from '../../Components/MainNavBar'
import AboutUs from './AboutUs'

function PrivacyPolicy() {
    return (
        <div>
            <MainNavBar />

            <div
                style={{
                    height: '60vh',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1601758261049-55d060e1159a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
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
                    marginTop: -300,

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

                        <h1> Privacy Policy </h1>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'justify'
                        }}
                    >
                        <p>
                            National University Information and Technology Students built the TerraVet app as a Commercial app. This SERVICE is provided by National University and is intended for use as is. This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
                            If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
                            The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at TerraVet unless otherwise defined in this Privacy Policy.<br />
                            <br />
                            <h6 style={{ fontWeight: 'bold', }}>Information Collection and Use</h6>
                            For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, Address, email, birthdate, contact number. The information that we request will be retained by us and used as described in this privacy policy.
                            The app does use third party services that may collect information used to identify you.
                            Link to privacy policy of third-party service providers used by the app <br />
                            •	Google Play Services <br />
                            <br />
                            <h6 style={{ fontWeight: 'bold', }}>Log Data</h6>

                            We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
                            Cookies<br />
                            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
                            This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
                            Service Providers<br />
                            We may employ third-party companies and individuals due to the following reasons:<br />
                            •	To facilitate our Service.<br />
                            •	To provide the Service on our behalf.<br />
                            •	To perform Service-related services; or<br />
                            •	To assist us in analyzing how our Service is used.<br />
                            We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.<br />
                            <br />
                            <h6 style={{ fontWeight: 'bold', }}>Security</h6>
                            <br />
                            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.<br />
                            <br />
                            <h6 style={{ fontWeight: 'bold', }}>Links to Other Sites</h6> <br />
                            This Service may contain links to other sites. If you  on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.<br />
                            <br />
                            <h6 style={{ fontWeight: 'bold', }}>Children’s Privacy</h6><br />
                            These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.<br />
                            <br />
                            <h6 style={{ fontWeight: 'bold', }}>Changes to This Privacy Policy</h6><br />
                            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.<br />
                            This policy is effective as of 2021-06-30<br />
                            <h6 style={{ fontWeight: 'bold', }}>Contact Us</h6><br />
                            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at Terravet@gmail.com.<br />
                        </p>

                    </div>

                </Card>
            </Container>
            <AboutUs />
        </div>
    )
}

export default PrivacyPolicy
