import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

function UsageAreaChart({width, height}) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3001/api/device/")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Failed to fetch Devices" + error))
    }, [])

    return (
        <div>
            <AreaChart width={width} height={height} data={data}>
            </AreaChart>
        </div>
    )
}


export default UsageAreaChart;