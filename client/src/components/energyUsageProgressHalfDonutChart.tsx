import {useEffect, useState} from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

function EnergyUsageProgressHalfDonutChart({width, height}) {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    });

    ChartJS.register(Tooltip, Legend, ArcElement);

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyUsageProgress")
            .then((response) => response.json())
            .then((data) => {
                const formattedData = {
                    labels: ["Used Energy", "Max Target"],

                    datasets: [
                        {
                            data: [data.total, data.limit - data.total],
                            backgroundColor: ["#FF6384", "#808080"],
                        }
                    ]
                };



                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    const options = {
        rotation: -90,
        circumference: 180,

    }


    return (
        <div>
            <Doughnut data={data} options={options} width={width} height={height} />
        </div>
    )
}


export default EnergyUsageProgressHalfDonutChart