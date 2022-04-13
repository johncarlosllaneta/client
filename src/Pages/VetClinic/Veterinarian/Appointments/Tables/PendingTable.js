import React from "react";
import { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { users } from "../../../../../Components/User";
import { dateConvertion } from "../../../../../Components/FormatDateTime";
import { useParams } from "react-router-dom";
import getUser from "../../../../../Components/userData";
function PendingTable() {
  const [appointmentPending, setappointmentPending] = useState([]);
  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getPending(userData.vetid);
  }, []);
  //   const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const getPending = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/pending/appointment/${id}`);
    // console.log(result.data);
    setappointmentPending(result.data);
  };
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
      title: "Date Schedule",
      field: "date_scheduled",
      defaultSort: "desc",
      render: (row) => dateConvertion(String(row.date_scheduled).split("T")[0]),
      sorting: true,
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
        data={appointmentPending}
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

export default PendingTable;
