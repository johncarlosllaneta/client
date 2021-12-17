import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../Components/Host";
import { useParams } from "react-router-dom";

const HistoryTab = (props) => {
  let { vetid } = useParams();

  // useEffect(() => {
  //   Axios.get(`${hostUrl}/history/vetclinic/${vetid}`).then((response) => {
  //     setHistory(response.data);
  //   });
  // }, [history]);

  const [counter, setcounter] = useState(0);
  const [visitor, setvisitor] = useState([]);
  useEffect(() => {
    if (counter < 2) {
      Axios.get(`${hostUrl}/vetclinic/visitor/${vetid}`).then((response) => {
        setvisitor(response.data);
      });
      setcounter(counter + 1);
    }
  }, [visitor]);

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
        tConvert(
          row.time_visited
            .toString()
            .split("T")[1]
            .substring(0, row.time_visited.toString().split("T")[1].length - 5)
        ),
    },
  ];
  return (
    <div>
      {/* Data Table */}
      <MaterialTable
        style={{ color: "#3BD2E3" }}
        columns={columns}
        data={visitor}
        title={"Visitor Monitoring Table"}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
        }}
      />
    </div>
  );
};

export default HistoryTab;
