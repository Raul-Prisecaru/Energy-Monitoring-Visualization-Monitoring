import {Area, AreaChart, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

function UsageAreaChart({width, height}) {
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
            <AreaChart width={width} height={height} data={data}>
                <XAxis dataKey={"energyDate"} />
                <YAxis />
                <Area type="monotone" dataKey="energyUsage" />
            </AreaChart>
        </div>
    )
}


export default UsageAreaChart;