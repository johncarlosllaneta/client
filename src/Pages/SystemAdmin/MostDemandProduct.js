import React from "react";
import ReactApexChart from "react-apexcharts";
function MostDemandProduct() {
  const series = [
    {
      data: [21, 22, 10, 28, 16],
    },
  ];
  const options = {
    chart: {
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
      categories: [
        ["Dog Food"],
        ["Cat Food"],
        ["Apparrel"],
        ["Toys"],
        ["Treats"],
      ],
      title: {
        text: "Most In-demand Products",
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  var bgColors = {
    Blue: "white",
    Cyan: "white",
    LBlue: "white",
    LTBlue: "white",
  };

  return (
    <div>
      <ReactApexChart
        height={335}
        options={options}
        series={series}
        type="bar"
      />
    </div>
  );
}

export default MostDemandProduct;
