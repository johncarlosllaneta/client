import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactApexChart from "react-apexcharts";
import DataTable from "react-data-table-component";
import axios from "axios";
import { RiStethoscopeFill } from "react-icons/ri";
import { FaUserAlt, FaPaw, FaClinicMedical } from "react-icons/fa";
import { hostUrl } from "../../Components/Host";
import MaterialTable from "material-table";

function Home() {
  const [counter, setcounter] = useState(0);
  function oneDecimal(ratess) {
    return Math.round(ratess * 10) / 10;
  }

  const columns = [
    {
      title: "Vet Name",
      field: "vet_name",
    },
    {
      title: "Ratings",
      // selector: "averageRatings",
      render: (row) => oneDecimal(row.averageRatings),
      defaultSort: "asc",
    },
  ];

  const [vetRatings, setvetRatings] = useState([]);

  useEffect(() => {
    if (counter < 6) {
      axios.get(`${hostUrl}/vetRatings/admin`).then((response) => {
        setvetRatings(response.data);
      });
      setcounter(counter + 1);
    }

    // console.log(vetRatings);
  }, [vetRatings]);

  // categories: ["Dogs", "Cats", "Fish", "Birds", "Turle", "Hamster"],
  const [numberOfDog, setnumberOfDog] = useState(0);
  const [numberOfCat, setnumberOfCat] = useState(0);

  useEffect(() => {
    if (counter < 6) {
      axios.get(`${hostUrl}/pets/dogs/admin`).then((response) => {
        setnumberOfDog(response.data.dog);
      });
    }
  }, [numberOfDog]);

  useEffect(() => {
    if (counter < 6) {
      axios.get(`${hostUrl}/pets/cat/admin`).then((response) => {
        setnumberOfCat(response.data.cat);
      });
    }
  }, [numberOfCat]);

  const series = [
    {
      data: [numberOfDog, numberOfCat],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },

    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [["Dog"], ["Cat"]],
      title: {
        text: "General Pet Population",
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  const [numberOfVetClinic, setnumberOfVetClinic] = useState();
  const [numberOfPetOwners, setnumberOfPetOwners] = useState();
  const [numberOfPets, setnumberOfPets] = useState();
  const [numberOfPendingRequest, setnumberOfPendingRequest] = useState();

  useEffect(() => {
    if (counter < 6) {
      axios.get(`${hostUrl}/petowner/length`).then((response) => {
        setnumberOfPetOwners(response.data.petOwners);
      });
    }
  }, [numberOfPetOwners]);

  useEffect(() => {
    if (counter < 6) {
      axios.get(`${hostUrl}/pet/length`).then((response) => {
        setnumberOfPets(response.data.pet);
      });
    }
  }, [numberOfPets]);

  useEffect(() => {
    axios.get(`${hostUrl}/vetclinic/length`).then((response) => {
      setnumberOfVetClinic(response.data.vetclinic);
    });
  }, [numberOfPetOwners]);

  useEffect(() => {
    if (counter < 6) {
      axios.get(`${hostUrl}/pending/vetclinic/length`).then((response) => {
        setnumberOfPendingRequest(response.data.pending);
      });
    }
  }, [numberOfPendingRequest]);

  var containerText = {};

  return (
    <div style={{ padding: 20 }}>
      <Row className=" ml-5 " style={{ paddingBottom: 30 }}>
        <Col>
          <Card
            style={{
              backgroundColor: "white",
              color: "#3BD2E3",
              height: 170,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <RiStethoscopeFill style={{ fontSize: 100 }} />
                </Col>
                <Col style={containerText}>
                  <h1>{numberOfVetClinic}</h1>
                  <strong>Veterinary clinic</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              backgroundColor: "white",
              color: "#3BD2E3",
              height: 170,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <FaUserAlt style={{ fontSize: 100 }} />
                </Col>
                <Col>
                  <h1>{numberOfPetOwners}</h1>
                  <strong>Pet Owner</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              backgroundColor: "white",
              color: "#3BD2E3",
              height: 170,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <FaPaw style={{ fontSize: 100 }} />
                </Col>
                <Col>
                  <h1>{numberOfPets !== "" ? numberOfPets : 0}</h1>
                  <strong>Pets</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              backgroundColor: "white",
              color: "#3BD2E3",
              height: 170,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <Row>
                <Col>
                  <FaClinicMedical style={{ fontSize: 100 }} />
                </Col>
                <Col>
                  <h1>{numberOfPendingRequest}</h1>
                  <strong>Pending Request</strong>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <ReactApexChart options={options} series={series} type="bar" />
          </Card>
        </Col>

        <Col md={4} style={{ display: "flex" }}>
          <Card
            style={{
              maxHeight: "100%",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Card.Body>
              <MaterialTable
                style={{ textAlign: "left", width: 400, height: "100%" }}
                title="Top Vet in Ratings"
                pagination={true}
                columns={columns}
                data={vetRatings}
                responsive={true}
                options={{
                  search: false,
                  paging: true,
                  pageSizeOptions: [],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
