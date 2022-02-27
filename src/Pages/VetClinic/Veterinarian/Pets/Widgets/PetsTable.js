import React from "react";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import { useParams, BrowserRouter, Link } from "react-router-dom";
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
import MaterialTable from "material-table";
import { AiOutlineSearch } from "react-icons/ai";

function PetsTable() {
  let { vetid } = useParams();
  var id = vetid.toString().replace("10##01", "/");

  const [pet, setPet] = useState([]);
  const [counter, setcounter] = useState(0);
  useEffect(() => {
    if (counter < 3) {
      Axios.get(`${hostUrl}/vetclinic/registered/pets/${id}`)
        .then((response) => {
          setPet(response.data);
        })
        .catch((err) => console.log(err));
      setcounter(counter + 1);
    }
    // console.log(pet);
  }, [pet]);
  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Pet Owner Name",
      field: "pet_owner_name",
      defaultSort: "asc",
    },
    {
      title: "Pet Name",
      field: "pet_name",
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
      title: "birth_day",
      //   render: (row) => <p>{FormatDate({ datetime: row.birth_day })}</p>,
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
    <div
      style={{
        padding: 20,
      }}
    >
      <Row>
        <Col>
          <MaterialTable
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            columns={columns}
            data={pet}
            title={"Pets Table"}
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

export default PetsTable;
