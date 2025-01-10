import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

interface FormattedData {
    device: string,
    energyUsage: number[]
}

function EnergyUsageLineChart({ width, height }: { width: number, height: number }) {
    const [data, setData] = useState<FormattedData[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyUsageHistoryMonthly")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData = Object.keys(devices).map((deviceKey) => {
                    return {
                        device: deviceKey,
                        energyUsage: devices[deviceKey],
                    };
                });
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div>
            <LineChart width={width} height={height} data={data}>
                <XAxis dataKey={"energyDate"} />
                <YAxis />
                <Line type="monotone" dataKey="energyUsage" />
            </LineChart>
        </div>
    )
}

export default EnergyUsageLineChart;
