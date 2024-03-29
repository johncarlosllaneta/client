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
import { hostUrl } from "../../../../Components/Host";
import { dateConvertion } from "../../../../Components/FormatDateTime";



function AppointmentTable(props) {

    const [appointment, setappointment] = useState([]);

    // getPendingAppointment

    // alert(props.vetid);
    useEffect(() => {
        Axios.get(`${hostUrl}/pending/appointment/${props.vetid}`).then((response) => {
            setappointment(response.data);

        });

    }, [props.vetid])

    // Popover Overlay
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
        }

    ];


    return (
        <div

        >
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
                data={appointment}
                title={"Pending Appointments"}
                cellEditable={false}
                options={{
                    sorting: true,
                    search: true,
                    paging: true,
                    pageSize: '10',
                    pageSizeOptions: []


                }}

            />
        </div>
    )
}

export default AppointmentTable
