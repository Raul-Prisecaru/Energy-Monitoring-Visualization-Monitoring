import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import { useEffect, useState } from "react";

interface formattedData {
    device: string;
    month: number;
    energyUsage: number;
}

function EnergyUsageLineChart({ width, height }: { width: number; height: number }) {
    const [data, setData] = useState<formattedData[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/getMonthlyEnergyAndCostAveragePerDevice", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = Object.keys(devices).map((data) => ({
                        deviceName: data,
                        averageEnergy: devices[data][0],
                        averageCost: devices[data][1]
                    })
                );
                console.log(formattedData)
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch devices: " + error));
    }, []);

    return (
        <div>
            <BarChart width={width} height={height} data={data}>
                <XAxis dataKey="deviceName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageEnergy" fill="#8884d8" name="Average Energy" />
                <Bar dataKey="averageCost" fill="#82ca9d" name="Average Cost" />
            </BarChart>
        </div>
    );
}

export default EnergyUsageLineChart;
