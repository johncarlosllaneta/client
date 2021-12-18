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

import { TiCancel } from "react-icons/ti";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../../Components/Host";
function HistoryTable() {
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Reservation ID",
      field: "appointment_id",
    },
    {
      title: "Pet Owner Name",
      field: "name",
    },
    {
      title: "Date Schedule",
      field: "date_scheduled",
      sorting: true,
      defaultSort: "desc",
      // render: (row) => dateConvertion(String(row.date_scheduled).split("T")[0]),
    },
    {
      title: "Time Schedule",
      field: "time_scheduled",
      sorting: true,
    },
    // {
    //   title: "Action",
    //   render: (row) => (
    //     <div style={{ display: "flex", flexDirection: "row " }}>
    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "View Information" })}
    //       >
    //         <Button
    //           variant="info"
    //           style={{
    //             marginRight: 5,
    //           }}
    //           onClick={() => {
    //             // viewDetails(row.appointment_id);
    //             // ModalView();
    //           }}
    //         >
    //           <AiOutlineSearch style={{ fontSize: 25, color: "white" }} />
    //         </Button>
    //       </OverlayTrigger>

    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "Done Appointment" })}
    //       >
    //         <Button
    //           variant="primary"
    //           style={{
    //             marginRight: 5,
    //           }}
    //           onClick={() => {
    //             // setpet_id(row.pet_id);
    //             // setappointmentID(row.appointment_id);
    //             // setcategory(row.category);
    //             // setnotifService_id(row.service_id);
    //             // handleShowModalFinish();
    //           }}
    //         >
    //           <AiOutlineFileDone style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>

    //       <OverlayTrigger
    //         placement="top-start"
    //         delay={{ show: 250 }}
    //         overlay={renderTooltip({ msg: "Void Appointment" })}
    //       >
    //         <Button
    //           variant="danger"
    //           onClick={() => {
    //             // setappointmentID(row.appointment_id);
    //             // setnotifService_id(row.service_id);
    //             // handleShowModalDecline();
    //           }}
    //         >
    //           <TiCancel style={{ fontSize: 25 }} />
    //         </Button>
    //       </OverlayTrigger>
    //     </div>
    //   ),
    // },
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

      <MaterialTable
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        columns={columns}
        data={[]}
        title={""}
        cellEditable={false}
        options={{
          sorting: true,
          search: true,
          paging: true,
        }}
        actions={[
          {
            icon: "information",
            tooltip: "Helper",
            isFreeAction: true,
            // onClick: handleClick,
          },
        ]}
      />
    </div>
  );
}

export default HistoryTable;
