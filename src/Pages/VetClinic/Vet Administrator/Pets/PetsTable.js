import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import Axios from "axios";
import { FormatDate } from "../../../../Components/FormatDateTime";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../Components/Host";
import { useParams } from "react-router-dom";
import VaccinePetCard from "./VaccinePetCard";
import HealthPetCard from "./HealthPetCard";
import { dateConvertion } from "../../../../Components/FormatDateTime";
import { Skeleton } from "@mui/material";
function PetsTable(props) {

  const [pet, setPet] = useState([]);
  //   const [checker, setchecker] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pet_Id, setpet_Id] = useState();


  useEffect(() => {

    if (props.user.length != 0) {
      Axios.get(`${hostUrl}/vetclinic/registered/pets/${props.user.vetid}`)
        .then((response) => {
          setPet(response.data);
        })
        .catch((err) => console.log(err));
    }

  }, [props.user]);

  const [q, setq] = useState("");
  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1
      )
    );
  }

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;

  const columns = [
    {
      title: "Pet Name",
      field: "pet_name",
      defaultSort: "asc",
    },
    {
      title: "Pet Owner Name",
      field: "pet_owner_name",
      defaultSort: "asc",
    },
    {
      title: "Type of Pet",
      field: "type_of_pet",
      sorting: true,
    },
    {
      title: "Breed",
      field: "breed_of_pet",
      sorting: true,
    },
    {
      title: "Gender",
      field: "gender",
      sorting: true,
    },
    {
      title: "Birthday",
      defaultSort: "desc",
      render: (row) => dateConvertion(String(row.birth_day).split("T")[0]),
      sorting: true,
    },
    {
      title: "Action",
      render: (row) => (
        <div>
          <OverlayTrigger
            placement="top-start"
            delay={{ show: 250 }}
            overlay={renderTooltip({ msg: "Health Record" })}
          >
            <Button
              style={{
                marginRight: 5,
                color: "white",
                fontWeight: 'bold'
              }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/pets/${props.user.vetid}/${row.pet_id}`;
              }}
            >
              <AiOutlineSearch style={{ fontSize: 25 }} /> View Details
            </Button>
          </OverlayTrigger>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 10,
        height: '90vh'
      }}
    >

      {pet.length != 0 ?
        <Row>
          <Col>
            <MaterialTable
              columns={columns}
              data={pet}
              title={"Pets Table"}
              cellEditable={false}
              options={{
                sorting: true,
                pageSize: "10",
              }}
            />
          </Col>
        </Row>
        :

        <Skeleton width={'100%'} height={'100%'} variant="rectangular" />

      }

    </div>
  );
}

export default PetsTable;
