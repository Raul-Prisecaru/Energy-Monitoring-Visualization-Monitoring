import {Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

function TopDevicesBarChart({width, height}) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/device/getEnergyOfEachCategory")
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
            <PieChart width={width} height={height}>
                <Pie
                    data={data}
                    dataKey="energyUsage"
                    nameKey="deviceCategory"
                    label={({ name, value }) => `${name}: ${value}`}
                />
            </PieChart>
        </div>
    )
}


export default TopDevicesBarChart;