import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../Components/Host";
import { useParams } from "react-router-dom";
import { Skeleton, useMediaQuery } from "@mui/material";
import getUser from "../../../../Components/userData";
const HistoryTab = (props) => {
  const [visitor, setvisitor] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(async () => {
    getVisitor(props.visitor);
  }, []);

  const getVisitor = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/vetclinic/visitor/${id}`);
    // console.log(result.data);
    setvisitor(result.data);
  };

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

  function timeFormatter(time) {
    var timeCurrent = time.split(":");
    if (timeCurrent[0] === "16") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "17") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "18") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "19") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "20") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "21") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "22") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "23") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "24") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "01") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "02") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "03") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] === "04") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "05") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "06") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "07") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "08") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "09") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "10") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "11") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "12") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "13") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "14") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] === "15") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    }
  }

  function tempMeter(temp) {
    if (temp >= 38) {
      return <h5 style={{ color: "red" }}>{temp}</h5>;
    } else {
      return <h5 style={{ color: "green" }}>{temp}</h5>;
    }
  }
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Pet Owner Name",
      field: "name",
      defaultSort: "asc",
    },
    {
      title: "Temperature",
      render: (row) => tempMeter(row.temperature),
      // sorting: true,
    },
    {
      title: "Date",
      // field: "date",
      sorting: true,
      render: (row) =>
        dateConvertion(row.date_visited.toString().split("T")[0]),
    },
    {
      title: "Time",
      // field: "time",
      sorting: true,
      render: (row) =>
        timeFormatter(
          row.time_visited
            .substring()
            .split("T")[1]
            .substring(0, row.time_visited.substring().split("T")[1].length - 5)
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
        title={""}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default HistoryTab;
