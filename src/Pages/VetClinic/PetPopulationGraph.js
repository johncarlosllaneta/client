import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { hostUrl } from "../../Components/Host";

function PetPopulationGraph(props) {
  // alert(props.clinic);
  // categories: ["Dogs", "Cats", "Fish", "Birds", "Turle", "Hamster"],
  const [numberOfDog, setnumberOfDog] = useState("");
  const [numberOfCat, setnumberOfCat] = useState("");

  const [counter, setcounter] = useState(0);
  // alert(props.clinic.vetid);
  useEffect(() => {

    // setTimeout(() => {
    if (counter < 10) {
      axios
        .get(`${hostUrl}/vetclinic/dog/length/${props.clinic}`)
        .then((response) => {
          setnumberOfDog(response.data.dog);
        });

      setcounter(counter + 1);
    }
    // }, 1000);
  }, [numberOfDog]);

  useEffect(() => {
    // setTimeout(() => {
    if (counter < 10) {
      axios
        .get(`${hostUrl}/vetclinic/cat/length/${props.clinic}`)
        .then((response) => {
          setnumberOfCat(response.data.cat);
        });
    }
    // }, 1000);
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
        text: "Animal Population",
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  return (
    <div>
      <Card
        style={{
          marginLeft: 60,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <ReactApexChart options={options} series={series} type="bar" />
      </Card>
    </div>
  );
}

export default PetPopulationGraph;
