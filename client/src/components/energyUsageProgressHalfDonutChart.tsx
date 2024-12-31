import {useEffect, useState} from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

function EnergyUsageProgressHalfDonutChart() {
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
                            backgroundColor: ["#FF6384", "#36A2EB"],
                            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
                        }
                    ]
                };



                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);




    return (
        <div>
            <Pie data={data} />
        </div>
    )
}


export default EnergyUsageProgressHalfDonutChart