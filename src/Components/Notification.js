import React from "react";
import { NavDropdown } from "react-bootstrap";
function Notification(props) {
  return (
    <div>
      <NavDropdown.Item>
        <ul className="list-unstyled">
          {/* <Media as="li">
            <img
              src={props.img}
              width={64}
              height={64}
              className="mr-3 mt-2"
              alt="Generic placeholder"
              style={{ borderRadius: 30 }}
            />
            <Media.Body
              className="mt-3"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              <strong> {props.name}</strong>
              <p style={{ fontSize: 12 }}>{props.description}</p>
            </Media.Body>
          </Media> */}
        </ul>
      </NavDropdown.Item>
      <NavDropdown.Divider></NavDropdown.Divider>
    </div>
  );
}

export default Notification;
