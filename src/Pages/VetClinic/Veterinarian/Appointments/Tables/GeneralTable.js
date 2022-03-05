import React from "react";
import { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { users } from "../../../../../Components/User";
import { dateConvertion } from "../../../../../Components/FormatDateTime";

function GeneralTable() {
  const [appointmentConfirm, setappointmentConfirm] = useState([]);
  useEffect(() => {
    Axios.get(`${hostUrl}/general/appointment/${users[0].vetid}`).then(
      (response) => {
        setappointmentConfirm(response.data);
      }
    );
  }, [appointmentConfirm]);
  //   const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Appointment ID",
      field: "appointment_id",
    },
    {
      title: "Pet Owner Name",
      field: "name",
    },
    {
      title: "Service Name",
      field: "service_name",
      sorting: true,
    },
    {
      title: "Service Category",
      field: "category",
      sorting: true,
    },
    {
      title: "Date Schedule",
      field: "date_scheduled",
      sorting: true,
      defaultSort: "desc",
      render: (row) => dateConvertion(String(row.date_scheduled).split("T")[0]),
    },
    {
      title: "Time Schedule",
      field: "time_scheduled",
      sorting: true,
    },
  ];
  return (
    <div>
      <MaterialTable
        columns={columns}
        data={appointmentConfirm}
        title={""}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          paging: true,
          pageSize: 10,
        }}
        // actions={[
        //   {
        //     icon: "information",
        //     tooltip: "Helper",
        //     isFreeAction: true,
        //     // onClick: handleClick,
        //   },
        // ]}
      />
    </div>
  );
}

export default GeneralTable;
