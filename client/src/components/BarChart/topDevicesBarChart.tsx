import {Bar, BarChart,XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

interface formattedData {
    deviceCategory: string,
    totalEnergyUsage: number
}

function TopDevicesBarChart({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getTopEnergyUsageDevices")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = Object.keys(devices).map((category) => ({
                    deviceCategory: category,
                    totalEnergyUsage: devices[category]
                })
                );
                setData(formattedData);
            })
            .catch((error) => console.error("Failed to fetch Devices: " + error));
    }, []);

    return (
        <div>
            <BarChart width={width} height={height} data={data} layout={"vertical"}>
                <XAxis type={"number"} />
                <YAxis type="category" dataKey={"deviceCategory"} />
                <Bar dataKey={"totalEnergyUsage"} />
            </BarChart>
        </div>
    )
}


export default TopDevicesBarChart;