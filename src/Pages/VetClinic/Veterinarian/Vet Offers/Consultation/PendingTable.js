import React from "react";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { useParams, BrowserRouter, Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import MaterialTable from "material-table";
import { AiOutlineSearch } from "react-icons/ai";
function PendingTable() {
  let { vetid } = useParams();
  var id = vetid.toString().replace("10##01", "/");
  const [counter, setcounter] = useState(0);

  const [consultation, setconsultation] = useState([]);
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
  useEffect(() => {
    if (counter < 3) {
      Axios.get(`${hostUrl}/doc/pending/appointment/${id}`).then((response) => {
        setconsultation(response.data);
        // console.log(response.data)
      });
      // alert(props.data.vet_admin_id);
      setcounter(counter + 1);
    }
  }, [consultation]);
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Appointment ID",
      field: "appointment_id",
      defaultSort: "asc",
    },
    {
      title: "Pet Owner Name",
      field: "name",
      defaultSort: "asc",
    },
    {
      title: "Date",
      render: (row) =>
        dateConvertion(row.date_scheduled.toString().split("T")[0]),
      sorting: true,
    },
    {
      title: "Time",
      field: "time_scheduled",
      sorting: true,
    },
    {
      title: "Service",
      field: "category",
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Vaccine History" })}
          >
            <Button
              variant="info"
              style={{
                marginRight: 5,
                color: "white",
              }}
              //   onClick={(e) => {
              //     e.preventDefault();
              //     window.location.href = `/pets/${id}/${row.pet_id}`;
              //   }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Details
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Row>
        <Col>
          <MaterialTable
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            columns={columns}
            data={consultation}
            title={"Pending"}
            cellEditable={false}
            options={{
              sorting: true,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default PendingTable;
