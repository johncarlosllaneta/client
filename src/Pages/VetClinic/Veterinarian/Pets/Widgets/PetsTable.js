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
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../../../../Components/Host";
import { dateConvertion } from "../../../../../Components/FormatDateTime";
import { Skeleton } from "@mui/material";
import getUser from "../../../../../Components/userData";
function PetsTable(props) {
  const [pet, setPet] = useState([]);
  //   const [checker, setchecker] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pet_Id, setpet_Id] = useState();

  const [user, setuser] = useState([]);
  useEffect(async () => {
    const userData = await getUser();
    setuser(userData);

    getPets(userData.vetid);
  }, []);

  const getPets = async (id) => {
    // alert(userData.vetid);
    const result = await Axios.get(
      `${hostUrl}/vetclinic/registered/pets/${id}`
    );
    // console.log(result.data);
    setPet(result.data);
  };
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
                fontWeight: "bold",
              }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/pets/${user.vetid}/${row.pet_id}`;
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
        height: "90vh",
      }}
    >
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
    </div>
  );
}

export default PetsTable;
