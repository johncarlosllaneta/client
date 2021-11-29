import React, { useState, useEffect } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../Components/Host";
import { useParams } from "react-router";

function HealthPetCard(props) {
  const [counter, setcounter] = useState(0);
  const [healthCard, sethealthCard] = useState([]);
  useEffect(() => {
    // alert(props.pets);
    if (counter < 3) {
      Axios.get(`${hostUrl}/petOwner/services/health/card/${props.pets}`).then(
        (response) => {
          sethealthCard(response.data);
        }
      );
      setcounter(counter + 1);
    }
  }, [healthCard]);

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
      return "2:" + timeCurrent[1 + ":"] + timeCurrent[2] + "AM ";
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

  const columns = [
    {
      title: "Service Name",
      field: "service_name",
      defaultSort: "asc",
    },
    {
      title: "Service Description",
      field: "service_description",
      sorting: true,
    },
    {
      title: "Vet name",
      field: "vet_name",
      sorting: true,
    },
    {
      title: "Category",
      field: "category",
      sorting: true,
    },
    {
      title: "Date and Time",
      // field: "date_accomplished",
      sorting: true,
      render: (row) =>
        dateConvertion(row.date_accomplished.toString().split("T")[0]) +
        " " +
        timeFormatter(
          row.date_accomplished
            .substring()
            .split("T")[1]
            .substring(
              0,
              row.date_accomplished.substring().split("T")[1].length - 5
            )
        ),
    },

    // {
    //   title: "Action",
    //   render: (row) => (
    //     <div>
    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "View Information" })}
    //       >
    //         <Button
    //           variant="info"
    //           className="mr-3"
    //           onClick={() => {
    //             alert("hi");
    //           }}
    //         >
    //           <AiOutlineSearch style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>

    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "Edit Details" })}
    //       >
    //         <Button variant="primary" className="mr-3" onClick={() => {}}>
    //           <FaRegEdit style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>

    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "Delete Details" })}
    //       >
    //         <Button variant="danger" onClick={() => {}}>
    //           <AiOutlineDelete style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>
    //     </div>
    //   ),
    // },
  ];

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={healthCard}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          pageSize: 10,
          pageSizeOptions: [10],
        }}
        style={{
          borderColor: "white",
        }}
      />
    </div>
  );
}

export default HealthPetCard;
