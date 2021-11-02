import React from 'react'
import ReactApexChart from "react-apexcharts";
import { Card } from "react-bootstrap";
function GraphGender(props) {
    var options = {
        series: [props.male, props.female],
        colors: ['#3BD2E3', '#f953c6'],
        chart: {
            type: 'pie',
        },
        labels: ["Male", "Female"],
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -30,

                }
            }
        },
        title: {
            text: "Gender",
            align: 'center',
            style: {
                fontSize: 25,
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        dataLabels: {
            style: {
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: 20,
        }
    };

    return (
        <div>
            <Card style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <ReactApexChart options={options} series={options.series} type="pie" />
            </Card>
        </div>
    )
}

export default GraphGender
