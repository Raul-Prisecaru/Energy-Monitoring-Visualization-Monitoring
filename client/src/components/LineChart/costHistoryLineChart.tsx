import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {useEffect, useState} from "react";

interface formattedData {
    energyUsage: number,
    energyDate: string
}

function costHistoryLineChart({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = devices.flatMap((device: any) =>
                    device.energyHistory.map((historyData: formattedData) => ({
                        energyUsage: historyData.energyUsage,
                        energyDate: new Date(historyData.energyDate).toLocaleDateString("en-GB")
                    }))
                );
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


export default costHistoryLineChart;