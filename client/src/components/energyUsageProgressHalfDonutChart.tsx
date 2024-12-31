import {useEffect, useState} from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

function EnergyUsageProgressHalfDonutChart(width, height) {
    const [data, setData] = useState()

    ChartJS.register(Tooltip, Legend, ArcElement);

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyUsageProgress")
            .then((response) => response.json())
            .then((data) => {
                const formattedData = [
                     {
                        totalEnergyUsage: data.total,
                        limit: data.limit
                     }
                ];

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