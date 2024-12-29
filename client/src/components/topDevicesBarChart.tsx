import {Area, AreaChart, Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

function TopDevicesBarChart({width, height}) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getCategoryEnergyUsage")
            .then((response) => response.json())
            .then((devices) => {
                const formattedData = Object.keys(devices).map((category) => ({
                    deviceCategory: category,
                    energyUsage: devices[category]
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
                <Bar dataKey={"energyUsage"} />
            </BarChart>
        </div>
    )
}


export default TopDevicesBarChart;