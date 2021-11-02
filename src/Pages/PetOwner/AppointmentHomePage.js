import React, { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import Axios from "axios";

import { hostUrl } from "../../Components/Host";

function AppointmentHomePage(props) {
  const [counter, setcounter] = useState(0);
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/appointments/:${props.data.pet_owner_id}`).then(
        (response) => {
          setAppointment(response.data);
        }
      );
      setcounter(counter + 1);
    }
  }, [appointment]);

  function dateConvertion(date) {
    var str = date.split("-");
    var year = str[0];
    var month;
    var day = str[2];

    if (str[1] === "01") {
      month = "January";
    } else if (str[1] === "02") {
      month = "February";
    } else if (str[1] === "03") {
      month = "March";
    } else if (str[1] === "04") {
      month = "April";
    } else if (str[1] === "05") {
      month = "May";
    } else if (str[1] === "06") {
      month = "June";
    } else if (str[1] === "07") {
      month = "July";
    } else if (str[1] === "08") {
      month = "August";
    } else if (str[1] === "09") {
      month = "September";
    } else if (str[1] === "10") {
      month = "October";
    } else if (str[1] === "11") {
      month = "November";
    } else if (str[1] === "12") {
      month = "December";
    }

    return month + " " + day + ", " + year;
  }
  return (
    <div>
      <Card
        id="divContainer"
        style={{ overflow: "auto", height: 600, width: "100%" }}
      >
        {appointment.map((val) => {
          return (
            <div>
              <Card id="item" style={{ margin: 10 }}>
                <h3 className="ml-4 mt-4">{val.service_name}</h3>
                <p className="ml-5 ">
                  <strong>Date: </strong>{" "}
                  {dateConvertion(val.date_scheduled.split("T")[0])}{" "}
                </p>
                <p className="ml-5 ">
                  <strong>Time: </strong> {val.time_scheduled}{" "}
                </p>
              </Card>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export default AppointmentHomePage;
