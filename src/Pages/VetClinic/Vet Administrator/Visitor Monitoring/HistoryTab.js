import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { Button, OverlayTrigger, Popover, Overlay } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../Components/Host";
import { useParams } from "react-router-dom";
import { users } from "../../../../Components/User";

const HistoryTab = (props) => {


  // Popover Overlay
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowPopover(!showPopover);
    setTarget(event.target);
  };
  const [counter, setcounter] = useState(0);
  const [visitor, setvisitor] = useState([]);
  useEffect(() => {

    Axios.get(`${hostUrl}/vetclinic/visitor/${props.user.vetid}`).then((response) => {
      setvisitor(response.data);
    });


  }, []);

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


  function formatAMPM(date) {
    var formatDate = new Date(date);
    var hours = formatDate.getHours;
    var minutes = formatDate.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Pet Owner Name",
      field: "name",
      defaultSort: "asc",
    },
    {
      title: "Date",
      sorting: true,
      render: (row) =>
        dateConvertion(row.date_visited.toString().split("T")[0]),
    },
    {
      title: "Time",
      sorting: true,
      render: (row) =>
        formatAMPM(row.time_visited)


    },
    {
      title: "Temperature",
      sorting: true,
      render: (row) =>
        row.temperature >= 37.8 ? <p style={{ color: 'red' }}> {row.temperature}</p> : <p style={{ color: 'green' }}> {row.temperature}</p>


    },
  ];
  return (
    <div>

      <Overlay
        show={showPopover}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Helper</Popover.Header>
          <Popover.Body>
            <p>
              This table shows the list of visitors in the vet
              clinic.{" "}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>

      {/* Data Table */}
      <MaterialTable

        columns={columns}
        data={visitor}
        title={""}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          pageSize: 10
        }}
        actions={[
          {
            icon: "information",
            tooltip: "Helper",
            isFreeAction: true,
            onClick: handleClick,
          },
        ]}
      />
    </div>
  );
};

export default HistoryTab;
