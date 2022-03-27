import React from "react";
import { useState, useEffect, useRef } from "react";
import { Popover } from "react-bootstrap";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../../Components/Host";
import { useParams, BrowserRouter, Link } from "react-router-dom";
function Appointment() {
  let { vetid } = useParams();
  var id = vetid.toString().replace("10##01", "/");

  const [appointment, setappointment] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(async () => {
    Axios.get(`${hostUrl}/doc/pets/appointment/${id}`)
      .then((response) => {
        setappointment(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const columns = [
    {
      title: "Appointment ID",
      field: "appointment_id",
      defaultSort: "asc",
    },
    {
      title: "Pet Owner",
      field: "pet_owner_name",
      sorting: true,
    },
    {
      title: "Pet",
      field: "pet_name",
      sorting: true,
    },
    {
      title: "Service Name",
      field: "service_name",
      sorting: true,
    },

    {
      title: "Category",
      field: "Category",
      sorting: true,
    },
    {
      title: "Status",
      field: "appointment_status",
      sorting: true,
    },
  ];

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  return (
    <div>
      <MaterialTable
        columns={columns}
        data={appointment}
        title={""}
        cellEditable={false}
        options={{
          sorting: true,
        }}
        style={{
          borderColor: "white",
        }}
      />
    </div>
  );
}

export default Appointment;
