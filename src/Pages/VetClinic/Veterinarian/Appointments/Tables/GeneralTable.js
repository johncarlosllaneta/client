import React from "react";
import { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { users } from "../../../../../Components/User";
import { dateConvertion } from "../../../../../Components/FormatDateTime";
import getUser from "../../../../../Components/userData";
import { useParams } from "react-router-dom";

function GeneralTable(props) {
  // const [appointmentConfirm, setappointmentConfirm] = useState([]);
  // const [user, setuser] = useState([]);
  // useEffect(async () => {
  //   const userData = await getUser();
  //   setuser(userData);

  //   getGeneral(userData.vetid);
  // }, []);
  // //   const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  // const getGeneral = async (id) => {
  //   // alert(userData.vetid);
  //   const result = await Axios.get(`${hostUrl}/general/appointment/${id}`);
  //   // console.log(result.data);
  //   setappointmentConfirm(result.data);
  // };
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
        data={props.generalTable}
        // data={appointmentConfirm}
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
