import React, { useState, useEffect } from "react";
import {
  Popover,
  Button,
  Card,
  OverlayTrigger,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { hostUrl } from "../../Components/Host";
import MaterialTable from "material-table";
function History() {
  const [counter, setcounter] = useState(0);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    if (counter < 6) {
      Axios.get(`${hostUrl}/systemAdmin/system/logs`).then((response) => {
        setHistory(response.data);
      });
      setcounter(counter + 1);
    }
  }, [history]);

  const [q, setq] = useState("");
  // alert(swidth);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

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

    if (timeCurrent[0] == "16") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "17") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "18") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "19") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "20") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "21") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "22") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "23") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "24") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "01") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "02") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "03") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "AM ";
    } else if (timeCurrent[0] == "04") {
      return "12:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "05") {
      return "1:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "06") {
      return "2:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "07") {
      return "3:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "08") {
      return "4:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "09") {
      return "5:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "10") {
      return "6:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "11") {
      return "7:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "12") {
      return "8:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "13") {
      return "9:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "14") {
      return "10:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    } else if (timeCurrent[0] == "15") {
      return "11:" + timeCurrent[1] + ":" + timeCurrent[2] + "PM ";
    }
  }

  function logType(type) {
    var output = type;
    if (output == 1) {
      return "Login";
    } else if (output == 2) {
      return "Register";
    } else if (output == 3) {
      return "Logout";
    } else {
      return "Forget Password";
    }
  }
  // var dateTime =
  //   dateConvertion(history.date_time_created.toString().split("0")[0]) +
  //   " " +
  //   tConvert(history.date_time_created.toString().split("T")[1]);
  const columns = [
    // {
    //   title: "System_logs_id",
    //   field: "logs_id",
    //   sortable: true,
    // },
    {
      title: "Logs_type",
      // field: "logs_type",
      sortable: true,
      render: (row) => logType(row.logs_type),
    },
    {
      title: "Logs_description",
      field: "logs_description",
      sortable: true,
    },
    {
      title: "Date & Time Created",
      // field: "date_time_created",
      sortable: true,

      render: (row) =>
        dateConvertion(row.date_time_created.toString().split("T")[0]) +
        " " +
        timeFormatter(
          row.date_time_created
            .toString()
            .split("T")[1]
            .substring(
              0,
              row.date_time_created.toString().split("T")[1].length - 5
            )
        ),
    },
  ];

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      {/* Data Table */}
      <Row className="mt-1 ">
        <Col>
          <MaterialTable
            style={{ color: "#3BD2E3" }}
            columns={columns}
            data={history}
            title={"System logs"}
            cellEditable={false}
            options={{
              sorting: true,
              search: true,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default History;
