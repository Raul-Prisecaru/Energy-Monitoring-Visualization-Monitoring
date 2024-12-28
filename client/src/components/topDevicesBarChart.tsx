import {Area, AreaChart, Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

function TopDevicesBarChart({width, height}) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/")
            .then((response) => response.json())
            .then((devices) => {
                const deviceHistoryData = devices.flatMap(device =>
                    device.energyHistory.map(historyData => ({
                        energyUsage: historyData.energyUsage,
                        energyDate: new Date(historyData.energyDate).toLocaleDateString("en-GB")
                    }))
                );
                setData(deviceHistoryData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div>
            <BarChart width={width} height={height} data={data} layout={"vertical"}>
                <XAxis type={"number"} />
                <YAxis type="category" dataKey={"energyDate"} />
                <Bar dataKey={"energyUsage"} />
            </BarChart>
        </div>
    )
}


export default TopDevicesBarChart;