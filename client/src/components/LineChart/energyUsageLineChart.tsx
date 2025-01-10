import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import { useEffect, useState } from "react";

interface formattedData {
    device: string;
    month: number;
    energyUsage: number;
}

function EnergyUsageLineChart({ width, height }: { width: number; height: number }) {
    const [data, setData] = useState<FormattedData[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyAveragePerDevice")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = Object.keys(devices).map((data) => ({
                        device: data,
                        averageEnergy: devices[data]
                    })
                );
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch devices: " + error));
    }, []);

    return (
        <div>
            <BarChart width={width} height={height} data={data}>
                {/*<CartesianGrid strokeDasharray="3 3" />*/}
                <XAxis dataKey="device" />
                <YAxis dataKey={"averageEnergy"}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="averageEnergy" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default EnergyUsageLineChart;
