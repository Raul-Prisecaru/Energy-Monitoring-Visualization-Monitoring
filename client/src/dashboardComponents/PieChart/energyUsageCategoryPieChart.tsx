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
        fetch("http://localhost:3001/api/device/getEnergyOfEachCategory")
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