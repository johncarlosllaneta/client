import React, { useState, useEffect, useRef, useParams } from "react";
import Axios from "axios";
import { hostUrl } from "../../../../../Components/Host";
import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
  Modal,
  Tabs,
  Tab,
  Image,
} from "react-bootstrap";
import MaterialTable from "material-table";
import { AiOutlineSearch } from "react-icons/ai";
function PharmacyTable() {
  const [user, setuser] = useState([]);

  const [counter1, setcounter1] = useState(0);
  useEffect(() => {
    var token = localStorage.getItem("ajwt");
    if (counter < 6) {
      Axios.get(`${hostUrl}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        setuser(response.data.result[0]);
        // console.log(user);
      });
      setcounter1(counter + 1);
    }
  }, [user]);

  const [counter, setcounter] = useState(0);
  const [pharmacy, setPharmacy] = useState([]);
  useEffect(() => {
    if (counter < 3) {
      // var id = vetid.toString().replace("10##01", "/");
      // var id = staffId;
      Axios.get(`${hostUrl}/pharmacy/staff/${user.vet_staff_id}`).then(
        (response) => {
          setPharmacy(response.data);
        }
      );
      setcounter(counter + 1);
    }
  }, [pharmacy]);

  const renderTooltip = (props) => <Popover>{props.msg}</Popover>;
  const columns = [
    {
      title: "Medicine Image",
      render: (row) => (
        <div>
          <Image
            src={row.medicine_image}
            style={{
              height: 50,
              width: 50,
            }}
            rounded
          />
        </div>
      ),
      defaultSort: "asc",
    },
    {
      title: "Medicine ID",
      field: "med_id",
      defaultSort: "asc",
    },
    {
      title: "Medicine Name",
      field: "medicine_name",
      defaultSort: "asc",
    },
    {
      title: "Price",
      field: "price",
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
            data={pharmacy}
            title={"Pharmacy Table"}
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

export default PharmacyTable;
