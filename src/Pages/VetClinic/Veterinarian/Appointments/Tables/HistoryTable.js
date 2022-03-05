import React from "react";
import { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { users } from "../../../../../Components/User";
import { dateConvertion } from "../../../../../Components/FormatDateTime";
function HistoryTable() {
  const [appointmentHistoryData, setappointmentHistoryData] = useState([]);
  useEffect(() => {
    Axios.get(`${hostUrl}/history/appointment/${users[0].vetid}`).then(
      (response) => {
        setappointmentHistoryData(response.data);
      }
    );
  }, [appointmentHistoryData]);
  const columns = [
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

    {
      title: "Status",
      field: "appointment_status",
      sorting: true,
    },
  ];

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={appointmentHistoryData}
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
export default HistoryTable;
