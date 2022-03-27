import React from "react";
import { useState, useEffect, useRef } from "react";
import { Popover, Row, Col, Button, OverlayTrigger } from "react-bootstrap";
import MaterialTable from "material-table";
import Axios from "axios";
import { hostUrl } from "../../../../../../Components/Host";
import { useParams, BrowserRouter, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
function Vaccination() {
  let { vetid } = useParams();
  var id = vetid.toString().replace("10##01", "/");

  const [vaccination, setvaccination] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(async () => {
    Axios.get(`${hostUrl}/doc/pets/vaccination/${id}`)
      .then((response) => {
        setvaccination(response.data);
      })
      .catch((err) => console.log(err));
    // console.log(pet);
  }, []);
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
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
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Vaccine History" })}
          >
            <Button
              variant="info"
              style={{
                marginRight: 5,
                color: "white",
              }}
              //   onClick={(e) => {
              //     e.preventDefault();
              //     window.location.href = `/pets/${id}/${row.pet_id}`;
              //   }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Details
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Row>
        <Col>
          <MaterialTable
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            columns={columns}
            data={vaccination}
            title={" "}
            cellEditable={false}
            options={{
              sorting: true,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Vaccination;
