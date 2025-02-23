import {Pie, PieChart} from "recharts";
import {useEffect, useState} from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";

interface formattedData {
    deviceCategory: string,
    energyUsage:number
}

function TopDevicesBarChart({width, height}: {width: number, height: number}) {
    const [data, setData] = useState<formattedData[]>([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:3001/api/device/getEnergyOfEachCategory", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((devices) => {
                const formattedData: formattedData[] = Object.keys(devices).map((category) => ({
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
            <Card>
                <CardContent>
                    <PieChart width={width} height={height}>
                        <text
                            x={width / 2}
                            y={10}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: '20px'}}>
                            Energy Usage Breakdown by category </text>
                        <Pie
                            data={data}
                            dataKey="energyUsage"
                            nameKey="deviceCategory"
                            label={({ name, value }) => `${name}: ${value}`}
                        />

                    </PieChart>
                </CardContent>

            </Card>

        </div>
    )
}


export default TopDevicesBarChart;