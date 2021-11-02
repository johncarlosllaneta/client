import React, { useState, useEffect } from "react";
import { Popover } from "react-bootstrap";
import Axios from "axios";
import { hostUrl } from "../../Components/Host";
import MaterialTable from "material-table";
import { useParams } from "react-router";

function VaccineCard() {
  let { pet_id } = useParams();
  const [vaccine, setvaccine] = useState([]);
  const [pet_owner_id, setpet_owner_id] = useState();
  useEffect(() => {
    Axios.get(
      `${hostUrl}/petOwner/pet/immunization/history/${pet_owner_id}/${pet_id}`
    ).then((response) => {
      setvaccine(response.data);
    });
  }, [vaccine]);

  useEffect(() => {
    Axios.get(`${hostUrl}/get/user/id/${pet_id}`).then((response) => {
      setpet_owner_id(response.data[0].pet_owner_id);
    });
  }, [pet_owner_id]);

  const columns = [
    {
      title: "Vaccine Name",
      field: "vaccine_name",
      defaultSort: "asc",
    },
    {
      title: "Againts",
      field: "againts",
      sorting: true,
    },
    {
      title: "Vaccine Number",
      field: "vaccine_number",
      sorting: true,
    },

    {
      title: "Manufacturer",
      field: "manufacturer",
      sorting: true,
    },
    {
      title: "Weight",
      field: "pet_weight",
      sorting: true,
    },
    {
      title: "Vaccination Date",
      render: (row) => dateConvertion(row.date.substring().split("T")[0]),
    },
    {
      title: "Vaccination Time",
      render: (row) =>
        timeFormatter(
          row.date
            .substring()
            .split("T")[1]
            .substring(0, row.date.substring().split("T")[1].length - 5)
        ),
    },
  ];

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

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={vaccine}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          pageSizeOptions: [],
          paging: true,
        }}
        style={{
          borderColor: "white",
        }}
      />
    </div>
  );
}

export default VaccineCard;
