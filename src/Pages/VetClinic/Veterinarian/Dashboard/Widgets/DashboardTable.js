import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Form,
  OverlayTrigger,
  Popover,
  Overlay,
  FloatingLabel,
  Row,
} from "react-bootstrap";
import { AiOutlineSearch, AiOutlineFileDone } from "react-icons/ai";
import { users } from "../../../../../Components/User";
import { dateConvertion } from "../../../../../Components/FormatDateTime";

import { TiCancel } from "react-icons/ti";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";

function DashboardTable(props) {
  const [appointment, setappointment] = useState([]);

  // getPendingAppointment

  // alert(props.vetid);
  useEffect(async () => {
    Axios.get(`${hostUrl}/doc/pending/appointment/${props.data}`).then(
      (response) => {
        setappointment(response.data);
      }
    );

    getVaccination(props.data);
  }, []);

  const [vaccination, setvaccination] = useState([]);
  const getVaccination = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(`${hostUrl}/doc/pets/vaccination/${id}`);
    // console.log(result.data);
    setvaccination(result.data);
  };
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

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

  const renderTooltipVaccination = (props) => <Popover>{props.msg}</Popover>;
  const columnsVaccination = [
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
      field: "category",
      sorting: true,
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
  ];
  return (
    <div>
      {/* Data Table */}

      <Overlay
        show={showPopover}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Helper</Popover.Header>
          <Popover.Body>
            <p>
              This table shows the list of confirmed appointment in the vet
              clinic.{" "}
            </p>
          </Popover.Body>
        </Popover>
      </Overlay>
      <Row>
        <MaterialTable
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          columns={columns}
          data={appointment}
          title={"Appointments For Today"}
          cellEditable={false}
          options={{
            sorting: true,
            search: true,
            paging: true,
          }}
          actions={[
            {
              icon: "information",
              tooltip: "New Apppointment",
              isFreeAction: true,
              // onClick: handleClick,
            },
          ]}
        />
      </Row>
      <div style={{ height: 30 }}></div>
      <Row>
        <MaterialTable
          style={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
          columns={columnsVaccination}
          data={vaccination}
          title={"Vaccination For Today"}
          cellEditable={false}
          options={{
            sorting: true,
            search: true,
            paging: true,
          }}
          actions={[
            {
              icon: "information",
              tooltip: "New Vaccination",
              isFreeAction: true,
              // onClick: handleClick,
            },
          ]}
        />
      </Row>
    </div>
  );
}

export default DashboardTable;
