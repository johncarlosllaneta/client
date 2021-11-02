import React from "react";

import { Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/DataPrivacyNotice.css";

function DataPrivacyNotice(props) {
  return (
    <div>
      <div>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            className=""
            id="divContainer"
            style={{
              overflow: "auto",
              height: 500,
              borderColor: "transparent",
            }}
          >
            <Card.Text
              style={{
                textAlign: "justify",
                padding: "5%",
                height: 500,
              }}
            >
              National University Information and Technology Students built the
              TerraVet app as a Commercial app. This SERVICE is provided by
              National University and is intended for use as is. This page is
              used to inform visitors regarding our policies with collecting,
              using, and disclosing personal information if anyone decided to
              use our Service. If you choose to use our Service, you agree to
              the collection and use of information in relation to this policy.
              The Personal Information that we collect is used for providing and
              improving the Service. We will not use or share your information
              with anyone except as described in this Privacy Policy. The terms
              used in this Privacy Policy have the same meanings as in our Terms
              and Conditions, which is accessible at TerraVet unless otherwise
              defined in this Privacy Policy.
              <br></br>
              <h5> Consent </h5>
              By using our website and mobile application, you hereby consent to
              our Privacy Policy and agree to its terms.
              <br></br>
              <h5>Information we collect</h5>
              The personal information you are asked to provide and the reasons
              you are asked to provide it will be made clear to you when we ask
              you to provide your personal information. If you contact us
              directly, we may receive additional information about you such as
              your name, email address, phone number, the content of the message
              or attachments you may send us, and any other information you may
              choose to provide. When you register for an Account, we may ask
              for your contact information, including name, company name,
              address, email address, and contact number.
              <br></br>
              <h5> How we use your information</h5>
              We use the information we collect in various ways, including to:
              <ul style={{ textAlign: "left" }}>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>
                  Develop new products, services, features, and functionality
                </li>
                <li>
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website and for
                  marketing and promotional purposes
                </li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
            </Card.Text>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default DataPrivacyNotice;
