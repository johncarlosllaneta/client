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
import { FormatDate } from "../../Components/FormatDateTime";
import { AiOutlineSearch } from "react-icons/ai";
import MaterialTable from "material-table";
import { hostUrl } from "../../Components/Host";
import { useParams } from "react-router-dom";
import VaccinePetCard from "./VaccinePetCard";
import HealthPetCard from "./HealthPetCard";
function PetsTable(props) {
  let { vetid } = useParams();
  var id = vetid.toString().replace("10##01", "/");

  const [pet, setPet] = useState([]);
  //   const [checker, setchecker] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pet_Id, setpet_Id] = useState();

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
      title: "birth_day",
      render: (row) => <p>{FormatDate({ datetime: row.birth_day })}</p>,
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
              onClick={(e) => {
                e.preventDefault();
                setpet_Id(row.pet_id);
                // alert("PetID : " + pet_Id);
                handleShow();
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
        width: "80vw",
        marginTop: 20,
        marginLeft: 20,
      }}
    >
      {/* Data Table */}
      <Modal centered size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vaccine History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="health">
            <Tab eventKey="health" title="Health Card">
              <HealthPetCard pets={pet_Id} />
            </Tab>
            <Tab eventKey="vaccine" title="Vaccine Card">
              <VaccinePetCard pet={pet_Id} vetid={id} />
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
