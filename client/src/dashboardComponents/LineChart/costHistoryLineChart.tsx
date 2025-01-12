import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {useEffect, useState} from "react";

interface formattedData {
    month: string,
    cost: number
}

function CostHistoryLineChart({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/getCostHistoryMonthly", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = Object.keys(devices).map((month) => ({
                        month: month,
                        cost: devices[month]
                    })
                );
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div>
            <LineChart width={width} height={height} data={data}>
                <XAxis dataKey={"month"} />
                <YAxis dataKey={"cost"}/>
                <Line type="monotone" dataKey="cost" />
            </LineChart>
        </div>
    )
}


export default CostHistoryLineChart;